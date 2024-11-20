const db = require('../config/db');

const getPlants = async (req, res) => {
  const [plants] = await db.query('SELECT * FROM plants');
  res.status(200).json(plants);
};

const createPlant = async (req, res) => {
  const { name, location } = req.body;
  const [result] = await db.query(
    'INSERT INTO plants (name,location) VALUE (?,?)',
    [name, location]
  );
  res
    .status(201)
    .json({ message: 'Planta creada con exito', plantId: result.insertId });
};

const updatePlant = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  await db.query('UPDATE plants SET name = ?, location =? WHERE id = ?', [
    name,
    location,
    id,
  ]);
  res.status(200).json({ message: 'Planta actalizada' });
};

const deletePlant = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM plants WHERE id = ?', [id]);
  res.status(200).json({ message: 'Planta eliminada' });
};

module.exports = { getPlants, createPlant, updatePlant, deletePlant };
