const body = document.body;
const modeToggleSun = document.getElementById("mode-toggle-sun");
const modeToggleMoon = document.getElementById("mode-toggle-moon");

function applyMode(isDark) {
    if (isDark) {
        body.classList.add("dark-mode");
        modeToggleSun.classList.add("display-n");
        modeToggleMoon.classList.remove("display-n");
    } else {
        body.classList.remove("dark-mode");
        modeToggleSun.classList.remove("display-n");
        modeToggleMoon.classList.add("display-n");
    }
}

function toggleMode() {
    const isDark = body.classList.toggle("dark-mode");
    modeToggleSun.classList.toggle("display-n");
    modeToggleMoon.classList.toggle("display-n");
    localStorage.setItem("darkMode", isDark ? "on" : "off");
}

window.addEventListener("DOMContentLoaded", () => {
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode === "on";
    applyMode(isDark);
});

modeToggleSun.addEventListener("click", toggleMode);
modeToggleMoon.addEventListener("click", toggleMode);
