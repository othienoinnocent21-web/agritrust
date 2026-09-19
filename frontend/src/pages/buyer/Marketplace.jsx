import { useState, useMemo } from "react";
import useProducts from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import BuyerProductCard from "../../components/buyer/ProductCard";
import MarketplaceFilters from "../../components/buyer/MarketplaceFilters";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { ShoppingBasket, Grid3x3, List } from "lucide-react";

const categoryOptions = [
  { value: "All Categories", label: "All Categories" },
  { value: "Vegetables", label: "Vegetables" },
  { value: "Fruits", label: "Fruits" },
  { value: "Dairy & Eggs", label: "Dairy & Eggs" },
  { value: "Honey", label: "Honey" },
  { value: "Grains", label: "Grains" },
  { value: "Nursery", label: "Nursery" },
  { value: "Herbs", label: "Herbs" },
];

const regionOptions = [
  { value: "All Regions", label: "All Regions" },
  { value: "Central", label: "Central" },
  { value: "Western", label: "Western" },
  { value: "Eastern", label: "Eastern" },
  { value: "Northern", label: "Northern" },
];

const Marketplace = () => {
  const { products, loading } = useProducts();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [region, setRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || category === "All Categories" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "rated") {
      result.sort((a, b) => (b.farmer?.rating || 0) - (a.farmer?.rating || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [products, searchTerm, category, sortBy]);

  const hasActiveFilters = searchTerm || (category && category !== "All Categories") || (region && region !== "All Regions") || (sortBy && sortBy !== "newest");

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All Categories");
    setRegion("All Regions");
    setSortBy("newest");
  };

  const handleFavorite = (product) => {
    addToast({
      type: "info",
      title: "Favorited",
      message: `${product.title} added to favorites.`,
    });
  };

  const toggleView = (mode) => {
    setViewMode(mode);
    addToast({
      type: "info",
      title: "View changed",
      message: `Switched to ${mode} view.`,
    });
  };

  if (loading) {
    return (
      <div className="p-6 pb-12">
        <LoadingSpinner text="Loading products..." />
      </div>
    );
  }

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Marketplace</h1>
          <p className="text-muted mt-1">
            Browse fresh produce from verified farmers.
          </p>
        </div>
      </div>

      <MarketplaceFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        region={region}
        onRegionChange={setRegion}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onToggleView={toggleView}
        categories={categoryOptions}
        regions={regionOptions}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="flex items-center justify-between mt-6 mb-4">
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-text">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-1 bg-white border border-border rounded-lg p-1">
          <button
            onClick={() => toggleView("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:bg-gray-100"
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleView("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list" ? "bg-primary text-white" : "text-muted hover:bg-gray-100"
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
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
      ) : viewMode === "grid" ? (
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
      ) : (
        <div className="space-y-4">
          {filtered.map((product) => (
            <BuyerProductCard
              key={product.id}
              product={product}
              showFavorite
              onFavorite={() => handleFavorite(product)}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
