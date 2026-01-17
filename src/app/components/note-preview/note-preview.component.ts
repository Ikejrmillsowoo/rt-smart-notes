import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Preview</h3>

    <pre class="box">{{ text }}</pre>

    <div class="btns">
      <button (click)="copy.emit()">Copy to Clipboard</button>
      <button (click)="save.emit()">Save Draft</button>
    </div>
  `,
  styleUrls: ['./note-preview.component.css']
})
export class NotePreviewComponent {
  @Input() text = '';
  @Output() copy = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
