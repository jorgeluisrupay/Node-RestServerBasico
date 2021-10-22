const { response } = require('express');
//se desestructura para poder usar el intelinger con el res.

const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
//const { validationResult } = require('express-validator');

 const usuariosGet = async(req, res = response) => {
    //const {q,nombre = 'no name',apikey,pages="1",limit} = req.query;
    const { limite = 5,desde = 0 } = req.query;
    const query = {estado: true};
    //const usuarios = await Usuario.find({estado: true})
    //se puede poner la condicion
    // const usuarios = await Usuario.find(query)
    //   .skip(Number(desde))
    //   .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
    ])

    res.json({
        msg: "get API - Controlador",
        total, //de la primera promesa
        usuarios, //segunda promesa
    })
  }

  const usuariosPut =  async(req, res = response) => {
    const {id} = req.params;
    const { _id,password,google,correo,...resto } = req.body;
    //validar base de datos
    if (password) {
      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg: "put API - Controlador",
        usuario
    })
  }

  const usuariosPost = async (req, res = response) => {
    

    const {nombre,correo,password,rol} = req.body;
    //const {google,...resto} = req.body;
    //creamos una instancia de mi usuario
    const usuario = new Usuario({nombre,correo,password,rol});
   
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    //numero de vueltas para que sea mas complicado la desencriptacion
    //por defecto esta en 10 pero se puede usar mas .genSaltSync(100);
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar en BD
    await usuario.save(); //guarda en el mongocompass
    res.json({
        msg: "post API - Controlador",
        usuario
    });
  }

  const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    //Solo cambiamos el estado
    const usuario = await Usuario.findByIdAndUpdate(id,{ estado: false});
    res.json({
        msg: "delete API - Controlador",
        usuario
    })
  }

  const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controlador",
    })
  }
  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete,
      usuariosPatch
  }