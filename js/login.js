// Toggle Password Visibility

document.getElementById("togglePassword").addEventListener("click", () => {

    const password = document.getElementById("password");
    const button = document.getElementById("togglePassword");

    if (password.type === "password") {

        password.type = "text";
        button.textContent = "🙈";

    } else {

        password.type = "password";
        button.textContent = "👁️";

    }

});

// Login Function

async function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const error = document.getElementById("error");
    const loginBtn = document.getElementById("loginBtn");

    error.textContent = "";

    if (!username || !password) {
        error.textContent = "Please enter your username and password.";
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {

        const result = await api({
            action: "login",
            username,
            password
        });

        if (!result.success) {

            error.textContent = result.message || "Login failed.";

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";

            return;
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        window.location.href = "dashboard.html";

    } catch (err) {

        error.textContent = "Unable to connect to the server.";

        loginBtn.disabled = false;
        loginBtn.textContent = "Login";

    }

}

// Login Button

document.getElementById("loginBtn").addEventListener("click", login);

// Press Enter to Login

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        login();
    }

});
