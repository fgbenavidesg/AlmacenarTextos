//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
//evemnt listeners

const EventListeners = () =>{
    //cuando el usuario agrega un nuevo tweet

    formulario.addEventListener('submit',agregarTweets);
    //cuando el formulario esta listo o cargado
    document.addEventListener('DOMContentLoaded',()=>{

        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        //console.log(tweets);
        crearHtml();
    });
}


//funciones

const agregarTweets = (e) =>{

    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;
    
    if(tweet === ''){

        mostrarError('no puede ir vacio');
        return; //evita que se ejecute mas lineas de codigo
    }
    //añadir al arreglo de tweet
    
    tweetObj = {
        id: Date.now(),
        //tweet: tweet se coloca uno solo cuando tienen l mismo nombre
        tweet

    }

    tweets = [...tweets,tweetObj];

    crearHtml();
    formulario.reset();
}

const mostrarError = (msj) =>{

    const msjError = document.createElement('p');
    msjError.textContent = msj;
    msjError.classList.add('error');
    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(msjError);
    //elimina la funcion
    setTimeout( ()=>{
        msjError.remove();
    }, 2000);

}
//muestra un listado de los twees

const crearHtml = () =>{

    limpiarHtml();
    if(tweets.length>0){
        tweets.forEach(tweet =>{

            //agrega un boton de eliminar

            const btnEliminar = document.createElement('a')
             btnEliminar.classList.add('borrar-tweet');
             btnEliminar.textContent ='X';
             //añadir la funcion eliminar
             btnEliminar.onclick = () => {
                borrarTweet(tweet.id); 
                crearHtml();
             }

            //crear html
            const li = document.createElement('li');
            //añadir el texto
            li.textContent=`
                ${tweet.id},${tweet.tweet}            
            `;
            //añadirle el boton
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li); 
        });
    }
    sincronizarStorage();
}
//agrega los tweet actuales a local storage
const sincronizarStorage = ()=>{
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//limpiar html
const limpiarHtml= () => {

    while (listaTweets.firstChild) {
            listaTweets.removeChild(listaTweets.firstChild);
    }

}

//elimina un tweet
const borrarTweet = (id) =>{

    tweets = tweets.filter(tweet =>  tweet.id !== id);
}
EventListeners();

