const express = require('express');
const Customer = require('../models/Customer');
const Joi = require('@hapi/joi');
const http = require('https');
const router = express.Router();
let xmlParser = require('xml2json');


/**
 * @route POST / api/customer
 * @description Add customer
 * @access Public
 */
router.post('/', async (req, res) => {
    let { error } = customerValidationSchema.validate(req.body);
    if (error) { console.log(error); return res.status(400).send(error.details[0].message) }

    const {
        firstname,
        lastname,
        email,
        password,
        ip,
        phone,
        country_code,
        source,
        aff_sub,
        aff_sub2,
        aff_sub3,
        aff_sub4,
        aff_sub5 } = req.body;


    var options = {
        host: 'api.yoloads.io',
        path: `/spotapi?api_username=QunL&api_password=QdVCwEfoojB&MODULE=Customer&COMMAND=add&campaignId=152&currency=USD&FirstName=${firstname}&LastName=${lastname}&email=${email}&Phone=${phone}&Country=${country_code}&password=${password}&Extra[funnelName]=TEST`,
        method: 'POST',
    };

    try {
        var httpreq = http.request(options, function (response) {
            response.on('data', function (chunk) {
                const responsefromApi = JSON.parse(xmlParser.toJson(chunk));
                const { status } = responsefromApi;
                const { successStatus } = responsefromApi.status.operation_status;

                if (status.operation_status == 'failed') {
                    const { errors } = status;
                    customer = new Customer({
                        firstname,
                        lastname,
                        email,
                        password,
                        ip,
                        phone,
                        country_code,
                        source,
                        aff_sub,
                        aff_sub2,
                        aff_sub3,
                        aff_sub4,
                        aff_sub5,
                        success: successStatus,
                        message: errors.error,
                    });
                    customer.save().then((ress) => {
                        res
                            .send(customer)
                            .status(200);
                    }).catch((err) => {
                        res
                            .send(err)
                            .status(500)
                    })
                }
                else {
                    const { id, redirect } = responsefromApi.status.Customer;
                    customer = new Customer({
                        lead_id: id,
                        firstname,
                        lastname,
                        email,
                        password,
                        ip,
                        phone,
                        country_code,
                        source,
                        aff_sub,
                        aff_sub2,
                        aff_sub3,
                        aff_sub4,
                        aff_sub5,
                        success: successStatus,
                        url: redirect,
                    });
                    customer.save().then((ress) => {
                        res.send(customer).status(200);
                    }).catch((err) => {
                        res
                            .send(err)
                            .status(500)

                    })
                }

            });
        });
        httpreq.end();

    }
    catch (err) {
        res
            .send("error with external request")
            .status(200)
    }
});


// Schema Validation 
const customerValidationSchema = Joi.object({
    firstname: Joi.string()
        .min(1)
        .max(50)
        .required(),
    lastname: Joi.string()
        .min(1)
        .max(50)
        .required(),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required(),
    phone: Joi.string()
        .required(),
    ip: Joi.string()
        .required(),
    country_code: Joi.string()
        .required(),
    source: Joi.string(),
    aff_sub: Joi.string(),
    aff_sub2: Joi.string(),
    aff_sub3: Joi.string(),
    aff_sub4: Joi.string(),
    aff_sub5: Joi.string(),

});
module.exports = router;