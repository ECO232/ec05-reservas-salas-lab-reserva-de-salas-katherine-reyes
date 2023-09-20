const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require ('cors');
app.use(cors())

let users = [];
let rooms = [];
let reserve = [];

//users
app.get('/users', (req,res) => {
    let newuser = {
        name:req.body.name,
        lastname:req.body.lastname,
        identification:req.body.identification,
    }
    console.log(newuser);
    users.push(newuser)
    res.send('user created successfully')
})

app.get('/users', (req,res) => {
    res.send({"users": users})
})

users.push ({
    name:"",
    lastname: "",
    identification: "",
})


//rooms

//reserve

//Start the Server
app.listen(port,() => {
    console.log('Listening on port ${port}')
})