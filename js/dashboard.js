let bookmarks=
JSON.parse(
localStorage.getItem("bookmarks")
||"[]"
);
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
    document.getElementById("loader").style.display="none";
document.getElementById("app").style.display="block";
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
        const bookmarkId = `${app.fullName}|${app.contactNumber}`;
const isBookmarked = bookmarks.includes(bookmarkId);

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div class="summary">

               <div class="card-header">

    <h2>${app.fullName}</h2>

    <span class="bookmark">

        ${isBookmarked ? "⭐" : "☆"}

    </span>

</div>

                <p>${app.course} • Year ${app.year}</p>

                <div class="contact-row">
    <span>${app.contactNumber}</span>

    <a
        class="whatsapp-btn"
        href="https://wa.me/91${String(app.contactNumber).replace(/\D/g,'')}"
        target="_blank"
    >
        <img
class="wa-icon"
src="assets/Whatsapp Icon.png">
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

<div class="portfolio">
    ${formatPortfolio(app.portfolio)}
</div>

            </div>
        `;

const star = card.querySelector(".bookmark");

star.onclick = (e) => {

    e.stopPropagation();

    if (bookmarks.includes(bookmarkId)) {

        bookmarks = bookmarks.filter(id => id !== bookmarkId);

    } else {

        bookmarks.push(bookmarkId);

    }

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );

    star.textContent =
        bookmarks.includes(bookmarkId)
            ? "⭐"
            : "☆";

};

card.onclick = () => {

    document
        .querySelectorAll(".card.open")
        .forEach(c => {

            if (c !== card) {
                c.classList.remove("open");
            }

        });

    card.classList.toggle("open");

};
        container.appendChild(card);

    });
}
function formatPortfolio(value) {

    if (!value || value.trim() === "" || value === "None") {
        return "—";
    }

    const text = value.trim();

    // Find the first URL-like string
    const match = text.match(/((https?:\/\/|www\.|instagram\.com|linkedin\.com|github\.com)\S*)/i);

    // No URL found
    if (!match) {
        return text;
    }

    let url = match[0];

    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    const linkedPart = `<a href="${url}" target="_blank">${match[0]}</a>`;

    // Replace only the URL with the hyperlink
    return text.replace(match[0], linkedPart);

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
