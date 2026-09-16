export interface Summary {
  position: string;
  summary:  string;
}

export interface SummaryResponse extends Summary {
  id:   string;
}

export interface SummaryRequest extends Summary {
}

export const SummaryEmpty: SummaryResponse = {
  id:       '',
  position: '',
  summary:  '',
};