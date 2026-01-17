import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap">
      <div class="lbl">{{ label }}</div>
      <div class="toggles">
        <button
          *ngFor="let o of options"
          type="button"
          [class.active]="o === value"
          (click)="valueChange.emit(o)"
        >
          {{ o }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./toggle-group.component.css']
})
export class ToggleGroupComponent {
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() value: string | undefined;

  @Output() valueChange = new EventEmitter<string>();
}
