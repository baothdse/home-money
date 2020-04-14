const router = require('express').Router();
const moneyController = require('./controller/money-controller.js');
const userController = require('./controller/user-controller.js');
const boardController = require('./controller/board-controller.js');

module.exports = (req, res) => {    
    router.use('/board/:board_id/money', moneyController());
    router.use('/user', userController());
    router.use('/board', boardController());
    return router;
}
