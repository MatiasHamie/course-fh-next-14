import { getOrderByID } from "@/actions";
import { OrderStatus, PayPalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";

import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderIDPage({ params }: Props) {
  const { id: orderId } = params;

  const { ok, order } = await getOrderByID(orderId);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${orderId}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />

            {order?.OrderItem.map((item) => (
              <div
                key={`${item.product.slug} + '-' + ${item.size}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{ width: "100px", height: "100px" }}
                  alt={item.product.title}
                  className="mr-5"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>

                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address?.firstName}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 articulo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order?.subTotal ?? 0)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">
                {currencyFormat(order?.tax ?? 0)}
              </span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order?.total ?? 0)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order!.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
