"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    onQuantityChanged(Math.max(1, quantity + value));
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 rounded mx-3 px-5 bg-gray-100 text-center">
        {quantity}
      </span>

      <button onClick={() => onValueChanged(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
