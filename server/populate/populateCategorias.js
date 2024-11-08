const { Categoria } = require('../models');

async function populateCategorias() {
  console.log('Inserindo categorias de produtos...');
  await Categoria.bulkCreate([
    {
      nome: 'Tratamento Capilar',
      descricao: 'Produtos para cuidados com o cabelo',
      imagem_url: 'https://plus.unsplash.com/premium_photo-1674841253335-6c892a8b1dc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      nome: 'Cosméticos',
      descricao: 'Produtos de maquiagem e cuidados com a pele',
      imagem_url: 'https://images.unsplash.com/photo-1591375462077-800a22f5fba4?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      nome: 'Cuidados com a Pele',
      descricao: 'Produtos para hidratação e limpeza da pele',
      imagem_url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      nome: 'Cuidados com as Unhas',
      descricao: 'Produtos para manicures e pedicures',
      imagem_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      nome: 'Perfumes',
      descricao: 'Perfumes e fragrâncias',
      imagem_url: 'https://images.unsplash.com/photo-1701291927826-c7775869d822?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]);
  console.log('Categorias inseridas.');
}

module.exports = populateCategorias;
