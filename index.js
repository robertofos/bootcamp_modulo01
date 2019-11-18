const express = require('express');
//cria um servidor
const server = express();

server.use(express.json());

//query params = ?teste =1
//route params  =/users/1
//CRUD - Create, Read

//request body {"name": "Diego"}
const users = ['Diego','Robson','Victor'];
//Midleware vai ser chamado independete da Rota ( interceptador)
//Midle de log faz o log da aplicação
server.use((req,res,next)=>{
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkUserExist(req,res,next){
  if(!req.body.name){
    return res.status(400).json({error: 'User name is required'});
    }
    return next();
}

server.get('/users',(req,res)=>{
  return res.json(users);
})

function checkUserInArray(req,res,next){
    const user = users[req.params.index];

    if(!user){
    return res.status(400).json({error: 'User does not exists'});
  }

    req.user = user;

    return next();
}

//apresenta um usuario
server.get('/users/:index',checkUserInArray,(req,res) =>{

  return (res.json(req.user));

//criada uma rota
/*server.get('/users/:id',(req,res) =>{
 const id = req.params.id;
  return (res.json({message: `buscando o usuario ${id}` }));*/
})

//criar usuario
server.post('/users',checkUserExist,(req,res)=>{
  const {name}= req.body;
  
  users.push(name);
    
  return res.json(users);
});

//alterar usuario
server.put('/users/:index',checkUserExist,checkUserInArray,(req,res)=>{
  const {index} = req.params;
  const {name}  = req.body;

  users[index]=name;

  return res.json(users);
});

//apgar o usuario
server.delete('/users/:index',checkUserInArray,(req,res)=>{
  const {index} = req.params;
  
  users.splice(index,1);

  return res.send();
});

//define a porta do servidor
server.listen(3000);