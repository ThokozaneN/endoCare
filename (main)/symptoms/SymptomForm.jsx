'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { symptomSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { BodyMap } from '@/components/symptoms';

export function SymptomForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(symptomSchema)
  });

  const handleBodyMapSelect = (locations) => {
    setValue('painLocations', locations);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Pain Level</label>
        <input 
          type="range" 
          min="1" 
          max="10" 
          {...register('painLevel')}
          className="w-full h-2 bg-primary rounded-lg appearance-none"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 (Mild)</span>
          <span>10 (Severe)</span>
        </div>
      </div>
      
      <BodyMap onSelect={handleBodyMapSelect} />
      
      <div>
        <label className="block text-sm font-medium">Additional Symptoms</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Fatigue', 'Bloating', 'Nausea', 'Headache'].map(symptom => (
            <button
              key={symptom}
              type="button"
              className="px-3 py-1 text-sm rounded-full border hover:bg-accent"
              onClick={() => {/* Toggle logic */}}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Save Entry
      </Button>
    </form>
  );
}