const wrapper = require("../../../../helpers/utils/wrapper");
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandValidation = require("../repositories/commands/command_validation");

const validator = require("../utils/validator");
const { ERROR: httpError, SUCCESS: http } = require('../../../../helpers/http-status/status_code');

const login = async (req, res) => {
    const payload = req.body;
    
    const login = async () => queryHandler.login(payload);
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, 'Data not found', httpError.NOT_FOUND)
            : wrapper.response(res, 'success', result, 'Data found', http.OK);
    };
    sendResponse(await login());
};

const register = async (req, res) => {
    const payload = req.body;
    const isValidPayload = validator.isValidPayload(
        payload,
        commandValidation.register
    );
    const register = async (result) => {
        if (result.err && result.err === 'fail')  return result;
        const ret = await commandHandler.register(payload);
        return ret
    };

    const sendResponse = async (result) => {
        (result.err !== null) ? wrapper.response(res, 'fail', result, 'Error Insert Data', httpError.CONFLICT)
            : wrapper.response(res, 'success', result, 'Success Insert Data', http.OK);
    };
    
    sendResponse(await register(isValidPayload));
};
module.exports = {
    login, 
    register
};
