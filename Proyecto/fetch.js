//hacer fetch http://localhost:4000/api/usuarios mostrar por consola 

const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //importamos el fetch de node-fetch 


function fecthUsers () {
    fetch('http://localhost:4000/api/usuarios')
    .then(res => res.json())
    .then(data => console.log(data))
}

fecthUsers() 



