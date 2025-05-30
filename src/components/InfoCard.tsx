import { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

export const InfoCard = ({ icon, label, children }: InfoCardProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-gray-500">{icon}</div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="text-gray-900">{children}</div>
    </div>
  );
};
