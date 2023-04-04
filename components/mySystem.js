import config from "/storage/config.js";
let myFormularioIngresos = document.querySelector("#myFormularioIngresos");

let numberIngresos = 0;
let numberEgresos = 0;
let presupuesto = 0;
let porcentajeTotal = 0;
let recorrido = 0;

export default{

    Show(){
        console.log(myFormularioIngresos);
        config.dataMySystem();
        Object.assign(this, JSON.parse(localStorage.getItem("mySystem")));
        const ws = new Worker("storage/wsMySystem.js", {type: "module"});
        let id = [];
        let count= 0;
        ws.postMessage({module: "displayHeader", data: this.valores});
        ws.postMessage({module: "displayBodyInput", data: this.valores});
        ws.postMessage({module: "displayTable", data: this.valores});

        id = ["#header", "#bodyInput", "#DiosPorfavorQueSirvaLaTabla"];
        ws.addEventListener("message", (e)=>{
        
        let doc = new DOMParser().parseFromString(e.data, "text/html");
        document.querySelector(id[count]).append(...doc.body.children);
        (id.length-1==0) ? ws.terminate(): count++;
        });

        
        
        
    },
}