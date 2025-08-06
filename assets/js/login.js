
console.log(window.localStorage);
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll(".error");
let isValid = true;

document.querySelector("button").addEventListener("click", function () {
    var email = inputs[0].value;
    var password = inputs[1].value;
    var emailRegex = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    var users = JSON.parse(window.localStorage.getItem("users")) || [];
    let isValid = true;
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
        open("./../index.html", "_self");
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
