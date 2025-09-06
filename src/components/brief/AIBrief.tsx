import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface BriefAnswer {
  question: string;
  answer: string;
}

interface APIResponse {
  question: string;
  isFinished: boolean;
  totalQuestions?: number;
  currentQuestion?: number;
}

const AIBrief: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState<BriefAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(8);

  // Мок API - заготовленные вопросы
  const mockAPI = async (answers: BriefAnswer[]): Promise<APIResponse> => {
    // Имитируем задержку API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockQuestions = [
      "Чем вы занимаетесь? Опишите в двух словах",
      "Кто ваши клиенты? Кому нужны ваши услуги?",
      "Какой сайт вам нравится? Можете скинуть ссылку",
      "Какое настроение должен передавать ваш сайт?",
      "Что главное должен делать сайт для вашего бизнеса?",
      "Есть ли у вас логотип и фотографии?",
      "Когда нужен готовый сайт?",
      "Как с вами связаться для обсуждения?"
    ];

    const questionIndex = answers.length;
    
    if (questionIndex >= mockQuestions.length) {
      return {
        question: '',
        isFinished: true
      };
    }

    return {
      question: mockQuestions[questionIndex],
      isFinished: false,
      currentQuestion: questionIndex + 1,
      totalQuestions: mockQuestions.length
    };
  };

  const handleStart = async () => {
    setIsStarted(true);
    setIsLoading(true);
    
    try {
      const response = await mockAPI([]);
      setCurrentQuestion(response.question);
      setQuestionNumber(response.currentQuestion || 1);
      setTotalQuestions(response.totalQuestions || 8);
    } catch (error) {
      console.error('Ошибка API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async () => {
    if (!currentAnswer.trim()) return;

    setIsLoading(true);
    
    const newAnswer: BriefAnswer = {
      question: currentQuestion,
      answer: currentAnswer
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer('');

    try {
      const response = await mockAPI(updatedAnswers);
      
      if (response.isFinished) {
        setIsFinished(true);
      } else {
        setCurrentQuestion(response.question);
        setQuestionNumber(response.currentQuestion || questionNumber + 1);
      }
    } catch (error) {
      console.error('Ошибка API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (answers.length > 0) {
      const lastAnswer = answers[answers.length - 1];
      setCurrentAnswer(lastAnswer.answer);
      setCurrentQuestion(lastAnswer.question);
      setAnswers(answers.slice(0, -1));
      setQuestionNumber(questionNumber - 1);
      setIsFinished(false);
    }
  };

  const handleSubmit = () => {
    console.log('Отправляем результаты опроса:', answers);
    // TODO: Отправка на сервер
  };

  if (!isStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Умный опросник</span>
          </div>
        </div>
        
        <div className="bg-fg/5 rounded-xl p-8 mb-8 text-left">
          <p className="text-fg/80 leading-relaxed mb-4">
            Этот опросник подстраивается под вас прямо во время общения.
          </p>
          <p className="text-fg/80 leading-relaxed mb-4">
            Да, там ИИ под капотом, но это для нас — чтобы мы могли лучше сделать ваш сайт.
          </p>
          <p className="text-fg/80 leading-relaxed mb-4">
            Все брифы в любом случае всегда проходят через нас, но нам так гораздо легче вас понять.
          </p>
          <p className="text-fg/80 leading-relaxed">
            <strong>И вы можете получить такую же фичу на свой сайт, кстати.</strong>
          </p>
        </div>
        
        <Button
          onClick={handleStart}
          size="lg"
          className="btn-primary text-lg px-8 py-4"
        >
          Начать опрос <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-muted">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-heading font-medium mb-4 text-fg">
              Спасибо!
            </h3>
            <p className="text-fg/70 mb-6">
              Мы получили ваши ответы и свяжемся с готовым предложением в течение дня.
            </p>
          </div>
          
          <div className="bg-fg/5 rounded-xl p-6 mb-6 text-left">
            <h4 className="font-medium mb-3">Ваши ответы:</h4>
            <div className="space-y-3 text-sm">
              {answers.map((item, index) => (
                <div key={index}>
                  <div className="font-medium text-fg/80">{item.question}</div>
                  <div className="text-fg/60">{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={handleSubmit} className="btn-primary">
            Получить резюме на email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Прогресс */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-fg/60">
            Вопрос {questionNumber} из ~{totalQuestions}
          </span>
          <span className="text-xs text-fg/50">
            Отвечайте как удобно — опросник подстроится
          </span>
        </div>
        <div className="w-full bg-muted-2 rounded-full h-1">
          <div 
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Вопрос */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-muted">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-xl font-heading font-medium text-fg leading-relaxed">
            {isLoading ? 'Думаю над следующим вопросом...' : currentQuestion}
          </h3>
        </div>

        {!isLoading && (
          <div className="space-y-6">
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Напишите ваш ответ..."
              className="min-h-[120px]"
              variant="bold"
            />
            
            <div className="flex gap-3">
              {answers.length > 0 && (
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
              )}
              <Button 
                onClick={handleAnswer} 
                className="btn-primary flex-1"
                disabled={!currentAnswer.trim()}
              >
                {questionNumber >= totalQuestions ? 'Завершить' : 'Далее'} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBrief;