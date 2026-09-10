import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import ProductCard from "../../components/farmer/ProductCard";
import SearchInput from "../../components/common/SearchInput";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { ROUTES, PRODUCT_CATEGORIES } from "../../constants";

const categoryOptions = [
  { value: "", label: "All Categories" },
  ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "out_of_stock", label: "Out of Stock" },
];

const Products = () => {
  const navigate = useNavigate();
  const { products, loading, deleteProduct } = useProducts();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesStatus =
        !statusFilter ||
        (statusFilter === "available" ? product.isAvailable : !product.isAvailable);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  const hasActiveFilters = search || categoryFilter || statusFilter;

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    const result = await deleteProduct(productToDelete.id);
    if (result.success) {
      addToast({
        type: "success",
        title: "Product deleted",
        message: `${productToDelete.title} has been removed.`,
      });
    } else {
      addToast({
        type: "error",
        title: "Delete failed",
        message: result.error,
      });
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">My Products</h1>
          <p className="text-muted mt-1">{products.length} products listed.</p>
        </div>
        <Button to={ROUTES.FARMER_ADD_PRODUCT} variant="primary" leftIcon={Plus}>
          Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category..."
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
            placeholder="All Status"
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

      {!loading && filteredProducts.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "No products found" : "No products yet"}
          description={
            hasActiveFilters
              ? "Try adjusting your search or filter criteria."
              : "Start listing your products to see them here."
          }
          actionLabel={hasActiveFilters ? "Clear filters" : "Add Product"}
          onAction={hasActiveFilters ? clearFilters : () => navigate(ROUTES.FARMER_ADD_PRODUCT)}
        />
      ) : (
        !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showActions
                onView={() => navigate(ROUTES.FARMER_PRODUCT_DETAILS.replace(":id", String(product.id)))}
                onEdit={() => navigate(ROUTES.FARMER_EDIT_PRODUCT.replace(":id", String(product.id)))}
                onDelete={() => handleDeleteClick(product)}
              />
            ))}
          </div>
        )
      )}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Product"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default Products;
