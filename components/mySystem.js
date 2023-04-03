import config from "/storage/config.js";

export default{

    Show(){
        config.dataMySystem();
        Object.assign(this, JSON.parse(localStorage.getItem("mySystem")));
        const ws = new Worker("storage/wsMySystem.js", {type: "module"});
        let id = [];
        let count= 0;
        ws.postMessage({module: "displayHeader", data: this.data});
        ws.postMessage({module: "displayBodyInput", data: this.data});
        ws.postMessage({module: "displayTable", data: this.data});

        id = ["#header", "#bodyInput", "#DiosPorfavorQueSirvaLaTabla"];
        ws.addEventListener("message", (e)=>{
        
        let doc = new DOMParser().parseFromString(e.data, "text/html");
        document.querySelector(id[count]).append(...doc.body.children);
        (id.length-1==0) ? ws.terminate(): count++;
        });

        
        
        
    },
}