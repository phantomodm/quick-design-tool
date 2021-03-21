

import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
  integrity?: string;
  crossorigin?: string;
}

export const ScriptStore:Scripts[] = [
  {name: 'jQuery', src:'https://code.jquery.com/jquery-3.6.0.min.js', integrity:"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=", crossorigin: "anonymous"}
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
                console.log(document.readyState)
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
