import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  
  const { data, error } = await supabase
    .from('symptom_logs')
    .insert({
      user_id: user.id,
      pain_level: body.painLevel,
      pain_locations: body.painLocations,
      additional_symptoms: body.additionalSymptoms,
      notes: body.notes
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data[0]);
}