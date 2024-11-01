const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function populateData() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Inserindo dados de cargos
    await connection.query(`
      INSERT INTO cargos (nome, descricao)
      VALUES 
        ('Cabeleireiro', 'Especialista em cortes e penteados'),
        ('Manicure', 'Especialista em cuidados das unhas'),
        ('Esteticista', 'Especialista em tratamentos estéticos'),
        ('Colorista', 'Especialista em coloração capilar'),
        ('Recepcionista', 'Responsável pelo atendimento ao cliente')
    `);

    // Inserindo dados de funcionários
    await connection.query(`
      INSERT INTO funcionarios (primeiro_nome, sobrenome, email, cargo_id, data_contratacao)
      VALUES 
        ('Ana', 'Silva', 'ana.silva@example.com', 1, '2021-01-15'),
        ('Beatriz', 'Oliveira', 'beatriz.oliveira@example.com', 2, '2020-08-20'),
        ('Clara', 'Martins', 'clara.martins@example.com', 3, '2019-07-12'),
        ('Diana', 'Souza', 'diana.souza@example.com', 4, '2021-03-10'),
        ('Elisa', 'Costa', 'elisa.costa@example.com', 5, '2022-05-05')
    `);

    // Inserindo categorias de produtos
    await connection.query(`
      INSERT INTO categorias (nome, descricao)
      VALUES 
        ('Tratamento Capilar', 'Produtos para cuidados com o cabelo'),
        ('Cosméticos', 'Produtos de maquiagem e cuidados com a pele'),
        ('Cuidados com a Pele', 'Produtos para hidratação e limpeza da pele'),
        ('Cuidados com as Unhas', 'Produtos para manicures e pedicures'),
        ('Perfumes', 'Perfumes e fragrâncias')
    `);

    // Inserindo produtos para o salão
    await connection.query(`
      INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id)
      VALUES 
        ('Shampoo Reconstrutor', 'Repara cabelos danificados', 30.00, 100, 1),
        ('Condicionador Hidratação', 'Para hidratação intensa', 25.00, 80, 1),
        ('Máscara Capilar', 'Nutrição profunda', 50.00, 60, 1),
        ('Óleo Capilar', 'Dá brilho aos cabelos', 40.00, 50, 1),
        ('Esmalte Rosa', 'Longa duração', 10.00, 150, 4)
    `);

    // Inserindo imagens para produtos
    await connection.query(`
      INSERT INTO imagens_produtos (produto_id, imagem_url)
      VALUES 
        (1, 'https://example.com/img/shampoo.jpg'),
        (2, 'https://example.com/img/condicionador.jpg'),
        (3, 'https://example.com/img/mascara.jpg'),
        (4, 'https://example.com/img/oleo.jpg')
    `);

    // Inserindo serviços para o salão
    await connection.query(`
      INSERT INTO servicos (nome, descricao, preco, duracao)
      VALUES 
        ('Corte de Cabelo Feminino', 'Corte e finalização', 50.00, '00:45:00'),
        ('Manicure Completa', 'Cuidados e esmaltação', 30.00, '00:40:00')
    `);

    // Inserindo imagens para serviços
    await connection.query(`
      INSERT INTO imagens_servicos (servico_id, imagem_url)
      VALUES 
        (1, 'https://example.com/img/corte.jpg'),
        (2, 'https://example.com/img/manicure.jpg')
    `);

    // Inserindo clientes
    await connection.query(`
      INSERT INTO clientes (primeiro_nome, sobrenome, email, data_nascimento)
      VALUES 
        ('Carla', 'Silva', 'carla.silva@example.com', '1995-01-10'),
        ('Julia', 'Santos', 'julia.santos@example.com', '1992-02-15')
    `);

    // Inserindo endereços para clientes e funcionários
    await connection.query(`
      INSERT INTO enderecos (entidade_id, tipo_entidade, logradouro, numero, bairro, cidade, estado, cep)
      VALUES 
        (1, 'cliente', 'Rua A', '123', 'Centro', 'São Paulo', 'SP', '01000-000'),
        (2, 'cliente', 'Rua B', '456', 'Vila', 'Rio de Janeiro', 'RJ', '22000-000'),
        (1, 'funcionario', 'Rua C', '789', 'Bairro X', 'Salvador', 'BA', '40000-000')
    `);

    // Inserindo pedidos e itens para cada cliente
    for (let clienteId = 1; clienteId <= 2; clienteId++) {
      const [pedidoResult] = await connection.query(
        'INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)',
        [clienteId, 100.00]
      );

      const pedidoId = pedidoResult.insertId;

      for (let produtoId = 1; produtoId <= 3; produtoId++) {
        await connection.query(
          'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
          [pedidoId, produtoId, 2, 15.00]
        );
      }

      // Inserindo agendamentos para cada cliente
      for (let i = 1; i <= 2; i++) {
        const servicoId = i;
        const funcionarioId = ((i % 2) + 1);

        await connection.query(
          'INSERT INTO agendamentos (cliente_id, servico_id, funcionario_id, data_hora, status) VALUES (?, ?, ?, NOW() + INTERVAL ? DAY, ?)',
          [clienteId, servicoId, funcionarioId, i, 'confirmado']
        );
      }
    }

    console.log('Dados de teste inseridos com sucesso.');

  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await connection.end();
    console.log("Conexão com o banco de dados fechada.");
  }
}

populateData();
