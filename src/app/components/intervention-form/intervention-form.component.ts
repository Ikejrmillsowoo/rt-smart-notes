import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Intervention, NoteType } from '../../models/note.model';
import { CheckboxListComponent } from '../../shared/checkbox-list/checkbox-list.component';
import { SelectFieldComponent } from '../../shared/select-field/select-field.component';

@Component({
  selector: 'app-intervention-form',
  standalone: true,
  imports: [CommonModule, CheckboxListComponent, SelectFieldComponent],
  template: `
    <h3>Intervention</h3>

    <app-checkbox-list
      label="Common Actions"
      [options]="actions"
      [value]="intervention.actions"
      (valueChange)="set('actions', $event)"
    ></app-checkbox-list>

    <label class="field">
      <div class="lbl">Custom intervention text (optional)</div>
      <input [value]="intervention.customText ?? ''" (input)="set('customText', $any($event.target).value)" placeholder="e.g., Discussed plan with RN/MD..." />
    </label>

    <div *ngIf="noteType === 'TREATMENT'" class="treat">
      <h4>Treatment Details</h4>

      <div class="grid">
        <label>
          <div class="lbl">Treatment Type</div>
          <input [value]="intervention.treatmentType ?? ''" (input)="set('treatmentType', $any($event.target).value)" placeholder="Albuterol, DuoNeb..." />
        </label>

        <label>
          <div class="lbl">Delivery Method</div>
          <input [value]="intervention.deliveryMethod ?? ''" (input)="set('deliveryMethod', $any($event.target).value)" placeholder="Neb / Inline / MDI" />
        </label>

        <label>
          <div class="lbl">Oxygen Device</div>
          <input [value]="intervention.oxygenDevice ?? ''" (input)="set('oxygenDevice', $any($event.target).value)" placeholder="NC / HFNC / Mask" />
        </label>

        <label>
          <div class="lbl">Flow or FiO₂</div>
          <input [value]="intervention.flowOrFio2 ?? ''" (input)="set('flowOrFio2', $any($event.target).value)" placeholder="2 L/min or 40%" />
        </label>
      </div>

      <div class="grid">
        <app-select-field
          label="Pre Breath Sounds"
          [options]="breathSounds"
          [value]="intervention.preBreathSounds"
          (valueChange)="set('preBreathSounds', $event)"
        ></app-select-field>

        <app-select-field
          label="Post Breath Sounds"
          [options]="breathSounds"
          [value]="intervention.postBreathSounds"
          (valueChange)="set('postBreathSounds', $event)"
        ></app-select-field>
      </div>
    </div>
  `,
  styleUrls: ['./intervention-form.component.css']
})
export class InterventionFormComponent {
  @Input() noteType: NoteType = 'VENT';
  @Input() intervention!: Intervention;
  @Output() interventionChange = new EventEmitter<Intervention>();

  actions = [
    'Suctioned',
    'Adjusted FiO₂',
    'Adjusted PEEP',
    'Bronchodilator given',
    'Patient repositioned',
    'Circuit checked',
    'Humidification checked',
  ];

  breathSounds = ['Clear', 'Diminished', 'Coarse', 'Wheezes'];

  set(key: keyof Intervention, val: any) {
    this.interventionChange.emit({ ...this.intervention, [key]: val });
  }
}
