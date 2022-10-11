exports.getProducts=(req,res,next) =>{
    resizeTo.status(200).json({
        sucess:true,
        message: "En esta ruta usted va a poder ver todos los productos"
    })
}