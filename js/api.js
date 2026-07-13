const API_URL = "https://script.google.com/macros/s/AKfycbzmVlKTYZGo3WPJIfQOeW89ZaO5Ps6an7y8U5BXAtbCtltk6iqWT_-zp2szIt1L8zP3/exec";

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
