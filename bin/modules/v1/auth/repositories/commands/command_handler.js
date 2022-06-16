const domain = require('./domain');

const register = async (data) => {
    const register = async () => {
        const d = new domain;
        const result = await d.register(data);
        return result;
    };
    const response = await register();
    return response;
};

module.exports = {
    register
};
