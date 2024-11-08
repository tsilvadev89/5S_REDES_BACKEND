// populate/populatePedidosEItens.js
const { Pedido, ItemPedido, Produto } = require('../models');

async function populatePedidosEItens() {
  console.log('Inserindo pedidos e itens...');

  try {
    for (let clienteId = 1; clienteId <= 5; clienteId++) {
      for (let i = 0; i < 5; i++) {
        const pedido = await Pedido.create({
          cliente_id: clienteId,
          valor_total: 0, 
          data_pedido: new Date(),
          status: 'Pendente',
        });

        if (!pedido || !pedido.pedido_id) {
          console.error(`Erro: Pedido não foi criado para cliente ${clienteId}`);
          continue;
        }

        let valorTotal = 0;
        for (let produtoId = 1; produtoId <= 5; produtoId++) {
          const precoUnitario = 20.00;
          const quantidade = 1;
          const precoTotalItem = precoUnitario * quantidade;

          const itemPedido = await ItemPedido.create({
            pedido_id: pedido.pedido_id,
            produto_id: produtoId,
            quantidade: quantidade,
            preco_unitario: precoUnitario,
          });

          if (!itemPedido) {
            console.error(`Erro ao criar ItemPedido para pedido ${pedido.pedido_id}`);
            continue;
          }

          valorTotal += precoTotalItem;
        }

        pedido.valor_total = valorTotal;
        await pedido.save();
        //console.log(`Pedido ${pedido.pedido_id} com valor total atualizado para: ${pedido.valor_total}`);
      }
    }
  } catch (error) {
    console.error('Erro ao popular pedidos e itens:', error);
  }

  console.log('Pedidos e itens inseridos.');
}

module.exports = populatePedidosEItens;
