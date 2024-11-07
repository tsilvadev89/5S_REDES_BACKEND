const categoriaModel = require('../models/categoriaModel');

// Criar uma nova categoria
async function createCategoria(req, res) {
  const { nome, descricao, imagem_url } = req.body;
  try {
    const categoria = await categoriaModel.createCategoria({ nome, descricao, imagem_url });
    res.status(201).json({ message: 'Categoria criada com sucesso', categoria });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar categoria', error: err });
  }
}

// Obter todas as categorias
async function getCategorias(req, res) {
  try {
    const categorias = await categoriaModel.getCategorias();
    res.status(200).json(categorias);
    //console.log(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter categorias', error: err });
  }
}

// Obter uma categoria por ID
async function getCategoriaById(req, res) {
  const { id } = req.params;
  try {
    const categoria = await categoriaModel.getCategoriaById(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter categoria', error: err });
  }
}

// Atualizar uma categoria por ID
async function updateCategoria(req, res) {
  const { id } = req.params;
  const { nome, descricao, imagem_url } = req.body;
  try {
    const updated = await categoriaModel.updateCategoria(id, { nome, descricao, imagem_url });
    if (updated) {
      res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error: err });
  }
}

// Excluir uma categoria por ID
async function deleteCategoria(req, res) {
  const { id } = req.params;
  try {
    const deleted = await categoriaModel.deleteCategoria(id);
    if (deleted) {
      res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir categoria', error: err });
  }
}

module.exports = {
  createCategoria,
  getCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
