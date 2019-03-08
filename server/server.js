const express = require('express');
const massive = require('massive');
const session = require('express-session')
require('dotenv').config()



const { CONNECTION_STRING, SERVER_PORT, SECRET } = process.env;

const app = express();
app.use(express.json());

app.use(express.static(`${__dirname}/../build`));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))





massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => { console.log('Battle cruiser operational') })
})

app.post('/auth/register', async (req, res) => {
    console.log('register hit', req.body)
    const db = req.app.get('db');
    let response = await db.create_user(req.body);
    req.session.user = { id: response[0].id, name: response[0].name }
    res.status(200).send({ user: req.session.user })
})

app.get('/auth/login/:name/:pass', async (req, res) => {
    const db = req.app.get('db');
    let response = await db.find_user(req.params);
    console.log(response)
    req.session.user = { id: response[0].id, name: response[0].name }
    res.status(200).send({ user: req.session.user })
})

app.delete(`/auth/delete/:name`, async (req, res) => {
    const db = req.app.get('db');
    await db.delete_user({ name: req.params, id: req.session.user.id });
    res.status(201).send({ message: 'deleted' })
})

app.put(`/auth/edit/:newName`, async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.session.user
    const { newName } = req.params
    let response = await db.edit({ name: newName, id: id });
    res.status(201).send(response.data)
})

app.get('/get/data/search/:query', async (req, res) => {
    console.log(req.params)
    const db = req.app.get('db');
    const { id } = req.session;
    const { query } =req.params
    let response = await db.get_data(id, query)
    res.status(200).send(response)
})

