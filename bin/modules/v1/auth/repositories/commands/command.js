const wrapper = require('../../../../../helpers/utils/wrapper')
const userModel = require('../../../users/repositories/model/user_model')

const register = async (payload) => {
    return userModel.create(payload, {raw: true}).then(data => {
        return wrapper.data(data.dataValues);
    }).catch(err => {
        return wrapper.error(err)
    })
};

module.exports = {
    register
};

