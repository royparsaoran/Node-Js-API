const wrapper = require("../../../../helpers/utils/wrapper");
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandValidation = require("../repositories/commands/command_validation");

const validator = require("../utils/validator");
const { ERROR: httpError, SUCCESS: http } = require('../../../../helpers/http-status/status_code');

const get = async (req, res) => {
    const payload = req.query;
    
    const getData = async () => queryHandler.get(payload);
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, 'Data not found', httpError.NOT_FOUND)
            : wrapper.response(res, 'success', result, 'Data found', http.OK);
    };
    sendResponse(await getData());
};

const findById = async (req, res) => {
    const id = req.params.id
    const getData = async () => queryHandler.findById(id);
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, 'Data not found', httpError.NOT_FOUND)
            : wrapper.response(res, 'success', result, 'Data found.', http.OK);
    };
    sendResponse(await getData());
};

const insert = async (req, res) => {
    const payload = req.body;
    const isValidPayload = validator.isValidPayload(
        payload,
        commandValidation.insert
    );
    const insert = async (result) => {
        if (result.err && result.err === 'fail')  return result;
        const ret = await commandHandler.insert(payload);
        return ret
    };

    const sendResponse = async (result) => {
        (result.err !== null) ? wrapper.response(res, 'fail', result, 'Error Insert Data', httpError.CONFLICT)
            : wrapper.response(res, 'success', result, 'Success Insert Data', http.OK);
    };
    
    sendResponse(await insert(isValidPayload));
};

const update = async (req, res) => {
    const payload = req.body;
    const productId = req.params.id;
    
    payload.id = productId
    const isValidPayload = validator.isValidPayload(
        payload,
        commandValidation.update
    );
    const update = async (result) => {
        if (result.err && result.err === 'fail') return result;
        const ret = await commandHandler.update(payload);
        return ret
    };

    const sendResponse = async (result) => {
        (result.err !== null) ? wrapper.response(res, 'fail', result, 'Error Update Data', httpError.CONFLICT)
            : wrapper.response(res, 'success', result, 'Success Update Data', http.OK);
    };

    sendResponse(await update(isValidPayload));
};

module.exports = {
    insert,
    update,
    get,
    findById
};
