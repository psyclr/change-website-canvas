export interface BriefData {
  hasSite: boolean | null;
  business: string;
  audience: string;
  goals: string[];
  style: string;
  content: string[];
  features: string[];
  deadline: string;
  budget: string;
  siteUrl: string;
  keep: string[];
  remove: string[];
  add: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  notes: string;
}

export interface BriefStep {
  id: string;
  title: string;
  type: 'choice' | 'text' | 'multiselect' | 'contact' | 'slider';
  field: keyof BriefData | 'contact.name' | 'contact.email' | 'contact.phone';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  canSkip?: boolean;
}

export interface BriefStepComponentProps {
  step: BriefStep;
  briefData: BriefData;
  onAnswer: (key: string, value: any, callback?: () => void) => void;
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting?: boolean;
}