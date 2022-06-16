const domain = require('./domain');

const get = async (data) => {
    
    const get = async () => {
        const d = new domain;
        const result = await d.get(data);
        return result;
    };
    const response = await get();
    return response;
};

const findById = async (data) => {

    const findById = async () => {
        const d = new domain;
        const result = await d.findById(data);
        return result;
    };
    const response = await findById();
    return response;
};

module.exports = {
    get,
    findById
};
