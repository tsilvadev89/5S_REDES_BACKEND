const { Categoria } = require('../models');

// Criar uma nova categoria
exports.createCategoria = async (req, res) => {
  try {
    const { nome, descricao, imagem_url } = req.body;
    const categoria = await Categoria.create({ nome, descricao, imagem_url });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria', error });
  }
};

// Obter todas as categorias
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter categorias', error });
  }
};

// Obter uma categoria por ID
exports.getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter categoria', error });
  }
};

// Atualizar uma categoria por ID
exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, imagem_url } = req.body;
    const [updated] = await Categoria.update({ nome, descricao, imagem_url }, { where: { categoria_id: id } });
    if (updated) {
      const updatedCategoria = await Categoria.findByPk(id);
      res.status(200).json(updatedCategoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error });
  }
};

// Excluir uma categoria por ID
exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Categoria.destroy({ where: { categoria_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir categoria', error });
  }
};
