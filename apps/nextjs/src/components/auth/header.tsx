interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <h1 className={"text-md"}>WellChart</h1>
      <p className="font-bold text-2xl">{label}</p>
    </div>
  );
};
