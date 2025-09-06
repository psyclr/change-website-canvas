import React from 'react';
import MainGraffitiLine from './spray/MainGraffitiLine';

/**
 * GlobalGraffitiLine - глобальная граффити-линия через весь сайт
 * Создает непрерывную зигзагообразную линию, ведущую пользователя через процесс
 */
const GlobalGraffitiLine: React.FC = () => {
  // Блок 1 - верхняя часть загогулины (до блока со стрелками) - не заходит на правую стрелку
  const block1Points: [number, number][] = [
    [650, 100],
    [920, 350],
    [280, 650],
    [600, 720]
  ];

  // Блок 2 - нижняя часть загогулины (после блока со стрелками)
  const block2Points: [number, number][] = [
    [760, 900],
    [180, 1200],
    [880, 1450],
    [220, 1750],
    [740, 2000],
    [160, 2300],
    [820, 2550]
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Блок 1 - верхняя часть загогулины */}
      <MainGraffitiLine
        points={block1Points}
        animated={true}
        color="#3B82F6"
        className="graffiti-block-1"
      />
      
      {/* Блок 2 - нижняя часть загогулины */}
      <MainGraffitiLine
        points={block2Points}
        animated={true}
        color="#3B82F6"
        className="graffiti-block-2"
      />
    </div>
  );
};

export default GlobalGraffitiLine;