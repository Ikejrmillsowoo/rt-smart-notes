import { Injectable } from '@angular/core';
import { NoteDraft } from '../models/note.model';

const KEY = 'rt_smart_notes_drafts_v1';

@Injectable({ providedIn: 'root' })
export class DraftStoreService {
  list(): NoteDraft[] {
    return this.read().sort((a, b) => b.updatedAtISO.localeCompare(a.updatedAtISO));
  }

  get(id: string): NoteDraft | undefined {
    return this.read().find(d => d.id === id);
  }

  upsert(draft: NoteDraft): void {
    const drafts = this.read();
    const idx = drafts.findIndex(d => d.id === draft.id);
    if (idx >= 0) drafts[idx] = draft;
    else drafts.push(draft);
    this.write(drafts);
  }

  remove(id: string): void {
    const drafts = this.read().filter(d => d.id !== id);
    this.write(drafts);
  }

  clear(): void {
    localStorage.removeItem(KEY);
  }

  private read(): NoteDraft[] {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as NoteDraft[];
    } catch {
      return [];
    }
  }

  private write(drafts: NoteDraft[]): void {
    localStorage.setItem(KEY, JSON.stringify(drafts));
  }
}
