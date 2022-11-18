import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestOrderDetails, xxx } from '../services/requests';

function ButtonDetails() {
  const [seller, setSeller] = useState([]);
  // const [prepara, setPrepara] = useState(false);
  // const [entrega, setEntrega] = useState(false);

  const { id } = useParams();

  const onClickPrepara = () => {
    xxx(`/status/update/${id}`, { status: 'Preparando' });
  };

  const onClickEntrega = () => {
    xxx(`/status/update/${id}`, { status: 'Em Trânsito' });
  };

  function dateFormat(orderDate) {
    const date = new Date(orderDate).toLocaleDateString('pt-BR');

    return date;
  }

  function moneyBrFormat(orderPrice) {
    const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(orderPrice);
    const result = `${money}`;

    return result;
  }

  useEffect(() => {
    const getOrderDetail = async () => {
      const result = await requestOrderDetails(`/orders/${id}`, id);
      setSeller(result);
    };
    getOrderDetail();
  }, []);

  return (
    <section>
      <p>
        {`Pedido000${seller.id}`}

      </p>
      <p>
        {seller.status}
      </p>
      <p>
        {moneyBrFormat(seller.totalPrice)}
      </p>
      <p>
        {`${dateFormat(seller.saleDate)}`}
      </p>

      <button
        type="button"
        name="prepara-pedido"
        disabled={ seller.status !== 'Pendente' }
        onClick={ onClickPrepara }
      >
        Preparar
      </button>
      <button
        type="button"
        name="despacha-pedido"
        disabled={ seller.status !== 'Preparando' }
        onClick={ onClickEntrega }
      >
        Entregar
      </button>
    </section>
  );
}

export default ButtonDetails;
