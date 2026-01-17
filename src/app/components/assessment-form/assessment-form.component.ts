import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assessment, NoteType } from '../../models/note.model';
import { SelectFieldComponent } from '../../shared/select-field/select-field.component';

@Component({
  selector: 'app-assessment-form',
  standalone: true,
  imports: [CommonModule, SelectFieldComponent],
  template: `
    <h3>Assessment</h3>

    <div class="grid">
      <label>
        <div class="lbl">SpO₂ (%)</div>
        <input type="number" [value]="assessment.spo2 ?? ''" (input)="setNum('spo2', $any($event.target).value)" />
      </label>

      <label>
        <div class="lbl">Patient RR</div>
        <input type="number" [value]="assessment.patientRR ?? ''" (input)="setNum('patientRR', $any($event.target).value)" />
      </label>
    </div>

    <div class="grid">
      <app-select-field
        label="Breath Sounds"
        [options]="breathSounds"
        [value]="assessment.breathSounds"
        (valueChange)="set('breathSounds', $event)"
      ></app-select-field>

      <app-select-field
        label="Work of Breathing"
        [options]="wobOptions"
        [value]="assessment.wob"
        (valueChange)="set('wob', $event)"
      ></app-select-field>

      <app-select-field
        label="Mental Status"
        [options]="mentalOptions"
        [value]="assessment.mentalStatus"
        (valueChange)="set('mentalStatus', $event)"
      ></app-select-field>
    </div>

    <div *ngIf="noteType === 'VENT'" class="vent">
      <h4>Vent Settings</h4>

      <div class="grid">
        <label>
          <div class="lbl">Mode</div>
          <input [value]="assessment.vent?.mode ?? ''" (input)="setVent('mode', $any($event.target).value)" placeholder="AC/VC, SIMV, PRVC..." />
        </label>

        <label>
          <div class="lbl">VT (mL)</div>
          <input type="number" [value]="assessment.vent?.vt ?? ''" (input)="setVentNum('vt', $any($event.target).value)" />
        </label>

        <label>
          <div class="lbl">Set RR</div>
          <input type="number" [value]="assessment.vent?.rr ?? ''" (input)="setVentNum('rr', $any($event.target).value)" />
        </label>

        <label>
          <div class="lbl">PEEP</div>
          <input type="number" [value]="assessment.vent?.peep ?? ''" (input)="setVentNum('peep', $any($event.target).value)" />
        </label>

        <label>
          <div class="lbl">FiO₂ (%)</div>
          <input type="number" [value]="assessment.vent?.fio2 ?? ''" (input)="setVentNum('fio2', $any($event.target).value)" />
        </label>
      </div>
    </div>
  `,
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent {
  @Input() noteType: NoteType = 'VENT';
  @Input() assessment!: Assessment;
  @Output() assessmentChange = new EventEmitter<Assessment>();

  breathSounds = ['Clear', 'Diminished', 'Coarse', 'Wheezes'];
  wobOptions = ['None', 'Mild', 'Moderate', 'Severe'];
  mentalOptions = ['Alert', 'Lethargic', 'Sedated'];

  set(key: keyof Assessment, val: any) {
    this.assessmentChange.emit({ ...this.assessment, [key]: val });
  }

  setNum(key: keyof Assessment, raw: string) {
    const n = raw === '' ? undefined : Number(raw);
    this.assessmentChange.emit({ ...this.assessment, [key]: n });
  }

  setVent(key: string, val: any) {
    const vent = { ...(this.assessment.vent ?? {}) };
    (vent as any)[key] = val;
    this.assessmentChange.emit({ ...this.assessment, vent });
  }

  setVentNum(key: string, raw: string) {
    const vent = { ...(this.assessment.vent ?? {}) };
    (vent as any)[key] = raw === '' ? undefined : Number(raw);
    this.assessmentChange.emit({ ...this.assessment, vent });
  }
}
