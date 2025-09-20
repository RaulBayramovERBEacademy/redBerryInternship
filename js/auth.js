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
  profilePic.src = "images/camera.png";
  profilePic.style.width = "20px";
  profilePic.style.height = "20px";
});

document.querySelectorAll(".eye-icon").forEach((icon, index) => {
  icon.onclick = () => {
    let input =
      0 === index
        ? document.querySelector("#register-password")
        : document.querySelector("#register-confirm-password");
    input.type = input.type === "password" ? "text" : "password";
  };
});
