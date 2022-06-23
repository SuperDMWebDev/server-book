// $("#form").on("submit", function (e) {
//   e.preventDefault(); // prevent form from submitting

//   var inputs = $("#form").find("input, select").not('[type="hidden"]');
//   var k = 0;

//   inputs.each(function () {
//     console.log(this);
//     if ($(this).val() == "") {
//       k = 1;
//     }
//   });

//   if (k == 1) {
//     alert("please fill all fields");
//   } else {
//     alert("submitted successfully");
//     this.submit(); // submit form if valid
//   }
// });
function validateForm() {
  var userName = document.forms["Form"]["username"].value;
  var firstName = document.forms["Form"]["firstname"].value;
  var lastName = document.forms["Form"]["lastname"].value;
  var phoneNumber = document.forms["Form"]["phone"].value;
  var address = document.forms["Form"]["address"].value;
  var ward = document.forms["Form"]["form-ward"].value;
  var district = document.forms["Form"]["form-district"].value;
  var province = document.forms["Form"]["form-province"].value;

  if (
    (userName == null || userName == "")||
    (firstName == null || firstName == "")||
    (lastName == null || lastName == "")||
    (phoneNumber = null || phoneNumber == "")||
    address == null || address == ""||
    ward == null || ward == ""||
    district == null || district == ""||
    province == null || province == ""
  ) {
    alert("Please fill in blank field(s)");
    return false;
  }
  return false;
}
const url = window.location.href;