const wrapper = require('../../../../../helpers/utils/wrapper')
const user = require('../model/user_model')

const findByEmail = async (payload) => {
    return user.findOne({
        where: {
            email: payload.email
        }
    }).then(data => {
        return wrapper.data(data)
    }).catch(err => {
        return wrapper.data(err)
    });
};

module.exports = {
    findByEmail
};

