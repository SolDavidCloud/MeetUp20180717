// Carga el SDK para AWS
var AWS = require('aws-sdk');

// Cambia la región a utilizar y el endpoint para que sea DynamoDB Local
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000'
});

// Crea el objeto de servicio DynamoDB
var docClient = new AWS.DynamoDB.DocumentClient();

// Carga la libreria de acceso a archivos
var fs = require('fs');

// Avisa del inicio de la importación
console.log('Importando los datos de películas a la base de datos.');

// Abre el archivo
var peliculas = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));

// Inicializa contador
var iCounter = 0;

// Itera sobre los documentos
peliculas.forEach(function (pelicula) {
  // Llena los parámetros
  var params = {
    TableName: 'Pelicula',
    Item: {
      'año': pelicula.year,
      'titulo': pelicula.title,
      'detalles': pelicula.info
    }
  };

    // Inserta el documento
  docClient.put(params, function (err, data) {
    if (err) {
      // Despliega el error en caso de no poder insertarlo
      console.error('No se pudo insertar la película ', pelicula.title, ', error JSON:', JSON.stringify(err, null, 2));
    } else {
      // Informa de la película insertada
      console.log('Se insertó la película #', iCounter++, ':', pelicula.title);
    }
  });
});
