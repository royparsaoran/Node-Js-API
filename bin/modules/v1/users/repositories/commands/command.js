const wrapper = require('../../../../../helpers/utils/wrapper')
const product = require('../model/user_model')

const insert = async (payload) => {
    return product.create(payload, {raw: true}).then(data => {
        return wrapper.data(data.dataValues);
    }).catch(err => {
        return wrapper.error(err)
    })
};

const update = async (payload) => {
    return product.update(payload, { where: {
        id: payload.id
    } }).then(data => {
        return wrapper.data(data.dataValues);
    }).catch(err => {
        return wrapper.error(err)
    })
};

module.exports = {
    insert,
    update
};

