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
        ('Ana', 'Silva', 'ana.silva@example.com', 1, '2021-01-15', 'https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Beatriz', 'Oliveira', 'beatriz.oliveira@example.com', 2, '2020-08-20', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Clara', 'Martins', 'clara.martins@example.com', 3, '2019-07-12', 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Diana', 'Souza', 'diana.souza@example.com', 4, '2021-03-10', 'https://images.unsplash.com/photo-1573497490790-9053816a01d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Elisa', 'Costa', 'elisa.costa@example.com', 5, '2022-05-05', 'https://images.unsplash.com/photo-1674049405530-7bbb0b0c1eef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    `);
    console.log('Dados de funcionários inseridos.');

    // Inserindo categorias de produtos
    console.log('Inserindo categorias de produtos...');
    await connection.query(`
      INSERT INTO categorias (nome, descricao, imagem_url)
      VALUES 
        ('Tratamento Capilar', 'Produtos para cuidados com o cabelo', 'https://plus.unsplash.com/premium_photo-1674841253335-6c892a8b1dc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Cosméticos', 'Produtos de maquiagem e cuidados com a pele', 'https://images.unsplash.com/photo-1591375462077-800a22f5fba4?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Cuidados com a Pele', 'Produtos para hidratação e limpeza da pele', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Cuidados com as Unhas', 'Produtos para manicures e pedicures', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Perfumes', 'Perfumes e fragrâncias', 'https://images.unsplash.com/photo-1701291927826-c7775869d822?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    `);
    console.log('Categorias de produtos inseridas.');

    // Inserindo produtos para o salão
    console.log('Inserindo produtos...');
    await connection.query(`
      INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id, imagem_url)
      VALUES 
        ('Shampoo Reconstrutor', 'Repara cabelos danificados', 30.00, 100, 1, 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Condicionador Hidratação', 'Para hidratação intensa', 25.00, 80, 1, 'https://images.unsplash.com/photo-1686121544831-3f5a03770e21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Máscara Capilar', 'Nutrição profunda', 50.00, 60, 1, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Óleo Capilar', 'Dá brilho aos cabelos', 40.00, 50, 1, 'https://images.unsplash.com/photo-1669281393011-c335050cf0e9?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Esmalte Rosa', 'Longa duração', 10.00, 150, 4, 'https://media.istockphoto.com/id/960165554/pt/foto/nail-polish-with-shadow.jpg?s=2048x2048&w=is&k=20&c=Bf6nr_wq7p3lfBv5o-p7QKsOEUkCI8Akib20ZV7aDhk=')
    `);
    console.log('Produtos inseridos.');

    // Inserindo serviços associados a cada categoria
    console.log('Inserindo serviços...');
    await connection.query(`
   INSERT INTO servicos (nome, descricao, preco, duracao, categoria_id, imagem_url)
   VALUES 
     ('Corte de Cabelo Masculino', 'Corte e finalização', 40.00, '00:30:00', 1, 'https://images.unsplash.com/photo-1511920922889-5c35bfd95a7f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Hidratação Capilar', 'Hidratação para cabelos secos', 60.00, '00:45:00', 1, 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Cauterização Capilar', 'Tratamento para reconstrução capilar', 70.00, '01:00:00', 1, 'https://www.belezasimples.com.br/wp-content/uploads/2019/10/0000cauterizacao_capa-710x503.jpg'),
     ('Coloração', 'Coloração capilar completa', 90.00, '01:30:00', 1, 'https://plus.unsplash.com/premium_photo-1661630726197-3bb591b15d98?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Botox Capilar', 'Redução de volume e hidratação', 80.00, '01:00:00', 1, 'https://paradafeminina.com.br/wp-content/uploads/2020/02/botox.png'),

     ('Maquiagem Social', 'Maquiagem para eventos sociais', 100.00, '01:00:00', 2, 'https://plus.unsplash.com/premium_photo-1661770834484-266859b6be88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Sobrancelha Design', 'Design e preenchimento de sobrancelha', 40.00, '00:30:00', 2, 'https://plus.unsplash.com/premium_photo-1663050996462-4671145bf66f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Limpeza de Pele', 'Limpeza profunda da pele', 120.00, '01:00:00', 2, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Peeling Facial', 'Tratamento de rejuvenescimento facial', 150.00, '01:00:00', 2, 'https://plus.unsplash.com/premium_photo-1663040173266-4d41d3736cc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Maquiagem para Noivas', 'Maquiagem especial para noivas', 200.00, '02:00:00', 2, 'https://images.unsplash.com/photo-1592343516059-cf2712eb0dee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),

     ('Hidratação Facial', 'Hidratação profunda da pele', 50.00, '00:30:00', 3, 'https://plus.unsplash.com/premium_photo-1708271138660-0427d0f25942?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Massagem Relaxante', 'Massagem para relaxamento', 90.00, '01:00:00', 3, 'https://plus.unsplash.com/premium_photo-1661582395155-e74bb0d891c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Tratamento Antienvelhecimento', 'Tratamento para pele madura', 200.00, '01:30:00', 3, 'https://plus.unsplash.com/premium_photo-1661457800454-64ba872af3f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Esfoliação Corporal', 'Esfoliação e hidratação corporal', 80.00, '01:00:00', 3, 'https://plus.unsplash.com/premium_photo-1683121902668-41f60858608a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Drenagem Linfática', 'Massagem de drenagem linfática', 100.00, '01:00:00', 3, 'https://d1xe7tfg0uwul9.cloudfront.net/sbd-portal-2024/wp-content/uploads/2022/06/Drenagem-linfatica-e-benefica-para-a-saude-shutterstock-1.webp'),

     ('Manicure Tradicional', 'Manicure com esmaltação', 25.00, '00:30:00', 4, 'https://plus.unsplash.com/premium_photo-1661290231745-15f1ed6fea88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Pedicure Completa', 'Cuidado completo dos pés', 35.00, '00:40:00', 4, 'https://plus.unsplash.com/premium_photo-1661499249417-c20d6b668469?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Esmaltação em Gel', 'Esmaltação duradoura em gel', 50.00, '00:50:00', 4, 'https://unhadecoradasimples.com.br/wp-content/uploads/2024/06/unhas-em-gel-decoradas-12.jpg'),
     ('Unhas Acrigel', 'Alongamento e esmaltação com acrigel', 80.00, '01:30:00', 4, 'https://vidarealdemulheres.com.br/wp-content/uploads/2024/05/unhas-acrigel-decoradas-capa-.jpeg'),
     ('Unhas de Fibra', 'Alongamento e esmaltação com fibra', 90.00, '01:30:00', 4, 'https://unhadecoradasimples.com.br/wp-content/uploads/2024/04/13_hq720.jpg'),

     ('Perfume Importado', 'Perfume com fragrância marcante', 200.00, '00:00:00', 5, 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Perfume Nacional', 'Perfume com fragrância suave', 120.00, '00:00:00', 5, 'https://essenciadehomem.com.br/wp-content/uploads/2023/11/Perfumes-Masculinos-Nacionais-Que-Parecem-Importados.jpg'),
     ('Água de Colônia', 'Perfume leve para uso diário', 80.00, '00:00:00', 5, 'https://images.unsplash.com/photo-1674469296521-e6b42d9768a4?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Deo Colônia', 'Perfume suave para uso cotidiano', 90.00, '00:00:00', 5, 'https://plus.unsplash.com/premium_photo-1675018083544-021f18a5ef19?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
     ('Perfume Amadeirado', 'Perfume com notas amadeiradas', 250.00, '00:00:00', 5, 'https://plus.unsplash.com/premium_photo-1691592871274-5d0531e7518b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
 `);
    console.log('Serviços inseridos.');

    // Inserindo clientes
    console.log('Inserindo clientes...');
    await connection.query(`
      INSERT INTO clientes (primeiro_nome, sobrenome, email, data_nascimento, imagem_url)
      VALUES 
        ('Carla', 'Silva', 'carla.silva@example.com', '1995-01-10', 'https://images.unsplash.com/photo-1685534346360-bb9a018df02a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Julia', 'Santos', 'julia.santos@example.com', '1992-02-15', 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Lucas', 'Almeida', 'lucas.almeida@example.com', '1990-05-30', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Marta', 'Pereira', 'marta.pereira@example.com', '1988-12-12', 'https://plus.unsplash.com/premium_photo-1683143646126-df3a3f3739f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('Pedro', 'Costa', 'pedro.costa@example.com', '1995-08-25', 'https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
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
