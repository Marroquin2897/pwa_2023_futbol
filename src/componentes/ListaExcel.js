import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Boton from './../elementos/Boton';
function ListaExcel({listaJugadores}) {
  const [descargando, setDescargando] = useState(false);
  
  const handleExportar = async () => {
    
    try {
      setDescargando(true);

      const listaJugadoresReducida = listaJugadores.map((jugador) => ({
        Nombre: jugador.nombreJugador,
        Apellidos: jugador.apellidosJugador,
        NSS: jugador.nssJugador,
        CURP: jugador.curpJugador,
        BOLETA: jugador.boletaJugador,
        ESCUELA: jugador.escuelaJugador,
        SEMESTRE: jugador.semestreJugador,
        FECHA_NACIMIENTO: jugador.fechaNacJugador,
        GENERO: jugador.sexoJugador,
        
      }));
       
        //const jsonData = JSON.stringify(listaJugadoresReducida)
        // Crear un libro de Excel a partir de los datos JSON
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(listaJugadoresReducida);
        XLSX.utils.book_append_sheet(workbook, sheet, "Jugadores");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // convertimos el libro de Excel en un buffer de bytes 

        // Descargar el archivo Excel
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "ListaJugadoresInscritos.xlsx");
     
      
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

export default ListaExcel; 