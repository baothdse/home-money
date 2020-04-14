const router = require('express').Router({ 'mergeParams': true });
const moneyService = require('../../service/money-service.js');
const { check, validationResult, param } = require('express-validator');
const logger = require('../../configuration/logger.js');

module.exports = () => {    

    router.get('/', (req, res) => {
        moneyService.getAllByBoard(req, res);
    });

    router.get('/unpaid', (req, res) => {
        moneyService.getUnpaidExpenses(req, res);
    });
 
    router.post('/', [
        check('payment_name').notEmpty(),
        check('amount').isNumeric(),
        check('payer').notEmpty(),
        param('board_id').notEmpty()
    ], (req, res) => {
        const errors = validationResult(req);
        console.log(req)
        if (!errors.isEmpty()) {
            logger.error(errors);
            return res.status(422).json({ errors: errors.array() });
        }
        moneyService.add(req, res);
    });

    router.put('/remove', (req, res) => {
        moneyService.remove(req, res);
    });
    router.put('/', (req, res) => {
        moneyService.update(req, res);
    });
    router.get('/:id', (req, res) => {
        moneyService.getById(req, res);
    });
    return router;
}
