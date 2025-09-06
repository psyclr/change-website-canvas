import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SprayLine } from "@/components/spray/SprayLine";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#process", label: "Процесс" },
    { href: "#work", label: "Работы" },
    { href: "#contact", label: "Контакты" }
  ];

  const quickActions = [
    { href: "tel:+48123456789", icon: Phone, label: "Звонок" },
    { href: "#chat", icon: MessageCircle, label: "Чат" },
    { href: "#demo", icon: Play, label: "Демо" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg/50 backdrop-blur-sm border-b border-muted">
      <div className="container-bold h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="/" 
            className="text-2xl font-heading font-medium text-fg hover:text-accent transition-colors focus-ring"
          >
            Change
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <div key={link.href} className="relative group">
                <a 
                  href={link.href}
                  className="text-fg/70 hover:text-fg transition-colors duration-200 focus-ring py-2 px-1"
                >
                  {link.label}
                </a>
                {/* Micro spray-line on hover */}
                <div className="absolute -bottom-1 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <SprayLine 
                    type="micro" 
                    direction="horizontal" 
                    length={40}
                    animated={true}
                    className="scale-75"
                  />
                </div>
              </div>
            ))}
          </nav>
          
          {/* CTA Button */}
          <Button 
            asChild 
            className="btn-primary focus-ring ml-4"
          >
            <a href="#get-started">
              Получить демо
            </a>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="focus-ring"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full bg-bg border-l border-muted"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-heading font-medium text-fg">
                Change
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                className="focus-ring"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Закрыть меню</span>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-6 mb-8">
              {navigationLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-fg/70 hover:text-fg transition-colors py-3 focus-ring"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mb-8">
              <Button 
                asChild 
                className="btn-primary w-full focus-ring"
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="#get-started">
                  Получить демо
                </a>
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-muted pt-6">
              <p className="text-small text-fg/60 mb-4">Быстрые действия</p>
              <div className="grid grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center p-4 rounded-card border border-muted hover:border-accent/50 transition-colors focus-ring"
                  >
                    <action.icon className="h-5 w-5 text-accent mb-2" />
                    <span className="text-small text-fg/70">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;