
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
    

});
//debe ser una funcion normal
UsuarioSchema.methods.toJSON = function(){
    //ese toObject nos duplica el objeto de arriva
    const {__v, password, ...usuario} = this.toObject();
    return usuario

}

module.exports = model( 'Usuario',UsuarioSchema );
//se pone en singular ya que mongo agrega la s casi siempre
