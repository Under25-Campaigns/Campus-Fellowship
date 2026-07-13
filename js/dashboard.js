let applications = [];

window.onload = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        location.href = "index.html";
        return;
    }

    const result = await api({
        action: "applications",
        token: token
    });

    console.log(result);

    if (!result.success) {
        alert("Session expired.");
        localStorage.clear();
        location.href = "index.html";
        return;
    }

    document.getElementById("welcome").textContent =
        "Welcome, " + result.user.name;

    document.getElementById("college").textContent =
        result.user.college;

    document.getElementById("count").textContent =
        result.count + " Applications";

    applications = result.applications;

    renderCards(applications);
    document.getElementById("search").addEventListener("input", searchApplications);

};
function searchApplications() {

    const query = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    if (query === "") {
        renderCards(applications);
        return;
    }

    const filtered = applications.filter(app => {

    const searchable = [
        app.fullName,
        app.contactNumber,
        app.course,
        app.preference1,
        app.preference2
    ]
    .filter(Boolean)
    .join(" ")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .toLowerCase();

    return searchable.includes(
        query.replace(/[^\p{L}\p{N}\s]/gu, "")
    );

});
    renderCards(filtered);

}

function renderCards(list) {

    const container = document.getElementById("cards");

    container.innerHTML = "";

    list.forEach(app => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div class="summary">

                <h2>${app.fullName}</h2>

                <p>${app.course} • Year ${app.year}</p>

                <div class="contact-row">
    <span>${app.contactNumber}</span>

    <a
        class="whatsapp-btn"
        href="https://wa.me/91${String(app.contactNumber).replace(/\D/g,'')}"
        target="_blank"
    >
        💬 WhatsApp
    </a>
</div>

                <div class="tags">
                    <span>${app.preference1}</span>
                    <span>${app.preference2}</span>
                </div>

            </div>

            <div class="details">

                <h4>Club Experience</h4>
                <p>${app.clubExperience || ""}</p>

                <h4>Superpower</h4>
                <p>${app.superpower || ""}</p>

                <h4>Event Idea</h4>
                <p>${app.eventIdea || ""}</p>

                <h4>New Student</h4>
                <p>${app.newStudent || ""}</p>

                <h4>Belief</h4>
                <p>${app.belief || ""}</p>

                <h4>Joke</h4>
                <p>${app.joke || ""}</p>
                <h4>Portfolio</h4>

<p>${formatPortfolio(app.portfolio)}</p>

            </div>
        `;

        card.onclick = () => {
            card.classList.toggle("open");
        };

        container.appendChild(card);

    });
}
function formatPortfolio(value) {

    if (!value || value.trim() === "" || value === "None") {
        return "—";
    }

    let url = value.trim();

    // If it looks like a website but has no protocol
    if (
        url.match(/^(www\.|instagram\.com|linkedin\.com|github\.com)/i)
    ) {
        url = "https://" + url;
    }

    // If it's a proper URL
    if (/^https?:\/\//i.test(url)) {

        return `<a href="${url}" target="_blank">${value}</a>`;

    }

    // Otherwise just show plain text

    return value;

}

document.getElementById("logoutBtn").addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    try {
        await api({
            action: "logout",
            token: token
        });
    } catch (e) {
        // Ignore API errors on logout
    }

    localStorage.clear();

    window.location.href = "index.html";

});
