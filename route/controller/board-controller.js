const router = require('express').Router();
const boardService = require('../../service/board-service.js');
const { check, validationResult } = require('express-validator');

module.exports = () => {    
    router.post('/', [
        check('name').notEmpty(),
        check('created_by').notEmpty()
    ], (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        boardService.add(req, res);
    });

    router.get('/:board_id', (req, res) => {
        console.log(req.params)
        boardService.getInfo(req, res);
    });

    return router;
}
