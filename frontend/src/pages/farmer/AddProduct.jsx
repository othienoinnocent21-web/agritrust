
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import useAuth from "../../hooks/useAuth";
import ProductForm from "../../components/farmer/ProductForm";
import Button from "../../components/common/Button";
import { ROUTES } from "../../constants";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { addProduct, loading } = useProducts();
  const { user } = useAuth();

  const [error, setError] = useState(null);

  const handleSubmit = async (productData) => {
    setError(null);

    // Make sure a farmer is logged in
    if (!user?.id) {
      setError("You must be logged in to add a product.");

      addToast({
        type: "error",
        title: "Authentication required",
        message: "Please log in before adding a product.",
      });

      return;
    }

    const result = await addProduct({
      ...productData,
      farmerId: user.id,
    });

    if (result.success) {
      addToast({
        type: "success",
        title: "Product added",
        message: `${result.data.title} has been listed successfully.`,
      });

      navigate(ROUTES.FARMER_PRODUCTS);
    } else {
      setError(result.error || "Failed to add product");

      addToast({
        type: "error",
        title: "Failed to add product",
        message: result.error || "An error occurred",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">
          Add New Product
        </h1>

        <p className="text-muted mt-1">
          List a new product in your farm shop.
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
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Add Product"
      />
    </div>
  );
};

export default AddProduct;

