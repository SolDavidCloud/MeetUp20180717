// Carga el SDK para AWS
var AWS = require("aws-sdk");

// Cambia la región a utilizar y el endpoint para que sea DynamoDB Local
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

// Crea el objeto de servicio DynamoDB
var docClient = new AWS.DynamoDB.DocumentClient();

// Parametros de búsqueda
var params = {
    TableName: 'Pelicula',
    Key: {
        año: 1940,
        titulo: "The Great Dictator"
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Error en la consulta, error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log(JSON.stringify(data, null, 2));
    } 
});
