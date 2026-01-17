import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteTypeCardsComponent } from '../../components/note-type-cards/note-type-cards.component';
import { DraftsListComponent } from '../../components/drafts-list/draft-lists.component';
import { DraftStoreService } from '../../services/draft-store.services';
import { NoteDraft, NoteType } from '../../models/note.model';

@Component({
  standalone: true,
  imports: [NoteTypeCardsComponent, DraftsListComponent],
  template: `
    <h2>Dashboard</h2>
    <p class="muted">Create a new note or continue a saved draft.</p>

    <app-note-type-cards (pick)="start($event)"></app-note-type-cards>

    <section class="section">
      <h3>Saved Drafts</h3>
      <app-drafts-list
        [drafts]="drafts"
        (openDraft)="open($event)"
        (deleteDraft)="remove($event)"
      ></app-drafts-list>
    </section>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  drafts: NoteDraft[] = [];

  constructor(private router: Router, private store: DraftStoreService) {
    this.refresh();
  }

  refresh() {
    this.drafts = this.store.list();
  }

  start(type: NoteType) {
    this.router.navigate(['/create', type]);
  }

  open(draftId: string) {
    // simple MVP approach: open same route but pass draftId as query param
    this.router.navigate(['/create', 'VENT'], { queryParams: { draftId } });
  }

  remove(draftId: string) {
    this.store.remove(draftId);
    this.refresh();
  }
}
