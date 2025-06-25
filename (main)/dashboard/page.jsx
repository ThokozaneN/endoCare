import { PainScale, SymptomChart, QuickLogForm } from '@/components/dashboard';
import { getCurrentUser } from '@/lib/auth';
import { getRecentSymptoms } from '@/lib/api/symptoms';

export default async function Dashboard() {
  const user = await getCurrentUser();
  const symptoms = await getRecentSymptoms(user.id);
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <QuickLogForm userId={user.id} />
      
      <div className="md:col-span-2">
        <SymptomChart data={symptoms} />
      </div>
      
      <PainScale />
    </div>
  );
}