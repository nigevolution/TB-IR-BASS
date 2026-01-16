export async function handler() {
  try {
    // Verificação defensiva das variáveis
    if (!process.env.CAKTO_CLIENT_ID || !process.env.CAKTO_CLIENT_SECRET) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Variáveis de ambiente não configuradas",
          hasClientId: !!process.env.CAKTO_CLIENT_ID,
          hasClientSecret: !!process.env.CAKTO_CLIENT_SECRET
        })
      };
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.CAKTO_CLIENT_ID);
    params.append("client_secret", process.env.CAKTO_CLIENT_SECRET);

    const response = await fetch("https://api.cakto.com.br/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const text = await response.text();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Erro ao obter token da Cakto",
          response: text
        })
      };
    }

    const data = JSON.parse(text);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
