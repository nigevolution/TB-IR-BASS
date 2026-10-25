#!/usr/bin/env python3
"""
Cakto Bridge CLI
Automação em lote (Batch Create, Batch Edit, Batch Order Bump, Member Area Upsell)
integrada à sessão ativa da Cakto no Safari via DOM/IPC.
"""

import sys
import json
import time
import argparse
from typing import List, Dict, Any, Optional

CUA_PATH = "/Users/elbsferreiranobre/Library/Application Support/com.nigevolution.computer-use-agent"
if CUA_PATH not in sys.path:
    sys.path.insert(0, CUA_PATH)

import safari_dom

def run_cakto_js(js_code: str) -> Any:
    """Executa um script JS no contexto da aba ativa da Cakto no Safari e retorna o resultado decodificado."""
    wrapped_js = f"""
    (() => {{
      try {{
        {js_code}
      }} catch (err) {{
        return {{ __error: true, message: err.message, stack: err.stack }};
      }}
    }})()
    """
    res = safari_dom.eval_script(url_contains="app.cakto.com.br", script=wrapped_js)
    if not res.get("result", {}).get("ok"):
        # Fallback para window 1 tab 1 caso url_contains não localize
        res = safari_dom.eval_script(window_index=1, tab_index=1, script=wrapped_js)
    if not res.get("result", {}).get("ok"):
        raise RuntimeError(f"Erro na execução Safari DOM: {res}")
    data = res["result"].get("data")
    if isinstance(data, dict) and data.get("__error"):
        raise RuntimeError(f"Erro no contexto Cakto: {data.get('message')}")
    return data

def get_session_info() -> Dict[str, Any]:
    """Obtém dados da sessão autenticada, tokens e CSRF."""
    js = """
    let csrfToken = null;
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
      xhr.withCredentials = true;
      xhr.send(null);
      if (xhr.status === 200) {
        csrfToken = JSON.parse(xhr.responseText).csrfToken;
      }
    } catch (_) {}
    return {
      accountId: localStorage.getItem('impersonatedUserId') || '3684785',
      csrfToken: csrfToken,
      url: window.location.href
    };
    """
    return run_cakto_js(js)

def list_products(filter_query: str = "") -> List[Dict[str, Any]]:
    """Lista todos os produtos da conta."""
    js = f"""
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.cakto.com.br/api/products/?limit=100&type=unique%2Csubscription&ordering=-createdAt&status=active', false);
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error('Falha ao listar produtos: ' + xhr.status + ' ' + xhr.responseText);
    const data = JSON.parse(xhr.responseText);
    const results = data.results || [];
    const q = '{filter_query}'.toLowerCase();
    if (!q) return results;
    return results.filter(p => (p.name || '').toLowerCase().includes(q));
    """
    return run_cakto_js(js)

def get_product(product_id: str) -> Dict[str, Any]:
    """Obtém os detalhes completos de um produto, incluindo bumps e offers."""
    js = f"""
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.cakto.com.br/api/product/{product_id}/', false);
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error('Falha ao obter produto: ' + xhr.status);
    return JSON.parse(xhr.responseText);
    """
    return run_cakto_js(js)

def get_offer(offer_id: str) -> Dict[str, Any]:
    """Obtém detalhes de uma oferta específica."""
    js = f"""
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.cakto.com.br/api/offers/{offer_id}/', false);
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error('Falha ao obter oferta: ' + xhr.status + ' ' + xhr.responseText);
    return JSON.parse(xhr.responseText);
    """
    return run_cakto_js(js)

