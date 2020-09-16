const aws = require('aws-sdk')

//keys updates
const connection = require('../../../config/connectionDB')
aws.config.update(connection.aws_remote_comfig)
const client = new aws.DynamoDB.DocumentClient();

const user = {}

user.loginCreds = async (req, res) => {
    let nom = req.body.nombre
    let contra = req.body.contrasena
    let params = {
        TableName: "tabla-usuario-semi1-pro1",
        KeyConditionExpression: "nombre = :n",
        ExpressionAttributeValues: {
            ":n": nom
        }
    }

    await client.query(params, function (err, data) {
        console.log(data)
        if (!err) {
            if (data.Items.length > 0) {
                if (data.Items[0].contrasena === contra) {
                    res.status(200).send(data.Items[0])
                } else {
                    res.status(400).send({message: "Contraseña Incorrecta"})
                }
            }else{
                res.status(400).send({message: "Usuario no existe"})
            }
        } else {
            console.log(err)
            res.status(500).send({message:'No se pudo consultar el usuario.'})
        }
    })
}

module.exports = user
