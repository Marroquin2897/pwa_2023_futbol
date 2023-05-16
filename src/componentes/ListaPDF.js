import React from 'react';
import 'jspdf-autotable';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; //para crear nuestro PDF
import useObtenerEscuela from '../hooks/useObtenerEscuela';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    size: 'A4',
  },
  titulo: {
    color: "#292b2c", 
    fontSize: "20px", 
    textAlign: "center", 
    marginTop: "10px"
  },
  estFecha: {
    fontWeight:"bold", 
    fontSize: "12px", 
    textAlign: 'right', 
    marginRight: "30px"
  },
  divEtiquetas: {
    flexDirection: 'row'
  },
  label: {
    width: "80px", 
    border: "1", 
    fontSize: "12px",
    left: "60px",
    padding: "5px"
  },
  value:{
    width: "220px", 
    border: "1", 
    fontSize: "12px",
    left: "60px",
    padding: "5px"
  },
  encabezadosTabla: {
    fontSize: "12px", 
    border:"1", 
    width:"185px",
    padding: "10px", 
    textTransform: "uppercase"
  },
  encabezadosInfoMasTabla: {
    fontSize: "12px", 
    border:"1", 
    width:"115px",
    padding: "10px", 
    textTransform: "uppercase"
  },
  contenedorInfoJug: {
    flexGrow: 1,
    flexDirection: 'row',
    margin: "0 60px"
  },
  nombreJugadores: {
    fontSize: "12px", 
    border:"1", 
    width:"185px",  
    padding: "10px"
  },
  infoJugadores: {
    fontSize: "12px", 
    border:"1", 
    width:"115px",  
    padding: "10px"
  },
  contenedorFirmas: {
    flexDirection: 'row', 
    position: "fixed", 
    margin:"0 60px", 
    top: "45%"
  },
  etiquetasContFirmas:{
    fontSize: "12px", 
    border:"1", 
    width:"180px", 
    height: "130px",
    padding: "10px"
  },
  leyendaUno:{
    fontSize: "12px", 
    margin: '10px 30px 0 60px '
  }
});
const ListaPDF = ({listaJugadores, idEscuela}) => {
  const [escuela] = useObtenerEscuela(idEscuela)
    return (
        <Document>
          <Page style={styles.page}>
            <View>
                <Text style={styles.titulo}> Inscripción de Jugadores </Text>
                <Text style={styles.estFecha}> Fecha: ___________  </Text><view style={styles.divEtiquetas}>
                <Text style={styles.label}> Disciplina  </Text>
                <Text style={styles.value}>{escuela ? escuela.modalidades : "No existe"}</Text>
              </view><view style={styles.divEtiquetas}>
                  <Text style={styles.label}> Unidad Académica </Text>
                  <Text style={styles.value}>{escuela ? escuela.escuela : "No existe"}</Text>
                </view><view style={styles.divEtiquetas}>
                  <Text style={styles.label}> Categoría  </Text>
                  <Text style={styles.value}>{escuela ? escuela.categoria : "No existe"}</Text>
                </view>
                <Text style={styles.leyendaUno}>Por medio de la presente informo que los alumnos que a continuación se enlistan, representan a esta 
                Unidad Académica en el TORNEO INTERPOLITÉCNICO.  </Text>   
           
                <View style={{flexDirection: 'row', margin: '10px 60px 0'}}>
                    <Text style={styles.encabezadosTabla} >Nombre</Text>
                    <Text style={styles.encabezadosTabla} >Apellidos</Text>
                    <Text style={styles.encabezadosInfoMasTabla}>Boleta</Text>
                    <Text style={styles.encabezadosInfoMasTabla}>Semestre</Text>
                </View>
                <View>
                {listaJugadores.map((jugador) => (
                    <View key={jugador ? jugador.id : "no existe"} style={styles.contenedorInfoJug}>
                    <Text style={styles.nombreJugadores}>{jugador ?  jugador.nombreJugador : "no existe"}</Text>
                    <Text style={styles.nombreJugadores}>{jugador ?  jugador.apellidosJugador : "no existe"}</Text>
                    <Text style={styles.infoJugadores}>{jugador ?  jugador.boletaJugador : "no existe"}</Text>
                    <Text style={styles.infoJugadores}>{jugador ?  jugador.semestreJugador : "no existe" }</Text>
                    <br></br>
                    </View>
                ))}           
                </View>
                <View style={styles.contenedorFirmas}> 
                    <Text style={styles.etiquetasContFirmas}> Nombre, firma y sello Jefe de Servicios estudiantiles </Text>          
                    <Text style={styles.etiquetasContFirmas}> Sello de Gestión Escolar </Text>
                    <Text style={styles.etiquetasContFirmas}> Sello de la Dirección </Text>
                </View>
            </View>
          </Page>
        </Document>
      );
}
 
export default ListaPDF;