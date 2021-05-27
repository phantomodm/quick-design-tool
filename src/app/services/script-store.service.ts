

import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
  integrity?: string;
  crossorigin?: string;
}

export const ScriptStore:Scripts[] = [
  {name: 'jQuery', src:'https://code.jquery.com/jquery-3.6.0.min.js', integrity:"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=", crossorigin: "anonymous"},
  {name:'bootstrap',src:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js",integrity:"sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0",crossorigin:"anonymous"},
  {name: 'boot-icon', src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" }
]

@Injectable({
  providedIn: 'root'
})

export class ScriptsStore {
  private scripts: any = {}

  constructor() {
    ScriptStore.forEach((script: any) => {
        this.scripts[script.name] = {
            loaded: false,
            src: script.src
        };
    });
}

load(...scripts: string[]) {
    let promises: any[] = []
    scripts.forEach((script) => promises.push(this.loadScript(script)))
    console.log(promises)
    return Promise.all(promises)
}

loadScript(name: string) {
    return new Promise((resolve, reject) => {
        //resolve if already loaded
        if (this.scripts[name].loaded) {
            resolve({script: name, loaded: true, status: 'Already Loaded'});
        }
        else {
            //load script
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            if (document.readyState) {  //IE
                document.onreadystatechange = () => {
                    if (document.readyState === "interactive" || document.readyState === "complete") {
                      document.onreadystatechange = null;
                        this.scripts[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    }
                };
            } else {  //Others
                console.log("loaded")
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            }
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    });
}
}
