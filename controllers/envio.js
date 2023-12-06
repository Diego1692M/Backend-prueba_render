const {response} = require('express')

const Envio = require('../models/envio')

const getEnvio = async(req, res) => {

    const envios = await Envio.find(); //Obtener todos los documentos de una colección
    res.json({
        msg: envios
    })
}

const postEnvio = async(req, res) => {
    const datos = req.body //Capturar datos de la url-postman
    let mensaje = 'Inserción exitosa'
    try {
        const envio = new Envio(datos)
        console.log(envio) //Instanciar el objeto
        await envio.save() //Guardar en la base de dato
        console.log(envio)
    } catch (error) {
        mensaje = error
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const putEnvio = async(req, res) => {
    const {_id, registro_envio, nombre, apellido, email, telefono, direccion, ciudad, postal, pais, departamento, precio_dolar} = req.body //Desesctructurar
    console.log(req.body)
    let mensaje = ''
    try {
        const envio = await Envio.findOneAndUpdate({_id: _id},
        {registro_envio: registro_envio, nombre: nombre, apellido:apellido, email:email, telefono:telefono, direccion: direccion, ciudad: ciudad, postal:postal, pais: pais, departamento: departamento, precio_dolar: precio_dolar})
        mensaje = 'Actualización exitosa'
    } catch (error) {
        mensaje = error
    }   
    res.json({
        msg:mensaje
    })
}

const deleteEnvio = async(req, res) => {
    const { registro_envio} = req.query //Desesctructurar
    let mensaje = ''
    try {
        const envio = await Envio.findOneAndDelete({registro_envio: registro_envio})
        mensaje = 'Eliminación exitosa'
    } catch (error) {
        mensaje = error
    }   
    res.json({
        msg:mensaje
    })
}


module.exports = {
    getEnvio,
    postEnvio,
    putEnvio,
    deleteEnvio
}