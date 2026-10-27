import sys
import uuid
import json
import time

sys.path.append("/Users/elbsferreiranobre/Documents/TB-IR-BASS-git/tools")
from cakto_bridge import list_products, get_product, run_cakto_js, get_session_info

EXACT_AVISO_LEGAL_P1 = "Aviso Legal: A TB-BASS IR comercializa seus produtos (arquivos digitais nos formatos IR, AM4Data e NAM) exclusivamente por meio dos canais oficiais informados neste site."
EXACT_AVISO_LEGAL_P2 = "Arquivos adquiridos por terceiros, revendas não autorizadas, compartilhamentos ou qualquer outra forma de obtenção fora dos canais oficiais não conferem direito a suporte técnico, atualizações ou qualquer tipo de assistência."
EXACT_AVISO_LEGAL_P3 = "É proibida a reprodução, distribuição, revenda, compartilhamento ou qualquer forma de exploração comercial deste conteúdo sem autorização expressa do titular dos direitos."

def update_checkout_config(checkout_id: int, product_name: str, csrf_token: str) -> bool:
    """Atualiza o Checkout Builder na Cakto com o Aviso Legal exato solicitado."""
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

    new_list_items = [
        {"id": str(uuid.uuid4()), "text": f"TB-BASS IR — {clean_name}"},
        {"id": str(uuid.uuid4()), "text": "Formatos Inclusos: IR (.WAV 24-bit 44.1/48kHz), AM4Data (Tank-B) e NAM"},
        {"id": str(uuid.uuid4()), "text": EXACT_AVISO_LEGAL_P1},
        {"id": str(uuid.uuid4()), "text": EXACT_AVISO_LEGAL_P2},
        {"id": str(uuid.uuid4()), "text": EXACT_AVISO_LEGAL_P3},
        {"id": str(uuid.uuid4()), "text": "Acesso imediato no e-mail cadastrado + Suporte pós-venda TB-BASS"}
    ]

    html_legal_box = (
        f"<div style='border:1px solid #333;background:#0d0d0d;border-radius:10px;padding:14px;margin-top:16px;font-size:12px;line-height:1.6;color:#999;'>"
        f"<p style='margin:0 0 6px 0;'><strong style='color:#ff8a24;'>Aviso Legal:</strong> A TB-BASS IR comercializa seus produtos (arquivos digitais em formatos <strong>IR</strong>, <strong>AM4Data</strong> e <strong>NAM</strong>) exclusivamente por meio dos canais oficiais informados neste site.</p>"
        f"<p style='margin:0 0 6px 0;'>Arquivos adquiridos por terceiros, revendas não autorizadas, compartilhamentos ou qualquer outra forma de obtenção fora dos canais oficiais <strong>não conferem direito a suporte técnico</strong>, atualizações ou qualquer tipo de assistência.</p>"
        f"<p style='margin:0;'>É proibida a reprodução, distribuição, revenda, compartilhamento ou qualquer forma de exploração comercial deste conteúdo sem autorização expressa do titular dos direitos.</p>"
        f"</div>"
    )

    legal_text_comp = {
        "id": str(uuid.uuid4()),
        "type": "text",
        "attributes": {
            "content": html_legal_box,
            "alignment": "left",
            "textColor": "#888888",
            "fontSize": 12
        }
    }

    legal_row = {
        "id": str(uuid.uuid4()),
        "type": "row",
        "layout": [12],
        "columns": [
            {
                "id": str(uuid.uuid4()),
                "type": "column",
                "components": [legal_text_comp]
            }
        ]
    }

    for mode in ["desktop", "mobile"]:
        if mode in cfg and "rows" in cfg[mode]:
            # Remove any previous legal text rows if present to prevent duplication
            cfg[mode]["rows"] = [
                r for r in cfg[mode]["rows"]
                if not any(
                    comp.get("type") == "text" and "Aviso Legal" in str(comp.get("attributes", {}).get("content", ""))
                    for col in r.get("columns", [])
                    for comp in col.get("components", [])
                )
            ]

            for row in cfg[mode]["rows"]:
                for col in row.get("columns", []):
                    for comp in col.get("components", []):
                        c_type = comp.get("type")
                        if c_type == "list":
                            comp["attributes"]["title"] = "O que você recebe & Aviso Legal"
                            comp["attributes"]["items"] = new_list_items
                        elif c_type == "header":
                            comp["attributes"]["showSubtitle"] = True
                            comp["attributes"]["subtitleText"] = "Conteúdo Digital: IR (.WAV), AM4Data (Tank-B) e NAM. Envio imediato no e-mail."

            # Append the dedicated legal box row at the bottom of the checkout
            cfg[mode]["rows"].append(legal_row)

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
    print("Atualizando Aviso Legal exato (IR, AM4Data, NAM) nos Checkouts da Cakto...")
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

        print(f"\nProcessando produto: {name} (ID: {p_id})")
        desc_ok = update_product_basic_desc(p_id, csrf)
        print(f"  - Descrição do produto: {'OK' if desc_ok else 'FALHA'}")

        for c_id in checkout_ids:
            ck_ok = update_checkout_config(c_id, name, csrf)
            print(f"  - Checkout #{c_id}: {'OK' if ck_ok else 'FALHA'}")
            if ck_ok:
                total_checkouts += 1
            time.sleep(0.3)

        total_processed += 1
        time.sleep(0.3)

    print(f"\nAtualização concluída:")
    print(f"- Total de produtos processados: {total_processed}")
    print(f"- Total de checkouts configurados com o Aviso Legal exato: {total_checkouts}")

if __name__ == "__main__":
    main()
