export const OCCUPATIONS = [
  "Student",
  "Professional",
  "Self-employed",
  "Unemployed",
  "Retired",
  "Other",
] as const;

export type Occupation = (typeof OCCUPATIONS)[number] | string;
