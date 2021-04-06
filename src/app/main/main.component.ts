import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { forEach, toLower } from 'lodash';
import { Subject } from 'rxjs';
import { GloveApiService } from '../services/glove-api-service';
import { ScriptsStore } from '../services/script-store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit , AfterViewInit{
  private unsubscribe$ = new Subject<boolean>();

  @Input() profile: string;
  @Input() glove: string;
  @Input() name: string;
  @Input() price: string;
  @Input() price2: string;
  @Input() product: string;

  watcher$ = false;
  gloveType: { name: string; type: string; }[];

  constructor(private gloveApi: GloveApiService, private scripts:ScriptsStore) {
      this.scripts.load('jQuery','bootstrap').then(data => console.log('Script loaded' + data)).catch(error => console.log(error))

  }

  ngOnInit() {
    this.gloveType = [
      { name: "dual welt glove", type: "inf_dw" },
      { name: "outfield glove", type: "of" },
      { name: "catcher mitt", type: "cm" },
      { name: "fastback catcher mitt", type: "catcher-fastback" },
      { name: "first base mitt", type: "fbase" },
      { name: "infield glove", type: "inf" },
    ];

    console.log('Glove Received, ver 1.0.3')

  }

  ngAfterViewInit(): void {
    forEach(this.gloveType, (g) => {
      forEach(g, (v, k) => {
        if (v == toLower(this.glove)) {
          this.gloveApi.init(this.profile, g.type);
        }
      });
    });
  }


  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
