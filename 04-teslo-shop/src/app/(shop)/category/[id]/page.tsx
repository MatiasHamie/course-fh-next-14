import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

export default function CategoryIDPage({ params }: Props) {
  const { id } = params;

  const products = initialData.products.filter(
    (product) => product.gender === id
  );

  const label: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  const subtitle: Record<Category, string> = {
    men: "él",
    women: "ella",
    kid: "niños",
    unisex: "todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Artículos ${label[id]}`}
        subtitle={`Productos para ${subtitle[id]}`}
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
