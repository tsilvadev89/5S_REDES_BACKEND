const { Servico } = require('../models');

// Criar um novo serviço
exports.createServico = async (req, res) => {
  try {
    const { nome, descricao, preco, duracao, ativo, categoria_id, imagem_url } = req.body;
    const servico = await Servico.create({ nome, descricao, preco, duracao, ativo, categoria_id, imagem_url });
    res.status(201).json(servico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar serviço', error });
  }
};

// Obter todos os serviços
exports.getServicos = async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.status(200).json(servicos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter serviços', error });
  }
};

// Obter um serviço por ID
exports.getServicoById = async (req, res) => {
  try {
    const { id } = req.params;
    const servico = await Servico.findByPk(id);
    if (servico) {
      res.status(200).json(servico);
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter serviço', error });
  }
};

// Atualizar um serviço por ID
exports.updateServico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, duracao, ativo, categoria_id, imagem_url } = req.body;
    const [updated] = await Servico.update(
      { nome, descricao, preco, duracao, ativo, categoria_id, imagem_url },
      { where: { servico_id: id } }
    );
    if (updated) {
      const updatedServico = await Servico.findByPk(id);
      res.status(200).json(updatedServico);
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar serviço', error });
  }
};

// Excluir um serviço por ID
exports.deleteServico = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Servico.destroy({ where: { servico_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir serviço', error });
  }
};
