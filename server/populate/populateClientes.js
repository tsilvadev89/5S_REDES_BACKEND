const bcrypt = require('bcrypt');
const { Cliente } = require('../models');

async function populateClientes() {
  console.log('Inserindo dados de clientes...');
  
  // Senha padrão para os testes
  const defaultPassword = '123456789';
  
  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Array de clientes para inserir
  const clientesData = [
    {
      primeiro_nome: 'Carla',
      sobrenome: 'Silva',
      email: 'carla.silva@example.com',
      data_nascimento: '1995-01-10',
      imagem_url: 'https://images.unsplash.com/photo-1685534346360-bb9a018df02a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      primeiro_nome: 'Julia',
      sobrenome: 'Santos',
      email: 'julia.santos@example.com',
      data_nascimento: '1992-02-15',
      imagem_url: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      primeiro_nome: 'Lucas',
      sobrenome: 'Almeida',
      email: 'lucas.almeida@example.com',
      data_nascimento: '1990-05-30',
      imagem_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      primeiro_nome: 'Marta',
      sobrenome: 'Pereira',
      email: 'marta.pereira@example.com',
      data_nascimento: '1988-12-12',
      imagem_url: 'https://plus.unsplash.com/premium_photo-1683143646126-df3a3f3739f3?q=80&w=1974&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      primeiro_nome: 'Pedro',
      sobrenome: 'Costa',
      email: 'pedro.costa@example.com',
      data_nascimento: '1995-08-25',
      imagem_url: 'https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=2070&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  try {
    // Adiciona a senha criptografada a cada objeto de cliente
    const clientesComSenha = clientesData.map(cliente => ({
      ...cliente,
      senha: hashedPassword,
    }));

    // Insere no banco
    await Cliente.bulkCreate(clientesComSenha);
    console.log('Clientes inseridos.');
  } catch (error) {
    console.error('Erro ao inserir clientes:', error);
  }
}

module.exports = populateClientes;
