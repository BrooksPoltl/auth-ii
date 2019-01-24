const env = require('dotenv').config()
const express = require('express');
const helmet = require('helmet')
const knex = require('knex')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const knexConfig = require('./knexfile')
const jwt = require('jsonwebtoken')
const port = 5000;
const server = express();
const db = knex(knexConfig.development);

server.use(helmet())
server.use(express.json())
server.use(cors())

const lock = (req,res,next)=> {
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err,decodedToken)=>{
            if(err){
                res.status(401).json({message: 'invalid token'});
            }else{
                req.decodedToken = decodedToken;
                next();
            }
        })
    }else{
        res.status(401).json({ message: 'YOU SHALL NOT PASS PS: please get a token and put it in the header :) '});
    }
}
const checkDepartment = (department) =>{
    return function(req,res,next) {
        if(req.decodedToken.department.includes(department)){
            next();
        } else{
            res.status(403).json({message: 'you are not authorized for this department'})
        }
    }
}
const generateToken = (user)=>{
    const payload = {
        username: user.username,
        name: user.name,
        department: user.department
    }
    const secret = process.env.JWT_SECRET
    const options = {
        expiresIn: '10m',
    }
    return jwt.sign(payload,secret,options)
}


server.post('/api/register', (req, res) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;
    db('users').insert(userInfo)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => res.status(500).json({ errorMessage: userInfo }))
})

server.post('/api/login',(req, res) => {
    const creds = req.body;
    db('users').where({username: creds.username}).first()
    .then(user =>{
        if(user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(200).json({message: `welcome`, token});
        } else{
            res.status(401).json({message: 'You shall not pass'})
        }

    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

server.get('/api/users', lock,(req,res)=>{
    db('users').select('id','username','name','department')
    .then(user=>{
        res.status(200).json({user, decodedToken: req.decodedToken})
    })
})

server.listen(port, () => console.log(`server running on port ${port}`));
