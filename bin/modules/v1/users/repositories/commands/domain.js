const command = require('./command');
const wrapper = require('../../../../../helpers/utils/wrapper');
const { BadRequestError } = require('../../../../../helpers/error');
const commonUtil = require('../../../../../helpers/utils/common');
const config = require('../../../../../../bin/infra/configs/hash_config')

class user {

    async insert(data) {
        const cryptoConfig = config.get('/crypto'); 
        data.password = await commonUtil.encrypt(data.password, cryptoConfig.algorithm, cryptoConfig.secretKey)
        let dbInsert = await command.insert(data);
        if(dbInsert.err  === null) return wrapper.data(dbInsert.data)
        return wrapper.error(new BadRequestError('Bad Request'));
    }

    async update(data) {
        let dbUpdate = await command.update(data);
        if (dbUpdate.err === null) return wrapper.data(dbUpdate.data)
        return wrapper.error(new BadRequestError('Bad Request'));
    }

}

module.exports = user;
