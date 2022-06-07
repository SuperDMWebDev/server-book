const db = require("../db");
const orders = "public.orders";

exports.getAllOrders = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${orders}`);

  return rows;
};


// Xác định vị trí của phần tử
const indexOfSize = (sizes, value) => {
  let i = 0;
  for (; i < sizes.length; i++) {

      if (sizes[i] == value) {
          break;
      }
  }
  return i + 1;
};

const totalItems = async(search) => {

  const { rows } = await db.query(`
  SELECT count(*)
  FROM orders O, accounts A
  WHERE O.account_id = A.account_id
  AND O.order_phone like '%${search}%'
  `);

  return rows[0].count;
}

// lay toan bo don hang
exports.getOrders = async ({ page, per_page = 10, search }) => {
  const offset = (page - 1) * per_page;

  const { rows } = await db.query(`
    select orders.order_id, accounts.username, orders.order_total, orders.order_time,
    orders.order_a, orders.order_w, orders.order_d, orders.order_p,
    orders.order_phone, orders.order_status
    from orders, accounts
    where orders.account_id = accounts.account_id  AND orders.order_phone like '%${search}%'
    order by orders.order_status, orders.order_id
    LIMIT ${per_page} OFFSET ${offset}`);

  const total_items = await totalItems(search);
  const total_page = total_items % per_page === 0 ? (total_items / per_page) : Math.floor(total_items / per_page) + 1;

  return { allOrders: rows, total_page: total_page };
};

exports.cancelOrder = async(o_id) => {
  // Cập nhật lại trạng thái hóa đơn
  let cancelRow = (await db.query(`update orders set order_status = -1 where order_id = ${o_id} returning *;`)).rows[0];
  let o_content = await getOrder(o_id);

  // Thêm lại số lượng sản phẩm trong hóa đơn bị hủy vào kho
  for (let content of o_content) {
      let s_id = content.product_id;
      let reStock = content.quantity;
      let { rows } = await db.query(`SELECT * FROM products WHERE "product_id" = '${s_id}'`);
      let index = indexOfSize(rows[0].size, content.orc_size);

      let newStock = parseInt(rows[0].stock[index - 1]) + parseInt(reStock);
      await db.query(`update products set stock[${index}] = ${newStock} where "product_id" = '${s_id}'
        RETURNING*;`);
  }

  return cancelRow;
}

exports.updateOrder = async(o_id, o_phone, o_address, o_status) => {
  //let updateRow = (await db.query(`update orders set order_phone = '${o_phone}', address = '${o_address}', status = ${o_status}
  //where order_id = ${o_id} returning *;`)).rows[0];

  let updateRow = (await db.query(`update orders set order_phone = '${o_phone}', order_status = ${o_status}
  where order_id = ${o_id} returning *;`)).rows[0];

  return updateRow;
}