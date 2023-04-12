import config from "/storage/config.js";
let myFormularioIngresos = document.querySelector("#myFormularioIngresos");

// Creamos las variables que utilizaremos mas adelante
let numberIngresos = 0;
let numberEgresos = 0;
let presupuesto = 0;
let porcentajeTotal = 0;

//variables de la tabla de ingresos
var chartDom = document.getElementById('ingresos');
var myChart = echarts.init(chartDom);
var option;
//variables de la tabla de egresos
var chartDom2 = document.getElementById('Egresos');
var myChart2 = echarts.init(chartDom2);
var option2;
//variables de la tabla de Total
var chartDom3 = document.getElementById('Total');
var myChart3 = echarts.init(chartDom3);
var option3;

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

    
        id = ["#header","#DiosPorfavorQueSirvaLaTabla"];
        ws.addEventListener("message", (e)=>{
        
        let doc = new DOMParser().parseFromString(e.data, "text/html");
        document.querySelector(id[count]).append(...doc.body.children);
        (id.length-1==0) ? ws.terminate(): count++;
        });

        myFormularioIngresos.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            let porcentajeVar = "";
            
            //operaciones
            switch(data.Sis){
                case "positivo":
                    this.valores.ingresos.datos.unshift(data);
                    this.valores.ingresos.number =  parseInt(this.valores.ingresos.number) + parseInt(data.dinero);
     
                break;
                case "negativo":
                    
                this.valores.egreso.datos.unshift(data);
                this.valores.egreso.number =  parseInt(this.valores.egreso.number) + parseInt(data.dinero);
                console.log(this.valores.egreso.number);

                    
                    this.valores.egreso.conteo.map((val,id)=>{
                        val.porcentajes= [];
                        val.datos.unshift(data.dinero);
                        recorrido = 0;
                        val.datos.map((val1,id)=>{
                            
                            porcentajeVar = (parseInt((val1))/this.valores.egreso.number)*100;
                            porcentajeVar = porcentajeVar.toFixed(2)
                            val.porcentaje.push(porcentajeVar);
                            recorrido++
                            console.log(`${val.porcentaje}`);
                        })
                    })
                    
                break;
            };
            presupuesto = this.valores.ingresos.number -(Math.abs(this.valores.egreso.number * -1));
            this.valores.Presupuesto = presupuesto
            porcentajeTotal = -((this.valores.egreso.number/this.valores.ingresos.number)*100);
            porcentajeTotal = porcentajeTotal.toFixed(2)
            this.valores.egreso.porcentaje = porcentajeTotal;
            myFormularioIngresos.reset();
            

            localStorage.setItem("mySystem", JSON.stringify(this));
            console.log();

            const ws = new Worker("storage/wsMySystem.js", {type: "module"});
            let id = [];
            let count= 0;
            ws.postMessage({module: "displayHeader", data: this.valores});
            ws.postMessage({module: "displayTable", data: this.valores});

            id = ["#header","#DiosPorfavorQueSirvaLaTabla"];
            ws.addEventListener("message", (e)=>{
            
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==0) ? ws.terminate(): count++;
        });
        //if para definir hacia donde sera enviada la informacion
        if (data.Sis == "positivo") {
            this.valores.tablaIngresos.id.unshift(data.Descripcion);
            this.valores.tablaIngresos.valor.unshift(parseFloat(data.dinero));
        }else{
            this.valores.tablaEgresos.id.unshift(data.Descripcion);
            this.valores.tablaEgresos.valor.unshift(parseFloat(data.dinero));
            
        }
        
        //funcion para sacar el maximo dato (curiosamente para la grafica no es compatible el math.max)
       let maximoIngreso = this.valores.tablaIngresos.valor;
        function encontrarMaximo(arr) {
            let maximo = arr[0];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] > maximo) {
                maximo = arr[i];
              }
            }
            return maximo;
          }

        let max = encontrarMaximo(maximoIngreso);
      
        let maximoEgreso = this.valores.tablaEgresos.valor;
        function encontrarMaximo(arr) {
            let maximo = arr[0];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] > maximo) {
                maximo = arr[i];
              }
            }
            return maximo;
          }

        let maxEgreso = encontrarMaximo(maximoEgreso);
        
        let maximoTotal = [presupuesto, this.valores.ingresos.number, this.valores.egreso.number];
        function encontrarMaximo(arr) {
            let maximo = arr[0];
           for (let i = 0; i < arr.length; i++) {
             if (arr[i] > maximo) {
                maximo = arr[i];
               }
            }
            return maximo;
           }

        let maxTotal = encontrarMaximo(maximoTotal);

        option = {
            title: [
                {
                text: 'Ingresos'
                }
            ],
            polar: {
                radius: [30, '80%']
            },
            radiusAxis: {
                max: max
            },
            color: '#008000',
            angleAxis: {
                type: 'category',
                data: this.valores.tablaIngresos.id,
                startAngle: 75
            },
            tooltip: {},
            series: {
                type: 'bar',
                data: this.valores.tablaIngresos.valor,
                coordinateSystem: 'polar',
                label: {
                show: true,
                position: 'middle',
                formatter: '{b}: {c}'
                }
            },
            animation: false
            };
            option && myChart.setOption(option);
            

            //tabla 2
            option2 = {
                title: [
                    {
                    text: 'Egresos'
                    }
                ],
                polar: {
                    radius: [30, '80%']
                },
                radiusAxis: {
                    max: maxEgreso
                },
                color: '#a90000',
                angleAxis: {
                    type: 'category',
                    data: this.valores.tablaEgresos.id,
                    startAngle: 75
                },
                tooltip: {},
                series: {
                    type: 'bar',
                    data: this.valores.tablaEgresos.valor,
                    coordinateSystem: 'polar',
                    label: {
                    show: true,
                    position: 'middle',
                    formatter: '{b}: {c}'
                    }
                },
                animation: false
                };
                option && myChart2.setOption(option2);

                //tabla 3
                   option3 = {
                     title: [
                         {
                         text: 'Total'
                         }
                     ],
                     polar: {
                         radius: [30, '80%']
                     },
                     radiusAxis: {
                         max: maxTotal
                     },
                     color: '#808000',
                     angleAxis: {
                         type: 'category',
                         data: ["Presupuesto", "Ingresos", "Egresos"],
                         startAngle: 75
                     },
                     tooltip: {},
                     series: {
                         type: 'bar',
                         data: [presupuesto, this.valores.ingresos.number,this.valores.egreso.number],
                         coordinateSystem: 'polar',
                         label: {
                         show: true,
                         position: 'middle',
                         formatter: '{b}: {c}'
                         }
                     },
                     animation: false
                     };
                     console.log(this.valores.Presupuesto);
                     option && myChart3.setOption(option3);
         });
         
        },       

}

