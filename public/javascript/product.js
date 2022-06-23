document.addEventListener("DOMContentLoaded", function () {
  $("#submit-author").click(function () {
    const formProduct = document.forms["formProduct"];
    formProduct.action = "/product/add-author";
    const textInput = document.getElementById("add-author");
    console.log("value text input", textInput.value);
    if (textInput.value == null || textInput.value == "") {
      alert("moi ban nhap ten tac gia");
    } else {
      formProduct.submit();
    }
  });
  $("#submit-publisher").click(function () {
    const formProduct = document.forms["formProduct"];
    formProduct.action = "/product/add-publisher";
    const textInput = document.getElementById("add-publisher");
    console.log("value text input", textInput.value);
    if (textInput.value == null || textInput.value == "") {
      alert("moi ban nhap ten nha xuat ban");
    } else {
      formProduct.submit();
    }
  });
});
