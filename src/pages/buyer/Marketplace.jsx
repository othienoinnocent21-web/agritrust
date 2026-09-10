import { useState, useMemo } from "react";
import useProducts from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import BuyerProductCard from "../../components/buyer/ProductCard";
import SearchInput from "../../components/common/SearchInput";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { PRODUCT_CATEGORIES } from "../../constants";
import { ShoppingBasket } from "lucide-react";

const categoryOptions = [
  { value: "", label: "All Categories" },
  ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const statusOptions = [
  { value: "", label: "All" },
  { value: "available", label: "In Stock" },
  { value: "organic", label: "Organic" },
];

const Marketplace = () => {
  const { products, loading } = useProducts();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase()) ||
        product.farmer?.name?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesStatus =
        !statusFilter ||
        (statusFilter === "available" ? product.isAvailable : product.isOrganic);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  const hasActiveFilters = search || categoryFilter || statusFilter;

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
  };

  const handleFavorite = (product) => {
    addToast({
      type: "info",
      title: "Favorited",
      message: `${product.title} added to favorites.`,
    });
  };

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Marketplace</h1>
          <p className="text-muted mt-1">
            Fresh produce from trusted local farmers.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product, category or farmer..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categoryOptions}
            placeholder="All Categories"
            className="w-48"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="All"
            className="w-40"
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner text="Loading products..." />
        </div>
      )}

      {!loading && filtered.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "No products found" : "No products yet"}
          description={
            hasActiveFilters
              ? "Try adjusting your search or filter criteria."
              : "There are no products available at the moment."
          }
          icon={ShoppingBasket}
          actionLabel={hasActiveFilters ? "Clear filters" : null}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      ) : (
        !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <BuyerProductCard
                key={product.id}
                product={product}
                showFavorite
                onFavorite={() => handleFavorite(product)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Marketplace;
