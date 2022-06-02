const express = require("express");
const router = express.Router();

const { showingPrice } = require("../../models/helper/helper.M");
const { getOrder, getOrderContent } = require("../../models/order/orderDetail.M");

router.get('/:id', async(req, res) => {
    let order_id = req.params.id;

    let od = await getOrder(order_id);

    let ord_content = await getOrderContent(order_id);
    
    for (let content of ord_content) {
        content.order_price = showingPrice(content.order_price);
    }
    
    od.order_total = showingPrice(od.order_total);
    
    res.render('order/orderDetail', {
        title: "Order detail page",
        cssCs: () => "order/css",
      scriptCs: () => "order/script",
        Order: od,
        items: ord_content,
        sumPrice: od.order_total,
        ID_Order: order_id,
    })
});

module.exports = router;