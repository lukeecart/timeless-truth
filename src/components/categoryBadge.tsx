interface BadgeProps {
	label: string;
	bgColor: string;
	textColor: string;
}

export const CategoryBadge = ({ label, bgColor, textColor }: BadgeProps) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm ${bgColor} ${textColor}`}>
    {label}
  </span>
);