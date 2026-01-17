import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap">
      <div class="lbl">{{ label }}</div>

      <label class="item" *ngFor="let o of options">
        <input
          type="checkbox"
          [checked]="value.includes(o)"
          (change)="toggle(o, $event)"
        />
        <span>{{ o }}</span>
      </label>
    </div>
  `,
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent {
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() value: string[] = [];

  @Output() valueChange = new EventEmitter<string[]>();

  toggle(opt: string, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    const next = new Set(this.value ?? []);
    if (checked) next.add(opt);
    else next.delete(opt);
    this.valueChange.emit(Array.from(next));
  }
}
