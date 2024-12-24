const pool = require('../config/db');

exports.getSources = async (req, res) => {
  try {
    const query = 'SELECT * FROM sources;';
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('failed');
  }
}

exports.createSource = async (req, res) => {
  console.log(req.body)
  const { name, lat, lng, email, phonenumber, worktime, company } = req.body;
  try {
    const result = await pool.query('INSERT INTO sources (name, lat, lng, email, phoneNumber, workTime, company) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, lat, lng, email, phonenumber, worktime, company]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSource = async (req, res) => {
  const { id } = req.params;
  const { name, lat, lng, email, phonenumber, worktime, company } = req.body;
  try {
    const result = await pool.query('UPDATE sources SET name = $1, lat = $2, lng = $3, email = $4, phoneNumber = $5, workTime = $6, company = $7  WHERE id = $8 RETURNING *', [name, lat, lng, email, phonenumber, worktime, company, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSource = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM sources WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};