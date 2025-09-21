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
const form = document.getElementById("registerForm");
const errorMsg = document.querySelector(".error-message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append(
    "username",
    document.getElementById("register-username").value
  );
  formData.append("email", document.getElementById("register-email").value);
  formData.append(
    "password",
    document.getElementById("register-password").value
  );
  formData.append(
    "password_confirmation",
    document.getElementById("register-confirm-password").value
  );
  const profileFile = document.getElementById("input-file").files[0];
  if (profileFile) {
    formData.append("avatar", profileFile);
  }
  [
    "register-username",
    "register-email",
    "register-password",
    "register-confirm-password",
  ].forEach((id) => {
    document.getElementById(`${id}-error`).innerHTML = "";
  });
  try {
    const response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errData = await response.json();

      if (errData.errors) {
        for (let field in errData.errors) {
          const errorDiv = document.getElementById(`register-${field}-error`);
          if (errorDiv) {
            errorDiv.innerHTML = errData.errors[field].join("<br>");
          }
        }
      } else if (errData.message) {
        alert(errData.message);
      }
      return;
    }
    const data = await response.json();
    console.log("Form submitted successfully:", data);
  } catch (error) {
    console.log(error);
  }
});
function test() {
  document.getElementById("register-username").value = "erbe";
  document.getElementById("register-email").value = "erbe@gmail.com";
  document.getElementById("register-password").value = "erbe";
  document.getElementById("register-confirm-password").value = "erbe";
  form.requestSubmit();
}

//test();
