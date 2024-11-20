const bcrypt = require('brcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    /*agregar todas las excepciones, email invalido, pasword invalida, el password debe contener mas de 8 caracteres*/
    return res.status(400).json({ message: 'Datos invalidos' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (email, password) VALUES (?,?)',
    [email, hashedPassword]
  );

  res
    .status(201)
    .json({ messge: 'Usuario registrado', userId: result.insertId });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const user = rows[0];
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };
