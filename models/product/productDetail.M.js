const db =require('../db');

exports.getProductDetail = async(id) => {
    let detail = await db.query(`select * from products pd
    join categories c on pd.category_id = c.category_id
    join authors a on pd.author_id = a.author_id
    join publishers pb on pd.publisher_id = pb.publisher_id
    where pd.product_id = ${id}`)

    return detail.rows[0];
}

exports.getProductImages = async(id) => {
    let images = await db.query(`select * from products p join images i on p.product_id = i.product_id
    where p.product_id = ${id}
    order by i.image_id`)

    return images.rows;
}