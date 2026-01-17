import { Injectable } from '@angular/core';
import { NoteDraft } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteGeneratorService {
  generate(d: NoteDraft): string {
    switch (d.noteType) {
      case 'VENT':
        return this.ventNote(d);
      case 'TREATMENT':
        return this.treatmentNote(d);
      case 'ABG':
        return this.abgNote(d);
      default:
        return 'Unsupported note type.';
    }
  }

  private ventNote(d: NoteDraft): string {
    const v = d.assessment.vent ?? {};
    const lines: string[] = [];

    lines.push(`RT at bedside for ventilator assessment and management.`);
    lines.push('');
    lines.push(`Patient currently on ${v.mode ?? 'N/A'} with the following settings:`);
    lines.push(`VT: ${v.vt ?? 'N/A'} mL, RR: ${v.rr ?? 'N/A'}, PEEP: ${v.peep ?? 'N/A'} cmH₂O, FiO₂: ${v.fio2 ?? 'N/A'}%.`);
    lines.push('');
    lines.push(`Assessment:`);
    lines.push(`Breath sounds are ${d.assessment.breathSounds ?? 'N/A'}. Work of breathing is ${d.assessment.wob ?? 'N/A'}.`);
    lines.push(`SpO₂ is ${d.assessment.spo2 ?? 'N/A'}% with respiratory rate of ${d.assessment.patientRR ?? 'N/A'}.`);
    lines.push(`Patient appears ${d.assessment.mentalStatus ?? 'N/A'} and is ${d.response.tolerance ?? 'N/A'} the ventilator.`);
    lines.push('');
    lines.push(`Intervention:`);
    lines.push(this.interventionText(d));
    lines.push('');
    lines.push(`Response:`);
    lines.push(`Patient ${d.response.status ?? 'N/A'} following intervention. Vital signs are ${d.response.vitalsStatus ?? 'N/A'}.`);
    if (d.response.comments?.trim()) lines.push(`Additional comments: ${d.response.comments.trim()}`);
    lines.push('');
    lines.push(`Plan:`);
    lines.push(`Continue to monitor and adjust ventilator settings as clinically indicated. RT will reassess and provide ongoing respiratory care.`);

    return lines.join('\n');
  }

  private treatmentNote(d: NoteDraft): string {
    const i = d.intervention;
    const lines: string[] = [];

    lines.push(`RT at bedside for respiratory treatment.`);
    lines.push('');
    lines.push(`Assessment:`);
    lines.push(`Breath sounds pre-treatment were ${i.preBreathSounds ?? d.assessment.breathSounds ?? 'N/A'}.`);
    lines.push(`SpO₂ was ${d.assessment.spo2 ?? 'N/A'}% on ${i.oxygenDevice ?? 'N/A'} at ${i.flowOrFio2 ?? 'N/A'}.`);
    lines.push('');
    lines.push(`Intervention:`);
    lines.push(`${i.treatmentType ?? 'Treatment'} administered via ${i.deliveryMethod ?? 'N/A'}.`);
    lines.push(this.interventionText(d));
    lines.push('');
    lines.push(`Response:`);
    lines.push(`Post-treatment breath sounds are ${i.postBreathSounds ?? 'N/A'}.`);
    lines.push(`Patient ${d.response.tolerance ?? 'N/A'} the treatment with ${d.response.status ?? 'N/A'} response.`);
    lines.push(`Vital signs are ${d.response.vitalsStatus ?? 'N/A'}.`);
    if (d.response.comments?.trim()) lines.push(`Additional comments: ${d.response.comments.trim()}`);
    lines.push('');
    lines.push(`Plan:`);
    lines.push(`Continue with current respiratory therapy plan and reassess as needed.`);

    return lines.join('\n');
  }

  private abgNote(d: NoteDraft): string {
    const v = d.assessment.vent ?? {};
    const lines: string[] = [];

    lines.push(`Arterial blood gas obtained and analyzed.`);
    lines.push('');
    lines.push(`Results:`);
    lines.push(`FiO₂: ${v.fio2 ?? 'N/A'}% with SpO₂ ${d.assessment.spo2 ?? 'N/A'}%.`);
    lines.push('');
    lines.push(`Interpretation:`);
    lines.push(`Findings indicate: ${d.response.comments?.trim() ? d.response.comments.trim() : 'N/A (enter interpretation in comments)'}.`);
    lines.push('');
    lines.push(`Intervention:`);
    lines.push(this.interventionText(d));
    lines.push('');
    lines.push(`Plan:`);
    lines.push(`Continue to monitor ABGs and adjust respiratory support as indicated.`);

    return lines.join('\n');
  }

  private interventionText(d: NoteDraft): string {
    const actions = d.intervention.actions ?? [];
    const custom = d.intervention.customText?.trim();

    if (actions.length === 0 && !custom) return 'No interventions documented.';
    const parts: string[] = [];
    if (actions.length) parts.push(actions.join(', ') + '.');
    if (custom) parts.push(custom);
    return parts.join(' ');
  }
}
