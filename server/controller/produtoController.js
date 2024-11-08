const { Produto } = require('../models');

// Criar um novo produto
exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoria_id, ativo, imagem_url } = req.body;
    const produto = await Produto.create({ nome, descricao, preco, estoque, categoria_id, ativo, imagem_url });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error });
  }
};

// Obter todos os produtos
exports.getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos', error });
  }
};

// Obter um produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produto', error });
  }
};

// Atualizar um produto por ID
exports.updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria_id, ativo, imagem_url } = req.body;
    const [updated] = await Produto.update(
      { nome, descricao, preco, estoque, categoria_id, ativo, imagem_url },
      { where: { produto_id: id } }
    );
    if (updated) {
      const updatedProduto = await Produto.findByPk(id);
      res.status(200).json(updatedProduto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

// Excluir um produto por ID
exports.deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Produto.destroy({ where: { produto_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir produto', error });
  }
};
