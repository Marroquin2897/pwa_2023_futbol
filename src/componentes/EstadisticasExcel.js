import React, { useState } from 'react';
import 'jspdf-autotable';
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Boton from '../elementos/Boton';

const EstadisticasExcel = ({estadisticasEquipos}) => {
    const [descargando, setDescargando] = useState(false);
  
  const handleExportar = async () => {
    const tablaPosiciones = estadisticasEquipos.map((equipo) => ({
      "Equipo": equipo.equipo,
      "Juegos Jugados": equipo.juegosJugados,
      "Juegos Ganados": equipo.juegosGanados,
      "Juegos Perdidos": equipo.juegosPerdidos,
      "Juegos Ganados Penales": equipo.juegosGanadosPenales,
      "Juegos Perdidos Penales": equipo.juegosPerdidosPenales,
      "Goles a Favor": equipo.golesAFavor,
      "Goles en Contra": equipo.golesEnContra,
      "Diferencia de Goles": equipo.diferenciaGoles,
      "Puntos": equipo.puntos,
      "Posición": equipo.posicion
    }));
    try {
      setDescargando(true);
        //const jsonData = JSON.stringify(listaJugadoresReducida)
        // Crear un libro de Excel a partir de los datos JSON
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(tablaPosiciones);
        XLSX.utils.book_append_sheet(workbook, sheet, "Posiciones");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // convertimos el libro de Excel en un buffer de bytes 

        // Descargar el archivo Excel
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "TablaGeneralPosiciones.xlsx");
     
      
    } catch (error) {
      console.error(error);
    } finally {
      setDescargando(false);
    }
  };
 
  return (
    <Boton onClick={handleExportar} disabled={descargando}>
      {descargando ? "Exportando..." : "Exportar Lista a Excel"}
    </Boton>
  );
}

 
export default EstadisticasExcel;