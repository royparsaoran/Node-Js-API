const appServer = require('./bin/app/server')

const port = process.env.port || 9001;

appServer.app.listen(port, () => {
    console.log(`Service started, listening to port ${port}`);
})