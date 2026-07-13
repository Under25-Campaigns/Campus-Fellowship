const API_URL = "https://script.google.com/macros/library/d/1_g1J_UpWavCvFaTFehZnj5m-8HctWiZbqFZwasqW3thYiIYUcqw7WKdK/2";

async function api(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    return result;

  } catch (err) {
    return {
      success: false,
      message: "Unable to connect to the server."
    };
  }
}
