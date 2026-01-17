import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  template: `
    <label class="field">
      <div class="lbl">{{ label }}</div>
      <textarea
        [value]="value ?? ''"
        (input)="onInput($event)"
        rows="5"
      ></textarea>
    </label>
  `,
  styleUrls: ['./textarea-field.component.css']
})
export class TextareaFieldComponent {
  @Input() label = '';
  @Input() value: string | undefined;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
