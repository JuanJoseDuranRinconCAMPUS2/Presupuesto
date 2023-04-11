export let wsMySystem = {
    displayHeader(p1){
      console.log(p1);
        return `
        <link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'>
        <h1  class="text-center" id="title">
        Presupuesto
        </h1>
        <br>
        <br>
        <br>
        <h1 class="text-center text-white">${(p1.Presupuesto)}</h1>
        <br>
        <div class="container text-white text-center">
            <div class="row align-items-center my-2 py-2" id="marcadorIngresos">
                <div class="col">
                    INGRESOS
                </div>
                <div class="col">
                ${p1.ingresos.number}

                </div>
            </div>
            <div class="row align-items-center my-3 py-2" id="marcadorEgresos">
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
        console.log();
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

                      ${p1.egreso.datos.map((val, id)=>{
                        return `
                        <tr>
                        <th>${val.Descripcion}</th>
                        <th>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(val.dinero)}
                        ${p1.egreso.conteo.map((val,id2)=>{return `${val.porcentaje[id]}% 
                        <button type="submit" value="Guardar" class="btn btn-outline-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                        </th>`})}
                        </tr>`}).join("")}

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