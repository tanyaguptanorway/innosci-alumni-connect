export function PanelHeader({ title, action, onClick }: { title: string; action: string; onClick?: () => void }) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-950">{title}</h2><button onClick={onClick} className="text-xs font-bold text-teal-700 hover:text-teal-500">{action}</button></div>;
}