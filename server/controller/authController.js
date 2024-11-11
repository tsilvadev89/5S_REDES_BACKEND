const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env ou dotenv.env
const { Cliente } = require('../models');
const { Funcionario } = require('../models');

// Função para login (verificar senha e gerar token para clientes ou funcionários)
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // console.log('body');
    // console.log('email - ', email, 'senha - ', senha);

    // Verificar se os campos email e senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ message: 'Por favor, forneça ambos os campos: email e senha' });
    }

    // Tentar encontrar o email nos clientes
    let usuario = await Cliente.findOne({ where: { email } });

    // Se não encontrar no cliente, procurar na tabela de funcionários
    if (!usuario) {
      usuario = await Funcionario.findOne({ where: { email } });
    }

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // console.log('SQL');
    // console.log(usuario);

    // Verifique se a senha fornecida é igual à senha armazenada (hashed)
    const isMatch = await bcrypt.compare(senha, usuario.senha);

    console.log('BRCRYPT executado resultado - ', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar um token JWT (pode ser configurado com um tempo de expiração)
    const token = jwt.sign(
      { 
        id: usuario.cliente_id || usuario.funcionario_id, 
        email: usuario.email, 
        tipo: usuario.cliente_id ? 'cliente' : 'funcionario' 
      },
      process.env.JWT_SECRET,  // Usa a chave secreta definida no .env
      { expiresIn: '1h' }
    );

    // Retorne o token e os dados do usuário no response
    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      usuario: {
        id: usuario.cliente_id || usuario.funcionario_id,
        email: usuario.email,
        tipo: usuario.cliente_id ? 'cliente' : 'funcionario',
      },
    });
  } catch (error) {
    // Em caso de erro, logue a mensagem para depurar
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};
