"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 mt-3 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId, // esto es para vincular la orden con el ID de la orden en la base de datos
          // y al estar vinculado, le podemos decir a paypal q esta orden esta paga
          amount: {
            currency_code: "USD",
            value: roundedAmount.toString(),
          },
        },
      ],
      intent: "CAPTURE",
    });

    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("No se pudo guardar el ID de la transacción");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) {
      return;
    }

    await paypalCheckPayment(details?.id || "");
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
