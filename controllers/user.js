const { response } = require('express');
//se desestructura para poder usar el intelinger con el res.

 const usuariosGet = (req, res = response) => {
    const {q,nombre = 'no name',apikey,pages="1",limit} = req.query;
    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apikey,
        pages,
        limit
    })
  }

  const usuariosPut =  (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: "put API - Controlador",
        id
    })
  }

  const usuariosPost = (req, res = response) => {

    const {nombre,edad} = req.body;
    res.json({
        msg: "post API - Controlador",
        nombre,
        edad
    });
  }

  const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - Controlador"
    })
  }

  const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    })
  }
  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete,
      usuariosPatch
  }