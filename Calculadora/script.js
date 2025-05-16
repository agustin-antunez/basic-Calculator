const display = document.getElementById("display");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const resultado = document.getElementById("resultado");
const buttons = document.querySelectorAll(".btn");
const styles = document.getElementById("styles");
const changeStyles = document.getElementById("changeStyles");


//EXPRESION REGEX PARA QUE NO HAYA REPETICIONES DE SIMBOLOS EN LA CALCULADORA
let regexCalc = /^-?(\d+(\.\d+)?)([+\-*/](\d+(\.\d+)?))*$/;
let valor = 0;

//EVENTO DEL BOTON IGUAL
equal.addEventListener("click", ()=>{
    let displayValue = display.value.trim();

        //VERIFICA SI LA OPERACION ESTA SIENDO DIVIDIDA POR 0
        if(displayValue.includes("/0")){
            display.value = "Zero is not divisible";
            setTimeout(() => {
                display.value = '';
            }, 2000);
            const audioError2 = new Audio('./audio/winError.mp3');
            audioError2.playbackRate = 1.2;
            audioError2.play();
            throw new Error("No se puede dividir por 0");
        }
        //Verificar si despues de un numero hay un simbolo (bien), si despues de un simbolo hay otro simbolo (mal)
        else if (regexCalc.test(displayValue) && displayValue !== ""){
            valor = eval(displayValue);
            resultado.textContent = valor;
            display.value = "";
            const audioSucess = new Audio('./audio/sucess.mp3');
             audioSucess.playbackRate = 1.2;
            audioSucess.play();
            console.log(resultado);
        }
        else {
            display.value = "Syntax Error";
            setTimeout(() => {
                display.value = "";
            }, 1000);
            const errorAudio = new Audio('./audio/dubError.mp3');
            errorAudio.playbackRate = 1.2;
            errorAudio.play();
            
            throw new Error("Error de sintaxis");
           
        };
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

    const arrayStyles = ["./css/styles.css","./css/yellow.css", "./css/oscuro.css", "./css/vintage.css"];
    let indice=e.target.value;
    styles.href = arrayStyles[indice];
});