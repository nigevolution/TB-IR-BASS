import sys
import uuid
import json
import time
from typing import Dict, Any, List

sys.path.append("/Users/elbsferreiranobre/Documents/TB-IR-BASS-git/tools")
from cakto_bridge import list_products, get_product, run_cakto_js, get_session_info

def update_checkout_config(checkout_id: int, product_name: str, csrf_token: str) -> bool:
    """Atualiza o Checkout Builder na Cakto incluindo o Aviso Legal e formatos IR, AM4Data e NAM."""
    js_get = f"""
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.cakto.com.br/api/product/builder/checkout/{checkout_id}/", false);
    xhr.setRequestHeader("x-cakto-account-id", "3684785");
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error("Erro ao carregar checkout " + xhr.status);
    return JSON.parse(xhr.responseText);
    """
    try:
        checkout_data = run_cakto_js(js_get)
    except Exception as e:
        print(f"    [ERRO GET checkout {checkout_id}]: {e}")
        return False

    cfg = checkout_data.get("config")
    if not cfg or not isinstance(cfg, dict):
        print(f"    [AVISO: checkout {checkout_id} usa layout padrão da Cakto sem builder customizado]")
        return True

    clean_name = product_name.replace("Simulação ", "").strip()

    new_items = [
        {"id": str(uuid.uuid4()), "text": f"TB-BASS IR — {clean_name}"},
        {"id": str(uuid.uuid4()), "text": "Formatos Inclusos: IR (.WAV 24-bit 44.1/48kHz), AM4Data (Tank-B) e NAM"},
        {"id": str(uuid.uuid4()), "text": "Aviso Legal: Produto 100% digital para pedaleiras com IR Loader / NAM. Não é instrumento físico."},
        {"id": str(uuid.uuid4()), "text": "Recomendação: Para máxima fidelidade sonora dos vídeos, use cordas novas ou semi-novas."},
        {"id": str(uuid.uuid4()), "text": "Acesso imediato no e-mail cadastrado + Suporte pós-venda TB-BASS"}
    ]

    has_list = False
    for mode in ["desktop", "mobile"]:
        if mode in cfg and "rows" in cfg[mode]:
            for row in cfg[mode]["rows"]:
                for col in row.get("columns", []):
                    for comp in col.get("components", []):
                        c_type = comp.get("type")
                        if c_type == "list":
                            comp["attributes"]["title"] = "O que você recebe & Aviso Legal"
                            comp["attributes"]["items"] = new_items
                            has_list = True
                        elif c_type == "header":
                            comp["attributes"]["showSubtitle"] = True
                            comp["attributes"]["subtitleText"] = "Conteúdo Digital: IR (.WAV), AM4Data (Tank-B) e NAM. Envio imediato no e-mail."

    payload = {
        "name": checkout_data.get("name", "Checkout Principal"),
        "config": cfg
    }
    payload_json = json.dumps(payload)

    js_put = f"""
    const xhrPut = new XMLHttpRequest();
    xhrPut.open("PUT", "https://api.cakto.com.br/api/product/builder/checkout/{checkout_id}/", false);
    xhrPut.setRequestHeader("Content-Type", "application/json");
    xhrPut.setRequestHeader("x-cakto-account-id", "3684785");
    xhrPut.setRequestHeader("X-CSRFToken", "{csrf_token}");
    xhrPut.withCredentials = true;
    xhrPut.send({json.dumps(payload_json)});
    return {{status: xhrPut.status, body: xhrPut.responseText.substring(0, 150)}};
    """
    try:
        res = run_cakto_js(js_put)
        if res.get("status") == 200:
            return True
        else:
            print(f"    [FALHA PUT checkout {checkout_id}]: Status {res.get('status')} - {res.get('body')}")
            return False
    except Exception as e:
        print(f"    [ERRO PUT checkout {checkout_id}]: {e}")
        return False

def update_product_basic_desc(product_id: str, csrf_token: str) -> bool:
    """Atualiza a descrição básica do produto na Cakto."""
    short_desc = "Arquivos digitais: IR (WAV 24-bit), AM4Data (Tank-B) e NAM. Não é instrumento físico."
    js = f"""
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.cakto.com.br/api/product/{product_id}/", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-cakto-account-id", "3684785");
    xhr.setRequestHeader("X-CSRFToken", "{csrf_token}");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify({{"description": "{short_desc}"}}));
    return {{status: xhr.status}};
    """
    try:
        res = run_cakto_js(js)
        return res.get("status") == 200
    except Exception as e:
        print(f"    [ERRO PUT produto {product_id}]: {e}")
        return False

def main():
    print("Iniciando atualização em lote de Aviso Legal (IR, AM4Data, NAM) nos Checkouts da Cakto...")
    session = get_session_info()
    csrf = session.get("csrfToken")
    if not csrf:
        print("Erro: Não foi possível obter o token CSRF da Cakto.")
        sys.exit(1)

    prods = list_products("")
    total_processed = 0
    total_checkouts = 0

    for p in prods:
        name = p.get("name", "")
        p_id = p.get("id")
        if any(term in name.lower() for term in ["academia", "frases para todos", "mapa dos intervalos", "trackpilot"]):
            continue

        try:
            full_p = get_product(p_id)
        except Exception as e:
            print(f"Erro ao obter produto {name} ({p_id}): {e}")
            continue

        offers = full_p.get("offers", [])
        checkout_ids = list(set([o.get("checkout") for o in offers if o.get("checkout")]))

        print(f"\nAtualizando produto: {name} (ID: {p_id})")
        # 1. Update basic description
        desc_ok = update_product_basic_desc(p_id, csrf)
        print(f"  - Descrição básica do produto atualizada: {'OK' if desc_ok else 'FALHA'}")

        # 2. Update all checkouts
        for c_id in checkout_ids:
            ck_ok = update_checkout_config(c_id, name, csrf)
            print(f"  - Checkout #{c_id} ({name}): {'OK' if ck_ok else 'FALHA'}")
            if ck_ok:
                total_checkouts += 1
            time.sleep(0.3)

        total_processed += 1
        time.sleep(0.4)

    print(f"\nConcluído com sucesso:")
    print(f"- Total de produtos atualizados: {total_processed}")
    print(f"- Total de checkouts configurados com Aviso Legal: {total_checkouts}")

if __name__ == "__main__":
    main()
