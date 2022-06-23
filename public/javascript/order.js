document.addEventListener('DOMContentLoaded', function() {
    //const search = document.querySelector('#search').value;
    //const page =  document.querySelector(".pag__link--active").innerText;
    const API_PROVINCE_URL = `https://provinces.open-api.vn/api/?depth=1`
    const API_DISTRICT_URL = `https://provinces.open-api.vn/api/d/`
    const API_WARD_URL = `https://provinces.open-api.vn/api/w`
    var times = 0;

    const provincesHTML = document.querySelector(".form-province");

    var o_id;
    // Phần hủy hóa đơn
    var btnRemove = document.getElementById("btnRemove");
    var removeForm = document.forms['removeForm'];
    
    // Khi remove modal hiện lên
    $('#removeModal').on('show.bs.modal', function(event) {
        var passBtn = $(event.relatedTarget);

        o_id = passBtn.data('o_id');

        $('#removeModalMsg').text(`
          Are you sure to cancel the order #${o_id}?
          `);
    });

    // Khi click vào nút có trong remove modal
    btnRemove.onclick = function() {
        removeForm.action = '/order/' + o_id + `?_method=DELETE`;//&page=${page}`;
        removeForm.submit();
    };

    // Phân sửa hóa đơn
    var o_phone;
    var o_a;
    var o_p;
    var o_d;
    var o_w;
    var o_status;
    var btnUpdate = document.getElementById("btnUpdate");
    var updateForm = document.forms['updateForm'];


    // Khi update modal hiện lên
    const loadData = async() => {

        const resJson = await fetch(`${API_PROVINCE_URL}`);
        const data = await resJson.json();
        const provinceValue = document.querySelector(".form-province");
        const districtHTML = document.querySelector(".form-district");
        const wardHTML = document.querySelector(".form-ward");

        var provinces = data.map((elm) => elm.name);
        var htmls = `<option>Rỗng</option>`;
        for (elm of provinces) {
            //console.log("elm", elm, provinceValue.value);
            if (provinceValue.value != "Rỗng" && String(provinceValue.value) == String(elm)) {
                htmls += `<option selected="selected">${elm}</option>`
            } else {
                htmls += `<option>${elm}</option>`
            }
        }

        provincesHTML.innerHTML = "";
        provincesHTML.innerHTML = htmls;

        return data;
    }
    $('#updateModal').on('show.bs.modal', function(event) {
        var passBtn = $(event.relatedTarget);
        const provincesHTML = document.querySelector(".form-province");
        o_id = passBtn.data('o_id');
        o_phone = passBtn.data('o_phone');
        o_a = passBtn.data('o_a');
        o_p = passBtn.data('o_p');
        o_d = passBtn.data('o_d');
        o_w = passBtn.data('o_w');
        o_status = passBtn.data('o_status');
        //console.log("status of order:", passBtn.data('o_status'));
        if (o_status == "Đã xác nhận") {
            document.getElementById("checked").checked = 'checked';
        } else if (o_status == "Đang giao") {
            document.getElementById("shipping").checked = 'checked';
        }
        //$('#updateModalHead').text(`Update order`);
        document.getElementById("modalUId").value = `#${o_id}`;
        document.getElementById("modalUPhone").value = o_phone;
        document.getElementById("modalUA").value = o_a;
        document.getElementById("modalUP").innerText = o_p;
        document.getElementById("modalUD").innerText = o_d;
        document.getElementById("modalUW").innerText = o_w;

        const data = loadData();
    
        const chooseProvince = async(data) => {
            const resJson = await fetch(`${API_DISTRICT_URL}`);
            const dataDistrict = await resJson.json();
            const provincesHTML = document.querySelector(".form-province");
            const districtHTML = document.querySelector(".form-district");
            const districtValue = document.querySelector(".form-district");
            const wardValue = document.querySelector(".form-ward");
    
    
    
            const resJsonW = await fetch(`${API_WARD_URL}`);
            const dataWard = await resJsonW.json();
            const wardHTML = document.querySelector(".form-ward");
            var province_code = 0;
            var childchoose = () => {
    
                data.then(function(result) {
                        var htmls = ``;
                        province_code = result.find((element) => element.name == `${provincesHTML.value}`);
                        for (elm of dataDistrict) {
    
                            if (elm.province_code == province_code.code) {
    
                                if (elm.name == districtValue.value) {
                                    htmls += `<option selected>${elm.name}</option>`
                                } else {
                                    htmls += `<option>${elm.name}</option>`
                                }
                            }
                        }
    
    
                        districtHTML.innerHTML = "";
                        districtHTML.innerHTML = htmls;
                        htmls = ``;
                        const district_code = dataDistrict.find((element) => element.name == `${districtHTML.value}`);
                        console.log("geted: ", district_code);
                        var flag = false;
                        for (elm of dataWard) {
                            if (elm.district_code == district_code.code) {
                                flag = true;
    
                                if (wardValue.value == elm.name) {
                                    htmls += `<option selected>${elm.name}</option>`;
    
                                } else {
                                    htmls += `<option>${elm.name}</option>`;
                                }
                            }
                        }
    
                        if (flag == false) {
                            htmls = `<option>Rỗng</option>`;
                        }
                        wardHTML.innerHTML = "";
                        wardHTML.innerHTML = htmls;
    
                    })
                    .catch((err) => {
                        console.error("error", err)
                    });
    
                var htmls = ``;
            }
            provincesHTML.addEventListener("click", () => {
                if (provincesHTML.value === "Rỗng") {
                    districtHTML.innerHTML = `<option>Rỗng</option>`;
                    wardHTML.innerHTML = `<option>Rỗng</option>`;
                    return;
                }
                childchoose();
            });
    
            provincesHTML.click();
            return dataDistrict;
        }
    
    
    
        const chooseWards = async() => {
            const resJson = await fetch(`${API_WARD_URL}`);
            const dataWard = await resJson.json();
            const districtHTML = document.querySelector(".form-district");
            const wardHTML = document.querySelector(".form-ward");
            const wardValue = document.querySelector(".form-ward");
    
    
            districtHTML.addEventListener("click", () => {
                dataDistrict.then(function(result) {
                        var htmls = ``;
                        const district_code = result.find((element) => element.name == `${districtHTML.value}`);
                        console.log("geted: ", district_code);
    
                        var flag = false;
                        for (elm of dataWard) {
    
                            if (elm.district_code == district_code.code) {
                                flag = true;
                                if (wardValue.value == elm.name) {
                                    htmls += `<option selected>${elm.name}</option>`;
    
                                } else {
                                    htmls += `<option>${elm.name}</option>`;
                                }
                            }
                        }
    
                        if (flag == false) {
                            htmls = `<option>Rỗng</option>`;
                        }
                        wardHTML.innerHTML = "";
                        wardHTML.innerHTML = htmls;
                    })
                    .catch((err) => {
                        console.error("error", err)
                    });
            });
        }
    
        const dataDistrict = chooseProvince(data);
        chooseWards();
    });

    // Khi ấn nút xác nhận chỉnh sửa
    btnUpdate.onclick = function() {
        let testPhone = updateForm.o_phone.value;
        let testA = updateForm.o_a.value;
        let testP = updateForm.o_p.value;
        let testD = updateForm.o_d.value;
        let testW = updateForm.o_w.value;
        let testStatus = updateForm.o_status.value;
        let updateError = false;

        // Nếu không nhập sđt
        if (!testPhone) {
            updateError = true;
            document.getElementById("formBack1").setAttribute('class', "alert alert-danger");
            $('#formBack1').text("Please fill in this field.");
        } else {
            document.getElementById("formBack1").setAttribute('class', "");
            $('#formBack1').text("");
        }

        // Nếu không nhập địa chỉ
        if (!testA) {
            updateError = true;
            document.getElementById("formBack2").setAttribute('class', "alert alert-danger");
            $('#formBack2').text("Please fill in this field.");
        } else {
            document.getElementById("formBack2").setAttribute('class', "");
            $('#formBack2').text("");
        }

        if (!testP) {
            updateError = true;
            document.getElementById("formBack3").setAttribute('class', "alert alert-danger");
            $('#formBack3').text("Please fill in this field.");
        } else {
            document.getElementById("formBack3").setAttribute('class', "");
            $('#formBack3').text("");
        }

        if (!testD) {
            updateError = true;
            document.getElementById("formBack4").setAttribute('class', "alert alert-danger");
            $('#formBack4').text("Please fill in this field.");
        } else {
            document.getElementById("formBack4").setAttribute('class', "");
            $('#formBack4').text("");
        }

        if (!testW) {
            updateError = true;
            document.getElementById("formBack5").setAttribute('class', "alert alert-danger");
            $('#formBack5').text("Please fill in this field.");
        } else {
            document.getElementById("formBack5").setAttribute('class', "");
            $('#formBack5').text("");
        }

        if (!testStatus) {
            updateError = true;
            document.getElementById("formBack6").setAttribute('class', "alert alert-danger");
            $('#formBack6').text("Please choose order status.");
        } else {
            document.getElementById("formBack6").setAttribute('class', "");
            $('#formBack6').text("");
        }

        if (updateError) {
          updateError = false
          return;
        }

        updateForm.action = '/order/' + o_id + `/?_method=PUT`;//&page=${page}`;
        updateForm.submit();
    }
});
