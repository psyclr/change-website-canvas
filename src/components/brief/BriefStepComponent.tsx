import React, { useState } from 'react';
import { BriefStepComponentProps } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, SkipForward } from 'lucide-react';

const BriefStepComponent: React.FC<BriefStepComponentProps> = ({
  step,
  briefData,
  onAnswer,
  onNext,
  onSkip,
  currentStep,
  totalSteps,
  isSubmitting = false
}) => {
  const [localValue, setLocalValue] = useState<any>('');

  const handleChoice = (option: string) => {
    const value = step.field === 'hasSite' 
      ? option === 'Нет, нужен новый сайт' ? false : true
      : option;
    
    onAnswer(step.field, value, onNext);
  };

  const handleMultiSelect = (option: string) => {
    const currentValue = getFieldValue() as string[] || [];
    const newValue = currentValue.includes(option)
      ? currentValue.filter(item => item !== option)
      : [...currentValue, option];
    onAnswer(step.field, newValue);
  };

  const handleTextSubmit = () => {
    onAnswer(step.field, localValue);
    onNext();
  };

  const handleContactSubmit = () => {
    // Basic validation for required fields
    if (!briefData.contact.name.trim() || !briefData.contact.email.trim()) {
      return;
    }
    onNext();
  };

  const getFieldValue = () => {
    if (step.field.includes('.')) {
      const [parent, child] = step.field.split('.');
      return (briefData as any)[parent]?.[child] || '';
    }
    return (briefData as any)[step.field];
  };

  const renderInput = () => {
    switch (step.type) {
      case 'choice':
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleChoice(option)}
                className="w-full p-4 text-left rounded-xl border border-muted hover:border-accent hover:bg-accent/5 transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'multiselect':
        const selectedValues = getFieldValue() as string[] || [];
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {step.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect(option)}
                  className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                    selectedValues.includes(option)
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {option}
                    {selectedValues.includes(option) && (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <Button onClick={onNext} className="btn-primary w-full">
              Далее <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            {step.options && (
              <div className="flex flex-wrap gap-2 mb-4">
                {step.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setLocalValue(option)}
                    className="px-3 py-1 text-sm rounded-full border border-muted hover:border-accent hover:bg-accent/5 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            <Textarea
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              placeholder={step.placeholder}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleTextSubmit} 
              className="btn-primary w-full"
              disabled={!localValue.trim()}
            >
              Далее <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <Input
              value={briefData.contact.name}
              onChange={(e) => onAnswer('contact', { ...briefData.contact, name: e.target.value })}
              placeholder="Имя"
            />
            <Input
              type="email"
              value={briefData.contact.email}
              onChange={(e) => onAnswer('contact', { ...briefData.contact, email: e.target.value })}
              placeholder="Email"
            />
            <Input
              type="tel"
              value={briefData.contact.phone}
              onChange={(e) => onAnswer('contact', { ...briefData.contact, phone: e.target.value })}
              placeholder="Телефон (по желанию)"
            />
            <Textarea
              value={briefData.notes}
              onChange={(e) => onAnswer('notes', e.target.value)}
              placeholder="Комментарий (по желанию)"
              className="min-h-[80px]"
            />
            <Button 
              onClick={handleContactSubmit} 
              className="btn-primary w-full"
              disabled={!briefData.contact.name.trim() || !briefData.contact.email.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправляем...
                </>
              ) : (
                <>
                  Отправить <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-muted">
      {/* Прогресс */}
      <div className="mb-6">
        <div className="w-full bg-muted-2 rounded-full h-1">
          <div 
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Заголовок */}
      <h3 className="text-xl font-heading font-medium mb-6 text-fg">
        {step.title}
      </h3>

      {/* Контент */}
      <div className="mb-6">
        {renderInput()}
      </div>

      {/* Кнопка пропуска */}
      {step.canSkip && (
        <div className="text-center">
          <button
            onClick={onSkip}
            className="text-fg/60 hover:text-fg text-sm flex items-center justify-center mx-auto transition-colors"
          >
            <SkipForward className="mr-1 h-3 w-3" />
            Пропустить
          </button>
        </div>
      )}
    </div>
  );
};

export default BriefStepComponent;