def update_offer_price(offer_id: str, new_price: float, csrf_token: Optional[str] = None) -> Dict[str, Any]:
    """Atualiza o preço de uma oferta na Cakto usando PUT."""
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
      }} catch (_) {{}}
    }}

    const getXhr = new XMLHttpRequest();
    getXhr.open('GET', 'https://api.cakto.com.br/api/offers/{offer_id}/', false);
    getXhr.setRequestHeader('x-cakto-account-id', '3684785');
    getXhr.withCredentials = true;
    getXhr.send(null);
    if (getXhr.status !== 200) throw new Error('Falha ao carregar oferta para edição: ' + getXhr.status);
    const offer = JSON.parse(getXhr.responseText);
    offer.price = {new_price};

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://api.cakto.com.br/api/offers/{offer_id}/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(offer));
    if (xhr.status !== 200) throw new Error('Falha ao atualizar oferta: ' + xhr.status + ' ' + xhr.responseText);
    return JSON.parse(xhr.responseText);
    """
    return run_cakto_js(js)

def add_order_bump(host_product_id: str, bump_product_id: str, bump_offer_id: str, title: str, description: str, csrf_token: Optional[str] = None, cta: str = "SIM, EU ACEITO ESSA OFERTA ESPECIAL!") -> Dict[str, Any]:
    """Adiciona um Order Bump a um produto específico."""
    payload = {
        "product": bump_product_id,
        "offer": bump_offer_id,
        "referencePrice": None,
        "cta": cta,
        "title": title,
        "description": description,
        "showImage": False
    }
    payload_json = json.dumps(payload, ensure_ascii=False)
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cakto.com.br/api/product/{host_product_id}/bump/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send(JSON.stringify({payload_json}));
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def delete_order_bump(bump_id: str, csrf_token: Optional[str] = None) -> Dict[str, Any]:
    """Remove um Order Bump pelo ID."""
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://api.cakto.com.br/api/bump/{bump_id}/', false);
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send(null);
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def batch_remove_order_bump(bump_offer_id: str, target_pattern: str = "Simulação") -> Dict[str, Any]:
    """Remove o Order Bump com a oferta especificada de todos os produtos do critério."""
    session = get_session_info()
    csrf_token = session.get("csrfToken")
    products = list_products()
    matched = [p for p in products if target_pattern.lower() in p["name"].lower()]

    results = {
        "total_targets": len(matched),
        "removed": [],
        "not_found": [],
        "failed": []
    }

    for p in matched:
        pid = p["id"]
        pname = p["name"]
        try:
            details = get_product(pid)
            bumps = details.get("bumps", [])
            target_bumps = [b for b in bumps if b.get("offer", {}).get("id") == bump_offer_id or "Customização VIP" in (b.get("title") or "")]
            if not target_bumps:
                results["not_found"].append({"id": pid, "name": pname})
                continue

            for b in target_bumps:
                time.sleep(0.3)
                res = delete_order_bump(b["id"], csrf_token=csrf_token)
                if res.get("status") in (200, 204):
                    results["removed"].append({"id": pid, "name": pname, "bump_id": b["id"]})
                else:
                    results["failed"].append({"id": pid, "name": pname, "bump_id": b["id"], "error": res.get("response")})
        except Exception as e:
            results["failed"].append({"id": pid, "name": pname, "error": str(e)})

    return results

# ==================== CAKTO MEMBERS (ÁREA DE MEMBROS) ====================

def list_courses() -> List[Dict[str, Any]]:
    """Lista todos os cursos existentes na Área de Membros."""
    js = """
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.cakto.com.br/api/members/courses/', false);
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error('Falha ao listar cursos: ' + xhr.status);
    return JSON.parse(xhr.responseText);
    """
    return run_cakto_js(js)

def get_course(course_id: str) -> Dict[str, Any]:
    """Obtém detalhes do curso e seus módulos/aulas."""
    js = f"""
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.cakto.com.br/api/members/courses/{course_id}/', false);
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error('Falha ao obter curso: ' + xhr.status);
    return JSON.parse(xhr.responseText);
    """
    return run_cakto_js(js)

def add_course_module(course_id: str, module_name: str, csrf_token: Optional[str] = None) -> Dict[str, Any]:
    """Cria um módulo dentro do curso da Área de Membros."""
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    payload = json.dumps({"modulos": [{"nome": module_name, "capa": ""}]}, ensure_ascii=False)
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cakto.com.br/api/members/{course_id}/modules/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send(JSON.stringify({payload}));
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def add_course_lesson(course_id: str, module_id: str, lesson_name: str, description_html: str, csrf_token: Optional[str] = None) -> Dict[str, Any]:
    """Cria uma aula/conteúdo com texto rico e link de compra dentro de um módulo."""
    lesson_payload = {
        "moduloId": module_id,
        "nome": lesson_name,
        "posicao": 1,
        "descricao": description_html,
        "capa": "https://cdn-checkout.cakto.com.br/images/f148dc52-0f2f-4574-9e06-fd94eb55155a.png",
        "video": "",
        "files": [],
        "startIn": None,
        "startDays": None,
        "startDate": None
    }
    payload_json_escaped = json.dumps(json.dumps(lesson_payload, ensure_ascii=False))
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cakto.com.br/api/members/{course_id}/lessons/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send({payload_json_escaped});
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def add_coproduction(
    product_id: str,
    user_email: str,
    percentage: float = 50.0,
    csrf_token: Optional[str] = None
) -> Dict[str, Any]:
    """Cria/envia um convite de coprodução para um produto específico na Cakto."""
    payload = {
        "productPk": product_id,
        "userEmail": user_email,
        "percentage": percentage,
        "receiveSalesFromProducer": True,
        "receiveSalesFromAffiliate": False,
        "enableInvoice": True,
        "endTime": None
    }
    payload_json = json.dumps(json.dumps(payload, ensure_ascii=False))
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cakto.com.br/api/coproduction/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send({payload_json});
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def update_product_description(product_id: str, description: str, csrf_token: Optional[str] = None) -> Dict[str, Any]:
    """Atualiza a descrição de um produto na Cakto via PUT /product/{id}/."""
    prod_data = get_product(product_id)
    prod_data["description"] = description
    payload_json_escaped = json.dumps(json.dumps(prod_data, ensure_ascii=False))
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://api.cakto.com.br/api/product/{product_id}/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send({payload_json_escaped});
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def update_course_lesson(course_id: str, lesson_id: str, lesson_name: str, description_html: str, csrf_token: Optional[str] = None) -> Dict[str, Any]:
    """Atualiza uma aula/conteúdo dentro de um módulo na Área de Membros via PUT /members/{courseId}/lessons/{lessonId}/."""
    lesson_payload = {
        "nome": lesson_name,
        "descricao": description_html,
        "capa": "https://cdn-checkout.cakto.com.br/images/f148dc52-0f2f-4574-9e06-fd94eb55155a.png",
        "video": "",
        "files": [],
        "startIn": None,
        "startDays": None,
        "startDate": None
    }
    payload_json_escaped = json.dumps(json.dumps(lesson_payload, ensure_ascii=False))
    token_js = f"'{csrf_token}'" if csrf_token else "null"
    js = f"""
    let csrfToken = {token_js};
    if (!csrfToken) {{
      try {{
        const csrfXhr = new XMLHttpRequest();
        csrfXhr.open('GET', 'https://api.cakto.com.br/api/get-csrf-token/', false);
        csrfXhr.withCredentials = true;
        csrfXhr.send(null);
        if (csrfXhr.status === 200) {{
          csrfToken = JSON.parse(csrfXhr.responseText).csrfToken;
        }}
      }} catch (_) {{}}
    }}

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://api.cakto.com.br/api/members/{course_id}/lessons/{lesson_id}/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-cakto-account-id', '3684785');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    if (csrfToken) xhr.setRequestHeader('X-CSRFToken', csrfToken);
    xhr.withCredentials = true;
    xhr.send({payload_json_escaped});
    return {{ status: xhr.status, response: xhr.responseText }};
    """
    return run_cakto_js(js)

def batch_setup_member_area_upsell(
    target_pattern: str = "Simulação",
    checkout_url: str = "https://pay.cakto.com.br/36j8r8s_1240007",
    force_update_lessons: bool = True
) -> Dict[str, Any]:
    """Configura o módulo de Customização VIP em lote dentro de todas as áreas de membros dos produtos selecionados."""
    session = get_session_info()
    csrf_token = session.get("csrfToken")
    all_courses = list_courses()
    matched = [c for c in all_courses if target_pattern.lower() in c.get("nome", "").lower()]

    description_html = f"""<h2><strong>Eleve seu timbre a um nível profissional sob medida</strong></h2>
