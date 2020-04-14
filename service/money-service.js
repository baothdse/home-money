const Money = require('../model/money.js');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../configuration/logger.js');

exports.add = function (req, res) {
    let expense = new Money({
        payment_name: req.body.payment_name,
        amount: req.body.amount,
        board: ObjectId(req.params.board_id),
        payer: req.body.payer,
        details: req.body.details
    });

    expense.save((err) => {
        if (err) {
            logger.info(`Error when saving new expense. ${expense}`);
            return res.json({ success: false, msg: err });
        }
        logger.info(`New expense was saved to database. ${expense}`);
        return res.json({ success: true });
    })
}

exports.getUnpaidExpenses = function (req, res) {
    let filters = {
        board: ObjectId(req.params.board_id),
        is_actived: true,
    }
    Money.find(filters)
        .populate('details.sharer', 'username')
        .populate('payer', 'username')
        .exec((err, data) => {
            if (err) {
                logger.info(`Error when fetching unpaid expenses. ${err}`);
                return res.json({ success: false, msg: err });
            }
            res.json(data);
            res.end();
        })
}

exports.update = function (req, res) {
    let filter = {
        board: ObjectId(req.params.board_id),
        _id: req.body._id
    };

    Money.findOneAndUpdate(filter, {
        payment_name: req.body.payment_name,
        amount: req.body.amount,
        payer: req.body.payer,
        details: req.body.details
    }, (err, data) => {
        if (err) {
            logger.info(`Error when updating unpaid expenses. ${err}`);
            return res.json({ success: false, msg: err });
        }
        logger.info(`Expense was updated. ${data}`);
        res.json({ 'success': true, message: data });
        res.end();
    })
}

exports.getById = function (req, res) {

}

exports.getAllByBoard = function (req, res) {

}

exports.remove = function (req, res) {

}