const express = require('express');
const app = express();
const port = 3000;

// Middleware para entender JSON
app.use(express.json());

// Base de datos en memoria (Simulada)
let usuarios = [
    { id: 1, nombre: "Juan", edad: 20 },
    { id: 2, nombre: "Maria", edad: 22 },
    { id: 3, nombre: "Pedro", edad: 24 }
];

// Endpoint 1: GET raíz (Tu firma personal)
app.get('/', (req, res) => {
    res.send('API REST - Taller Node.js y Express. Creado por: Mendez Padron Gustavo Emanuel');
});

// Endpoint 2: GET /user (Listar usuarios)
app.get('/user', (req, res) => {
    res.json(usuarios);
});

// Endpoint 3: POST /user (Crear usuario)
app.post('/user', (req, res) => {
    const cuerpo = req.body;
    // Autoincremento de ID
    const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
    
    const nuevoUsuario = {
        id: nuevoId,
        nombre: cuerpo.nombre,
        edad: cuerpo.edad
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
        mensaje: "Usuario agregado exitosamente",
        nuevoUsuario,
        usuarios
    });
});

// Endpoint 4: PUT /user/:id (Actualizar usuario)
app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cuerpo = req.body;
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios[index].nombre = cuerpo.nombre || usuarios[index].nombre;
    usuarios[index].edad = cuerpo.edad || usuarios[index].edad;

    res.json({
        mensaje: "Usuario actualizado exitosamente",
        usuarioActualizado: usuarios[index],
        usuarios
    });
});

// Endpoint 5: DELETE /user/:id (Eliminar usuario)
app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioEliminado = usuarios.splice(index, 1);

    res.json({
        mensaje: "Usuario eliminado exitosamente",
        usuarioEliminado,
        usuarios
    });
});

// Iniciar el servidor (Con tu firma en consola)
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Proyecto desarrollado por: Mendez Padron Gustavo Emanuel`);
});