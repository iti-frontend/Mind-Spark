const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll(".error");

document.querySelector("button").addEventListener("click", function () {
  var userName = inputs[0].value;
  var email = inputs[1].value;
  var password = inputs[2].value;
  var re_Password = inputs[3].value;
  var nameRegex = /^[A-Za-z ]{3,}$/;
  var emailRegex = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  let isValid = true;
  // Get users array from localStorage
  var users = JSON.parse(localStorage.getItem("users")) || [];

  if (!nameRegex.test(userName.trim())) {
    inputs[0].style.border = "2px solid red";
    errors[0].innerText = "Please enter valid name";
    isValid = false;
  }

  if (!emailRegex.test(email)) {
    inputs[1].style.border = "2px solid red";
    errors[1].innerText = "Please enter valid E-mail";
    isValid = false;
  }
  // Check if email already exists in users array
  if (users.some(u => u.email === email)) {
    inputs[1].style.border = "2px solid red";
    errors[1].innerText = "This email is already Exist";
    isValid = false;
  }
  if (!passwordRegex.test(password)) {
    inputs[2].style.border = "2px solid red";
    errors[2].innerText = "Please enter valid password";
    isValid = false;
  }
  if (password !== re_Password || re_Password == "") {
    inputs[3].style.border = "2px solid red";
    errors[3].innerText = "The password doesn't match";
    isValid = false;
  }
  if (isValid) {
    var user = { "name": userName, "email": email, "password": password };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
  }
});

inputs.forEach((input, i) => {
  input.addEventListener("input", function () {
    if (
      (i === 0 && /^[A-Za-z ]{3,}$/.test(input.value.trim())) ||
      (i === 1 &&
        /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(input.value)) ||
      (i === 2 &&
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(input.value)) ||
      (i === 3 && input.value === inputs[2].value)
    ) {
      input.style.border = "";
      errors[i].innerText = "";
    }
  });
});
