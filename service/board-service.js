const Board = require('../model/board.js');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../configuration/logger.js');

exports.add = function (req, res) {
    let users = new Array();
    if (req.body.users.length != 0) {
        req.body.users.map(user => {
            users.push(ObjectId(user));
        })
    }
    let newBoard = new Board({
        name: req.body.name,
        users: users,
        created_by: ObjectId(req.body.created_by)
    });

    newBoard.save((err) => {
        if (err) {
            return res.json({ success: false, msg: err });
        }
        return res.json({ success: true });
    })
}

exports.getInfo = function(req, res) {
    let conditions = { _id: ObjectId(req.params.board_id) }
    logger.info(`Fetching data of board ${req.params.board_id}`)
    Board.findOne(conditions)
        .populate('users', 'username')
        .exec((err, board) => {
            if (err) {
                logger.info(`Error when fetching users in board ${req.params.board_id}.${err}`);
                return res.json({ success: false, msg: err });
            }
            return res.json(board);
        })
}
// create add user to board. method: PUT. implementation: Update board set users