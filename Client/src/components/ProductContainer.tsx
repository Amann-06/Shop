interface ProductContainerProps {
  title?: string;
  children?: React.ReactNode;
}

const ProductContainer = ({
  title,
  children,
}: ProductContainerProps) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <button className="text-sm text-blue-500 hover:underline underline-offset-1">
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {children}
      </div>
    </section>
  );
};

export default ProductContainer;