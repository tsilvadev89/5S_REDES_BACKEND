const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'fatec',
  password: process.env.DB_PASSWORD || 'fatec',
  database: process.env.DB_NAME || 'salao_beleza',
  connectionLimit: 5
};

async function populateData() {
  console.log('Conectando ao banco de dados...');
  const connection = await mysql.createConnection(dbConfig);
  console.log('Conexão com o banco de dados estabelecida.');

  try {
    console.log('Populando dados no banco de dados...');

    // Inserindo dados de cargos
    console.log('Inserindo dados de cargos...');
    await connection.query(`
      INSERT INTO cargos (nome, descricao)
      VALUES 
        ('Cabeleireiro', 'Especialista em cortes e penteados'),
        ('Manicure', 'Especialista em cuidados das unhas'),
        ('Esteticista', 'Especialista em tratamentos estéticos'),
        ('Colorista', 'Especialista em coloração capilar'),
        ('Recepcionista', 'Responsável pelo atendimento ao cliente')
    `);
    console.log('Dados de cargos inseridos.');

    // Inserindo dados de funcionários
    console.log('Inserindo dados de funcionários...');
    await connection.query(`
      INSERT INTO funcionarios (primeiro_nome, sobrenome, email, cargo_id, data_contratacao, imagem_url)
      VALUES 
        ('Ana', 'Silva', 'ana.silva@example.com', 1, '2021-01-15', 'https://example.com/img/ana.jpg'),
        ('Beatriz', 'Oliveira', 'beatriz.oliveira@example.com', 2, '2020-08-20', 'https://example.com/img/beatriz.jpg'),
        ('Clara', 'Martins', 'clara.martins@example.com', 3, '2019-07-12', 'https://example.com/img/clara.jpg'),
        ('Diana', 'Souza', 'diana.souza@example.com', 4, '2021-03-10', 'https://example.com/img/diana.jpg'),
        ('Elisa', 'Costa', 'elisa.costa@example.com', 5, '2022-05-05', 'https://example.com/img/elisa.jpg')
    `);
    console.log('Dados de funcionários inseridos.');

    // Inserindo categorias de produtos
    console.log('Inserindo categorias de produtos...');
    await connection.query(`
      INSERT INTO categorias (nome, descricao, imagem_url)
      VALUES 
        ('Tratamento Capilar', 'Produtos para cuidados com o cabelo', 'https://example.com/img/tratamento_capilar.jpg'),
        ('Cosméticos', 'Produtos de maquiagem e cuidados com a pele', 'https://example.com/img/cosmeticos.jpg'),
        ('Cuidados com a Pele', 'Produtos para hidratação e limpeza da pele', 'https://example.com/img/pele.jpg'),
        ('Cuidados com as Unhas', 'Produtos para manicures e pedicures', 'https://example.com/img/unhas.jpg'),
        ('Perfumes', 'Perfumes e fragrâncias', 'https://example.com/img/perfumes.jpg')
    `);
    console.log('Categorias de produtos inseridas.');

    // Inserindo produtos para o salão
    console.log('Inserindo produtos...');
    await connection.query(`
      INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id, imagem_url)
      VALUES 
        ('Shampoo Reconstrutor', 'Repara cabelos danificados', 30.00, 100, 1, 'https://example.com/img/shampoo.jpg'),
        ('Condicionador Hidratação', 'Para hidratação intensa', 25.00, 80, 1, 'https://example.com/img/condicionador.jpg'),
        ('Máscara Capilar', 'Nutrição profunda', 50.00, 60, 1, 'https://example.com/img/mascara.jpg'),
        ('Óleo Capilar', 'Dá brilho aos cabelos', 40.00, 50, 1, 'https://example.com/img/oleo.jpg'),
        ('Esmalte Rosa', 'Longa duração', 10.00, 150, 4, 'https://example.com/img/esmalte.jpg')
    `);
    console.log('Produtos inseridos.');

    // Inserindo serviços associados a cada categoria
    console.log('Inserindo serviços...');
    await connection.query(`
   INSERT INTO servicos (nome, descricao, preco, duracao, categoria_id, imagem_url)
   VALUES 
     ('Corte de Cabelo Masculino', 'Corte e finalização', 40.00, '00:30:00', 1, 'https://example.com/img/corte_masc.jpg'),
     ('Hidratação Capilar', 'Hidratação para cabelos secos', 60.00, '00:45:00', 1, 'https://example.com/img/hidratacao.jpg'),
     ('Cauterização Capilar', 'Tratamento para reconstrução capilar', 70.00, '01:00:00', 1, 'https://example.com/img/cauterizacao.jpg'),
     ('Coloração', 'Coloração capilar completa', 90.00, '01:30:00', 1, 'https://example.com/img/coloracao.jpg'),
     ('Botox Capilar', 'Redução de volume e hidratação', 80.00, '01:00:00', 1, 'https://example.com/img/botox.jpg'),

     ('Maquiagem Social', 'Maquiagem para eventos sociais', 100.00, '01:00:00', 2, 'https://example.com/img/maquiagem.jpg'),
     ('Sobrancelha Design', 'Design e preenchimento de sobrancelha', 40.00, '00:30:00', 2, 'https://example.com/img/sobrancelha.jpg'),
     ('Limpeza de Pele', 'Limpeza profunda da pele', 120.00, '01:00:00', 2, 'https://example.com/img/limpeza_pele.jpg'),
     ('Peeling Facial', 'Tratamento de rejuvenescimento facial', 150.00, '01:00:00', 2, 'https://example.com/img/peeling.jpg'),
     ('Maquiagem para Noivas', 'Maquiagem especial para noivas', 200.00, '02:00:00', 2, 'https://example.com/img/maquiagem_noiva.jpg'),

     ('Hidratação Facial', 'Hidratação profunda da pele', 50.00, '00:30:00', 3, 'https://example.com/img/hidratacao_facial.jpg'),
     ('Massagem Relaxante', 'Massagem para relaxamento', 90.00, '01:00:00', 3, 'https://example.com/img/massagem.jpg'),
     ('Tratamento Antienvelhecimento', 'Tratamento para pele madura', 200.00, '01:30:00', 3, 'https://example.com/img/antienvelhecimento.jpg'),
     ('Esfoliação Corporal', 'Esfoliação e hidratação corporal', 80.00, '01:00:00', 3, 'https://example.com/img/esfoliacao.jpg'),
     ('Drenagem Linfática', 'Massagem de drenagem linfática', 100.00, '01:00:00', 3, 'https://example.com/img/drenagem.jpg'),

     ('Manicure Tradicional', 'Manicure com esmaltação', 25.00, '00:30:00', 4, 'https://example.com/img/manicure.jpg'),
     ('Pedicure Completa', 'Cuidado completo dos pés', 35.00, '00:40:00', 4, 'https://example.com/img/pedicure.jpg'),
     ('Esmaltação em Gel', 'Esmaltação duradoura em gel', 50.00, '00:50:00', 4, 'https://example.com/img/gel.jpg'),
     ('Unhas Acrigel', 'Alongamento e esmaltação com acrigel', 80.00, '01:30:00', 4, 'https://example.com/img/acrigel.jpg'),
     ('Unhas de Fibra', 'Alongamento e esmaltação com fibra', 90.00, '01:30:00', 4, 'https://example.com/img/fibra.jpg'),

     ('Perfume Importado', 'Perfume com fragrância marcante', 200.00, '00:00:00', 5, 'https://example.com/img/perfume_importado.jpg'),
     ('Perfume Nacional', 'Perfume com fragrância suave', 120.00, '00:00:00', 5, 'https://example.com/img/perfume_nacional.jpg'),
     ('Água de Colônia', 'Perfume leve para uso diário', 80.00, '00:00:00', 5, 'https://example.com/img/agua_colonia.jpg'),
     ('Deo Colônia', 'Perfume suave para uso cotidiano', 90.00, '00:00:00', 5, 'https://example.com/img/deo_colonia.jpg'),
     ('Perfume Amadeirado', 'Perfume com notas amadeiradas', 250.00, '00:00:00', 5, 'https://example.com/img/amadeirado.jpg')
 `);
    console.log('Serviços inseridos.');

    // Inserindo clientes
    console.log('Inserindo clientes...');
    await connection.query(`
      INSERT INTO clientes (primeiro_nome, sobrenome, email, data_nascimento, imagem_url)
      VALUES 
        ('Carla', 'Silva', 'carla.silva@example.com', '1995-01-10', 'https://example.com/img/carla.jpg'),
        ('Julia', 'Santos', 'julia.santos@example.com', '1992-02-15', 'https://example.com/img/julia.jpg'),
        ('Lucas', 'Almeida', 'lucas.almeida@example.com', '1990-05-30', 'https://example.com/img/lucas.jpg'),
        ('Marta', 'Pereira', 'marta.pereira@example.com', '1988-12-12', 'https://example.com/img/marta.jpg'),
        ('Pedro', 'Costa', 'pedro.costa@example.com', '1995-08-25', 'https://example.com/img/pedro.jpg')
    `);
    console.log('Clientes inseridos.');

    // Inserindo endereços para clientes e funcionários
    console.log('Inserindo endereços...');
    await connection.query(`
      INSERT INTO enderecos (entidade_id, tipo_entidade, logradouro, numero, bairro, cidade, estado, cep)
      VALUES 
        (1, 'cliente', 'Rua A', '123', 'Centro', 'São Paulo', 'SP', '01000-000'),
        (2, 'cliente', 'Rua B', '456', 'Vila', 'Rio de Janeiro', 'RJ', '22000-000'),
        (3, 'cliente', 'Rua C', '789', 'Zona Norte', 'Belo Horizonte', 'MG', '30000-000'),
        (4, 'cliente', 'Rua D', '101', 'Centro', 'Porto Alegre', 'RS', '90000-000'),
        (1, 'funcionario', 'Rua E', '202', 'Vila Nova', 'Curitiba', 'PR', '80000-000')
    `);
    console.log('Endereços inseridos.');

    // Inserindo pedidos e itens para cada cliente
    console.log('Inserindo pedidos e itens...');
    for (let clienteId = 1; clienteId <= 5; clienteId++) {
      const [pedidoResult] = await connection.query(
        'INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)',
        [clienteId, 200.00]
      );

      const pedidoId = pedidoResult.insertId;

      for (let produtoId = 1; produtoId <= 5; produtoId++) {
        await connection.query(
          'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
          [pedidoId, produtoId, 1, 20.00]
        );
      }

      // Inserindo agendamentos para cada cliente
      console.log(`Inserindo agendamentos para cliente ${clienteId}...`);
      for (let i = 1; i <= 2; i++) {
        const servicoId = (i % 5) + 1;
        const funcionarioId = ((i % 5) + 1);

        await connection.query(
          'INSERT INTO agendamentos (cliente_id, servico_id, funcionario_id, data_hora, status) VALUES (?, ?, ?, NOW() + INTERVAL ? DAY, ?)',
          [clienteId, servicoId, funcionarioId, i, 'confirmado']
        );
      }
    }
    console.log('Pedidos, itens e agendamentos inseridos.');

    console.log('Dados de teste inseridos com sucesso.');

  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    console.log("Encerrando conexão com o banco de dados...");
    await connection.end();
    console.log("Conexão com o banco de dados encerrada.");
  }
}

populateData();
