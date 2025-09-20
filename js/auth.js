let profilePic = document.querySelector(".profile-image");
let inputFile = document.querySelector("#input-file");
let profilePicStyle = getComputedStyle(profilePic);

inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
  profilePic.style.width = "100px";
  profilePic.style.height = "100px";
  profilePic.style.objectFit = "cover";
  profilePic.style.borderRadius = "50%";
};

document.querySelector(".remove-img").addEventListener("click", function () {
  profilePic.src = "icons/camera.png";
  profilePic.style.width = "20px";
  profilePic.style.height = "20px";
});

document.querySelectorAll(".eye-icon").forEach((icon, index) => {
  icon.onclick = () => {
    let input =
      0 === index
        ? document.querySelector("#register-password")
        : index === 1
        ? document.querySelector("#register-confirm-password")
        : document.querySelector("#login-password");
    input.type = input.type === "password" ? "text" : "password";
  };
});

document.querySelector(".targetLogIn").onclick = function () {
  document.querySelector(".log-in-text").innerHTML = "Registration";
  document.querySelector(".registration-container").style.display = "none";
  document.querySelector(".login-container").style.display = "block";
  document.querySelector(".auth-text").innerHTML = "Log in";
  document.querySelector(".img-selection").style.display = "none";
};
document.querySelector(".targetRegister").onclick = function () {
  document.querySelector(".log-in-text").innerHTML = "Log in";
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".registration-container").style.display = "flex";
  document.querySelector(".auth-text").innerHTML = "Register";
  document.querySelector(".img-selection").style.display = "flex";
};
// const form = document.getElementById("register-form");
// const errorMsg = document.getElementById("error-msg");

// form.addEventListener("submit", function (e) {
//   e.preventDefault(); // formun avtomatik submit etməsini dayandırır

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   let errors = [];

//   // Email yoxlaması: @gmail.com ilə bitməlidir
//   if (!email.endsWith("@gmail.com")) {
//     errors.push("Email @gmail.com formatında olmalıdır.");
//   }

//   // Password yoxlaması: minimum 3 simvol
//   if (password.length < 3) {
//     errors.push("Şifrə ən az 3 simvol olmalıdır.");
//   }

//   if (errors.length > 0) {
//     errorMsg.innerHTML = errors.join("<br>");
//     return; // validation xətası varsa, API-ə göndərmə
//   }

//   // Əgər validation keçdi, burada API-ə göndərə bilərsən
//   errorMsg.innerHTML = "";
//   console.log("Form uğurla keçdi:", { email, password });

//   // fetch('/register', { ... }) və s. burada ola bilər
// });
