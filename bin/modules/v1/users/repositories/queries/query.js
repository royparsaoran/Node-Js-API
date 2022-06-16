const wrapper = require('../../../../../helpers/utils/wrapper')
const user = require('../model/user_model')

const get = async (payload) => {
    return user.findAll({
        where: payload
    }).then(data => {
        return wrapper.data(data)
    }).catch(err => {
        return wrapper.data(err)
    });
};

const findById = async (payload) => {
    return user.findOne({
        where: {
            id: payload
        }
    }).then(data => {
        return wrapper.data(data)
    }).catch(err => {
        return wrapper.data(err)
    });
};


module.exports = {
    get,
    findById
};

