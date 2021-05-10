import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class ImageCarouselComponent implements OnInit {

  @ViewChild('gloveSlide',{static: true}) gloveSlide: NgbCarousel;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.interval = 0;
  }

  ngOnInit(): void {
  }


}
