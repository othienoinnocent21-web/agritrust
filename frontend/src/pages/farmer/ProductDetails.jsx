import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Trash2, ArrowLeft, Calendar, MapPin, Weight } from "lucide-react";
import mockProductService from "../../services/mockProductService";
import useToast from "../../hooks/useToast";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Rating from "../../components/common/Rating";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";
import { ROUTES } from "../../constants";
import { formatCurrency, formatDate } from "../../utils/formatters";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }
      try {
        const data = await mockProductService.getProductById(id);
        if (!data) {
          setError("Product not found");
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!product) return;
    try {
      await mockProductService.deleteProduct(product.id);
      addToast({
        type: "success",
        title: "Product deleted",
        message: `${product.title} has been removed.`,
      });
      navigate(ROUTES.FARMER_PRODUCTS);
    } catch (err) {
      addToast({
        type: "error",
        title: "Delete failed",
        message: err.message || "Failed to delete product",
      });
    }
    setDeleteDialogOpen(false);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="p-6 pb-12">
        <LoadingSpinner text="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 pb-12">
        <ErrorState
          title="Something went wrong"
          description={error}
          onRetry={() => navigate(ROUTES.FARMER_PRODUCTS)}
          retryLabel="Back to My Products"
        />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="p-6 pb-12">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={ArrowLeft}
          onClick={() => navigate(ROUTES.FARMER_PRODUCTS)}
        >
          Back to My Products
        </Button>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-text">{product.title}</h1>
                <Badge variant={product.isAvailable ? "success" : "warning"}>
                  {product.isAvailable ? "Available" : "Out of Stock"}
                </Badge>
                <Badge variant={product.isOrganic ? "success" : "default"}>
                  {product.isOrganic ? "Organic" : "Conventional"}
                </Badge>
              </div>

              <p className="text-sm text-muted mb-4">{product.description}</p>

              {product.farmer && (
                <div className="flex items-center gap-2 mb-2">
                  <Rating rating={product.farmer.rating || 0} readOnly size="sm" />
                  <span className="text-sm text-muted">{product.farmer.name}</span>
                </div>
              )}
            </div>

            {product.images && product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-lg border border-border"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted uppercase font-medium">Price</p>
                <p className="text-lg font-semibold text-text mt-1">
                  {formatCurrency(product.price)} / {product.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted uppercase font-medium">Quantity</p>
                <p className="text-lg font-semibold text-text mt-1">
                  {product.quantity} {product.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted uppercase font-medium">Category</p>
                <p className="text-text mt-1">{product.category}</p>
              </div>

              {product.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted" />
                  <span className="text-text">{product.location}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {product.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted" />
                  <span className="text-text">
                    Added: {formatDate(product.createdAt)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-muted" />
                <span className="text-text">
                  Unit weight: {product.unit} per item
                </span>
              </div>

              <div>
                <p className="text-xs text-muted uppercase font-medium">Status</p>
                <div className="mt-1">
                  <Badge variant={product.isAvailable ? "success" : "warning"}>
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              {product.farmerId && (
                <div>
                  <p className="text-xs text-muted uppercase font-medium">Farmer ID</p>
                  <p className="text-muted mt-1">{product.farmerId}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-border bg-gray-50 rounded-b-xl">
          <Button
            variant="outline"
            size="sm"
            leftIcon={ArrowLeft}
            onClick={() => navigate(ROUTES.FARMER_PRODUCTS)}
          >
            Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={Edit}
            onClick={() => navigate(ROUTES.FARMER_EDIT_PRODUCT.replace(":id", String(product.id)))}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            leftIcon={Trash2}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${product.title}"? This action cannot be undone.`}
        confirmLabel="Delete Product"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ProductDetails;
