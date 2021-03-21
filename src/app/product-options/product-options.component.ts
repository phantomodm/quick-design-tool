import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GloveApiService } from "src/app/services/glove-api-service";
import { DomSanitizer } from "@angular/platform-browser";
import * as _ from "lodash";
import { Subject } from "rxjs";
import { take, takeUntil, distinctUntilChanged } from "rxjs/operators";

declare var $;


@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.css']
})
export class ProductOptionsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<boolean>();
  @ViewChild('') personalization: HTMLInputElement;
  @Input('') price;
  @Input('') name;
  @Input('') price2;


  gloveData;
  gloveType;
  leatherType = "steer";
  glovePart = "leather";
  webs;
  webFilter;
  webCheck: boolean;

  constructor(
    private gloveApi: GloveApiService,
    private _sanitizer: DomSanitizer
  ) {
    this.gloveApi.gloveTypeWatcher$
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged(), take(2))
      .subscribe((res) => (this.gloveType = res));
  }

  public sanitizeImage(image: string) {
    return this._sanitizer.bypassSecurityTrustUrl(`url(${image})`);
  }

  ngOnInit() {
    this.gloveData = this.gloveApi.gloveInputOptions$;
    this.price = "1.00"
    this.price2 = "1.00"
    this.name = "test"
  }

  inputPersonalization(input:string){
    console.log(input)
  }

  filterWebInputs(collection: any[]) {
    return _.filter(collection, (f) => {
      return _.find(f.gloveType, (m) => {
        if (m === this.gloveType) {
          return true;
        }
      });
    });
  }

  gloveWebExpressionCheck(event: string): boolean {
    if (event !== "gloveWeb") {
      return false;
    }
    return true;
  }

  filterColorInputs(collection: any[], id: string) {
    const db = collection;
    // tslint:disable-next-line: variable-name

    const _id = id;
    switch (_id) {
      case "gloveBody":
      case "gloveAccent":
      case "gloveTrim":
        return _.filter(collection, (f) => {
          return _.find(f.leather, (r) => {
            if (r === this.leatherType) {
              return true;
            }
          });
        });
        break;
      default:
        break;
      }

      switch (_id) {
        case "embroideryColor":
        case "gloveLogo":
          return _.filter(collection, (f) => {
            return _.find(f.leather, (r) => {
              if (r === "embroidery") {
                return true;
              }
            });
          });
        default:
          break;
      }
  }

  onSubmit(){
    const submit = $(".single_add_to_cart_button")
      .removeClass("disabled")
      .click();
  }

  applyFill(event, fill, value?, elementId?) {
    console.log("ApplyFill ", event, fill, value, elementId);
    const target = event.target.dataset.glove_section;
    this.gloveApi.getHexIdFromDomSelection(event, fill, value, elementId);
  }

  selectWeb( element , value ){
    console.log("SelectWeb ",element, value)
    this.gloveApi.applyHtmlInput(element,value)
  }

  changeEvent(event) {
    const name = event.target.name;
    const value = event.target.value;
    const _id = event.target.id;
    const eventType = event.type;
    console.log("Change",event)
    if (_.isEqual(name, "glove_series")) {
      switch (value) {
        case "kip":
          this.leatherType = "kip";
          break;

        default:
          this.leatherType = "steer";
          break;
      }
    }

    this.gloveApi.applyHtmlInput(_id, value, eventType)
  }


  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
