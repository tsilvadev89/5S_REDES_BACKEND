// populate/populateProdutos.js
const { Produto } = require('../models');

async function populateProdutos() {
  console.log('Inserindo dados de produtos...');
  await Produto.bulkCreate([
    {
      nome: 'Shampoo Reconstrutor',
      descricao: 'Repara cabelos danificados',
      preco: 30.00,
      estoque: 100,
      categoria_id: 5,
      imagem_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Condicionador Hidratação',
      descricao: 'Para hidratação intensa',
      preco: 25.00,
      estoque: 80,
      categoria_id: 5,
      imagem_url: 'https://images.unsplash.com/photo-1686121544831-3f5a03770e21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Máscara Capilar',
      descricao: 'Nutrição profunda',
      preco: 50.00,
      estoque: 60,
      categoria_id: 6,
      imagem_url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Óleo Capilar',
      descricao: 'Dá brilho aos cabelos',
      preco: 40.00,
      estoque: 50,
      categoria_id: 6,
      imagem_url: 'https://images.unsplash.com/photo-1669281393011-c335050cf0e9?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Esmalte Rosa',
      descricao: 'Longa duração',
      preco: 10.00,
      estoque: 150,
      categoria_id: 7,
      imagem_url: 'https://media.istockphoto.com/id/960165554/pt/foto/nail-polish-with-shadow.jpg?s=2048x2048&w=is&k=20&c=Bf6nr_wq7p3lfBv5o-p7QKsOEUkCI8Akib20ZV7aDhk=',
    },
  ]);
  console.log('Produtos inseridos.');
}

module.exports = populateProdutos;
