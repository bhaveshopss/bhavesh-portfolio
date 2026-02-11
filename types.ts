export interface XRayNode {
  id: string;
  label: string;
  subLabel: string;
  type: 'default' | 'developer' | 'ai' | 'server' | 'cloud' | 'process';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  codeLanguage: string;
  codeSnippet: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  project: string;
  image: string;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  title: string;
  color: string; // Tailwind class prefix like 'accent-blue' or hex
  status: string;
  items: TechItem[];
}
