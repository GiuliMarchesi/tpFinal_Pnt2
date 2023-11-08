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

const choferes = [
  { id: 1, nombre: 'Facundo', apellido: 'Costa', dni: '39466144' },
  { id: 2, nombre: 'Marcelo', apellido: 'Gallardo', dni: '09122018' },
  { id: 3, nombre: 'Ezequiel', apellido: 'Gatica', dni: '42424242' },
  { id: 4, nombre: 'Laura', apellido: 'Martinez', dni: '64646464' },
]

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
  { id: 2, email: "facundo@chofer.com", password: contraseniaDefault, 'rol': rolChofer, choferId: 1 },
  { id: 3, email: "marcelo@chofer.com", password: contraseniaDefault, 'rol': rolChofer, choferId: 2 },
  { id: 4, email: "ezequiel@chofer.com", password: contraseniaDefault, 'rol': rolChofer, choferId: 3 },
  { id: 5, email: "laura@chofer.com", password: contraseniaDefault, 'rol': rolChofer, choferId: 4 }
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

app.get('/choferes', (req, res) => {
  const choferesConInclude = choferes.map((chofer) => {
    const usuario = users.find((user) => user.choferId == chofer.id)
    return { ...chofer, user: usuario }
  })
  res.json(choferesConInclude);
})


app.post('/choferes', (req, res) => {
  // Genera unchoferes nuevo ID basado en el último ID de la lista
  const lastId = choferes.length > 0 ? choferes[choferes.length - 1].id : 0;
  const newId = Number(lastId) + 1;
  const { nombre, apellido, dni, email } = req.body;
  // Crea un nuevo objeto con el ID autoincrementado
  const newChofer = {
    id: newId,
    nombre,
    apellido,
    dni,
  };
  // Agrega el nuevo elemento a la lista
  choferes.push(newChofer);
  const newUserId = users.length + 1;
  const newUser = {
    id: newUserId,
    email,
    password: contraseniaDefault,
    rol: rolChofer,
    choferId: newId, // Vincula el chofer al usuario
  };
  // Agrega el nuevo usuario a la lista de usuarios
  users.push(newUser);
  res.status(200).json({ message: 'OK' });
});


app.delete('/choferes/:id', (req, res) => {
  const index = choferes.findIndex(e => e.id == req.params.id);
  const indexUser = users.findIndex(u => u.choferId == req.params.id);
  if (index < 0 || indexUser < 0) {
    return res.status(404).json({ message: 'chofer no encontrado' })
  }
  choferes.splice(index, 1)
  users.splice(indexUser, 1)
  res.status(200).json({ message: 'ok' })
})

app.put('/choferes/:id', (req, res) => {
  const idToUpdate = req.params.id;
  const updatedData = req.body;
  const index = choferes.findIndex(e => e.id == idToUpdate);
  if (index !== -1) {
    // Conserva el ID original en el objeto actualizado
    updatedData.id = idToUpdate;
    choferes[index] = updatedData;
    res.status(200).json({ message: 'ok' });
  } else {
    res.status(404).json({ message: 'ID no encontrado' });
  }
});

app.post('/login', (req, res) => {
  if (req.body) {
    //Verificar estructura
    const user = req.body;
    const userDbReal = users.find(u => u.email == user.email && u.password == user.password)
    if (userDbReal) {
      const userDb = { ...userDbReal }
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

app.get("/viajes", (_req, res) => {
  const viajesConIncludes = viajes.map((viaje) => {
    const auto = autos.find((auto) => auto.id === viaje.autoId);
    const chofer = choferes.find((chofer) => chofer.id === viaje.choferId);
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

app.get("/reportes", (_req, res) => {
  const cantidadUsuarios = users.length;
  const cantidadChoferes = choferes.length;
  const cantidadViajes = viajes.length;
  const cantidadVehiculos = autos.length;
  const recaudacionViajes = viajes.reduce((acc, viaje) => acc + viaje.precio, 0);
  const viajesPorChofer = viajes.reduce((acc, viaje) => {
    if (acc[viaje.choferId]) {
      acc[viaje.choferId] += 1;
    } else {
      acc[viaje.choferId] = 1;
    }
    return acc;
  }, {});

  const recaudacionPorChofer = viajes.reduce((acc, viaje) => {
    if (acc[viaje.choferId]) {
      acc[viaje.choferId] += viaje.precio;
    } else {
      acc[viaje.choferId] = viaje.precio;
    }
    return acc;
  }, {});

  const choferesConViajes = choferes.map((chofer) => {
    const viajes = viajesPorChofer[chofer.id] || 0;
    if (viajes === 0) {
      return null;
    }
    const recaudacion = recaudacionPorChofer[chofer.id] || 0;

    return { ...chofer, viajes, recaudacion };
  }).filter((chofer) => chofer !== null);

  const promedioRecaudacionViajes = recaudacionViajes / cantidadViajes;

  const viajesPorVehiculo = viajes.reduce((acc, viaje) => {
    if (acc[viaje.autoId]) {
      acc[viaje.autoId] += 1;
    } else {
      acc[viaje.autoId] = 1;
    }
    return acc;
  }, {});

  const recaudacionPorVehiculo = viajes.reduce((acc, viaje) => {
    if (acc[viaje.autoId]) {
      acc[viaje.autoId] += viaje.precio;
    } else {
      acc[viaje.autoId] = viaje.precio;
    }
    return acc;
  }, {});

  const vehiculosConViajes = autos.map((auto) => {
    const viajes = viajesPorVehiculo[auto.id] || 0;
    if (viajes === 0) {
      return null;
    }
    const recaudacion = recaudacionPorVehiculo[auto.id] || 0;
    return { ...auto, viajes, recaudacion };
  }).filter((auto) => auto !== null);

  const reporte = {
    cantidadUsuarios,
    cantidadChoferes,
    cantidadViajes,
    cantidadVehiculos,
    recaudacionViajes,
    choferesConViajes,
    promedioRecaudacionViajes,
    vehiculosConViajes
  };

  return res.json(reporte);
});



app.listen(port, function () {
  console.log("Server is running on port " + port);
});