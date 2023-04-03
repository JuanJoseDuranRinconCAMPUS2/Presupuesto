export let wsMySystem = {
    displayHeader(p1){
        return `
        <h4 class="Presupuesto text-center text-white" >Presupuesto Disponible</h4>
        <h1 class="text-center text-white">$700,000.00</h1>
        <br>
        <div class="container text-white text-center">
            <div class="row align-items-center bg-info my-2 py-2">
                <div class="col">
                    INGRESOS
                </div>
                <div class="col">
                    KRUMER
                </div>
            </div>
            <div class="row align-items-center bg-danger my-3 py-2">
                <div class="col">
                    EGRESOS
                </div>
                <div class="col">
                    KRUMER
                </div>
            </div>
        </div>
        `
    },

    displayBodyInput(p1){
        return`
        <form id="myFormularioIngresos" class="row g-3 align-items-center">
        <div class="col-auto">
            <select name="Sis"> 
                <option value="positivo">+</option>
                <option value="negativo">-</option>
            </select>
        </div> 
        <div class="col-auto">
            <input type="text" name="Descripcion" placeholder="Agregar Descripcion" class="form-control">
        </div>
        <div class="col-auto">
            <input type="number" name="dinero" class="form-control">
        </div>
        <div class="col-auto">
            <button type="submit" value="Guardar" class="btn btn-outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                </svg>
            </button>
        </div>
    </form>
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
                        <tr>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
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
                        <tr>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                      </tbody>
                </table>
            </div>
        </div>
        `
    }
}

self.addEventListener("message", (e)=>{
    postMessage(wsMySystem[`${e.data.module}`](e.data.data));
    
})