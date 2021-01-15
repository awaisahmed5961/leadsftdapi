const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    lead_id: {
        type: String,

    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    source: {
        type: String,
    },
    aff_sub: {
        type: String,
    },
    aff_sub2: {
        type: String,
    },
    aff_sub3: {
        type: String,
    },
    aff_sub4: {
        type: String,
    },
    aff_sub5: {
        type: String,
    },
    network: {
        type: String,

    },
    brand: {
        type: String,

    },
    success: {
        type: String,

    },
    url: {
        type: String,

    },
    message: {
        type: String,

    },
    is_ftd: {
        type: String,

    },
    ftd_date: {
        type: String,

    },
    sale_status: {
        type: String,
    }
});

module.exports = mongoose.model('customer', CustomerSchema);