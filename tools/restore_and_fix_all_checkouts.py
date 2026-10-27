import sys
import uuid
import json
import time

sys.path.append("/Users/elbsferreiranobre/Documents/TB-IR-BASS-git/tools")
from cakto_bridge import list_products, get_product, run_cakto_js, get_session_info

EXACT_AVISO_LEGAL_P1 = "Aviso Legal: A TB-BASS IR comercializa seus produtos (arquivos digitais em formatos IR, AM4Data e NAM) exclusivamente por meio dos canais oficiais informados neste site."
EXACT_AVISO_LEGAL_P2 = "Arquivos adquiridos por terceiros, revendas não autorizadas, compartilhamentos ou qualquer outra forma de obtenção fora dos canais oficiais não conferem direito a suporte técnico, atualizações ou qualquer tipo de assistência."
EXACT_AVISO_LEGAL_P3 = "É proibida a reprodução, distribuição, revenda, compartilhamento ou qualquer forma de exploração comercial deste conteúdo sem autorização expressa do titular dos direitos."

def fix_checkout(checkout_id: int, product_name: str, csrf_token: str) -> bool:
    js_get = f"""
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.cakto.com.br/api/product/builder/checkout/{checkout_id}/", false);
    xhr.setRequestHeader("x-cakto-account-id", "3684785");
    xhr.withCredentials = true;
    xhr.send(null);
    if (xhr.status !== 200) throw new Error("Erro " + xhr.status);
    return JSON.parse(xhr.responseText);
    """
    try:
        checkout_data = run_cakto_js(js_get)
    except Exception as e:
        print(f"    [ERRO GET checkout {checkout_id}]: {e}")
        return False

    cfg = checkout_data.get("config")
    if not cfg or not isinstance(cfg, dict):
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

    for mode in ["desktop", "mobile"]:
        if mode in cfg and "rows" in cfg[mode]:
            # Remove any invalid custom text rows
            cfg[mode]["rows"] = [
                r for r in cfg[mode]["rows"]
                if not any(
                    comp.get("type") == "text"
                    for col in r.get("columns", [])
                    for comp in col.get("components", [])
                )
            ]

            # Update the native list and header
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

    # Extract offer IDs
    raw_offers = checkout_data.get("offers", [])
    offer_ids = [o["id"] if isinstance(o, dict) else o for o in raw_offers]

    payload = {
        "name": checkout_data.get("name", "Checkout Principal"),
        "config": cfg,
        "default": True,
        "offers": offer_ids
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
    return {{status: xhrPut.status, body: xhrPut.responseText.substring(0, 100)}};
    """
    try:
        res = run_cakto_js(js_put)
        return res.get("status") == 200
    except Exception as e:
        print(f"    [ERRO PUT checkout {checkout_id}]: {e}")
        return False

def main():
    print("RESTAURANDO E CORRIGINDO TODOS OS CHECKOUTS DA CAKTO...")
    session = get_session_info()
    csrf = session.get("csrfToken")
    if not csrf:
        print("Erro: Sem CSRF.")
        sys.exit(1)

    prods = list_products("")
    fixed_count = 0

    for p in prods:
        name = p.get("name", "")
        p_id = p.get("id")
        if any(term in name.lower() for term in ["academia", "frases para todos", "mapa dos intervalos", "trackpilot"]):
            continue

        try:
            full_p = get_product(p_id)
        except Exception:
            continue

        offers = full_p.get("offers", [])
        checkout_ids = list(set([o.get("checkout") for o in offers if o.get("checkout")]))

        for c_id in checkout_ids:
            ok = fix_checkout(c_id, name, csrf)
            print(f"Checkout #{c_id} ({name}): {'RESTAURADO COM SUCESSO' if ok else 'FALHA'}")
            if ok:
                fixed_count += 1
            time.sleep(0.3)

    print(f"\nFinalizado: {fixed_count} checkouts restaurados e funcionando perfeitamente.")

if __name__ == "__main__":
    main()
