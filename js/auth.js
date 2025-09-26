function setupAuthForm() {
  const profilePic = document.querySelector(".profile-image");
  const inputFile = document.querySelector("#input-file");
  const removeImgBtn = document.querySelector(".remove-img");
  const eyeIcons = document.querySelectorAll(".eye-icon");
  const targetLogIn = document.querySelector(".targetLogIn");
  const targetRegister = document.querySelector(".targetRegister");

  inputFile.onchange = function () {
    if (inputFile.files[0]) {
      profilePic.src = URL.createObjectURL(inputFile.files[0]);
      profilePic.style.width = "100px";
      profilePic.style.height = "100px";
      profilePic.style.objectFit = "cover";
      profilePic.style.borderRadius = "50%";
    }
  };

  removeImgBtn.addEventListener("click", function () {
    profilePic.src = "icons/camera.png";
    profilePic.style.width = "20px";
    profilePic.style.height = "20px";
  });

  // --- Password toggle ---
  eyeIcons.forEach((icon, index) => {
    icon.onclick = () => {
      let input =
        index === 0
          ? document.querySelector("#register-password")
          : index === 1
          ? document.querySelector("#register-confirm-password")
          : document.querySelector("#login-password");
      input.type = input.type === "password" ? "text" : "password";
    };
  });

  // --- Switch login/register ---
  targetLogIn.onclick = function () {
    document.querySelector(".log-in-text").innerHTML = "Registration";
    document.querySelector(".registration-container").style.display = "none";
    document.querySelector(".login-container").style.display = "block";
    document.querySelector(".auth-text").innerHTML = "Log in";
    document.querySelector(".img-selection").style.display = "none";
  };

  targetRegister.onclick = function () {
    document.querySelector(".log-in-text").innerHTML = "Log in";
    document.querySelector(".login-container").style.display = "none";
    document.querySelector(".registration-container").style.display = "flex";
    document.querySelector(".auth-text").innerHTML = "Register";
    document.querySelector(".img-selection").style.display = "flex";
  };

  // --- Register form submit ---
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", async function (e) {
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
    const profileFile = inputFile.files[0];
    if (profileFile) formData.append("avatar", profileFile);

    // Clear previous errors
    [
      "register-username",
      "register-email",
      "register-password",
      "register-confirm-password",
    ].forEach((id) => {
      const errorDiv = document.getElementById(`${id}-error`);
      if (errorDiv) errorDiv.innerHTML = "";
    });

    try {
      const response = await fetch(
        "https://api.redseam.redberryinternship.ge/api/register",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          for (let field in data.errors) {
            const errorDiv = document.getElementById(`register-${field}-error`);
            if (errorDiv) errorDiv.innerHTML = data.errors[field].join("<br>");
          }
        } else if (data.message) {
          alert(data.message);
        }
        return;
      } else {
        onsole.log("Register success:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error(error);
    }
  });

  // --- Login form submit ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(loginForm);

      try {
        const response = await fetch(
          "https://api.redseam.redberryinternship.ge/api/login",
          {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.errors) {
            for (let field in data.errors) {
              const errorDiv = document.getElementById(`login-${field}-error`);
              if (errorDiv)
                errorDiv.innerHTML = data.errors[field].join("<br>");
            }
          } else if (data.message) {
            alert(data.message);
          }
          return;
        } else {
          console.log("Login success:", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/index.html";
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
}
setupAuthForm();
