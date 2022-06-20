document.addEventListener('DOMContentLoaded', function() {
    const search = document.querySelector('#search').value;
    //const page =  document.querySelector(".pag__link--active").innerText;

    var o_id;
    // Phần hủy hóa đơn
    var btnRemove = document.getElementById("btnRemove");
    var removeForm = document.forms['removeForm'];

    // Khi remove modal hiện lên
    $('#removeModal').on('show.bs.modal', function(event) {
        var passBtn = $(event.relatedTarget);

        o_id = passBtn.data('o_id');

        $('#removeModalMsg').text(`
          Bạn có chắc muốn hủy đơn hàng #${o_id}
          `);
    });

    // Khi click vào nút có trong remove modal
    btnRemove.onclick = function() {
        removeForm.action = '/order/' + o_id + `?_method=DELETE&search=${search}`;//&page=${page}`;
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
    $('#updateModal').on('show.bs.modal', function(event) {
        var passBtn = $(event.relatedTarget);

        o_id = passBtn.data('o_id');
        o_phone = passBtn.data('o_phone');
        o_a = passBtn.data('o_a');
        o_p = passBtn.data('o_p');
        o_d = passBtn.data('o_d');
        o_w = passBtn.data('o_w');
        o_status = passBtn.data('o_status');
        console.log("status of order:", passBtn.data('o_status'));
        if (o_status == "Đã xác nhận") {
            document.getElementById("checked").checked = 'checked';
        } else if (o_status == "Đang giao") {
            document.getElementById("shipping").checked = 'checked';
        }
        $('#updateModalHead').text(`Sửa hoá đơn`);
        document.getElementById("modalUId").value = `#${o_id}`;
        document.getElementById("modalUPhone").value = o_phone;
        document.getElementById("modalUA").value = o_a;
        document.getElementById("modalUP").value = o_d;
        document.getElementById("modalUD").value = o_p;
        document.getElementById("modalUW").value = o_w;

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
            $('#formBack1').text("Vui lòng nhập vào trường này.");
        } else {
            document.getElementById("formBack1").setAttribute('class', "");
            $('#formBack1').text("");
        }

        // Nếu không nhập địa chỉ
        if (!testA) {
            updateError = true;
            document.getElementById("formBack2").setAttribute('class', "alert alert-danger");
            $('#formBack2').text("Vui lòng nhập vào trường này.");
        } else {
            document.getElementById("formBack2").setAttribute('class', "");
            $('#formBack2').text("");
        }

        if (!testP) {
            updateError = true;
            document.getElementById("formBack3").setAttribute('class', "alert alert-danger");
            $('#formBack3').text("Vui lòng nhập vào trường này.");
        } else {
            document.getElementById("formBack3").setAttribute('class', "");
            $('#formBack3').text("");
        }

        if (!testD) {
            updateError = true;
            document.getElementById("formBack4").setAttribute('class', "alert alert-danger");
            $('#formBack4').text("Vui lòng nhập vào trường này.");
        } else {
            document.getElementById("formBack4").setAttribute('class', "");
            $('#formBack4').text("");
        }

        if (!testW) {
            updateError = true;
            document.getElementById("formBack5").setAttribute('class', "alert alert-danger");
            $('#formBack5').text("Vui lòng nhập vào trường này.");
        } else {
            document.getElementById("formBack5").setAttribute('class', "");
            $('#formBack5').text("");
        }

        if (!testStatus) {
            updateError = true;
            document.getElementById("formBack6").setAttribute('class', "alert alert-danger");
            $('#formBack6').text("Vui lòng chọn trạng thái đơn.");
        } else {
            document.getElementById("formBack6").setAttribute('class', "");
            $('#formBack6').text("");
        }

        if (updateError) {
          updateError = false
          return;
        }

        updateForm.action = '/order/' + o_id + `/?_method=PUT&search=${search}`;//&page=${page}`;
        updateForm.submit();
    }
});