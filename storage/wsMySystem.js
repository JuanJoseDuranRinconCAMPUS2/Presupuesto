export let wsMySystem = {
    displayHeader(p1){
      console.log(p1);
        return `
        <link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'>
        <h1  class="text-center" id="title">
        Presupuesto
        </h1>
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

                      ${p1.egreso.datos.map((val, id)=>{return `<tr><th>${val.Descripcion}</th><th>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(val.dinero)}${p1.egreso.conteo.map((val,id2)=>{return `${val.porcentaje[id]}% <i class="bi bi-x-circle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg></i></th>`})}</tr>`}).join("")}

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