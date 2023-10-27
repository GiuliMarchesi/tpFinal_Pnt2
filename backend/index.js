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
// const lista = [{id:100,name:'Charly'},{id:200,name:'Jhon'}]
const lista = [{}]

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
// app.post('/lista', (req,res) =>{
//     //console.log(req.body);
//     lista.push(req.body)
//     res.status(200).json({message:'ok'})
// })

app.post('/lista', (req, res) => {
  // Genera un nuevo ID basado en el último ID de la lista
  const lastId = lista.length > 0 ? lista[lista.length - 1].id : 0;
  const newId = lastId + 1;

  const {nombre, apellido, dni} = req.body;
  // Crea un nuevo objeto con el ID autoincrementado
  const newChofer = {
    id: newId,
    nombre,
    apellido,
    dni,
  };

  // Agrega el nuevo elemento a la lista
  lista.push(newChofer);

  res.status(200).json({ message: 'OK' });
});


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

const rolAdmin = "admin"
const rolChofer = "chofer"

const users = [
  {email: "admin@admin.com",password:"1234",'rol':rolAdmin},
  {email: "tset@test.com",password:"1234",'rol':rolChofer},
]


app.post('/login',(req,res)=>{
  if(req.body){
    //Verificar estructura
    const user = req.body;
    const userDb = users.find(u=>u.email == user.email && u.password == user.password)
    if (userDb){
        delete userDb.password 
        const userRol = userDb["rol"];
        const token = 
          jsonwebtoken.sign({email:user.email,rol:userRol},'clave_secreta')
        res.json({token:token, usuario:userDb})
      }else{
        res.status(400).json({message:'Email y password invalido'})
      }
    }else{
      res.status(404).json({message:'Not Found'})
    }
})

app.get("/autos/search", async (req, res) => {
  const { q } = req.query;
  const rt = await fetch(`https://www.car.info/en-se/search/super/${q}`);
  try {
    const data = await rt.json();
    const cars = data.hits.cars.slice(0, 5);
    res.json(cars);
  } catch (error) {
    res.json([])
  }
})

app.post("/autos", async (req, res) => {
  const { auto } = req.body;
  res.json("ok")
})

app.listen(port, function() {
  console.log("Server is running on port " + port);
});