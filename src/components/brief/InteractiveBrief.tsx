import React, { useState } from 'react';
import { BriefData, BriefStep } from './types';
import BriefStepComponent from './BriefStepComponent';
import BriefPreview from './BriefPreview';
import { briefSteps } from './briefSteps';

const InteractiveBrief: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleAnswer = (key: string, value: any) => {
    setBriefData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNext = () => {
    const steps = briefSteps(briefData);
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
      
      // Симуляция задержки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting brief:', error);
      // TODO: Handle error state
    }
    
    setIsSubmitting(false);
  };

  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-muted">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4 text-fg">
              Расскажите о вашем проекте
            </h3>
            <p className="text-lg text-fg/70 leading-relaxed">
              Несколько вопросов помогут нам лучше понять ваши потребности и подготовить персональное предложение
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-fg/5 rounded-xl p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-fg mb-2">Индивидуальный подход</h4>
              <p className="text-fg/70 text-sm">
                На основе ваших ответов мы создадим предложение, которое точно подойдет для вашего бизнеса
              </p>
            </div>

            <div className="bg-fg/5 rounded-xl p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-fg mb-2">Экономия времени</h4>
              <p className="text-fg/70 text-sm">
                Заполнение займет 3-5 минут. Можно пропускать вопросы — мы уточним детали при общении
              </p>
            </div>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <div className="w-6 h-6 text-accent mr-3 mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-fg mb-2">Что происходит дальше?</h4>
                <ul className="text-fg/70 text-sm space-y-1">
                  <li>• Анализируем ваши потребности и готовим предложение</li>
                  <li>• Связываемся в течение рабочего дня для уточнения деталей</li>
                  <li>• Предоставляем точную стоимость и сроки выполнения</li>
                  <li>• <strong>Оплата только после вашего одобрения проекта</strong></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleStart}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Начать заполнение
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <p className="text-sm text-fg/60 mt-3">
              Займет 3-5 минут • Все поля опциональны
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success screen after submission
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-muted">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4 text-fg">
            Спасибо за заявку!
          </h3>
          
          <p className="text-lg text-fg/70 leading-relaxed mb-6">
            Мы получили ваш бриф и уже начали анализировать ваши потребности
          </p>
          
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-fg mb-3">Что будет дальше:</h4>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</div>
                <div>
                  <p className="font-medium text-fg">Анализ и подготовка предложения</p>
                  <p className="text-fg/70 text-sm">Изучаем ваши потребности и готовим персональное решение</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</div>
                <div>
                  <p className="font-medium text-fg">Связываемся с вами</p>
                  <p className="text-fg/70 text-sm">Менеджер свяжется в течение рабочего дня для уточнения деталей</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</div>
                <div>
                  <p className="font-medium text-fg">Предложение и старт работы</p>
                  <p className="text-fg/70 text-sm">Согласовываем детали и начинаем создавать ваш сайт</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-fg/60 mb-4">
              Контакт для связи: <strong>{briefData.contact.email}</strong>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-outline px-6 py-3"
            >
              Заполнить еще один бриф
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = briefSteps(briefData);
  const currentStepData = steps[currentStep];

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
      <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:h-fit">
        <BriefPreview briefData={briefData} />
      </div>
    </div>
  );
};

export default InteractiveBrief;