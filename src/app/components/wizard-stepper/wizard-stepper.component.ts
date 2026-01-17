import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wizard-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stepper">
      <div
        class="step"
        *ngFor="let s of steps; let i = index"
        [class.active]="i === activeIndex"
        [class.done]="i < activeIndex"
      >
        <div class="dot">{{ i + 1 }}</div>
        <div class="label">{{ s }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./wizard-stepper.component.css']
})
export class WizardStepperComponent {
  @Input() steps: string[] = [];
  @Input() activeIndex = 0;
}
