// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },

    false
  );
})();

// const register = new Vue({
//   el: "#form",
//   data: {
//     section1: false,
//     section2: false,
//     section3: false,
//   },
// });

// const urlParams = new URLSearchParams(window.location.search);
// const info = urlParams.get("info");

// if (info) {
//   const errorMessage = document.getElementById("error-message");
//   errorMessage.innerText = info;
//   errorMessage.style.display = "block";
// }

