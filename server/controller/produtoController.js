const produtoModel = require('../models/produtoModel');

// Criar um novo produto
async function createProduto(req, res) {
  const { nome, descricao, preco, estoque, categoria_id } = req.body;
  try {
    const produto = await produtoModel.createProduto({ nome, descricao, preco, estoque, categoria_id });
    res.status(201).json({ message: 'Produto criado com sucesso', produto });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar produto', error: err });
  }
}

// Obter todos os produtos
async function getProdutos(req, res) {
  try {
    const produtos = await produtoModel.getProdutos();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter produtos', error: err });
  }
}

// Obter um produto por ID
async function getProdutoById(req, res) {
  const { id } = req.params;
  try {
    const produto = await produtoModel.getProdutoById(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter produto', error: err });
  }
}

// Atualizar um produto por ID
async function updateProduto(req, res) {
  const { id } = req.params;
  const { nome, descricao, preco, estoque, categoria_id } = req.body;
  try {
    const updated = await produtoModel.updateProduto(id, { nome, descricao, preco, estoque, categoria_id });
    if (updated) {
      res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err });
  }
}

// Excluir um produto por ID
async function deleteProduto(req, res) {
  const { id } = req.params;
  try {
    const deleted = await produtoModel.deleteProduto(id);
    if (deleted) {
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: err });
  }
}

module.exports = {
  createProduto,
  getProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto
};
