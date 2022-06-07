const db =require('../db');

exports.getOrder = async (id) =>{
    const pds = await db.query('select * from orders where orders.order_id = ' + id)
    return pds.rows[0];
}

exports.getOrderContent = async (id) =>{
    const pds = await db.query(`
    select * from order_content O join products P on O.product_id = P.product_id and O.order_id = ${id}
        join authors A on P.author_id = A.author_id
        join publishers PB on P.publisher_id = PB.publisher_id
        join images I on I.product_id = P.product_id and I.image_id = 1
    `)

    return pds.rows;
}