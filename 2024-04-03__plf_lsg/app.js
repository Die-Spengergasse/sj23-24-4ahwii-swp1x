const express = require('express');
const app = express();
const port = 3000;
const prisma = require('./lib/db');
app.use('/static', express.static('static'));
app.get('/', async (req, res) => {
    res.send(JSON.stringify(await prisma.zoo.findMany()));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
