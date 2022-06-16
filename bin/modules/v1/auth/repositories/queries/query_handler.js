const domain = require('./domain');

const login = async (data) => {
    
    const login = async () => {
        const d = new domain;
        const result = await d.login(data);
        return result;
    };
    const response = await login();
    return response;
};


module.exports = {
    login
};
