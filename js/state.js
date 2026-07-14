let applications = [];
let filteredApplications = [];
let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

function saveBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
