const command = require('./command');
const query = require('../queries/query');
const wrapper = require('../../../../../helpers/utils/wrapper');
const { BadRequestError, ConflictError } = require('../../../../../helpers/error');
const user = require('../../../users/repositories/commands/domain');
const bcrypt = require('bcryptjs');

class auth {

    async register(data) {

        let userData = await query.findByEmail({email: data.email})
        if(userData.data != null){
            return wrapper.error(new ConflictError('Email already registered'));
        }
        const salt = bcrypt.genSaltSync(10);
        const payload = {
            name: data.name,
            email: data.email, 
            password: bcrypt.hashSync(data.password, salt),
            role: user, 
        }

        let dbInsert = await command.register(payload);
        delete dbInsert.data.password
        if(dbInsert.err  === null) return wrapper.data(dbInsert.data)
        return wrapper.error(new BadRequestError('Bad Request'));
    }
    
}

module.exports = auth;
