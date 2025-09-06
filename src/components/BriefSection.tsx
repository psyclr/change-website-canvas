import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import InteractiveBrief from '@/components/brief/InteractiveBrief';
import { Mail, MapPin, Phone, Globe, Wrench, HeadphonesIcon } from 'lucide-react';

const BriefSection: React.FC = () => {
  return (
    <SectionContainer variant="light" id="brief" className="flex-1 flex flex-col">
      {/* Основной контент брифа */}
      <div className="flex-1 pt-16 md:pt-24">
        <div className="w-full">
          {/* Заголовок и описание секции - вынесены над карточкой */}
          <div className="text-center mb-8 md:mb-12 relative z-20">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6 text-fg">
              Интерактивный бриф
            </h2>
            <p className="text-lg text-fg/70 max-w-2xl mx-auto mb-8">
              Ответьте на вопросы — покажем, как может выглядеть ваш сайт. Без звонков и без спама.
            </p>
          </div>

          <InteractiveBrief />
        </div>
      </div>

      {/* Футер как часть секции */}
      <div id="contact" className="py-8 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="mb-3">
                <span className="text-xl font-display text-primary font-light">Change</span>
              </div>
              <p className="text-foreground/70 max-w-xs leading-tight text-sm">
                Making websites for people who just need them to work.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-display mb-2 font-light">Contact</h3>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <Mail className="h-3 w-3 text-primary mr-2 mt-1" />
                  <a href="mailto:hello@change.studio" className="text-foreground/70 hover:text-foreground text-sm leading-tight">
                    hello@change.studio
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="h-3 w-3 text-primary mr-2 mt-1" />
                  <span className="text-foreground/70 text-sm leading-tight">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-3 w-3 text-primary mr-2 mt-1" />
                  <span className="text-foreground/70 text-sm leading-tight">123 Main Street, Portland, OR 97204</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-display mb-2 font-light">Services</h3>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <Globe className="h-3 w-3 text-primary mr-2 mt-1" />
                  <a href="#services" className="text-foreground/70 hover:text-foreground text-sm leading-tight">Website from scratch</a>
                </li>
                <li className="flex items-start">
                  <Wrench className="h-3 w-3 text-primary mr-2 mt-1" />
                  <a href="#services" className="text-foreground/70 hover:text-foreground text-sm leading-tight">Fix your old site</a>
                </li>
                <li className="flex items-start">
                  <HeadphonesIcon className="h-3 w-3 text-primary mr-2 mt-1" />
                  <a href="#services" className="text-foreground/70 hover:text-foreground text-sm leading-tight">Simple updates & support</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-display mb-2 font-light">Follow us</h3>
              <div className="flex space-x-3">
                <a href="https://twitter.com" className="text-foreground/60 hover:text-foreground" aria-label="Twitter">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="https://instagram.com" className="text-foreground/60 hover:text-foreground" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
                </a>
                <a href="https://linkedin.com" className="text-foreground/60 hover:text-foreground" aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border/10 text-center">
            <p className="text-xs text-foreground/50">
              © {new Date().getFullYear()} Change. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default BriefSection;