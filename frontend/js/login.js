document.getElementById("loginBtn").addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const error = document.getElementById("error");
    error.textContent = "";

    if (!username || !password) {
        error.textContent = "Please enter your username and password.";
        return;
    }

    const result = await api({
        action: "login",
        username,
        password
    });

    if (!result.success) {
        error.textContent = result.message || "Login failed.";
        return;
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    window.location.href = "dashboard.html";

});
