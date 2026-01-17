import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WizardStepperComponent } from '../../components/wizard-stepper/wizard-stepper.component';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { AssessmentFormComponent } from '../../components/assessment-form/assessment-form.component';
import { InterventionFormComponent } from '../../components/intervention-form/intervention-form.component';
import { ResponseFormComponent } from '../../components/response-form/response-form.component';
import { NotePreviewComponent } from '../../components/note-preview/note-preview.component';

import { DraftStoreService } from '../../services/draft-store.services';
import { NoteGeneratorService } from '../../services/note-generator.services';
import { NoteDraft, NoteType } from '../../models/note.model';

function uuid(): string {
  return Math.random().toString(16).slice(2) + '-' + Date.now().toString(16);
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    WizardStepperComponent,
    PatientFormComponent,
    AssessmentFormComponent,
    InterventionFormComponent,
    ResponseFormComponent,
    NotePreviewComponent
  ],
  template: `
    <div class="row">
      <button class="link" (click)="goHome()">← Back</button>
      <h2>Create Note: {{ draft.noteType }}</h2>
    </div>

    <app-wizard-stepper [steps]="steps" [activeIndex]="step"></app-wizard-stepper>

    <section class="panel">
      <ng-container [ngSwitch]="step">
        <app-patient-form
          *ngSwitchCase="0"
          [patient]="draft.patient"
          (patientChange)="updatePatient($event)"
        ></app-patient-form>

        <app-assessment-form
          *ngSwitchCase="1"
          [noteType]="draft.noteType"
          [assessment]="draft.assessment"
          (assessmentChange)="updateAssessment($event)"
        ></app-assessment-form>

        <app-intervention-form
          *ngSwitchCase="2"
          [noteType]="draft.noteType"
          [intervention]="draft.intervention"
          (interventionChange)="updateIntervention($event)"
        ></app-intervention-form>

        <app-response-form
          *ngSwitchCase="3"
          [response]="draft.response"
          (responseChange)="updateResponse($event)"
        ></app-response-form>

        <app-note-preview
          *ngSwitchCase="4"
          [text]="draft.generatedText"
          (copy)="copy()"
          (save)="saveDraft()"
        ></app-note-preview>
      </ng-container>
    </section>

    <div class="actions">
      <button (click)="back()" [disabled]="step === 0">Back</button>
      <button (click)="next()" *ngIf="step < 4">Next</button>
      <button (click)="regenerate()" *ngIf="step === 4">Regenerate</button>
    </div>
  `,
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent {
  steps = ['Patient', 'Assessment', 'Intervention', 'Response', 'Preview'];
  step = 0;

  draft: NoteDraft = {
    id: uuid(),
    noteType: 'VENT',
    patient: { timestampISO: new Date().toISOString() },
    assessment: { vent: {} },
    intervention: { actions: [] },
    response: {},
    generatedText: '',
    updatedAtISO: new Date().toISOString(),
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: DraftStoreService,
    private gen: NoteGeneratorService
  ) {
    // Set note type from route param
    const type = (this.route.snapshot.paramMap.get('type') || 'VENT') as NoteType;
    this.draft.noteType = (type === 'VENT' || type === 'TREATMENT' || type === 'ABG') ? type : 'VENT';

    // If a draftId exists, load it
    const draftId = this.route.snapshot.queryParamMap.get('draftId');
    if (draftId) {
      const existing = this.store.get(draftId);
      if (existing) this.draft = existing;
    }

    this.regenerate();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  back() {
    this.step = Math.max(0, this.step - 1);
  }

  next() {
    if (this.step === 3) this.regenerate();
    this.step = Math.min(4, this.step + 1);
  }

  updatePatient(patient: NoteDraft['patient']) {
    this.draft.patient = patient;
    this.touch();
  }

  updateAssessment(assessment: NoteDraft['assessment']) {
    this.draft.assessment = assessment;
    this.touch();
  }

  updateIntervention(intervention: NoteDraft['intervention']) {
    this.draft.intervention = intervention;
    this.touch();
  }

  updateResponse(response: NoteDraft['response']) {
    this.draft.response = response;
    this.touch();
  }

  regenerate() {
    this.draft.generatedText = this.gen.generate(this.draft);
    this.touch();
  }

  saveDraft() {
    this.store.upsert(this.draft);
    alert('Draft saved!');
  }

  async copy() {
    try {
      await navigator.clipboard.writeText(this.draft.generatedText);
      alert('Copied to clipboard!');
    } catch {
      alert('Copy failed in this browser. You can manually select and copy.');
    }
  }

  private touch() {
    this.draft.updatedAtISO = new Date().toISOString();
  }
}
