const db = require('../database/db');

// Criar um novo cargo
async function createCargo({ nome, descricao, imagem_url }) {
  const [result] = await db.query('INSERT INTO cargos (nome, descricao, imagem_url) VALUES (?, ?, ?)', [nome, descricao, imagem_url]);
  return { cargo_id: result.insertId, nome, descricao, imagem_url };
}

// Obter todos os cargos
async function getCargos() {
  const rows = await db.query('SELECT * FROM cargos');
  return rows;
}

// Obter um cargo por ID
async function getCargoById(id) {
  const rows = await db.query('SELECT * FROM cargos WHERE cargo_id = ?', [id]);
  return rows;
}

// Atualizar um cargo por ID
async function updateCargo(id, { nome, descricao, imagem_url }) {
  const [result] = await db.query('UPDATE cargos SET nome = ?, descricao = ?, imagem_url = ? WHERE cargo_id = ?', [nome, descricao, imagem_url, id]);
  return result.affectedRows > 0;
}

// Excluir um cargo por ID
async function deleteCargo(id) {
  const [result] = await db.query('DELETE FROM cargos WHERE cargo_id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createCargo,
  getCargos,
  getCargoById,
  updateCargo,
  deleteCargo,
};
