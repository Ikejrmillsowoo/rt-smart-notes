import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="field">
      <div class="lbl">{{ label }}</div>
      <select [value]="value ?? ''" (change)="onChange($event)">
        <option value="">{{ placeholder }}</option>
        <option *ngFor="let o of options" [value]="o">{{ o }}</option>
      </select>
    </label>
  `,
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent {
  @Input() label = '';
  @Input() placeholder = 'Select...';
  @Input() options: string[] = [];
  @Input() value: string | undefined;

  @Output() valueChange = new EventEmitter<string>();

  onChange(e: Event) {
    const v = (e.target as HTMLSelectElement).value;
    this.valueChange.emit(v);
  }
}
