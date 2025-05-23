import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgcolor]'
})
export class BgcolorDirective implements OnChanges,OnInit{

  @Input() appBgColor: string = 'red'; // Default color

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.appBgColor;
  }


    ngOnChanges(): void {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBgColor);
    }
}
