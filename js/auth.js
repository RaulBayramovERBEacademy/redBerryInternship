let profilePic = document.querySelector(".profile-image");
let inputFile = document.querySelector("input-file");
inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
};
