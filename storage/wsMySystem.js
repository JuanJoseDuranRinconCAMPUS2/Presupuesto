export let wsMySystem = {
    displayHeader(p1){
      console.log(p1);
        return `
        <h4 class="Presupuesto text-center text-white" >Presupuesto Disponible</h4>
        <h1 class="text-center text-white">${(p1.Presupuesto)}</h1>
        <br>
        <div class="container text-white text-center">
            <div class="row align-items-center bg-info my-2 py-2">
                <div class="col">
                    INGRESOS
                </div>
                <div class="col">
                ${p1.ingresos.number}

                </div>
            </div>
            <div class="row align-items-center bg-danger my-3 py-2">
                <div class="col">
                    EGRESOS
                </div>
                <div class="col">
                ${p1.egreso.number} % ${p1.egreso.porcentaje}
                </div>
            </div>
        </div>
        `
    },


    displayTable(p1){
        return`
        <div class="row align-items-center  my-2 py-5">
            <div class="col">
                <table class="table table-success table-striped table-hover">
                    
                    <thead>
                        <tr>
                          <th scope="col" class="text-success fs-5">INGRESOS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        ${p1.ingresos.datos.map((val, id)=>{return `<tr><th>${val.Descripcion}</th><th>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(val.dinero)}</th></tr>`}).join("")}
                        
                      </tbody>
                </table>
            </div>
            <div class="col">
                <table class="table table-danger table-striped table-hover">
                    <thead>
                        <tr>
                          <th scope="col" class="text-danger fs-5">EGRESOS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>

                      ${p1.egreso.datos.map((val, id)=>{return `<tr><th>${val.Descripcion}</th><th>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(val.dinero)}${p1.egreso.conteo.map((val,id2)=>{return `${val.porcentaje[id]}%</th>`})}</tr>`}).join("")}

                      </tbody>
                </table>
            </div>
        </div>
        
        `
    },
}

self.addEventListener("message", (e)=>{
    postMessage(wsMySystem[`${e.data.module}`](e.data.data));
    
})