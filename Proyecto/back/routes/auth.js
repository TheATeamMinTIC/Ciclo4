const express = require ("express");
const { newUser,getUsers,getUserById,updateUser,deleteUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.route('/usuario/registro').post(newUser);//creamos la ruta, post es para crear, route es para crear una ruta, newProduct es el metodo que vamos a ejecutar

router.route('/usuarios').get(getUsers); //creamos la ruta, get es para obtener, post es para crear, route es para crear una ruta, getProducts es el metodo que vamos a ejecutar, createProduct es el metodo que vamos a ejecutar
router.route('/usuario/:id').get(getUserById); //creamos la ruta, get es para obtener, route es para crear una ruta, getProductById es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro
router.route('/usuario/:id').put(updateUser); //creamos la ruta, put es para actualizar, route es para crear una ruta, updateProduct es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro
router.route('/usuario/:id').delete(deleteUser); //creamos la ruta, delete es para eliminar, route es para crear una ruta, deleteProduct es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro

router.route('/login').get(loginUser)

module.exports = router;