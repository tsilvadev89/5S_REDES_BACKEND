const { Cliente, Funcionario, Pedido, ItemPedido, Produto, Categoria, Endereco, Agendamento, Servico, Cargo } = require('../models');

exports.getAllUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    let usuarioData = null;
    let isCliente = false;
    let isFuncionario = false;
    let categorias = [];
    let servicos = [];
    let pedidos = [];
    let agendamentos = [];
    let enderecos = [];

    // Primeiro, tenta encontrar o cliente
    const cliente = await Cliente.findOne({
      where: { cliente_id: userId, email: userEmail },
      include: [
        { 
          model: Endereco, 
          where: { tipo_entidade: 'cliente' },
          attributes: [/* 'endereco_id', */ 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'imagem_url']
        },
        { 
          model: Pedido,
          attributes: [/* 'pedido_id', */ 'data_pedido', 'valor_total'],
          include: [
            { 
              model: ItemPedido,
              attributes: [/* 'item_id', */ 'quantidade', 'preco_unitario'],
              include: [
                { 
                  model: Produto, 
                  attributes: [/* 'produto_id', */ 'nome', 'descricao', 'preco', 'estoque', 'imagem_url', 'ativo'],
                  where: { ativo: true }
                }
              ]
            }
          ]
        },
        { 
          model: Agendamento, 
          attributes: [/* 'agendamento_id', */ 'data_hora', 'status'],
          include: [
            { 
              model: Servico, 
              attributes: [/* 'servico_id', */ 'nome', 'descricao', 'preco', 'duracao', 'imagem_url']
            },
            { 
              model: Funcionario, 
              attributes: ['primeiro_nome']  // Retorna somente o primeiro nome do funcionário
            }
          ]
        }
      ],
      attributes: [/* 'cliente_id',  */'primeiro_nome', 'sobrenome', 'email']
    });

    // Se o cliente não for encontrado, tenta encontrar o funcionário
    if (!cliente) {
      const funcionario = await Funcionario.findOne({
        where: { funcionario_id: userId, email: userEmail },
        include: [
          { 
            model: Endereco, 
            where: { tipo_entidade: 'funcionario' },
            attributes: [/* 'endereco_id', */ 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'imagem_url']
          },
          { 
            model: Agendamento, 
            attributes: [/* 'agendamento_id', */ 'data_hora', 'status'],
            include: [
              { 
                model: Servico, 
                attributes: [/* 'servico_id', */ 'nome', 'descricao', 'preco', 'duracao', 'imagem_url'] 
              },
              { 
                model: Cliente, 
                attributes: ['primeiro_nome']  // Retorna somente o primeiro nome do cliente
              }
            ]
          },
          { 
            model: Cargo,
            attributes: [/* 'cargo_id', */ 'nome', 'descricao'],
          }
        ],
        attributes: [/* 'funcionario_id', */ 'primeiro_nome', 'sobrenome', 'email', 'data_contratacao', 'imagem_url']
      });

      if (funcionario) {
        usuarioData = funcionario;
        isFuncionario = true;

        // Se o usuário for funcionário, pegamos as categorias de serviços
        categorias = await Categoria.findAll({
          where: { tipo: 'Serviço' },
          attributes: [/* 'categoria_id', */ 'nome', 'descricao', 'imagem_url', 'tipo']
        });

        servicos = await Servico.findAll({
          where: { ativo: true },
          attributes: [/* 'servico_id', */ 'nome', 'descricao', 'preco', 'duracao', 'imagem_url'],
          include: [
            { model: Categoria, attributes: [/* 'categoria_id', */ 'nome'] }
          ]
        });

        agendamentos = await Agendamento.findAll({
          where: { funcionario_id: userId },
          include: [
            { 
              model: Cliente, 
              attributes: ['primeiro_nome']  // Retorna somente o primeiro nome do cliente
            },
            { 
              model: Servico, 
              attributes: [/* 'servico_id', */ 'nome', 'descricao']
            }
          ]
        });
      }
    } else {
      usuarioData = cliente;
      isCliente = true;

      // Se o usuário for cliente, pegamos os pedidos, agendamentos e endereços
      pedidos = await Pedido.findAll({
        where: { cliente_id: userId },
        attributes: [/* 'pedido_id', */ 'data_pedido', 'valor_total'],
        include: [
          { 
            model: ItemPedido,
            attributes: [/* 'item_id', */ 'quantidade', 'preco_unitario'],
            include: [
              { 
                model: Produto, 
                attributes: [/* 'produto_id', */ 'nome', 'descricao', 'preco', 'estoque', 'imagem_url', 'ativo'],
                where: { ativo: true }
              }
            ]
          }
        ]
      });

      agendamentos = await Agendamento.findAll({
        where: { cliente_id: userId },
        include: [
          { 
            model: Funcionario, 
            attributes: ['primeiro_nome']  // Retorna somente o primeiro nome do funcionário
          },
          { 
            model: Servico, 
            attributes: [/* 'servico_id', */ 'nome', 'descricao']
          }
        ]
      });

      enderecos = await Endereco.findAll({
        where: { entidade_id: userId, tipo_entidade: 'cliente' },
        attributes: [/* 'endereco_id', */ 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'imagem_url']
      });
    }

    res.json({
      usuarioData,
      /* isCliente,
      isFuncionario, */
      categorias,
      servicos,
      pedidos,
      agendamentos,
      enderecos
    });
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    res.status(500).send("Erro ao obter dados do usuário.");
  }
};
