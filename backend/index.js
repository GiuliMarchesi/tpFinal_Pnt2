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
const rolAdmin = "admin"
const rolChofer = "chofer"

const lista = [{ id: 1, name: 'Charly' }, { id: 200, name: 'Jhon' }]

const autos = [
  {
    "id": 16598339,
    "nombre": "Ford F-150 Regular Cab",
    "foto": "https://s.car.info/image_files/90/552130.jpg"
  },
  {
    "id": 16354121,
    "nombre": "Shelby Mustang",
    "foto": "https://s.car.info/image_files/90/577064.jpg"
  },
  {
    "id": 71794,
    "nombre": "Chevrolet Corvette",
    "foto": "https://s.car.info/image_files/90/1248070.jpg"
  },
  {
    "id": 64932,
    "nombre": "Toyota Hilux",
    "foto": "https://s.car.info/image_files/90/201821.jpg"
  }
]
const contraseniaDefault = "1234";

const users = [
  { id: 1, email: "admin@admin.com", password: contraseniaDefault, 'rol': rolAdmin },
  { id: 2, email: "tset@test.com", password: contraseniaDefault, 'rol': rolChofer, choferId: 1 },
]

const viajes = [
  {
    id: 1,
    origen: "Avenida Falsa 123",
    destino: "Boulevard Largavida 457",
    choferId: 1,
    autoId: 16354121,
    precio: 25000
  }
]

app.get('/lista', (req, res) => {
  if (req.headers['authorization'] !== undefined) {
    const bearerToken = req.headers['authorization'];
    const bearer = bearerToken.split(' ');
    const token = bearer[1];
    jsonwebtoken.verify(token, 'clave_secreta', (err, payload) => {
      if (err) {
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
  const { nombre, apellido, dni } = req.body;
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


app.delete('/lista/:id', (req, res) => {
  // console.log(req.params.id);
  // lista = lista.filter(e=>e.id!=req.params.id)
  const index = lista.findIndex(e => e.id == req.params.id);
  lista.splice(index, 1)

  // lista.pop(index)
  res.status(200).json({ message: 'ok' })
})


app.put('/lista/:id', (req, res) => {
  //console.log(req.body);
  //console.log(req.params.id);
  const index = lista.findIndex(e => e.id == req.params.id);
  lista[index] = req.body
  res.status(200).json({ message: 'ok' })
  // falta manejo de errores
  // res.status(404).json({message:'error'})
})

app.post('/login', (req, res) => {
  if (req.body) {
    //Verificar estructura
    const user = req.body;
    const userDb = users.find(u => u.email == user.email && u.password == user.password)
    if (userDb) {
      delete userDb.password
      const userRol = userDb["rol"];
      const token =
        jsonwebtoken.sign({ email: user.email, rol: userRol }, 'clave_secreta')
      res.json({ token: token, usuario: userDb })
    } else {
      res.status(400).json({ message: 'Email y password invalido' })
    }
  } else {
    res.status(404).json({ message: 'Not Found' })
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
  autos.push(auto)
  res.json("ok")
})

app.get('/autos', (req, res) => {
  res.json(autos)
})

app.listen(port, function () {
  console.log("Server is running on port " + port);
});

app.get("/viajes", (_req, res) => {
  const viajesConIncludes = viajes.map((viaje) => {
    const auto = autos.find((auto) => auto.id === viaje.autoId);
    const chofer = lista.find((chofer) => chofer.id === viaje.choferId);
    return { ...viaje, auto, chofer };

  })
  res.json(viajesConIncludes)
});

app.post("/viajes", (req, res) => {
  if (!req.body.viaje) {
    return res.status(400).json({ message: 'Faltan campos requeridos en la creción del viaje' });
  }
  const { origen, destino, choferId, autoId, precio } = req.body.viaje;
  const lastId = viajes.length > 0 ? viajes[viajes.length - 1].id : 0;
  const newId = lastId + 1;
  if (origen && destino && choferId && autoId && precio) {
    const newViaje = {
      id: newId,
      origen,
      destino,
      choferId,
      autoId,
      precio
    };
    viajes.push(newViaje);
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Faltan campos requeridos en la creción del viaje' });
  }
});

app.delete("/viajes/:id", (req, res) => {
  const { id } = req.params;
  const index = viajes.findIndex((viaje) => viaje.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Viaje not found' });
  }
  viajes.splice(index, 1);
  res.status(200).json({ message: 'OK' });
});

