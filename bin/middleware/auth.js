const jwt = require('jsonwebtoken');
const config = require('../../bin/infra/configs/global_config');

module.exports = function (req, res, next) {
    const token = req.header('x-api-key');
    if (!token)

        return res.status(401).send({
            success: false,
            message: 'Unauthorized',
        });

    try {
        const decoded = jwt.verify(token, config.get('/jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        if (!token) {
            return res.status(401).send({ success: false, data: null, message: 'Unauthorized' });
        }
        return res.status(401).send({ success: false, data: null, message: ex.message });
    }
};
