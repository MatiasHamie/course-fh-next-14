"use client";

import { useState } from "react";

export const CartCounter = ({ value }: { value: number }) => {
  const [counter, setCounter] = useState(value);

  const handleUpdateCounter = (value: number) => {
    setCounter((prev) => prev + value);
  };
  return (
    <>
      <span className="text-9xl">{counter}</span>
      <div className="flex">
        <button
          onClick={() => handleUpdateCounter(1)}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          +
        </button>
        <button
          onClick={() => handleUpdateCounter(-1)}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          -1
        </button>
      </div>
    </>
  );
};
