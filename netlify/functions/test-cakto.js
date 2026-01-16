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
          name: "Checkout Dinâmico Teste",
          price: 1.00,
          paymentMethods: ["pix"]
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
