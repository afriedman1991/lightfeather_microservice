const express = require('express');
const port = process.env.PORT || 5000;
const expressApp = require('./app');

const RunServer = async() => {
    let app = express();

    await expressApp(app);

    app.listen(port, () => console.log(`Listening on port ${port}`))
    .on('error', (err) => {
        console.log(`Server failed to start: ${err}`);
        process.exit();
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

RunServer();
