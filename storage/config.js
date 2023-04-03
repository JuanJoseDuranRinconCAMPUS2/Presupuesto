export default{
    dataMySystem(){
        localStorage.setItem("mySystem", JSON.stringify({
            valores:{
                Presupuesto:"",
                ingresos:{
                    number:"",
                    data:[]
                },
                egreso:{
                    number:"",
                    porcentaje:"",

                    data:[{
                        datos:[],
                        porcentaje:[],
                    }],
                }
            },

        }))        
    }
}