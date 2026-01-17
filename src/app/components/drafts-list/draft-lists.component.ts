import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteDraft } from '../../models/note.model';

@Component({
  selector: 'app-drafts-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!drafts?.length" class="empty">No drafts saved yet.</div>

    <div *ngFor="let d of drafts" class="draft">
      <div class="meta">
        <div class="name">{{ d.patient.name || 'Unnamed patient' }} • {{ d.noteType }}</div>
        <div class="sub">
          {{ d.patient.location || 'No location' }} • Updated {{ d.updatedAtISO | date:'short' }}
        </div>
      </div>

      <div class="btns">
        <button (click)="openDraft.emit(d.id)">Open</button>
        <button class="danger" (click)="deleteDraft.emit(d.id)">Delete</button>
      </div>
    </div>
  `,
  styleUrls: ['./drafts-lists.component.css']
})
export class DraftsListComponent {
  @Input() drafts: NoteDraft[] = [];
  @Output() openDraft = new EventEmitter<string>();
  @Output() deleteDraft = new EventEmitter<string>();
}
