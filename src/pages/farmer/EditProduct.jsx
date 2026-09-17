
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import ProductForm from "../../components/farmer/ProductForm";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";
import { ROUTES } from "../../constants";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { getProductById, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(id);

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
  }, [id, getProductById]);

  const handleSubmit = async (productData) => {
    setSubmitting(true);
    setError(null);

    const result = await updateProduct(id, {
      ...productData,
      farmerId: product?.farmerId ?? 1,
    });

    if (result.success) {
      addToast({
        type: "success",
        title: "Product updated",
        message: `${result.data.title} has been updated.`,
      });

      navigate(ROUTES.FARMER_PRODUCTS);
    } else {
      setError(result.error || "Failed to update product");

      addToast({
        type: "error",
        title: "Failed to update product",
        message: result.error || "An error occurred",
      });
    }

    setSubmitting(false);
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Edit Product</h1>
        <p className="text-muted mt-1">
          Update your product listing details.
        </p>
      </div>

      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(ROUTES.FARMER_PRODUCTS)}
        >
          ← Back to My Products
        </Button>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        loading={submitting}
        error={error}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditProduct;

