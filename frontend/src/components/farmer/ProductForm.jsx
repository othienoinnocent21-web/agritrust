
import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { PRODUCT_CATEGORIES, PRODUCT_UNITS } from "../../constants/products";
import {
  validateRequired,
  validatePrice,
  validateQuantity,
} from "../../utils/validators";

const categoryOptions = PRODUCT_CATEGORIES.map((c) => ({
  value: c,
  label: c,
}));

const unitOptions = PRODUCT_UNITS.map((u) => ({
  value: u,
  label: u,
}));

const ProductForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  submitLabel = "Save Product",
  error: externalError,
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price ?? "",
    quantity: initialData.quantity ?? "",
    unit: initialData.unit || "",
    category: initialData.category || "",
    isOrganic: initialData.isOrganic ?? false,
    isAvailable: initialData.isAvailable ?? true,
    image: initialData.images?.[0] || "",
    location: initialData.location || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const titleCheck = validateRequired(
      formData.title,
      "Product title"
    );

    if (!titleCheck.valid) {
      newErrors.title = titleCheck.message;
    }

    const priceCheck = validatePrice(formData.price);

    if (!priceCheck.valid) {
      newErrors.price = priceCheck.message;
    }

    const quantityCheck = validateQuantity(formData.quantity);

    if (!quantityCheck.valid) {
      newErrors.quantity = quantityCheck.message;
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate() && onSubmit) {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        category: formData.category,
        isOrganic: formData.isOrganic,
        isAvailable: formData.isAvailable,
        location: formData.location,
      };

      await onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {externalError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{externalError}</p>
        </div>
      )}

      <Input
        label="Product Title"
        name="title"
        placeholder="Enter product title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <Input
        label="Description"
        name="description"
        placeholder="Enter product description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="0.00"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          required
        />

        <Input
          label="Quantity"
          name="quantity"
          type="number"
          placeholder="0"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          required
        />
      </div>

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={categoryOptions}
        placeholder="Select category"
        error={errors.category}
        required
      />

      <Select
        label="Unit"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        options={unitOptions}
        placeholder="Select unit"
        error={errors.unit}
        required
      />

      <Input
        label="Location"
        name="location"
        placeholder="e.g. Kampala, Uganda"
        value={formData.location}
        onChange={handleChange}
      />

      <Input
        label="Image URL"
        name="image"
        placeholder="https://..."
        value={formData.image}
        onChange={handleChange}
        helperText="Image URL is currently for display purposes."
      />

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isOrganic"
            checked={formData.isOrganic}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border focus:ring-primary"
          />

          <span className="text-sm text-text">
            Organic product
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border focus:ring-primary"
          />

          <span className="text-sm text-text">
            Currently available
          </span>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={loading}
        disabled={loading}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default ProductForm;

