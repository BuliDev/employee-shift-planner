type PageCardProps = {
  title: string;
  description: string;
};

const PageCard = ({ title, description }: PageCardProps) => {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default PageCard;
