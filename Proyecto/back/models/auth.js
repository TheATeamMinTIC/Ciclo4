const mongoose = require ("mongoose")
const validator = require ("validator")
const bcrypt = require("bcryptjs")

const usuarioSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [120, "Nombreb i puede exceder los 120 caracteres"]
    },
    email:{
        type:String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique:true, // no hay 2 emails iguales
        validate: [validator.isEmail,"Por favor ingrese un email valido"]
    },
    password:{
        type:String,
        required: [true, "Por favor ingrese una contraseña"],
        minlength: [6,"La contraseña no puede tener menos de 6 caracteres"],
        select:false//Campo no visible OJO
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    registerDate:{
        type:Date,
        defaul:Date.now
    },

    resetPaswordToken: String,
    resetPasswordExpire:Date

    })

//Encriptacion de password    
    usuarioSchema.pre("save",async function(next){
        if (!this.isModified("password")){
            next()
        }
        this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('auth',usuarioSchema)