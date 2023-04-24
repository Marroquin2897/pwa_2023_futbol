import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; //para crear nuestro PDF

const styles = StyleSheet.create({
  titulo: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: '40px',
    justifyContent: 'center'
  },
  tituloInfo: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  tituloDatos: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '0px 10px',
    fontSize: '20px'
  },
  contenedorTitulo: {
    flexDirection: 'row',
    margin: '10px 0px'
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    size: 'A4',
  },
  section: {
    marginBottom: 10,
    flexGrow: 1,
    flexDirection: 'row',
  },
  label: {
    marginBottom: 5,
    padding: '10px 0px',
  },
  value: {
    marginBottom: 2,
    padding: '0px 10px',
  },
  apartadoFirmasCont:{
    flexDirection: 'row',
    margin: '150px 10px 2px'
  },
  apartadoFirmas:{
    width: '250px',
    height: '150px',
    border: 0.5,
    justifyContent: 'center',
    padding: '1px 10px'
  }
});
const ListaPDF = ({listaJugadores}) => {
    return (
        <Document>
          <Page style={styles.page}>
            <View>
                <Text  style={styles.titulo}> Inscripción de Jugadores </Text>
                <Text style={styles.tituloInfo} > Fecha  </Text> 
                <Text style={styles.tituloInfo}> Disciplina  </Text> 
                <Text style={styles.tituloInfo}> Unidad Académica  </Text> 
                <Text style={styles.label}> Por medio de la presente informo que los alumnos que a continuación se enlistan, representan a esta 
                Unidad Académica en el TORNEO INTERPOLITÉCNICO.  </Text>   
            
            <View style={styles.contenedorTitulo}>
                <Text style={styles.tituloDatos} >Nombre</Text>
                <Text style={styles.tituloDatos} >Apellidos</Text>
                <Text style={styles.tituloDatos}>Boleta</Text>
                <Text style={styles.tituloDatos}>Escuela</Text>
                <Text style={styles.tituloDatos}>Semestre</Text>
            </View>
            <View>
            {listaJugadores.map((jugador) => (
                <View key={jugador ? jugador.id : "no existe"} style={styles.section}>
                <Text style={styles.value}>{jugador ?  jugador.nombreJugador : "no existe"}</Text>
                <Text style={styles.value}>{jugador ?  jugador.apellidosJugador : "no existe"}</Text>
                <Text style={styles.value}>{jugador ?  jugador.boletaJugador : "no existe"}</Text>
                <Text style={styles.value}>{jugador ?  jugador.semestreJugador : "no existe" }</Text>
                <br></br>
                </View>
            ))}           
            </View>
            <View style={styles.apartadoFirmasCont}> 
                <Text style={styles.apartadoFirmas}> Nombre, firma y sello Jefe de Servicios estudiantiles </Text>          
                <Text style={styles.apartadoFirmas}> Sello de Gestión Escolar </Text>
                <Text style={styles.apartadoFirmas}> Sello de la Dirección </Text>
            </View>
            </View>
          </Page>
        </Document>
      );
}
 
export default ListaPDF;