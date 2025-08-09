console.log(window.localStorage);
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll(".error");
const keepLoginCheckbox = document.getElementById("keep_login"); // جلب التشيك بوكس
let isValid = true;

document.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault(); // منع الإرسال الافتراضي للفورم

    var email = inputs[0].value;
    var password = inputs[1].value;
    var emailRegex = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    var users = JSON.parse(window.localStorage.getItem("users")) || [];

    // Reset validation
    isValid = true;

    const user = users.find(u => u.email === email);

    if (!emailRegex.test(email)) {
        inputs[0].style.border = "2px solid red";
        errors[0].innerHTML = "Invalid Email";
        isValid = false;

    } else if (!user) {
        inputs[0].style.border = "2px solid red";
        errors[0].innerHTML = "This email does not exist";
        isValid = false;

    } else if (user.password !== password) {
        inputs[1].style.border = "2px solid red";
        errors[1].innerHTML = "Invalid Password";
        isValid = false;
    }

    if (isValid) {
        const userData = { email, password };

        if (keepLoginCheckbox.checked) {
            // تخزين دائم
            localStorage.setItem("loggedInUser", JSON.stringify(userData));
            sessionStorage.removeItem("loggedInUser")
            console.log("تم الحفظ في localStorage");
        } else {
            // تخزين مؤقت
            sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
            localStorage.removeItem("loggedInUser")
            console.log("تم الحفظ في sessionStorage");
        }

        window.location.href = "index.html";
    }
});

inputs.forEach((input, i) => {
    input.addEventListener("input", function () {
        if (
            (i === 0 && /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(input.value)) ||
            (i === 1 && input.value.trim().length > 0)
        ) {
            input.style.border = "";
            errors[i].innerText = "";
        }
    });
});