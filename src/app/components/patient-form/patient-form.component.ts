import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientInfo } from '../../models/note.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Patient</h3>

    <div class="grid">
      <label>
        <div class="lbl">Patient Name (optional)</div>
        <input [value]="patient.name ?? ''" (input)="set('name', $any($event.target).value)" />
      </label>

      <label>
        <div class="lbl">MRN (optional)</div>
        <input [value]="patient.mrn ?? ''" (input)="set('mrn', $any($event.target).value)" />
      </label>

      <label>
        <div class="lbl">Location</div>
        <input [value]="patient.location ?? ''" (input)="set('location', $any($event.target).value)" placeholder="ICU / ED / 3W" />
      </label>

      <label>
        <div class="lbl">Timestamp</div>
        <input [value]="patient.timestampISO" disabled />
      </label>
    </div>

    <p class="hint">Tip: You can leave patient name/MRN blank for MVP testing.</p>
  `,
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {
  @Input() patient!: PatientInfo;
  @Output() patientChange = new EventEmitter<PatientInfo>();

  set<K extends keyof PatientInfo>(key: K, val: PatientInfo[K]) {
    this.patientChange.emit({ ...this.patient, [key]: val });
  }
}
