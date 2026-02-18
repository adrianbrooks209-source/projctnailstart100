// ========================
// app.js - Main Logic
// ========================

// Current logged in user
let currentUser = null;

// ========================
// Helper Functions
// ========================

function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) target.classList.add("active");
}

// ========================
// Login & Signup
// ========================

async function handleLogin() {
    const userId = document.getElementById("loginUserId").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (!userId || !password) {
        alert("Please enter User ID and Password.");
        return;
    }

    try {
        // Placeholder: Replace with real API call later
        // const response = await api.login(userId, password);
        currentUser = userId;
        document.getElementById("homeUsername").textContent = currentUser;
        showScreen("homeScreen");
    } catch (err) {
        alert("Login failed: " + err.message);
    }
}

async function handleSignup() {
    const userId = document.getElementById("signupUserId").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    if (!userId || !password) {
        alert("Please enter User ID and Password.");
        return;
    }

    try {
        // Placeholder: Replace with real API call later
        // await api.signup(userId, password);
        alert("Signup successful! Please log in.");
        showScreen("loginScreen");
    } catch (err) {
        alert("Signup failed: " + err.message);
    }
}

async function handleMemberSignup() {
    const userId = document.getElementById("memberSignupUserId").value.trim();
    const password = document.getElementById("memberSignupPassword").value.trim();
    if (!userId || !password) {
        alert("Please enter User ID and Password.");
        return;
    }

    try {
        // Placeholder: Replace with real API call later
        // await api.signup(userId, password, true);
        alert("Member signup successful!");
        showScreen("loginScreen");
    } catch (err) {
        alert("Member signup failed: " + err.message);
    }
}

function handleLogout() {
    currentUser = null;
    showScreen("loginScreen");
}

// ========================
// Navigation
// ========================

function navigateTo(screenKey) {
    switch(screenKey) {
        case "home": showScreen("homeScreen"); break;
        case "orders": showScreen("ordersScreen"); break;
        case "glam": showScreen("glamScreen"); break;
        case "allOrders": showScreen("allOrdersScreen"); break;
        case "notifications": showScreen("notificationsScreen"); break;
        case "more": showScreen("moreScreen"); break;
    }
    setActiveNav(screenKey);
}

function setActiveNav(screenKey) {
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    navItems.forEach(item => item.classList.remove("active"));
    switch(screenKey) {
        case "home": navItems[0].classList.add("active"); break;
        case "orders": navItems[1].classList.add("active"); break;
        case "glam": navItems[2].classList.add("active"); break;
        case "allOrders": navItems[3].classList.add("active"); break;
        case "notifications": navItems[4].classList.add("active"); break;
        case "more": navItems[5].classList.add("active"); break;
    }
}

// ========================
// Notes
// ========================

const notesTextarea = document.getElementById("notesTextarea");
notesTextarea?.addEventListener("blur", () => {
    if (!currentUser) return;
    const notes = notesTextarea.value;
    console.log("Saving notes for", currentUser, notes);
    // Placeholder: Replace with API save
    // await api.saveNotes(currentUser, notes);
});

// ========================
// Modals
// ========================

function showItemsModal() {
    document.getElementById("itemsModal").classList.add("active");
}

function closeItemsModal() {
    document.getElementById("itemsModal").classList.remove("active");
}

function showServicesModal() {
    document.getElementById("servicesModal").classList.add("active");
}

function closeServicesModal() {
    document.getElementById("servicesModal").classList.remove("active");
}

function showChangePasswordModal() {
    document.getElementById("changePasswordModal").classList.add("active");
}

function closeChangePasswordModal() {
    document.getElementById("changePasswordModal").classList.remove("active");
}

function showAnnouncementModal() {
    document.getElementById("announcementModal").classList.add("active");
}

function closeAnnouncementModal() {
    document.getElementById("announcementModal").classList.remove("active");
}

// ========================
// Other Actions
// ========================

function handleChangePassword() {
    const current = document.getElementById("currentPassword").value;
    const newPass = document.getElementById("newPassword").value;
    if (!current || !newPass) return alert("Enter both fields");
    alert("Password changed successfully! (placeholder)");
    closeChangePasswordModal();
}

function handleMakeAnnouncement() {
    const from = document.getElementById("announcementFrom").value;
    const message = document.getElementById("announcementMessage").value;
    if (!message) return alert("Enter a message");
    alert(`Announcement posted!\nFrom: ${from}\nMessage: ${message}`);
    closeAnnouncementModal();
}

// ========================
// Form Submissions
// ========================

document.getElementById("ordersForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Order submitted! (placeholder)");
});

document.getElementById("glamForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Glam appointment submitted! (placeholder)");
});

// ========================
// Initialize
// ========================

showScreen("loginScreen");