const Schema = require('mongoose').Schema;

let BoardSchema = {
    name: {
        required: true,
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date
    },
    last_modified_by: {
        type: String
    },
    last_modified_datetime: { 
        type: Date
    }
}

let Money = require('mongoose').model('Board', BoardSchema, 'board');

module.exports =  Money;
