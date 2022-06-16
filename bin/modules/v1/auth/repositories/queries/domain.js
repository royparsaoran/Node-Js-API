const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../../../../helpers/error');
const config = require('../../../../../infra/configs/global_config');
const wrapper = require('../../../../../helpers/utils/wrapper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const query = require('./query');

class auth {

    async login(data) {
        let queryData = await query.findByEmail({
            email: data.email
        });

        if (queryData.data == null) return wrapper.error(new NotFoundError('Email not found'))
        const validPassword = await bcrypt.compare(data.password, queryData.data.password)

        if(!validPassword){
            return wrapper.error(new UnauthorizedError('Invalid Password'))
        }

        const userdata = queryData.data
        const token = await jwt.sign({ id: userdata.id, email: userdata.email }, config.get('/jwtPrivateKey'), {
            expiresIn: '24h',
        });

        userdata.token = token;
        delete userdata.password

        if (queryData.err) return wrapper.error(new BadRequestError('Bad Request'))
        return wrapper.data(userdata);
    }

}

module.exports = auth;
