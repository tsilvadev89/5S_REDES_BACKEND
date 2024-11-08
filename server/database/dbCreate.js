const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');
const { exec } = require('child_process');

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'C3poqap2p*741137a',
  database: process.env.DB_NAME || 'salao_beleza',
  connectionLimit: 5
};

console.log(dbConfig);

function runPopulateScript() {
  return new Promise((resolve, reject) => {
    exec('node ./database/populate_data.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o script de população: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Erro no script de população: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log('Script de população executado com sucesso.');
      console.log(stdout);
      resolve();
    });
  });
}

async function createDatabaseAndTables(retries = 5, delay = 5000) {
  let connection;

  while (retries > 0) {
    try {
      connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
      });

      console.log('Conexão com o banco de dados estabelecida.');
      break;
    } catch (error) {
      console.error(`Erro ao conectar ao banco de dados: ${error.message}`);
      retries -= 1;
      console.log(`Tentando novamente em ${delay / 1000} segundos... (${retries} tentativas restantes)`);
      await new Promise(res => setTimeout(res, delay));
    }
  }

  if (!connection) {
    throw new Error('Não foi possível conectar ao banco de dados após múltiplas tentativas.');
  }

  try {
    const [databases] = await connection.query(`SHOW DATABASES LIKE '${dbConfig.database}'`);
    
    if (databases.length > 0) {
      console.log('Banco de dados já existe. Excluindo antes de recriar...');
      await connection.query(`DROP DATABASE ${dbConfig.database}`);
    }

    await connection.query(`CREATE DATABASE ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);

    // Criação das tabelas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cargos (
        cargo_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50),
        descricao TEXT,
        imagem_url VARCHAR(255)
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        cliente_id INT AUTO_INCREMENT PRIMARY KEY,
        primeiro_nome VARCHAR(50),
        sobrenome VARCHAR(50),
        email VARCHAR(100),
        data_nascimento DATE,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        imagem_url VARCHAR(255)
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS funcionarios (
        funcionario_id INT AUTO_INCREMENT PRIMARY KEY,
        primeiro_nome VARCHAR(50),
        sobrenome VARCHAR(50),
        email VARCHAR(100),
        cargo_id INT,
        data_contratacao DATE,
        imagem_url VARCHAR(255),
        FOREIGN KEY (cargo_id) REFERENCES cargos(cargo_id)
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS enderecos (
        endereco_id INT AUTO_INCREMENT PRIMARY KEY,
        entidade_id INT,
        tipo_entidade ENUM('cliente', 'funcionario'),
        logradouro VARCHAR(100),
        numero VARCHAR(10),
        complemento VARCHAR(50),
        bairro VARCHAR(50),
        cidade VARCHAR(50),
        estado VARCHAR(2),
        cep VARCHAR(10),
        imagem_url VARCHAR(255),
        CONSTRAINT fk_enderecos_clientes FOREIGN KEY (entidade_id)
          REFERENCES clientes(cliente_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        categoria_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50),
        descricao TEXT,
        imagem_url VARCHAR(255)
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        produto_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        descricao TEXT,
        preco DECIMAL(10, 2),
        estoque INT,
        categoria_id INT,
        ativo BOOLEAN DEFAULT TRUE,
        imagem_url VARCHAR(255),
        FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
      ) ENGINE=InnoDB
    `);

    // Tabela de serviços com referência obrigatória à categoria
    await connection.query(`
      CREATE TABLE IF NOT EXISTS servicos (
        servico_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        descricao TEXT,
        preco DECIMAL(10, 2),
        duracao TIME,
        ativo BOOLEAN DEFAULT TRUE,
        imagem_url VARCHAR(255),
        categoria_id INT NOT NULL,  -- Campo obrigatório
        FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        agendamento_id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT,
        servico_id INT NULL,
        funcionario_id INT NULL,
        data_hora DATETIME,
        status ENUM('pendente', 'confirmado', 'cancelado', 'concluido') DEFAULT 'pendente',
        FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id) ON DELETE CASCADE,
        FOREIGN KEY (servico_id) REFERENCES servicos(servico_id) ON DELETE SET NULL,
        FOREIGN KEY (funcionario_id) REFERENCES funcionarios(funcionario_id) ON DELETE SET NULL
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        pedido_id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT,
        data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        valor_total DECIMAL(10, 2),
        FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS itens_pedido (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        pedido_id INT,
        produto_id INT NULL,
        quantidade INT,
        preco_unitario DECIMAL(10, 2),
        FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id) ON DELETE CASCADE,
        FOREIGN KEY (produto_id) REFERENCES produtos(produto_id) ON DELETE SET NULL
      ) ENGINE=InnoDB
    `);

    console.log('Tabelas criadas com sucesso.');

    await runPopulateScript();

  } catch (error) {
    console.error('Erro ao criar banco de dados e tabelas:', error);
  } finally {
    await connection.end();
    console.log("Conexão com o banco de dados fechada.");
  }
}

module.exports = createDatabaseAndTables;
