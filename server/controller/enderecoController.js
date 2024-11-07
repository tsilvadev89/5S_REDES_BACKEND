const enderecoModel = require('../models/enderecoModel');

async function createEndereco(req, res) {
  const { entidade_id, tipo_entidade, logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url } = req.body;
  try {
    const endereco = await enderecoModel.createEndereco({ entidade_id, tipo_entidade, logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url });
    res.status(201).json({ message: 'Endereço criado com sucesso', endereco });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar endereço', error: err });
  }
}

async function getEnderecos(req, res) {
  try {
    const enderecos = await enderecoModel.getEnderecos();
    res.status(200).json(enderecos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter endereços', error: err });
  }
}

async function getEnderecoById(req, res) {
  const { id } = req.params;
  try {
    const endereco = await enderecoModel.getEnderecoById(id);
    endereco ? res.status(200).json(endereco) : res.status(404).json({ message: 'Endereço não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter endereço', error: err });
  }
}

async function updateEndereco(req, res) {
  const { id } = req.params;
  const { logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url } = req.body;
  try {
    const updated = await enderecoModel.updateEndereco(id, { logradouro, numero, complemento, bairro, cidade, estado, cep, imagem_url });
    updated ? res.status(200).json({ message: 'Endereço atualizado com sucesso' }) : res.status(404).json({ message: 'Endereço não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar endereço', error: err });
  }
}

async function deleteEndereco(req, res) {
  const { id } = req.params;
  try {
    const deleted = await enderecoModel.deleteEndereco(id);
    deleted ? res.status(200).json({ message: 'Endereço excluído com sucesso' }) : res.status(404).json({ message: 'Endereço não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir endereço', error: err });
  }
}

module.exports = {
  createEndereco,
  getEnderecos,
  getEnderecoById,
  updateEndereco,
  deleteEndereco,
};
