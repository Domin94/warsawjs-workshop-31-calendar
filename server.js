const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log('listening on port: ', port);
});

app.use(bodyParser.json());

const data = {};

function getData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data[id]);
        }, 2000);
    });
}

app.get('/data', (req, res) => {
    res.json(data);
});

app.get('/data/:id', async (req, res) => {
    if (!data.hasOwnProperty(req.params.id)) {
        res.status(404).json({ error: 'Not found' });
    }
    const promise = getData(req.params.id);
    const promise2 = getData(req.params.id);

    const value = await promise;
    const value2 = await promise2;

    res.json({ value, value2 });
});

app.put('/data/:id', (req, res) => {
    data[req.params.id] = req.body;
    res.status(201).end();
});

app.post('/data', (req, res) => {
    const id = uuid.v4();
    data[id] = req.body;
    res.status(201).json({ "id": id });
});

app.delete('/data/:id', (req, res) => {
    if (!data.hasOwnProperty(req.params.id)) {
        res.status(404).json({ error: 'Not found' });
    }
    delete data[req.params.id];
    res.status(204).json({ ok: true });
});
