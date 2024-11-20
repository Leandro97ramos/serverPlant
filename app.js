const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
// Importar modelos y configuración de la base de datos
const db = require('./config/db'); // Conexión a la base de datos
/*const User = require('./models/userModel');
const Plant = require('./models/plantModel');
*/
const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json()); // Asegúrate de usar este middleware para leer req.body en formato JSON
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/plants', plantRoutes);


app.use(express.static(path.join(__dirname, 'public')))

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'register.html'))
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'))
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'dashboard.html'))
});




(async () => {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    // Sincronizar tablas
    await db.sync({ alter: true }); // Usa `{ force: true }` para borrar y recrear las tablas (solo en desarrollo)
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puesto ${PORT}`));
