const aws = require('aws-sdk')

//keys updates
const connection = require('../../../config/connectionDB')
var uploadImagenStudent = require('../../../src/insertPicture')

aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

const student = {}

/*POST registrer students*/
student.registrer = async (req, res) => {
    //carga de imagen a s3
    nameImage = uploadImagenStudent(req.body, res, "student")

    let params = {
        TableName: 'tabla-estudiante-semi1-pro1',
        Item: {
            "nombre": req.body.nombre,
            "foto": nameImage,
            "base64": req.body.base64,
            "tipo": req.body.tipo,
            "url": 'https://pro1-images-grupo16.s3.us-east-2.amazonaws.com/estudiantes/'+nameImage
        }
    }

    await client.put(params, function (err, data){
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {
            res.status(200).send({message: 'true'});
        }
    })
}


module.exports = student
