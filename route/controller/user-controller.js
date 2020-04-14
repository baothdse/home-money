const router = require('express').Router();
const userService = require('../../service/user-service.js');
const { check, validationResult } = require('express-validator');

module.exports = () => {    
    router.post('/', [
        check('username').notEmpty().isLength({ 'min': 6, 'max': 30 }),
        check('password').notEmpty()
    ], (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        userService.add(req, res);
    });

    return router;
}
