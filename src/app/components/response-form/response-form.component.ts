import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseBlock } from '../../models/note.model';
import { ToggleGroupComponent } from '../../shared/toggle-group/toggle-group.component';
import { TextareaFieldComponent } from '../../shared/textarea-field/textarea-field.component';

@Component({
  selector: 'app-response-form',
  standalone: true,
  imports: [CommonModule, ToggleGroupComponent, TextareaFieldComponent],
  template: `
    <h3>Response</h3>

    <app-toggle-group
      label="Response Status"
      [options]="['Improved','Unchanged','Worsened']"
      [value]="response.status"
      (valueChange)="set('status', $event)"
    ></app-toggle-group>

    <app-toggle-group
      label="Tolerance"
      [options]="['Tolerated well','Poorly tolerated']"
      [value]="response.tolerance"
      (valueChange)="set('tolerance', $event)"
    ></app-toggle-group>

    <app-toggle-group
      label="Vitals"
      [options]="['Stable','Unstable']"
      [value]="response.vitalsStatus"
      (valueChange)="set('vitalsStatus', $event)"
    ></app-toggle-group>

    <app-textarea-field
      label="Additional comments (also used as ABG interpretation for MVP)"
      [value]="response.comments"
      (valueChange)="set('comments', $event)"
    ></app-textarea-field>
  `,
  styleUrls: ['./response-form.component.css']
})
export class ResponseFormComponent {
  @Input() response!: ResponseBlock;
  @Output() responseChange = new EventEmitter<ResponseBlock>();

  set(key: keyof ResponseBlock, val: any) {
    this.responseChange.emit({ ...this.response, [key]: val });
  }
}
