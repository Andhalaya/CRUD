const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req,res) => {
    res.send(`
        <h1>Lista de usuarios</h1>
        <ul>
            ${usuarios.map((usuario) => 
                `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Lugar de procedencia: ${usuario.lugarProcedencia} </li>`)
                .join('')}
        </ul>
        <form action="/usuarios" method="post">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="edad">Edad</label>
            <input type="text" id="edad" name="edad" required>
            <label for="lugarProcedencia">Lugar de procedencia</label>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
            <button type="submit">Agregar usuario</button>
        </form>
        <a href="/usuarios">USUARIOS JSON</a>
    `);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.get('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === nombreUsuario);
    if(usuarioEncontrado) {
        res.send(`
        <h2>Usuario Encontrado</h2>
            <p>ID: ${usuarioEncontrado.id}</p>
            <p>Nombre: ${usuarioEncontrado.nombre}</p>
            <p>Edad: ${usuarioEncontrado.edad}</p>
            <p>Lugar de Procedencia: ${usuarioEncontrado.lugarProcedencia}</p>
        `)
    } else {
        res.status(404).send('Usuario no encontrado');
    }
})

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Express esta escuchando en el puerto http://localhost:3000');
});