const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Pegue o token da requisição no header Authorization
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Armazena as informações do usuário no req.user
    req.user = user;  // O 'user' contém os dados extraídos do token
    next();
  });
};

module.exports = authenticateToken;
