import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; //para crear nuestro PDF

const styles = StyleSheet.create({
  titulo: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: '42px'
  },
  titulo2: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    size: 'A4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
});
const ListaPDF = ({listaJugadores}) => {
    return (
        <Document>
          <Page style={styles.page}>
            <View>
            <Text style={styles.titulo}> Inscripción de Jugadores </Text>
            <Text style={styles.titulo}> Fecha  </Text>            
            {listaJugadores.map((jugador) => (
                <View key={jugador ? jugador.id : "no existe"} style={styles.section}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{jugador ?  jugador.nombreJugador : "no existe"}</Text>
                <Text style={styles.label}>Apellidos:</Text>
                <Text style={styles.value}>{jugador ?  jugador.apellidosJugador : "no existe"}</Text>
                <Text style={styles.label}>Boleta:</Text>
                <Text style={styles.value}>{jugador ?  jugador.boletaJugador : "no existe"}</Text>
                <Text style={styles.label}>Semestre:</Text>
                <Text style={styles.value}>{jugador ?  jugador.semestreJugador : "no existe" }</Text>
                <Text style={styles.label}>Sexo:</Text>
                <Text style={styles.value}>{jugador ?  jugador.sexoJugador : "no existe"}</Text>
                <br></br>
                </View>
            ))}
            <Text style={styles.titulo2}> Nombre, firma y sello Jefe de Servicios estudiantiles </Text>
            <Text style={styles.titulo2}> Sello de Gestión Escolar </Text>
            <Text style={styles.titulo2}> Sello de la Direccion </Text>
            </View>
          </Page>
        </Document>
      );
}
 
export default ListaPDF;