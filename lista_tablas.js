// Carga el SDK para AWS
var AWS = require('aws-sdk');

// Cambia la región a utilizar y el endpoint para que sea DynamoDB Local
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000'
});

// Crea el objeto de servicio DynamoDB
var dynamodb = new AWS.DynamoDB();

// Obtiene las primeras 10 tablas
dynamodb.listTables({Limit: 10}, function (err, data) {
  if (err) {
    // Despliega el error en caso de no poder desplegarlas
    console.log('No se pudieron obtener las tablas, error JSON: ', JSON.stringify(err.code, null, 2));
  } else {
    // Despliega el arreglo de tablas encontradas
    console.log('Las tablas existentes son: ', data.TableNames);
  }
});
