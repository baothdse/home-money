const Schema = require('mongoose').Schema;

let MoneySchema = {
    payment_name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    amount: {
        type: Number,
        required: true
    },
    board: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    payer: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    details: [{
        sharer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        is_paid: {
            type: Boolean,
            default: false
        }
    }],
    is_actived: {
        type: Boolean,
        default: true
    },
    note: {
        type: String
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

let Money = require('mongoose').model('Money', MoneySchema, 'money');

module.exports = Money;
