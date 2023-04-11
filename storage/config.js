export default{
    dataMySystem(){
        let prueba = localStorage.getItem("mySystem");
        if (prueba === null) {localStorage.setItem("mySystem", JSON.stringify({
            valores:{
                Presupuesto: 0,

                ingresos:{
                    number:"",
                    datos:[ ]
                },
                egreso:{
                    number:"",
                    datos: [ ],
                    porcentaje:"",
                    conteo:[{
                        datos:[ ],
                        porcentaje:[ ],
                    }],

                    
                },

                tablaIngresos:{
                    id: [],
                    valor: [],
                    max: [],
                },
                tablaEgresos:{
                    id: [],
                    valor: [],
                    max: [],
                }
            },

        }))  
        }
    }
}