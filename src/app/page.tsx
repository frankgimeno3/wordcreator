"use client";

import { useState } from "react";
import LeftSide from "./components/LeftSide";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export default function Page() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const generateDocument = async () => {
    const templatePath = "/templates/plantilla.docx";

    try {
      const response = await fetch(templatePath);
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "{{", end: "}}" },
      });

      doc.setData({
        name,
        date,
        message,
      });

      doc.render();
      const blob = doc.getZip().generate({ type: "blob" });
      saveAs(blob, "documento-generado.docx");
    } catch (error) {
      // Chequeo explícito del tipo de error
      if (error instanceof Error) {
        if (error.name === "TemplateError") {
          console.error("Error en la plantilla:", error);
        
          alert(
            "Se encontró un error en la plantilla. Revisa los logs de la consola para más detalles."
          );
        } else {
          console.error("Error inesperado generando el documento:", error.message);
        }
      } else {
        console.error("Error inesperado de tipo desconocido:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-400">Generador de Documentos</h1>
      <LeftSide
        name={name}
        setName={setName}
        date={date}
        setDate={setDate}
        message={message}
        setMessage={setMessage}
      />
      <button
        onClick={generateDocument}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generar Documento
      </button>
    </div>
  );
}
