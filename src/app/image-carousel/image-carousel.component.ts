import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class ImageCarouselComponent implements OnInit {

  showNavigationArrows = true;
  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
   }

  ngOnInit(): void {
  }

}
