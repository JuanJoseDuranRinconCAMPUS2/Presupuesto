import config from "/storage/config.js";
let myFormularioIngresos = document.querySelector("#myFormularioIngresos");

let numberIngresos = 0;
let numberEgresos = 0;
let presupuesto = 0;
let porcentajeTotal = 0;


export default{

    Show(){
        config.dataMySystem();
        Object.assign(this, JSON.parse(localStorage.getItem("mySystem")));
        
        const ws = new Worker("storage/wsMySystem.js", {type: "module"});
        let id = [];
        let recorrido = 0;
        let count= 0;
        ws.postMessage({module: "displayHeader", data: this.valores});
        ws.postMessage({module: "displayTable", data: this.valores});
        ws.postMessage({module: "displayCircleIngresos", data: this.valores});

    
        id = ["#header","#DiosPorfavorQueSirvaLaTabla", "#diagramas"];
        ws.addEventListener("message", (e)=>{
        
        let doc = new DOMParser().parseFromString(e.data, "text/html");
        document.querySelector(id[count]).append(...doc.body.children);
        (id.length-1==0) ? ws.terminate(): count++;
        });

        myFormularioIngresos.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            let porcentajeVar = "";
        
            switch(data.Sis){
                case "positivo":
                    numberIngresos = numberIngresos + parseInt(data.dinero);
                    this.valores.ingresos.datos.unshift(data);
                    this.valores.ingresos.number =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(numberIngresos);
                    
                break;
                case "negativo":
                    numberEgresos =  numberEgresos - parseInt(data.dinero);
                    console.log(numberEgresos);
                    this.valores.egreso.conteo.map((val,id)=>{
                        val.porcentajes= [];
                        val.datos.unshift(data.dinero);
                        recorrido = 0;
                        val.datos.map((val1,id)=>{
                            porcentajeVar = Math.abs(parseInt((val1)*100)/numberEgresos) * -1;
                            recorrido++
                            console.log(porcentajeVar);
                        })
                    })

                    this.valores.egreso.datos.unshift(data);
                    this.valores.egreso.number =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(numberEgresos);
                    console.log(this.valores)
                break;
            };

            presupuesto = numberIngresos -(-numberEgresos);
            this.valores.Presupuesto = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(presupuesto);
            porcentajeTotal = -((numberEgresos/numberIngresos)*100);
            this.valores.egreso.porcentaje = parseInt(porcentajeTotal);
            myFormularioIngresos.reset();
            
            const ws = new Worker("storage/wsMySystem.js", {type: "module"});
            let id = [];
            let count= 0;
            ws.postMessage({module: "displayHeader", data: this.valores});
            ws.postMessage({module: "displayTable", data: this.valores});
            ws.postMessage({module: "displayCircleIngresos", data: this.valores});

            id = ["#header","#DiosPorfavorQueSirvaLaTabla", "#diagramas"];
            ws.addEventListener("message", (e)=>{
            
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==0) ? ws.terminate(): count++;
        });
         });
        },       

}

