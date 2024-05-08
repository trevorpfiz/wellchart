import Link from "next/link";

interface BackButtonProps {
  label: string;
  linkLabel: string;
  href: string;
}

export const BackButton = ({ label, linkLabel, href }: BackButtonProps) => {
  return (
    <div className="flex w-full flex-row items-center gap-1">
      <span className="text-muted-foreground text-sm">{label}</span>
      <Link href={href} className="text-blue-600 text-sm hover:underline">
        {linkLabel}
      </Link>
    </div>
  );
};
