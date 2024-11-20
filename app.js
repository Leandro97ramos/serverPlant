const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/plants', plantRoutes);
app.use('/sensors', sensorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puesto ${PORT}`));
