import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[typingEffect]',
})
export class TypingEffectDirective implements OnChanges {
  @Input() speed: number = 30;
  @Input({ required: true }) text: string = '';
  @Input({ required: true }) callback: Function = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) this.typingEffect();
  }

  private typingEffect() {
    const textArray = this.text.split('');
    const element = this.el.nativeElement;

    this.renderer.setProperty(element, 'textContent', '');

    textArray.forEach((char, index) => {
      setTimeout(() => {
        this.callback();

        const newText = element.textContent + char;
        this.renderer.setProperty(element, 'textContent', newText);
      }, this.speed * index);
    });
  }
}
