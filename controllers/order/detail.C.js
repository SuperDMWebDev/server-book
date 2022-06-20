const express = require("express");
const router = express.Router();

const { showingPrice } = require("../../models/helper/helper.M");
const { getOrder, getOrderContent } = require("../../models/order/orderDetail.M");
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

router.get('/:id', async(req, res) => {
    let order_id = req.params.id;

    let od = await getOrder(order_id);

    let ord_content = await getOrderContent(order_id);
    
    for (let content of ord_content) {
        content.order_price = showingPrice(content.order_price);
    }
    
    od.order_total = showingPrice(od.order_total);

    getToken(req, res)
    
    res.render('order/orderDetail', {
        title: "Order detail page",
        role_id: role,
        cssCs: () => "order/css",
        scriptCs: () => "order/script",
        Order: od,
        items: ord_content,
        sumPrice: od.order_total,
        ID_Order: order_id,
    })
});

module.exports = router;