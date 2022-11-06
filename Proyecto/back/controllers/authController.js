//CRUD para usuarios
const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

//Registrar un nuevo usuario /api/usuario/registro

exports.newUser = catchAsyncErrors(async (req, res, next) =>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"ANd9GcQDiMJ5vEACXTsbl8Q8q4ed-aoYLRbt4OwbaQ&usqp",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiMJ5vEACXTsbl8Q8q4ed-aoYLRbt4OwbaQ&usqp=CAU",
        },
    })

    tokenEnviado(user,201,res)
})

//Iniciar sesion-Login

exports.loginUser = catchAsyncErrors (async(req, res, next)=>{
    const {email,password} = req.body;

    //Revisar si los campos estan completos
    if (!email || !password){
        return next(new ErrorHandler("Por favor ingrese email & contraseña",400))
    }

    //Buscar al usuario en nuestra base de datos
    const user= await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Email o contraseña invalidos",401))
    }    

    //Comparar contraseñas, verificar si esta bien
    const contrasenaOK= await user.compararPass(password);

    if(!contrasenaOK){
        return next(new ErrorHandler("Contraseña invalida",401))
    }

    tokenEnviado(user,200,res)

})

//Cerrar sesion(logout)
exports.logOut = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message: "Cerró sesión"
    })
})

//Olvide mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErrors ( async( req, res, next) =>{
    const user= await User.findOne({email: req.body.email});

    if (!user){
        return next(new ErrorHandler("Usuario no se encuentra registrado", 404))
    }
    const resetToken= user.genResetPasswordToken();

    await user.save({validateBeforeSave: false})

    //Crear una url para hacer el reset de la contraseña
    const resetUrl= `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

    const mensaje=`Hola!\n\nTu link para ajustar una nueva contraseña es el 
    siguiente: \n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunicate con soporte.\n\n Att:\NOVA Store`

    try{
        await sendEmail({
            email:user.email,
            subject: "NOVA Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success:true,
            message: `Correo enviado a: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500))
    }
})


//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req,res,next) =>{
    //Hash el token que llego con la URl
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex")
    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })
    //El usuario si esta en la base de datos?
    if(!user){
        return next(new ErrorHandler("El token es invalido o ya expiró",400))
    }
    //Diligenciamos bien los campos?
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Contraseñas no coinciden",400))
    }

    //Setear la nueva contraseña
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    tokenEnviado(user, 200, res)

})

//Ver perfil de usuario (Usuario que esta logueado)
exports.getUserProfile= catchAsyncErrors( async (req, res, next)=>{
    const user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

//Update Contraseña (usuario logueado)
exports.updatePassword= catchAsyncErrors(async (req, res, next) =>{
    const user= await User.findById(req.user.id).select("+password");

    //Revisamos si la contraseña vieja es igual a la nueva
    const sonIguales = await user.compararPass(req.body.oldPassword)

    if (!sonIguales){
        return next (new ErrorHandler("La contraseña actual no es correcta", 401))
    }

    user.password= req.body.newPassword;
    await user.save();

    tokenEnviado(user, 200, res)
})

//ver lista de usuarios 
exports.getUsers = catchAsyncErrors(async (req, res, next) => { //trabaja con un requisito, una respuesta y un next, ejecute una acción al terminar
    
    const users = await User.find(); //buscamos todos los productos con el modelo de productos, devolución de la promesa
    //sabe que es una entidad y puedo interacturar con ella, producto es el modelo de productos, find es un método de mongoose, devuelve una promesa
 
    if (!users){
        return next(new ErrorHandler("Usuario no encontrado",404))
        }
     //si no hay productos, respondo con un status 404 que es que no se encontro el recurso, json es un objeto

    res.status(200).json({  //status 200 es que todo esta bien, json es un objeto, getmapping, convierte el objeto en json
        success: true,
        count: users.length, //cuantos productos hay
        users, //productos que encontramos
        message: 'Mostrar todos los usuarios'
    })//status 200 es que todo esta bien, json es que vamos a enviar un json

})

//actualizar Usuario
exports.updateUser = catchAsyncErrors(async (req, res, next) => { //async para que sea asincrono, req es el request, res es la respuesta, next es para que ejecute una acción al terminar
    let user = await User.findById(req.params.id); //buscamos un producto por id, el req.params.id es el id que viene por la url, corresponde al producto que busco

    if (!user){
        return next(new ErrorHandler("Usuario no encontrado",404))
        }

    user = await User.findByIdAndUpdate(req.params.id, req.body, { //el metodo necesita el id, el body que viene del front, y un objeto con las opciones
        new: true, //devuelve el producto actualizado
        runValidators: true //corre las validaciones del modelo
    }) //actualizamos el producto, el req.params.id es el id que viene por la url, corresponde al producto que busco, el req.body es lo que viene del front, el {new: true, runValidators: true} es para que devuelva el producto actualizado y que corra las validaciones
    res.status(200).json({
        success: true,
        message: 'Usuario actualizado',
        user  //producto actualizado 
    }) //res status 200 es que todo esta bien, json es un objeto
})

//consulta por id
exports.getUserById = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id); //buscamos un producto por id, el req.params.id es el id que viene por la url, corresponde al producto que busco
    //debe llamarse product diferente al declarado al inicio, del req busque un parametro params que va por id. 
    //si existe o no
    if(!user){//si no existe el producto
            if (!user){
                return next (new ErrorHandler("Usuario no encotrado",404))
            }//Aplicando Error handler

    }
    res.status(200).json({
        success: true,
        message: 'Mostrar usuario',
        user

    }) //res status 200 es que todo esta bien, json es un objeto

}) //trabaja con un requisito, una respuesta y un next, ejecute una acción al terminar

//eliminar Usuario
exports.deleteUser = catchAsyncErrors(async (req, res, next) => { //async para que sea asincrono, req es el request, res es la respuesta, next es para que ejecute una acción al terminar
    const user = await User.findById(req.params.id); //buscamos un producto por id, el req.params.id es el id que viene por la url, corresponde al producto que busco

    if (!user){
        return next(new ErrorHandler("Usuario no encontrado",404))
        }

    await user.remove(); //eliminamos el producto, remove() es un método de mongoose que elimina el producto
    res.status(200).json({
        success: true,
        message: 'Usuario eliminado' //mensaje de producto eliminado
    }) //res status 200 es que todo esta bien, json es un objeto
})  