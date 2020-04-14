const User = require('../model/user.js');

exports.add = function (req, res) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            return res.json({ success: false, msg: err });
        }
        return res.json({ success: true });
    })
}

