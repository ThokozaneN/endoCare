'use client';

import { useCallback, useState } from 'react';
import SVG from 'react-inlinesvg';

export function BodyMap({ onSelect }) {
  const [selectedAreas, setSelectedAreas] = useState([]);
  
  const areas = [
    { id: 'pelvic', name: 'Pelvic Area' },
    { id: 'lower-abdomen', name: 'Lower Abdomen' },
    { id: 'left-hip', name: 'Left Hip' },
    { id: 'right-hip', name: 'Right Hip' },
    { id: 'lower-back', name: 'Lower Back' }
  ];

  const toggleArea = useCallback((areaId) => {
    setSelectedAreas(prev => {
      const newSelection = prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId];
      
      onSelect?.(areas.filter(a => newSelection.includes(a.id)).map(a => a.name));
      return newSelection;
    });
  }, [onSelect]);

  return (
    <div className="relative">
      <SVG 
        src="/body-map.svg" 
        className="w-full max-w-xs mx-auto"
      />
      
      {areas.map(area => (
        <button
          key={area.id}
          onClick={() => toggleArea(area.id)}
          className={`absolute rounded-full transition-all ${selectedAreas.includes(area.id) 
            ? 'bg-primary/50 border-2 border-primary' 
            : 'bg-transparent border border-gray-300'}`}
          style={{
            width: area.id.includes('hip') ? '24px' : '32px',
            height: area.id.includes('hip') ? '24px' : '32px',
            left: getPosition(area.id).x,
            top: getPosition(area.id).y,
            transform: 'translate(-50%, -50%)'
          }}
          aria-label={area.name}
        />
      ))}
    </div>
  );
}

// Helper function for positioning
function getPosition(areaId) {
  const positions = {
    'pelvic': { x: '50%', y: '60%' },
    'lower-abdomen': { x: '50%', y: '50%' },
    'left-hip': { x: '40%', y: '65%' },
    'right-hip': { x: '60%', y: '65%' },
    'lower-back': { x: '50%', y: '70%' }
  };
  return positions[areaId] || { x: '50%', y: '50%' };
}