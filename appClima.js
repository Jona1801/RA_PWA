
const kelvin=273.15;

const obtenerClima=()=>{
	let ciudad=document.querySelector("#ciudad").value;
	let pais=document.querySelector("#pais").value;

	if (ciudad.trim()===''||
		pais.trim()==='') {
		mostrarError("#msj-error", "Falta Completar Campos");

		return;
	}

	consultarAPI(ciudad, pais);
}

const consultarAPI= async(ciudad, pais)=>{
	const apiKey="dd9cfe811fdae38c47743dbd26aa7e14";
	const url=`http://api.openWeathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
	console.log(url);
	const respuesta = await fetch(url);
	const resultado = await respuesta.json ();
	console.log(resultado);

	if (resultado.cod=="404") {
		mostrarError("#msj-error", "No hay resultados");
		return;
	}

	const {name, main}= resultado;
	if (!name) return null;

	let divResultado= document.querySelector("#divResultado");

	divResultado.innerHTML=`
		<div class="card-panel white col s12" style="margin-top:50px; justify-content: center; text-align: center; align-items: center;">
			<div class="text-dark" style="font-weight:bold;">
				<h2 style="color:black;">El clima de ${name} es: </h2>
				<p class="temperatura">
				${ parseFloat(main.temp-kelvin,10).toFixed(2) } <span> &#x2103;</span>
				</p>
				<p > Temperatura Maxima:
				${ parseFloat(main.temp_max-kelvin,10).toFixed(2) } <span> &#x2103;</span>
				</p>
				<p >Temperatura Minima:
				${ parseFloat(main.temp_min-kelvin,10).toFixed(2) } <span> &#x2103;</span>
				</p>
				<p >Humedad:
				${ parseFloat(main.humidity,10).toFixed(2) } <span> % </span>
				</p>
			</div>
		</div>
	`;
}

const mostrarError=(elemento, mensaje)=>{
	divError=document.querySelector(elemento);
	divError.innerHTML=`<p class="red darken-4 error">${mensaje}</p>`;
	setTimeout(()=>{
		divError.innerHTML=``;}, 2000);

	}