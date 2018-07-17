// Carga el SDK para AWS
var AWS = require("aws-sdk");

// Cambia la región a utilizar y el endpoint para que sea DynamoDB Local
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

// Crea el objeto de servicio DynamoDB
var dynamodb = new AWS.DynamoDB();

// Parametros de creación de tabla
var params = {
    // Nombre de la tabla
    TableName : "Pelicula",
    // Definición de la llave
    KeySchema: [       
        // Llave de particionamiento
        { AttributeName: "año", KeyType: "HASH"},
        // Llave de ordenamiento
        { AttributeName: "titulo", KeyType: "RANGE" }
    ],
    // Definición de atributos llave
    AttributeDefinitions: [       
        { AttributeName: "año", AttributeType: "N" },
        { AttributeName: "titulo", AttributeType: "S" }
    ],
    // En DynamoDB Local estos parametros son requeridos, pero ignorados
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

// Crea la tabla
dynamodb.createTable(params, function(err, data) {
    if (err) {
        // Despliega el error en caso de no poder crearla
        console.error("Error al crear la tabla, Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // Despliega la descripción de la nueva tabla creada
        console.log("Tabla creada, descripción JSON:", JSON.stringify(data, null, 2));
    }
});
