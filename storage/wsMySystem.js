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
                        
                        ${p1.ingresos.datos.map((val, id)=>{return `<tr><th>${val.Descripcion}</th><th>${val.dinero}</th></tr>`}).join("")}
                        
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

                      ${p1.egreso.datos.map((val, id)=>{return `<tr><th>${val.Descripcion}</th><th>${val.dinero}</th></tr>`}).join("")}

                      </tbody>
                </table>
            </div>
        </div>
        `
    },
    displayCircleIngresos(p1){
      return`
      <div id="main" style="width: 600px;height:400px;"></div>
      <script type="text/javascript">
         
         var chartDom = document.getElementById('main');
          var myChart = echarts.init(chartDom);
          var option;

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
              max: 4
          },
          angleAxis: {
              type: 'category',
              data: ['a', 'b', 'c', 'd'],
              startAngle: 75
          },
          tooltip: {},
          series: {
              type: 'bar',
              data: [2, 1.2, 2.4, 3.6],
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
        </script>
      `
    }
}

self.addEventListener("message", (e)=>{
    postMessage(wsMySystem[`${e.data.module}`](e.data.data));
    
})