<p>Os arquivos (.nam e .am4data) que você adquiriu possuem curvas de referência de altíssima qualidade. Com a <strong>Customização VIP</strong>, calibramos o arquivo exclusivamente para a resposta em frequência e dinâmica do seu contrabaixo, tipo de corda e interface de áudio.</p>
<p><br></p>
<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:12px 16px;margin-bottom:16px;border-radius:4px;color:#856404;">
  <strong>⚠️ IMPORTANTE — ATENDIMENTO 100% AGENDADO:</strong><br>
  A calibração dos arquivos é um serviço personalizado e individual. O atendimento técnico para coleta das características do seu baixo e interface de áudio é realizado com <strong>dia e horário previamente agendados</strong> após a confirmação da compra.
</div>
<p><strong>Benefícios inclusos:</strong></p>
<ul>
  <li><strong>Atendimento Individual Agendado:</strong> suporte técnico exclusivo com dia e horário marcados para calibrar seu instrumento.</li>
  <li><strong>Calibração Fina Pós-Compra:</strong> ajuste de EQ, curva tonal e resposta dinâmica.</li>
  <li><strong>Otimização Dinâmica:</strong> regulagem para eliminar ruídos, cortes ou distorções no pedal/plugin NAM.</li>
  <li><strong>Entrega Personalizada:</strong> arquivo final gerado sob medida para o seu contrabaixo e interface.</li>
