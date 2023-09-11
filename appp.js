// Importa la biblioteca xlsx
const XLSX = require('xlsx');
const fs = require('fs'); 
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Referencia a Firebase
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
// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una referencia a la colección de Firebase que deseas exportar
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

    // El resto del código para exportar a Excel sigue siendo igual
      // Crea una hoja de cálculo
      const ws = XLSX.utils.json_to_sheet(data);

      // Crea un libro de Excel
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
  
      // Convierte el libro de Excel en un archivo blob
      const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      fs.writeFileSync('archivo.xlsx', buffer);
    console.log('Datos exportados correctamente.');
  } catch (error) {
    console.error('Error al exportar datos:', error);
  }
}

// Llama a la función para exportar los datos
exportToExcel();

