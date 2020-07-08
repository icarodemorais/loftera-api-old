const express = require('express');
const routes = require('./app/src/routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log("running on port 3000");
});