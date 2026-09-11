import { Camera, Sprout, Droplets, Cpu, Search } from 'lucide-react';

export default function QuickActionButtons({ onOpenWorkspace, t }) {
  const actions = [
    { id: "monitor", label: "Camera Monitor", icon: Camera, color: "bg-slate-800 hover:bg-slate-700 text-white" },
    { id: "recom", label: "Crop Match", icon: Sprout, color: "bg-emerald-600 hover:bg-emerald-500 text-white" },
    { id: "irrigation", label: "Irrigation", icon: Droplets, color: "bg-blue-600 hover:bg-blue-500 text-white" },
    { id: "circuits", label: "Repellers", icon: Cpu, color: "bg-purple-600 hover:bg-purple-500 text-white" },
    { id: "pathology", label: "Pathology", icon: Search, color: "bg-rose-600 hover:bg-rose-500 text-white" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onOpenWorkspace(action.id)}
          className={`${action.color} px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md`}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </button>
      ))}
    </div>
  );
}
