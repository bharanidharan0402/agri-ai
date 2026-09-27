import { Camera, Sprout, Droplets, Cpu, Search } from 'lucide-react';

export default function QuickActionButtons({ onOpenWorkspace, t }) {
  const actions = [
    { id: 'monitor', label: 'Camera Monitor', icon: Camera, textCol: 'text-amber-800', bgCol: 'bg-amber-50', borderCol: 'border-amber-200' },
    { id: 'recom', label: 'Crop Match', icon: Sprout, textCol: 'text-emerald-800', bgCol: 'bg-emerald-50', borderCol: 'border-emerald-200' },
    { id: 'irrigation', label: 'Irrigation', icon: Droplets, textCol: 'text-blue-800', bgCol: 'bg-blue-50', borderCol: 'border-blue-200' },
    { id: 'circuits', label: 'Repellers', icon: Cpu, textCol: 'text-purple-800', bgCol: 'bg-purple-50', borderCol: 'border-purple-200' },
    { id: 'pathology', label: 'Pathology', icon: Search, textCol: 'text-red-800', bgCol: 'bg-red-50', borderCol: 'border-red-200' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onOpenWorkspace(action.id)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono transition flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-sm active:scale-95 bg-white border ${action.borderCol} hover:bg-slate-50 text-slate-800`}
        >
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${action.bgCol} ${action.textCol}`}>
            <action.icon className="w-3.5 h-3.5" />
          </div>
          <span>{t(action.label)}</span>
        </button>
      ))}
    </div>
  );
}
