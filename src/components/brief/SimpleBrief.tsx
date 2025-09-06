import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SimpleBrief: React.FC = () => {
  const [step, setStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [answers, setAnswers] = useState({
    hasSite: null as boolean | null,
    business: '',
    audience: '',
    goals: [] as string[],
    style: '',
    content: [] as string[],
    features: [] as string[],
    deadline: '',
    budget: '',
    siteUrl: '',
    problems: [] as string[],
    keep: [] as string[],
    contact: { name: '', email: '', phone: '' },
    notes: ''
  });

  const getQuestions = () => {
    const baseQuestions = [
      {
        id: 'hasSite',
        title: 'У вас уже есть сайт?',
        type: 'choice',
        options: ['Нет сайта', 'Есть сайт, но не устраивает']
      }
    ];

    if (answers.hasSite === false) {
      // Сценарий А: нет сайта
      return [
        ...baseQuestions,
        {
          id: 'business',
          title: 'Чем вы занимаетесь?',
          type: 'text',
          placeholder: 'Например: ремонт велосипедов'
        },
        {
          id: 'audience',
          title: 'Кто ваш клиент?',
          type: 'text',
          placeholder: 'Опишите вашу аудиторию',
          quickOptions: ['жители района', 'малый бизнес', 'семьи', 'другое']
        },
        {
          id: 'goals',
          title: 'Что должен делать сайт?',
          type: 'multiselect',
          options: [
            'получать заявки',
            'показывать цены и услуги', 
            'показывать работы',
            'давать адрес и время работы',
            'другое'
          ]
        },
        {
          id: 'style',
          title: 'Стиль',
          type: 'choice',
          options: ['минимализм', 'спокойный деловой', 'яркий и дружелюбный', 'не знаю']
        },
        {
          id: 'content',
          title: 'Контент на старте — что у вас уже есть?',
          type: 'multiselect',
          options: ['логотип', 'фото', 'тексты', 'ничего пока']
        },
        {
          id: 'features',
          title: 'Нужные функции',
          type: 'multiselect',
          options: [
            'форма заявки',
            'кнопка звонка',
            'карта',
            'блог',
            'каталог',
            'онлайн запись',
            'другое'
          ]
        },
        {
          id: 'deadline',
          title: 'Срок',
          type: 'choice',
          options: ['на этой неделе', 'в течение месяца', 'не срочно']
        },
        {
          id: 'budget',
          title: 'Бюджет',
          type: 'choice',
          options: ['до 1000', '1000–1500', '1500 и выше', 'не знаю']
        },
        {
          id: 'contact',
          title: 'Контакты',
          type: 'contact'
        }
      ];
    } else if (answers.hasSite === true) {
      // Сценарий B: есть сайт
      return [
        ...baseQuestions,
        {
          id: 'siteUrl',
          title: 'Ссылка на сайт',
          type: 'text',
          placeholder: 'https://ваш-сайт.ru'
        },
        {
          id: 'problems',
          title: 'Что не нравится?',
          type: 'multiselect',
          options: [
            'устаревший вид',
            'неудобно с телефона',
            'медленно грузится',
            'трудно что-то найти',
            'мало заявок',
            'другое'
          ]
        },
        {
          id: 'keep',
          title: 'Что на сайте работает и это надо оставить?',
          type: 'multiselect',
          options: ['структура', 'контент', 'цвета', 'ничего']
        },
        {
          id: 'goals',
          title: 'Цель обновления',
          type: 'multiselect',
          options: [
            'больше заявок',
            'понятная структура',
            'обновить вид',
            'лучше на телефоне',
            'ускорить загрузку'
          ]
        },
        {
          id: 'content',
          title: 'Контент — что есть в наличии?',
          type: 'multiselect',
          options: ['логотип', 'фото', 'тексты', 'отзывы', 'ничего пока']
        },
        {
          id: 'features',
          title: 'Функции',
          type: 'multiselect',
          options: [
            'форма заявки',
            'кнопка звонка',
            'карта',
            'блог',
            'каталог',
            'онлайн запись'
          ]
        },
        {
          id: 'deadline',
          title: 'Срок',
          type: 'choice',
          options: ['на этой неделе', 'в течение месяца', 'не срочно']
        },
        {
          id: 'budget',
          title: 'Бюджет',
          type: 'choice',
          options: ['до 1000', '1000–1500', '1500 и выше', 'не знаю']
        },
        {
          id: 'contact',
          title: 'Контакты',
          type: 'contact'
        }
      ];
    }

    return baseQuestions;
  };

  const questions = getQuestions();

  const handleChoice = (choice: string) => {
    const currentQ = questions[step];
    
    if (currentQ.id === 'hasSite') {
      setAnswers(prev => ({ ...prev, hasSite: choice === 'Нет сайта' ? false : true }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQ.id]: choice }));
    }
    
    setTimeout(() => setStep(step + 1), 300);
  };

  const handleNext = () => {
    // Сохраняем текущий ответ
    if (currentQuestion.type === 'text') {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: currentText }));
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
      setCurrentText(''); // Очищаем поле для следующего вопроса
    } else {
      // Финальный шаг - отправка
      handleSubmit();
    }
  };

  const handleMultiSelect = (option: string) => {
    const currentQ = questions[step];
    const currentValues = (answers as any)[currentQ.id] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((item: string) => item !== option)
      : [...currentValues, option];
    
    setAnswers(prev => ({ ...prev, [currentQ.id]: newValues }));
  };

  const handleSubmit = () => {
    console.log('Отправляем бриф:', answers);
    // TODO: Отправка на сервер
  };

  const handleQuickOption = (option: string) => {
    setCurrentText(option);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentQuestion = questions[step];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Прогресс */}
      <div className="mb-8">
        <div className="w-full bg-muted-2 rounded-full h-1">
          <div 
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Вопрос */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-muted">
        <h3 className="text-2xl font-heading font-medium mb-6 text-fg">
          {currentQuestion.title}
        </h3>

        {/* Варианты ответов */}
        {currentQuestion.type === 'choice' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleChoice(option)}
                className="w-full p-4 text-left rounded-xl border border-muted hover:border-accent hover:bg-accent/5 transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Мультивыбор */}
        {currentQuestion.type === 'multiselect' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => {
                const currentValues = (answers as any)[currentQuestion.id] || [];
                const isSelected = currentValues.includes(option);
                
                return (
                  <button
                    key={option}
                    onClick={() => handleMultiSelect(option)}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-accent bg-accent/10'
                        : 'border-muted hover:border-accent hover:bg-accent/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {option}
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              {step > 0 && (
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
              )}
              <Button onClick={handleNext} className="btn-primary flex-1">
                Далее <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Текстовое поле */}
        {currentQuestion.type === 'text' && (
          <div className="space-y-6">
            {currentQuestion.quickOptions && (
              <div>
                <p className="text-sm text-fg/60 mb-3">Быстрые варианты:</p>
                <div className="flex flex-wrap gap-3">
                  {currentQuestion.quickOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleQuickOption(option)}
                      className="px-4 py-2 text-sm rounded-xl border border-muted hover:border-accent hover:bg-accent/5 transition-all duration-200 bg-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-sm text-fg/60 mb-3">Или напишите свой вариант:</p>
              <Textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="min-h-[100px]"
                variant="bold"
              />
            </div>
            <div className="flex gap-3">
              {step > 0 && (
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
              )}
              <Button onClick={handleNext} className="btn-primary flex-1">
                Далее <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Контакты */}
        {currentQuestion.type === 'contact' && (
          <div className="space-y-4">
            <Input
              placeholder="Имя"
              variant="bold"
              value={answers.contact.name}
              onChange={(e) => setAnswers(prev => ({ 
                ...prev, 
                contact: { ...prev.contact, name: e.target.value }
              }))}
            />
            <Input
              type="email"
              placeholder="Email"
              variant="bold"
              value={answers.contact.email}
              onChange={(e) => setAnswers(prev => ({ 
                ...prev, 
                contact: { ...prev.contact, email: e.target.value }
              }))}
            />
            <Input
              type="tel"
              placeholder="Телефон (по желанию)"
              variant="bold"
              value={answers.contact.phone}
              onChange={(e) => setAnswers(prev => ({ 
                ...prev, 
                contact: { ...prev.contact, phone: e.target.value }
              }))}
            />
            <Textarea
              placeholder="Комментарий (по желанию)"
              variant="bold"
              value={answers.notes}
              onChange={(e) => setAnswers(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[80px]"
            />
            <div className="flex gap-3">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Назад
              </Button>
              <Button 
                onClick={handleSubmit}
                className="btn-primary flex-1"
                disabled={!answers.contact.name || !answers.contact.email}
              >
                Отправить <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Кнопка пропуска */}
        {currentQuestion.type !== 'choice' && currentQuestion.type !== 'contact' && (
          <div className="text-center mt-4">
            <button
              onClick={handleNext}
              className="text-fg/60 hover:text-fg text-sm transition-colors"
            >
              Пропустить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleBrief;