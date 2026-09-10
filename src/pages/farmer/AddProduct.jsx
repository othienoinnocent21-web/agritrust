import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockProductService from "../../services/mockProductService";
import useToast from "../../hooks/useToast";
import ProductForm from "../../components/farmer/ProductForm";
import Button from "../../components/common/Button";
import { ROUTES } from "../../constants";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await mockProductService.createProduct(productData);
      addToast({
        type: "success",
        title: "Product added",
        message: `${newProduct.title} has been listed successfully.`,
      });
      navigate(ROUTES.FARMER_PRODUCTS);
    } catch (err) {
      setError(err.message || "Failed to add product");
      addToast({
        type: "error",
        title: "Failed to add product",
        message: err.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Add New Product</h1>
        <p className="text-muted mt-1">List a new product in your farm shop.</p>
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
