const domain = require('./domain');

const insert = async (data) => {
    const insert = async () => {
        const d = new domain;
        const result = await d.insert(data);
        return result;
    };
    const response = await insert();
    return response;
};

const update = async (data) => {
    const update = async () => {
        const d = new domain;
        const result = await d.update(data);
        return result;
    };
    const response = await update();
    return response;
};

module.exports = {
    insert,
    update
};
