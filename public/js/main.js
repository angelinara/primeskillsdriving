// prompt to specify location on contact page
function showOtherLocation() {
  const select = document.getElementById("location");
  const otherBox = document.getElementById("otherLocationBox");
  const otherInput = document.getElementById("otherLocation");

  if (select.value === "Other") {
    otherBox.style.display = "block";
    otherInput.required = true;
  } else {
    otherBox.style.display = "none";
    otherInput.required = false;
    otherInput.value = "";
  }
}
