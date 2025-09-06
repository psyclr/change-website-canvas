import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import { Mail, MapPin, Phone, Globe, Wrench, HeadphonesIcon } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <SectionContainer variant="light" id="contact" className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6 text-fg">
            Свяжитесь с нами
          </h2>
          <p className="text-lg text-fg/70 max-w-2xl mx-auto">
            Расскажите о своем проекте — мы ответим в течение дня и предложим оптимальное решение для ваших задач.
          </p>
        </div>

        {/* Основной контент - сетка из 2 колонок */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Левая колонка - контактная информация */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading font-medium mb-6 text-fg">Контактная информация</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-fg mb-1">Email</h4>
                    <a href="mailto:hello@change.studio" className="text-fg/70 hover:text-accent transition-colors">
                      hello@change.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-fg mb-1">Телефон</h4>
                    <a href="tel:+15551234567" className="text-fg/70 hover:text-accent transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-fg mb-1">Адрес</h4>
                    <p className="text-fg/70">
                      123 Main Street<br />
                      Portland, OR 97204
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="bg-fg/5 rounded-2xl p-6">
              <h4 className="font-medium text-fg mb-4">Почему выбирают нас</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-fg/70 text-sm">Техническая экспертиза и современные решения</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HeadphonesIcon className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-fg/70 text-sm">Персональный подход и поддержка на всех этапах</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-fg/70 text-sm">Опыт работы с проектами любой сложности</p>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - форма быстрого контакта */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted">
            <h3 className="text-xl font-heading font-medium mb-6 text-fg">Быстрая связь</h3>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Ваше имя</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    placeholder="Как к вам обращаться?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Телефон (опционально)</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">Расскажите о проекте</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
                  placeholder="Опишите кратко что вам нужно — мы поможем определить лучшее решение для ваших задач"
                />
              </div>

              <button 
                type="submit"
                className="w-full btn-primary py-3"
              >
                Отправить сообщение
              </button>
              
              <p className="text-xs text-fg/60 text-center">
                Отвечаем в течение рабочего дня • Никакого спама
              </p>
            </form>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;