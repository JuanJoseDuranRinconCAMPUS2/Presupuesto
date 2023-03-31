let myFormularioIngresos = document.querySelector("#myFormularioIngresos");



myFormularioIngresos.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data)
    myFormularioIngresos.reset();
});