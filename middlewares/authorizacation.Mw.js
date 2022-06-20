const jwt = require('jsonwebtoken');

const authenToken = (req, res, next) => {
    const access_token = req.cookies.jwt;
    var checkroute = req.baseUrl
    // access_token có dạng  `Beaer [token]`
    if (typeof access_token == 'undefined') {
        // unauthorized
        res.redirect('/login');
    } else {
        const token = access_token.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {

            if (err) {
                res.status(401).send(
                    `<style>
            h1{
                text-align:center;
            }
            a{
                display:block;
                text-align:center;
            }
            button{
            border:none;
            border-radius:15px;
            background-color:#176fd3;
            padding: 1rem 2rem;
            color:white;
            font-size:1.8rem;
            }
            </style>
            <h1> Phiên hết hạn. Hãy đăng nhập lại </h1>
            <a href ="/login">
            <button> Đăng nhập </button>
            </a>`)
                res.locals.user = null;
            }
            res.locals.user = data;

            //Nếu role_id != 3 thì không thể vào trang account
            var role_id = data.role;
            if (checkroute == '/account' && role_id != 3) {
                res.redirect('/err');
            }

        });

        next();
    };


}

const checkUserIsLogin = (req, res, next) => {
    const access_token = req.cookies.jwt;
    if (!access_token) {
        next();
    } else if (access_token) {
        res.redirect('/');
    }
}

module.exports = { authenToken, checkUserIsLogin };