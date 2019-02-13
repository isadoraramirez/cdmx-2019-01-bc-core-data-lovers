// function limpiarSelect(){
//   listQuestion.innerHTML = "";
// }
// function setearCiudad(ciudad){
//   listQuestion.dataset.ciudad =  ciudad;
// }

// const para desplegar menu
const navIcon = document.getElementById("nav-icon");
const navMenu = document.getElementById("nav-menu");
// const para opciones de menu 
const btnAbout = document.getElementById("btn-about");
const btnNews = document.getElementById("btn-news");
const btnFilters = document.getElementById("btn-general-filter");
//para informacion mostrada 
const news = document.getElementById("news");
const about = document.getElementById("about");
const filters = document.getElementById("general-filter");
//evento para ocultar y mostrar elementos
navIcon.addEventListener('click', () => {
  navMenu.classList.toggle('ocultar');
  
});


btnAbout.addEventListener('click', () => {
  about.classList.remove('ocultar');
  filters.classList.add('ocultar');
  navMenu.classList.add('ocultar');
  news.classList.remove('mostrar-news');
});
btnNews.addEventListener('click', () => {
  about.classList.add('ocultar');
  filters.classList.add('ocultar');
  navMenu.classList.add('ocultar');
  news.classList.add('mostrar-news');
});
btnFilters.addEventListener('click', () => {
  about.classList.add('ocultar');
  filters.classList.remove('ocultar');
  navMenu.classList.add('ocultar');
  news.classList.remove('mostrar-news');
});

//acceder a la data de cada pais
const data = window.WORLDBANK;

// const countryMex = WORLDBANK.MEX.indicators;
// const countryPer = WORLDBANK.PER.indicators;
// const countryBra= WORLDBANK.BRA.indicators;
// const countryChl= WORLDBANK.CHL.indicators;

// section donde esta la informacion y el select
const indicator = document.getElementById("information-filter-inner");
const listQuestion = document.getElementById("list-question");

// ejecutar el llenado del selector dependiendo del país
const buttonTypes = Array.from(document.getElementsByClassName('search-country'));
//console.log(buttonTypes);
for (let boton in buttonTypes){
  buttonTypes[boton].addEventListener('click',(e) =>{
    e.preventDefault() //e.target()
    let paisElegido = data[e.target.dataset.ciudad].indicators;
    listQuestion.innerHTML = "";
    listQuestion.dataset.ciudad = e.target.dataset.ciudad;
    listQuestion.insertAdjacentHTML('beforeend', '<option value="">Selecciona un tema</option>'); 
    paisElegido.forEach( ciudad => {
    listQuestion.insertAdjacentHTML('beforeend', `<option value="${ciudad.indicatorCode}">${ciudad.indicatorName}</option>`);
    });
  })
}

//filtrar 
listQuestion.addEventListener("change", () => {
  indicator.innerHTML = "";//Limpiar funcion
  let country = listQuestion.dataset.ciudad;// Obtenemos la ciudad de la que vamos a filtrar, es decir, obtenemos el data-ciudad del select
  let countrySelect = listQuestion.value;
  const resultado = window.WorldBank.filterCountry(data, country,countrySelect)//Datos de data.js
  for (let resultYear in resultado) { //declaramos una variable y el obejto de donse encuentra lo que vamos a filtrar
    indicator.insertAdjacentHTML('beforeend', `<p><b>Año</b>: ${resultYear} => ${resultado[resultYear] || "N/A"}</p>`);
  }
});


const radioFilters = Array.from(document.getElementsByClassName('radio__filter'));
//console.log(radioFilters)
for (let radioItem in radioFilters){
  radioFilters[radioItem].addEventListener('change',(e) =>{
    e.preventDefault() //e.target()
    indicator.innerHTML = "";//Limpiar funcion
    
    const resultado = window.WorldBank.filterCountry(data, listQuestion)//Datos de data.js
    const resultadoOrder = window.WorldBank.orderData(resultado, e.target.dataset.sortby, e.target.dataset.sortorder)//Datos de data.js

    for (let resultadoYear in resultadoOrder) { //declaramos una variable y el obejto de donse encuentra lo que vamos a filtrar
      let parrafo = document.createElement('p'); // creamos un elemento p temporal ira grafica
      parrafo.innerHTML = `<b>Año</b>: ${resultadoOrder[resultadoYear]} = ${resultado[resultadoOrder[resultadoYear]] || "N/A"} ` //imprimimos el año y numeros
      indicator.appendChild(parrafo); //limpiamos para que no se dublique en el html
    }
  })
}

// on radio filters change 
// const radioYearMayor = document.getElementById("asc");
// radioYearMayor.addEventListener("change", () => {
//   indicator.innerHTML = "";//Limpiar funcion
//   const resultado = window.WorldBank.filterCountry(data, listQuestion)//Datos de data.js
//   const resultadoOrder = window.WorldBank.orderData(resultado, 'years', 'asc')//Datos de data.js
//   for (let resultadoYear in resultadoOrder) { //declaramos una variable y el obejto de donse encuentra lo que vamos a filtrar
//     let parrafo = document.createElement('p');// creamos un elemento p temporal ira grafica
//     parrafo.innerHTML = `<b>Año</b>: ${resultadoOrder[resultadoYear]} => ${resultado[resultadoOrder[resultadoYear]] || 0} ` //imprimimos el año y numeros
//     indicator.appendChild(parrafo); //limpiamos para que no se dublique en el html
//   }
// })


