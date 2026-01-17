import { Component, EventEmitter, Output } from '@angular/core';
import { NoteType } from '../../models/note.model';

@Component({
  selector: 'app-note-type-cards',
  standalone: true,
  template: `
    <div class="grid">
      <button class="card" (click)="pick.emit('VENT')">
        <div class="title">Vent Management</div>
        <div class="desc">Vent settings + assessment + response</div>
      </button>

      <button class="card" (click)="pick.emit('TREATMENT')">
        <div class="title">Treatment Note</div>
        <div class="desc">Nebs, CPT, oxygen therapy</div>
      </button>

      <button class="card" (click)="pick.emit('ABG')">
        <div class="title">ABG Interpretation</div>
        <div class="desc">Quick ABG + plan documentation</div>
      </button>
    </div>
  `,
  styleUrls: ['./note-type-cards.component.css']
})
export class NoteTypeCardsComponent {
  @Output() pick = new EventEmitter<NoteType>();
}
