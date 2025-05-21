const display = document.getElementById("display");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const resultado = document.getElementById("resultado");
const buttons = document.querySelectorAll(".btn");
const styles = document.getElementById("styles");
const changeStyles = document.getElementById("changeStyles");
const changeBackground = document.getElementById('changeBg');
const historial = document.getElementById("history");
const historialContain = document.querySelector(".historyContainer");
const historyRegister = document.querySelector(".history__register");

//EXPRESION REGEX PARA QUE NO HAYA REPETICIONES DE SIMBOLOS EN LA CALCULADORA
let regexCalc = /^-?(\d+(\.\d+)?)([+\-*/](\d+(\.\d+)?))*$/;
let valor = 0;

//EVENTO DEL BOTON IGUAL
equal.addEventListener("click", ()=>{
    let displayValue = display.value.trim();

    const errorAudio = new Audio('./audio/dubError.mp3');

        if(displayValue === ""){
            display.value = "Write Something >:(";
            display.style.color = '#e03832';
            setTimeout(() => {
                display.value = "";
                display.style.color = '';
            }, 2000);
            errorAudio.playbackRate = 1.2;
            errorAudio.play();
            throw new Error("No hay nada escrito");
        }
        //VERIFICA SI LA OPERACION ESTA SIENDO DIVIDIDA POR 0
        else if(displayValue.includes("/0")){
            display.value = "Zero is not divisible";
            display.style.color = '#e03832';
            setTimeout(() => {
                display.value = '';
                display.style.color = '';
            }, 2000);
            errorAudio.playbackRate = 1.2;
            errorAudio.play();
            throw new Error("No se puede dividir por 0");  
        }
        //Verificar si despues de un numero hay un simbolo (bien), si despues de un simbolo hay otro simbolo (mal)
        else if (regexCalc.test(displayValue) && displayValue !== ""){
            let historialArray = JSON.parse(sessionStorage.getItem("historialArray")) || [];
            valor = eval(displayValue);
            resultado.textContent = valor;
            display.value = "";
            const audioSucess = new Audio('./audio/sucess.mp3');
             audioSucess.playbackRate = 1.2;
            audioSucess.play();
            const data = `${displayValue} = ${valor}`;
            historialArray.push(data);
            const p = document.createElement("p");
            p.textContent = data;
            historyRegister.appendChild(p);
            console.log(`Se guardo esto: ${data}`);
        }
        else {
            display.value = "Syntax Error";
            display.style.color = '#e03832';
            setTimeout(() => {
                display.value = "";
                display.style.color = '';
            }, 2000);
            
            errorAudio.playbackRate = 1.2;
            errorAudio.play();
            
            throw new Error("Error de sintaxis");  
        }
});

//EVENTO DEL BOTON CLEAR ALL

clear.addEventListener("click",function(e){
e.preventDefault();
display.value = "";
valor = 0;
resultado.textContent = valor;
const clearAudio = new Audio('./audio/clear.mp3');
clearAudio.play();
});

//EVENTO DE LOS BOTONES CON ESTILO 
buttons.forEach(btn=>{
    btn.addEventListener("mousedown",()=>{
        display.value += btn.value;
        resultado.textContent = "";
        btn.classList.add("pressed");
        console.log(display);
        });

    btn.addEventListener("mouseup", ()=> {
            btn.classList.remove("pressed");
            const audioButton = new Audio('./audio/button1.mp3');
            audioButton.play();
            audioButton.volume = 0.2;
        });

    });

//EVENTO PARA CAMBIAR LA RUTA DE ESTILOS 
changeStyles.addEventListener("change", function(e) {
    e.preventDefault();

    const arrayStyles = ["./css/styles.css", "./css/moderno.css", "./css/vintage.css"];
    let indice=e.target.value;
    styles.href = arrayStyles[indice];
});

//EVENTO PARA LA APARACION DEL HISTORIAL

historialContain.classList.add('hidden');

historial.addEventListener('click', ()=>{
    historialContain.classList.toggle("hidden");
});

//EVENTO PARA CAMBIAR EL FONDO 

changeBackground.addEventListener('change', function(e){
    const arrayBackground = ['var(--bgColor)','./img/abstract.jpg','./img/galaxy.jpg', './img/mountains.jpg', './img/WorldCup.jpg']
    let i = parseInt(e.target.value);
    if(i === 0){
        document.body.style.backgroundColor = 'var(--bgColor)';
        document.body.style.backgroundImage = '';
    }
    else if (i>0){
         document.body.style.backgroundImage = `linear-gradient(#0001, #000),url(${arrayBackground[i]})`;
         document.body.style.backgroundColor = '';
    }
});