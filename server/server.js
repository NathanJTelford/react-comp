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


app.post(`/add/list/:name`, async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.session.user
    const { name } = req.params
    console.log(req.body, typeof req.body);

    const response = await db.make_list({ name: name, id: id })
    req.session.list = await { id: response[0].id, name: response[0].name }
    await req.body.task.forEach((el) => {
        db.add_item({ name: el.name, bool: false, cost: el.cost, id: req.session.list.id })
    })
    res.status(200).send(response)
})

// requests level middleware

async function uniqueApp (req,res,next){
    const db = req.app.get('db');
    let userArr = await db.check(req.body);
    if(userArr.length > 0){
    return res.redirect('/login')
    }
    
    next()
} 

app.post('/auth/register', uniqueApp, async (req, res) => {
    const db = req.app.get('db');
    let response = await db.create_user(req.body);
    req.session.user = { id: response[0].id, name: response[0].name }
    res.status(200).send({ user: req.session.user })
})

app.get('/auth/login/:name/:pass', async (req, res) => {
    const db = req.app.get('db');
    let response = await db.find_user(req.params);
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

app.get('/lists', async (req,res)=>{
    const db = app.get('db');
    let response = await db.query('select * from list where user_id = 16').catch(error=>{console.log(error);
    })
    res.status(200).send(response)
})

//query endpoint

app.get('/get/data/query', async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    const { q } =req.query
    let response = await db.query(`select ${q} from toDoer where id = ${id}`).catch( error=>{console.log(error)})
    res.status(200).send(response)
})

// routing params
app.get('/list/items/:id', async (req,res)=>{
    const db = app.get('db');
   const items = await  db.query(`select * from list_item where list_id = ${req.params.id}`).catch(error=>{console.log(error);
   })
   res.status(200).send(items)
})

