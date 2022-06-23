const express = require("express");
const router = express.Router();

const { getOrders, updateOrder, cancelOrder }=require("../../models/order/order.M");
const { showingPrice, convertDate } = require("../../models/helper/helper.M");
const jwt = require('jsonwebtoken');

var username = "";
var role = 0;
var idUser = 0;

const getToken = (req, res) => {
  const access_token = req.cookies.jwt;

  if (access_token) {
      const token = access_token.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
          username = data.username
          idUser = data.id;
          role = data.role;

          return;
      });
  }
};

router.get("/", async (req, res, next) => {
  try {
    var { del, update } = req.query;

    let allOrders =  await getOrders();
    getToken(req, res)

    if (allOrders.length == 0) {
      res.render('order/order', {
          title: "Order page",
          user_name: username,
          user_id: idUser,
          role_id: role,
          header: () => "header",
          cssCs: () => "order/css",
          scriptCs: () => "order/script",
          allOrders,
          del,
          update,
          notFound: 1,
      })
    }

    for (let anOrder of allOrders) {
        anOrder.order_total = showingPrice(anOrder.order_total);
        anOrder.order_time = convertDate(anOrder.order_time);
      
        detailaddress = anOrder.order_a + ", " + anOrder.order_w + ", " + anOrder.order_p + ", " + anOrder.order_p;
        anOrder.fulladdress = detailaddress;

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
      user_name: username,
      user_id: idUser,
      role_id: role,
      order: true,
      header: () => "header",
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
  let o_a = req.body.o_a;
  let o_p = req.body.o_p;
  let o_d = req.body.o_d;
  let o_w = req.body.o_w;
  let o_status = req.body.o_status;
  // Sửa bảng
  try {
      let updatedRow = await updateOrder(o_id, o_phone, o_a, o_p, o_d, o_w, o_status);
      res.redirect(`/order/?update=success`);

  } catch (err) {
      console.error("error for update order item: ", err);
      res.redirect(`/order/?update=error`);
  }
});

// Hủy hóa đơn
router.delete('/:o_id', async(req, res) => {
  let o_id = req.params.o_id;

  try {
      let cancelRow = await cancelOrder(o_id);
      res.redirect(`/order?del=success`);
  } catch (err) {
      console.error("error for delete order item: ", err);
      res.redirect(`/order?del=error`);

  }
});

module.exports = router;