import express from 'express'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken';

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
app.get('/ping', (req, res) => {
  res.send('pong')
})
const lista = [{id:100,name:'Charly'},{id:200,name:'Jhon'}]

app.get('/lista', (req, res) => {
  if(req.headers['authorization']!==undefined) {
    const bearerToken = req.headers['authorization'];
    const bearer = bearerToken.split(' ');
    const token = bearer[1];
    jsonwebtoken.verify(token,'clave_secreta',(err, payload) => {
      if(err) {
        res.sendStatus(401);
      } else {
        res.json(lista);
      }
    })
    } else {
      res.sendStatus(401);
    }
})
app.post('/lista', (req,res) =>{
    //console.log(req.body);
    lista.push(req.body)
    res.status(200).json({message:'ok'})
})
app.delete('/lista/:id', (req,res) =>{
    // console.log(req.params.id);
    // lista = lista.filter(e=>e.id!=req.params.id)
    const index = lista.findIndex(e=>e.id==req.params.id);
    lista.pop(index)
    res.status(200).json({message:'ok'})
})
app.put('/lista/:id', (req,res) =>{
    //console.log(req.body);
    //console.log(req.params.id);
    const index = lista.findIndex(e=>e.id==req.params.id);
    lista[index]=req.body
    res.status(200).json({message:'ok'})
    // falta manejo de errores
    // res.status(404).json({message:'error'})
})

const users = [
  {email: "admin@test.com",password:"1234",'rol':'admin'},
  {email: "user@test.com",password:"1234",'rol':'user'},
]


app.post('/login',(req,res)=>{
  if(req.body){
    //Verificar estructura
    const user = req.body;
    const userDb = users.find(u=>u.email == user.email && u.password == user.password)
    if (userDb){
        console.log(userDb)
        const token = 
          jsonwebtoken.sign({email:user.email,rol:'adm'},'clave_secreta')
        res.json({token:token})
        res.status(200).json({message:'ok'})
      }else{
        res.status(400).json({message:'Email y password invalido'})
      }
    }else{
      res.status(404).json({message:'Not Found'})
    }
})

app.listen(port, function() {
  console.log("Server is running on port " + port);
});