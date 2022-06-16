const query = require('./query');
const wrapper = require('../../../../../helpers/utils/wrapper');
const { BadRequestError, NotFoundError } = require('../../../../../helpers/error');
const { Op } = require("sequelize");
class user {

    async get(payload) {
        let queryData = await query.get(payload);
        if (queryData.data.length < 1) return wrapper.error(new NotFoundError('Data not found'))
        if (queryData.err) return wrapper.error(new BadRequestError('Bad Request'))
        
        let ret = []
        for (let index = 0; index < queryData.data.length; index++) {
            const element = queryData.data[index];
            ret.push(element)
        }
        return wrapper.data(ret);
    }

    async findById(data) {
        let queryData = await query.findById(data);
        if (queryData.data == null) return wrapper.error(new NotFoundError('Data not found'))
        if (queryData.err) return wrapper.error(new BadRequestError('Bad Request'))

        const userdata = queryData.data;
        
        return wrapper.data(userdata);
    }

}

module.exports = user;