</ul>
<p><br></p>
<p><a href="{checkout_url}" target="_blank" style="display:inline-block;padding:14px 26px;background:#f47a2a;color:#ffffff;font-weight:bold;text-decoration:none;border-radius:8px;font-size:16px;">👉 CLIQUE AQUI PARA ADQUIRIR SUA CUSTOMIZAÇÃO POR R$ 40,00</a></p>"""

    results = {
        "total_courses": len(matched),
        "module_created": [],
        "lesson_created": [],
        "lesson_updated": [],
        "already_exists": [],
        "failed": []
    }

    for c in matched:
        cid = c.get("externalId") or c.get("id")
        cname = c.get("nome")
        try:
            course_data = get_course(cid).get("data", {})
            modulos = course_data.get("modulos", [])
            
            target_module = next((m for m in modulos if "Customização VIP" in (m.get("nome") or "")), None)
            
            if not target_module:
                time.sleep(0.4)
                m_res = add_course_module(cid, "🚀 Customização VIP Sob Medida", csrf_token=csrf_token)
                if m_res.get("status") not in (200, 201):
                    results["failed"].append({"course": cname, "error": f"Erro ao criar módulo: {m_res.get('response')}"})
                    continue
                results["module_created"].append(cname)
                # Recarrega modulos para obter o novo ID
                time.sleep(0.4)
                course_data = get_course(cid).get("data", {})
                modulos = course_data.get("modulos", [])
                target_module = next((m for m in modulos if "Customização VIP" in (m.get("nome") or "")), None)

            if not target_module:
                results["failed"].append({"course": cname, "error": "Módulo não localizado após criação"})
                continue

            module_id = target_module["id"]
            aulas = target_module.get("aulas", [])
            existing_lesson = next((a for a in aulas if "Calibração" in (a.get("nome") or "")), None)
            
            if existing_lesson:
                if force_update_lessons:
                    time.sleep(0.3)
                    u_res = update_course_lesson(
                        course_id=cid,
                        lesson_id=existing_lesson["id"],
                        lesson_name="🎯 Calibração & Customização VIP (Ajuste Sob Medida)",
                        description_html=description_html,
                        csrf_token=csrf_token
                    )
                    if u_res.get("status") in (200, 201):
                        results["lesson_updated"].append(cname)
                    else:
                        results["failed"].append({"course": cname, "error": f"Erro ao atualizar aula: {u_res.get('response')}"})
                else:
                    results["already_exists"].append(cname)
                continue

            time.sleep(0.4)
            l_res = add_course_lesson(
                course_id=cid,
                module_id=module_id,
                lesson_name="🎯 Calibração & Customização VIP (Ajuste Sob Medida)",
                description_html=description_html,
                csrf_token=csrf_token
            )
            if l_res.get("status") in (200, 201):
                results["lesson_created"].append(cname)
            else:
                results["failed"].append({"course": cname, "error": f"Erro ao criar aula: {l_res.get('response')}"})

        except Exception as e:
            results["failed"].append({"course": cname, "error": str(e)})

    return results

def main():
    parser = argparse.ArgumentParser(description="Cakto Bridge CLI - Batch Operations")
    subparsers = parser.add_subparsers(dest="command")

    # List products
    p_list = subparsers.add_parser("list", help="Listar produtos")
    p_list.add_argument("--query", "-q", default="", help="Filtrar por nome")

    # Product details
    p_get = subparsers.add_parser("get", help="Obter produto por ID")
    p_get.add_argument("product_id", help="UUID do produto")

    # Remove Bump in batch
    p_rm_bump = subparsers.add_parser("batch-remove-bump", help="Remover Order Bump em lote")
    p_rm_bump.add_argument("--bump-offer", default="36j8r8s", help="ID da oferta do bump")
    p_rm_bump.add_argument("--filter", default="Simulação", help="Filtro de produtos alvo")

    # Member Area Upsell in batch
    p_setup_ma = subparsers.add_parser("setup-member-upsell", help="Configurar módulo de Customização na Área de Membros em lote")
    p_setup_ma.add_argument("--filter", default="Simulação", help="Filtro de cursos alvo")
    p_setup_ma.add_argument("--checkout-url", default="https://pay.cakto.com.br/36j8r8s_1240007", help="URL do checkout")

    args = parser.parse_args()

    if args.command == "list":
        prods = list_products(args.query)
        print(f"Total encontrados: {len(prods)}")
        for p in prods:
            print(f"- [{p['id']}] {p['name']} (R$ {p.get('price')})")

    elif args.command == "get":
        prod = get_product(args.product_id)
        print(json.dumps(prod, indent=2, ensure_ascii=False))

    elif args.command == "batch-remove-bump":
        print(f"Removendo Order Bump (oferta {args.bump_offer}) de produtos com termo '{args.filter}'...")
        res = batch_remove_order_bump(bump_offer_id=args.bump_offer, target_pattern=args.filter)
        print(f"\nResumo da Remoção:")
        print(f"- Total elegíveis: {res['total_targets']}")
        print(f"- Removidos com sucesso: {len(res['removed'])}")
        print(f"- Não continham o bump: {len(res['not_found'])}")
        print(f"- Falhas: {len(res['failed'])}")

    elif args.command == "setup-member-upsell":
        print(f"Configurando módulo de Customização VIP na Área de Membros para cursos '{args.filter}'...")
        res = batch_setup_member_area_upsell(target_pattern=args.filter, checkout_url=args.checkout_url)
        print(f"\nResumo da Configuração na Área de Membros:")
        print(f"- Total de cursos: {res['total_courses']}")
        print(f"- Módulos criados: {len(res['module_created'])}")
        print(f"- Aulas criadas: {len(res['lesson_created'])}")
        print(f"- Aulas atualizadas (conteúdo agendado): {len(res['lesson_updated'])}")
        print(f"- Já continham o conteúdo: {len(res['already_exists'])}")
        print(f"- Falhas: {len(res['failed'])}")
        if res["failed"]:
            for f in res["failed"]:
                print(f"  x {f['course']}: {f.get('error')}")

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
