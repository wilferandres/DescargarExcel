// Importa la biblioteca XLSX
import * as XLSX from 'xlsx';
// Reemplaza las importaciones de Firebase con el SDK de Firebase para la web
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASkeyty1Azc6tHMrVTu16PcSkfnLctk8M",
    authDomain: "appp-60984.firebaseapp.com",
    databaseURL: "https://appp-60984-default-rtdb.firebaseio.com",
    projectId: "appp-60984",
    storageBucket: "appp-60984.appspot.com",
    messagingSenderId: "1050380840907",
    appId: "1:1050380840907:web:c62722859084cbd058504e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ejemploCollection = collection(db, 'identificacion');

// Función para obtener los datos de Firebase y exportar a Excel
async function exportToExcel() {
  try {
    const querySnapshot = await getDocs(ejemploCollection);
    const data = [];

    // Mapea los datos en un formato adecuado para xlsx
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push(docData);
    });

    // Crea una hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(data);

    // Crea un libro de Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Convierte el libro de Excel en un archivo blob
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });

    // Crea un objeto Blob
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crea un objeto URL para el Blob
    const url = window.URL.createObjectURL(blob);

    // Crea un enlace de descarga y lo agrega al DOM
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo.xlsx';
    document.body.appendChild(a);
    a.click();

    // Revoca el objeto URL para liberar recursos
    window.URL.revokeObjectURL(url);

    console.log('Datos exportados correctamente.');
  } catch (error) {
    console.error('Error al exportar datos:', error);
    console("GENERANDO ERROR")
  }
}

// Agrega un evento clic al botón
const exportButton = document.getElementById('generarExcel');
exportButton.addEventListener('click', exportToExcel);