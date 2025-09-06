import React, { useState, useEffect } from 'react';
import { BriefData, BriefStep } from './types';
import BriefStepComponent from './BriefStepComponent';
import BriefPreview from './BriefPreview';
import { briefSteps } from './briefSteps';
import { useTranslation } from 'react-i18next';

const InteractiveBrief: React.FC = () => {
  const { t } = useTranslation('common');
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldAutoNext, setShouldAutoNext] = useState(false);
  const [briefData, setBriefData] = useState<BriefData>({
    hasSite: null,
    business: '',
    audience: '',
    goals: [],
    style: '',
    content: [],
    features: [],
    deadline: '',
    budget: '',
    siteUrl: '',
    keep: [],
    remove: [],
    add: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    notes: ''
  });

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (key: string, value: any, callback?: () => void) => {
    setBriefData(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Если есть callback, устанавливаем флаг для автоперехода
    if (callback) {
      setShouldAutoNext(true);
    }
  };

  // Следим за изменениями briefData и автоматически переходим к следующему шагу
  useEffect(() => {
    if (shouldAutoNext) {
      setShouldAutoNext(false);
      setTimeout(handleNext, 100); // Небольшая задержка для плавности
    }
  }, [briefData, shouldAutoNext]);

  const handleNext = () => {
    const steps = briefSteps(briefData, t);
    console.log('Current step:', currentStep, 'Total steps:', steps.length, 'Brief data hasSite:', briefData.hasSite);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Финальный экран
      handleSubmit();
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Симуляция отправки данных
      console.log('Submitting brief data:', briefData);
      
      // TODO: Implement actual API call
      // const response = await fetch('/api/brief', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(briefData)
      // });
      
      // Быстрая отправка
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting brief:', error);
      // TODO: Handle error state
    }
    
    setIsSubmitting(false);
  };

  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-muted">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-heading font-medium mb-3 text-fg">
              {t('brief.start_form.title')}
            </h3>
            <p className="text-base text-fg/70 leading-relaxed mb-4">
              {t('brief.start_form.subtitle')}
            </p>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <div className="w-6 h-6 text-accent mr-3 mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-fg/70 text-sm">
                  {t('brief.start_form.info')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleStart}
              className="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              {t('brief.start_button')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <p className="text-sm text-fg/60 mt-2">
              {t('brief.start_form.optional')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success screen after submission - компактная версия
  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center px-4 sm:px-0">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-muted">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl md:text-2xl font-heading font-medium mb-3 text-fg">
            {t('brief.completion.title')}
          </h3>
          
          <p className="text-base text-fg/70 leading-relaxed mb-4">
            {t('brief.completion.message')}
          </p>
          
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
            <p className="text-fg/70 text-sm">
              {t('footer.contact.email')}: <strong>{briefData.contact.email}</strong>
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-6 py-3 w-full"
            >
              {t('brief.start_button')}
            </button>
            <button
              onClick={() => window.location.href = '#'}
              className="btn-outline px-6 py-2 w-full text-sm"
            >
              {t('navigation.home')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = briefSteps(briefData, t);
  const currentStepData = steps[currentStep];

  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
      {/* Левая колонка - вопросы */}
      <div className="order-2 lg:order-1">
        <BriefStepComponent
          step={currentStepData}
          briefData={briefData}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onSkip={handleSkip}
          currentStep={currentStep}
          totalSteps={steps.length}
          isSubmitting={isSubmitting}
        />
      </div>
      
      {/* Правая колонка - превью */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <BriefPreview briefData={briefData} />
      </div>
    </div>
  );
};

export default InteractiveBrief;