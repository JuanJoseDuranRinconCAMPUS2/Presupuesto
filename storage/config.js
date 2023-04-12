export default{
    dataMySystem(){
        let prueba = localStorage.getItem("mySystem");
        if (prueba === null) {localStorage.setItem("mySystem", JSON.stringify({
            valores:{
                Presupuesto: 0,

                ingresos:{
                    number: 0,
                    datos:[ ]
                },
                egreso:{
                    number: 0,
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