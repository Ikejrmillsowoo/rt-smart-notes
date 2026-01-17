export type NoteType = 'VENT' | 'TREATMENT' | 'ABG';

export type BreathSounds = 'Clear' | 'Diminished' | 'Coarse' | 'Wheezes';
export type WOB = 'None' | 'Mild' | 'Moderate' | 'Severe';
export type MentalStatus = 'Alert' | 'Lethargic' | 'Sedated';
export type ResponseStatus = 'Improved' | 'Unchanged' | 'Worsened';
export type Tolerance = 'Tolerated well' | 'Poorly tolerated';
export type VitalsStatus = 'Stable' | 'Unstable';

export interface PatientInfo {
  name?: string;
  mrn?: string;
  location?: string;
  timestampISO: string;
  therapist?: string;
}

export interface VentSettings {
  mode?: string;
  vt?: number;
  rr?: number;
  peep?: number;
  fio2?: number;
}

export interface Assessment {
  spo2?: number;
  patientRR?: number;
  breathSounds?: BreathSounds;
  wob?: WOB;
  mentalStatus?: MentalStatus;
  vent?: VentSettings; // only relevant for VENT notes
}

export interface Intervention {
  actions: string[];
  customText?: string;

  // treatment-specific
  treatmentType?: string;
  deliveryMethod?: string;
  preBreathSounds?: BreathSounds;
  postBreathSounds?: BreathSounds;
  oxygenDevice?: string;
  flowOrFio2?: string;
}

export interface ResponseBlock {
  status?: ResponseStatus;
  tolerance?: Tolerance;
  vitalsStatus?: VitalsStatus;
  comments?: string;
}

export interface NoteDraft {
  id: string;
  noteType: NoteType;
  patient: PatientInfo;
  assessment: Assessment;
  intervention: Intervention;
  response: ResponseBlock;
  generatedText: string;
  updatedAtISO: string;
}
