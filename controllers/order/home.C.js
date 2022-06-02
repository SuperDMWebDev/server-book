const express = require("express");
const router = express.Router();

const { getOrders, updateOrder, cancelOrder }=require("../../models/order/order.M");
const { showingPrice, convertDate } = require("../../models/helper/helper.M");

router.get("/", async (req, res, next) => {
  try {
    var { del, update, page = 1, search = "", update } = req.query;

    search = search.trim();

    let { allOrders, total_page }= await getOrders({ page, search });

    if (allOrders.length == 0) {
      res.render('Order/order', {
          title: "Order page",
          cssCs: () => "order/css",
          scriptCs: () => "order/script",
          allOrders,
          page: page,
          total_page,
          search,
          del,
          update,
          notFound: 1,
      })
    }

    for (let anOrder of allOrders) {
        anOrder.order_total = showingPrice(anOrder.order_total);
        anOrder.order_time = convertDate(anOrder.order_time);

        detailaddress = anOrder.order_a + ", " + anOrder.order_w + ", " + anOrder.order_p + ", " + anOrder.order_p;
        anOrder.order_a = detailaddress;

        if (anOrder.order_status == -1) {
            anOrder.order_status = "Đã hủy"
        }
        else if (anOrder.order_status == 0) {
            anOrder.order_status = "Chưa xác nhận"
        }
        else if (anOrder.order_status == 1) {
            anOrder.order_status = "Đã xác nhận"
        }
        else if (anOrder.order_status == 2) {
            anOrder.order_status = "Đang giao"
        }
        else if (anOrder.order_status == 3) {
            anOrder.order_status = "Đã giao"
        }
    }

    res.render("Order/order", {
      title: "Order page",
      cssCs: () => "order/css",
      scriptCs: () => "order/script",
      AllOrders:allOrders
    });
  } catch (err) {
    throw Error(err);
  }
});

//Sửa hóa đơn
router.put('/:o_id', async(req, res) => {
  let o_id = req.params.o_id;
  let o_phone = req.body.o_phone;
  let o_address = req.body.o_address;
  let o_status = req.body.o_status;
  let { page = 1, search } = req.query;
  // Sửa bảng
  try {
      let updatedRow = await updateOrder(o_id, o_phone, o_address, o_status);
      res.redirect(`/allorders?page=${page}&search=${search}&update=success`);

  } catch (err) {
      console.error("error for delete order item: ", err);
      res.redirect(`/allorders?page=${page}&search=${search}&update=error`);
  }
});

// Hủy hóa đơn
router.delete('/:o_id', async(req, res) => {
  let o_id = req.params.o_id;

  const { page, search } = req.query;

  try {
      let cancelRow = await cancelOrder(o_id);
      res.redirect(`/allorders?page=${page}&search=${search}&del=success`);
  } catch (err) {
      console.error("error for delete order item: ", err);
      res.redirect(`/allorders?page=${page}&search=${search}&del=error`);

  }
});

module.exports = router;