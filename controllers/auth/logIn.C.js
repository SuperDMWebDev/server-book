const express = require("express");
const router = express.Router();
const { getOne } = require('../../models/auth/login.M');
const jwt = require('jsonwebtoken');

router.get("/", async (req, res, next) => {
    res.render('auth/login', {
        title: "Login page",
        header: () => "none",
        cssCs: () => "login/css",
        scriptCs: () => "login/script",
    })
})

// Hàm xử lí lỗi
const handleError = (e) => {
    errs = { userErr: '', passErr: '' };

    // phần lỗi tên đăng nhập
    if (e.message == 'Username cannot be blank') {
        errs.userErr = 'Username cannot be blank';
        return errs;
    }
    if (e.message == 'The first character of the username does not start with a digit') {
        errs.userErr = 'The first character of the username does not start with a digit';
        return errs;
    }
    if (e.message == 'Username does not contain spaces') {
        errs.userErr = 'Username does not contain spaces';
        return errs;
    }
    if (e.message == 'Username does not exist') {
        errs.userErr = 'Username does not exist';
        return errs;
    }

    // phần lỗi password
    if (e.message == 'Password can not be blank') {
        errs.passErr = 'Password can not be blank';
        return errs;
    }
    if (e.message == 'Password is not correct') {
        errs.passErr = 'Password is not correct';
        return errs;
    }
    if (e.message == 'Account has been locked') {
        errs.passErr = 'Account has been locked';
        return errs;
    }

}

// Tạo token - JWT
const createJWToken = (id, name, role) => {
    // thêm id_user và role_id vào trong token
    const data = {
        id: id,
        username: name,
        role: role,
    };
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h',
    });
}

// [POST] /dangnhap
router.post('/', async(req, res) => {
    const { uservalue, passvalue, errs } = req.body;
    try {

        if (uservalue === '') {
            throw Error("Username cannot be blank");
        }
        if (errs.userErr != '') {
            throw Error(errs.userErr);
        }
        if (passvalue === '') {
            throw Error("Password can not be blank");
        }
        // Kiểm tra tài khoản user đã tồn tại trong db hay chưa
        const dataUser = await getOne('username', uservalue);
        //console.log("userdata:", dataUser);
        if (dataUser.length == 0) {
            throw Error("Username does not exist");
        } 
        else {
            //kiểm tra password 
            //const isPwd = await bcrypt.compare(passvalue, dataUser[0].pwd);
            //console.log(dataUser[0])
            //if (!isPwd) {
            if (passvalue != dataUser[0].pwd) {
                throw Error("Password is not correct");
            }
            else if (dataUser[0].account_status == 0) {
                throw Error("Account has been locked");
            }

        }

        //tạo token cho client
        const token = createJWToken(dataUser[0].account_id, dataUser[0].username, dataUser[0].role_id);

        // Lưu trữ token ở cookie
        const access_token = `Beaer ${token}`;
        res.cookie('jwt', access_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ status: 'success', role: dataUser[0].role_id });

    } catch (e) {
        const errs = handleError(e);
        res.status(400).json(errs);
    }
});

module.exports = router;