const { Categoria } = require('../models');

async function populateCategorias() {
  console.log('Inserindo categorias de produtos...');
  await Categoria.bulkCreate([
    {
      nome: 'Tratamento Capilar',
      descricao: 'Produtos para cuidados com o cabelo',
      imagem_url: 'https://plus.unsplash.com/premium_photo-1674841253335-6c892a8b1dc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Serviço'
    },
    {
      nome: 'Cosméticos',
      descricao: 'Produtos de maquiagem e cuidados com a pele',
      imagem_url: 'https://images.unsplash.com/photo-1591375462077-800a22f5fba4?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Serviço'
    },
    {
      nome: 'Cuidados com a Pele',
      descricao: 'Produtos para hidratação e limpeza da pele',
      imagem_url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Serviço'
    },
    {
      nome: 'Cuidados com as Unhas',
      descricao: 'Produtos para manicures e pedicures',
      imagem_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Serviço'
    },
    {
      nome: 'Perfumes',
      descricao: 'Perfumes e fragrâncias',
      imagem_url: 'https://images.unsplash.com/photo-1701291927826-c7775869d822?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Serviço'
    },
    {
      nome: 'Shampoo',
      descricao: 'Produtos para cabelo',
      imagem_url: 'https://images.unsplash.com/photo-1701992679010-7cf5dfee49d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Produto'
    },
    {
      nome: 'Maquiagem',
      descricao: 'Produtos de maquiagem e cuidados com a pele',
      imagem_url: 'https://images.unsplash.com/photo-1617220379475-420f5a8a20d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Produto'
    },
    {
      nome: 'Cuidados com a Pele',
      descricao: 'Produtos para hidratação e limpeza da pele',
      imagem_url: 'https://plus.unsplash.com/premium_photo-1679046948909-ab47e96082e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Produto'
    },
    {
      nome: 'Unhas',
      descricao: 'Produtos para manicures e pedicures',
      imagem_url: 'https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Produto'
    },
    {
      nome: 'Perfumes',
      descricao: 'Perfumes e fragrâncias',
      imagem_url: 'https://images.unsplash.com/photo-1590156117763-d5909f5ccbc8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tipo: 'Produto'
    }
  ]);
  console.log('Categorias inseridas.');
}

module.exports = populateCategorias;
