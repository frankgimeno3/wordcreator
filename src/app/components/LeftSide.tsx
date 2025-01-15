// app/LeftSide.tsx
import React from "react";

interface LeftSideProps {
  name: string;
  setName: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
  name,
  setName,
  date,
  setDate,
  message,
  setMessage,
}) => {
  return (
    <form className="flex flex-col bg-white p-6 rounded shadow-md w-1/2">
      <label className="mb-2 text-gray-400">Nombre:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 border rounded text-gray-400"
      />

      <label className="mb-2 text-gray-400">Fecha:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-4 p-2 border rounded text-gray-400"
      />

      <label className="mb-2 text-gray-400">Mensaje:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mb-4 p-2 border rounded text-gray-400"
      />
    </form>
  );
};

export default LeftSide;
