import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryIDPage({ params }: Props) {
  const { id } = params;

  if (id === "kids") {
    notFound();
  }

  return (
    <div>
      {JSON.stringify(params)}
      <h1>CategoryID Page</h1>
    </div>
  );
}
