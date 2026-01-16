export async function handler() {
  try {
    const response = await fetch(
      "https://api.cakto.com.br/public_api/offers",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CAKTO_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "TESTE CHECKOUT DINÂMICO",
          price: 1.00,
          description: "Checkout de teste via API",
          paymentMethods: ["pix"]
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        data
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: err.message
      })
    };
  }
}
