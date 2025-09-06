import { BriefData, BriefStep } from './types';
import { TFunction } from 'i18next';

export const briefSteps = (briefData: BriefData, t: TFunction): BriefStep[] => {
  // Начальный выбор пути
  const initialStep: BriefStep = {
    id: 'initial',
    title: t('brief.questions.has_site.title'),
    type: 'choice',
    field: 'hasSite',
    options: [t('brief.questions.has_site.options.no'), t('brief.questions.has_site.options.yes')],
    canSkip: false
  };

  // Сценарий А: новый сайт
  const scenarioA: BriefStep[] = [
    {
      id: 'business',
      title: t('brief.questions.business_description.title'),
      type: 'text',
      field: 'business',
      placeholder: t('brief.questions.business_description.placeholder'),
      options: [],
      canSkip: true
    },
    {
      id: 'audience',
      title: t('brief.questions.target_audience.title'),
      type: 'text',
      field: 'audience',
      placeholder: t('brief.questions.target_audience.placeholder'),
      options: [],
      canSkip: true
    },
    {
      id: 'goals',
      title: t('brief.questions.website_goals.title'),
      type: 'multiselect',
      field: 'goals',
      options: t('brief.questions.website_goals.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'style',
      title: t('brief.questions.design_style.title'),
      type: 'choice',
      field: 'style',
      options: t('brief.questions.design_style.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'deadline',
      title: t('brief.questions.timeline.title'),
      type: 'choice',
      field: 'deadline',
      options: t('brief.questions.timeline.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'budget',
      title: t('brief.questions.budget_range.title'),
      type: 'choice',
      field: 'budget',
      options: t('brief.questions.budget_range.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'contact',
      title: t('brief.questions.contact.title'),
      type: 'contact',
      field: 'contact',
      canSkip: false
    },
    {
      id: 'notes',
      title: t('brief.questions.additional_notes.title'),
      type: 'text',
      field: 'notes',
      placeholder: t('brief.questions.additional_notes.placeholder'),
      options: [],
      canSkip: true
    }
  ];

  // Сценарий B: доработка существующего сайта (simplified for existing site workflow)
  const scenarioB: BriefStep[] = [
    {
      id: 'business',
      title: t('brief.questions.business_description.title'),
      type: 'text',
      field: 'business',
      placeholder: t('brief.questions.business_description.placeholder'),
      options: [],
      canSkip: true
    },
    {
      id: 'audience',
      title: t('brief.questions.target_audience.title'),
      type: 'text',
      field: 'audience',
      placeholder: t('brief.questions.target_audience.placeholder'),
      options: [],
      canSkip: true
    },
    {
      id: 'goals',
      title: t('brief.questions.website_goals.title'),
      type: 'multiselect',
      field: 'goals',
      options: t('brief.questions.website_goals.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'style',
      title: t('brief.questions.design_style.title'),
      type: 'choice',
      field: 'style',
      options: t('brief.questions.design_style.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'deadline',
      title: t('brief.questions.timeline.title'),
      type: 'choice',
      field: 'deadline',
      options: t('brief.questions.timeline.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'budget',
      title: t('brief.questions.budget_range.title'),
      type: 'choice',
      field: 'budget',
      options: t('brief.questions.budget_range.options', { returnObjects: true }) as string[],
      canSkip: true
    },
    {
      id: 'contact',
      title: t('brief.questions.contact.title'),
      type: 'contact',
      field: 'contact',
      canSkip: false
    },
    {
      id: 'notes',
      title: t('brief.questions.additional_notes.title'),
      type: 'text',
      field: 'notes',
      placeholder: t('brief.questions.additional_notes.placeholder'),
      options: [],
      canSkip: true
    }
  ];

  // Определяем путь на основе выбора
  if (briefData.hasSite === null) {
    return [initialStep];
  }

  const steps = briefData.hasSite === false ? scenarioA : scenarioB;
  return steps;
};