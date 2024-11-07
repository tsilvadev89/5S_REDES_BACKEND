const db = require('../database/db');

async function createEndereco(data) {
  const { entidade_id, tipo_entidade, logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url } = data;
  const [result] = await db.query(
    'INSERT INTO enderecos (entidade_id, tipo_entidade, logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [entidade_id, tipo_entidade, logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url]
  );
  return { endereco_id: result.insertId, ...data };
}

async function getEnderecos() {
  const rows = await db.query('SELECT * FROM enderecos');
  return rows;
}

async function getEnderecoById(id) {
  const rows = await db.query('SELECT * FROM enderecos WHERE endereco_id = ?', [id]);
  return rows;
}

async function updateEndereco(id, data) {
  const { logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url } = data;
  const [result] = await db.query(
    'UPDATE enderecos SET logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, cep = ?, imagem_url = ? WHERE endereco_id = ?',
    [logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url, id]
  );
  return result.affectedRows > 0;
}

async function deleteEndereco(id) {
  const [result] = await db.query('DELETE FROM enderecos WHERE endereco_id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createEndereco,
  getEnderecos,
  getEnderecoById,
  updateEndereco,
  deleteEndereco,
};
