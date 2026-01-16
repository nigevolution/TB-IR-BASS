async function getAccessToken() {
  const res = await fetch(
    `${process.env.URL}/.netlify/functions/cakto-auth`
  );

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Access token não retornado");
  }

  return data.access_token;
}

export async function handler() {
  try {
    // 1️⃣ Pega o access token
    const accessToken = await getAccessToken();

    // 2️⃣ Cria a oferta (checkout)
    const response = await fetch(
      "https://api.cakto.com.br/public_api/offers",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "TESTE CHECKOUT DINÂMICO",
          price: 1.00,
          paymentMethods: ["pix"]
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        data
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: err.message
      })
    };
  }
}
