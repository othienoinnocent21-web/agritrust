import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Package } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import Badge from "../../components/common/Badge";
import Rating from "../../components/common/Rating";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import { ROUTES } from "../../constants";
import { formatCurrency } from "../../utils/formatters";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addItem } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    load();
  }, [id, getProductById]);

  const available = product?.quantity || 0;
  const maxQty = available;

  const handleQuantityChange = (next) => {
    if (next < 1) setQuantity(1);
    else if (next > maxQty) setQuantity(maxQty);
    else setQuantity(next);
  };

  const handleAddToCart = () => {
    if (!product?.isAvailable || available === 0) {
      addToast({
        type: "warning",
        title: "Unavailable",
        message: "This product is currently out of stock.",
      });
      return;
    }
    addItem(product, quantity);
    addToast({
      type: "success",
      title: "Added to cart",
      message: `${product.title} (${quantity}) added to your cart.`,
    });
    navigate(ROUTES.BUYER_CART, { replace: true });
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner text="Loading product..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <EmptyState
          title="Product not found"
          description="The product you are looking for does not exist."
          actionLabel="Browse Marketplace"
          onAction={() => navigate(ROUTES.BUYER_MARKETPLACE)}
        />
      </div>
    );
  }

  return (
    <div className="p-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-64 lg:h-80 rounded-xl object-cover border border-border"
            />
          ) : (
            <div className="w-full h-64 lg:h-80 rounded-xl bg-gray-200 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted" />
            </div>
          )}
          <p className="text-xs text-muted">
            {product.isOrganic && (
              <Badge variant="success" size="sm" className="mr-1">
                Organic
              </Badge>
            )}
            <Badge variant={product.isAvailable ? "success" : "warning"} size="sm">
              {product.isAvailable ? "In Stock" : "Out of Stock"}
            </Badge>
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-text">{product.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Rating rating={product.farmer?.rating || 0} readOnly size="sm" />
              {product.farmer?.name && (
                <span className="text-sm text-muted">by {product.farmer.name}</span>
              )}
            </div>
          </div>

          <p className="text-2xl font-bold text-primary">
            {formatCurrency(product.price)} <span className="text-sm text-muted font-normal">/ {product.unit}</span>
          </p>

          {product.description && (
            <p className="text-sm text-muted">{product.description}</p>
          )}

          {product.location && (
            <p className="text-sm text-muted">📍 Origin: {product.location}</p>
          )}

          {product.isAvailable && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </Button>
                <Input
                  name="quantity"
                  type="number"
                  min={1}
                  max={maxQty}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value, 10) || 1)
                  }
                  inputClassName="w-14 text-center"
                  className="w-16"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxQty}
                >
                  +
                </Button>
              </div>
              <span className="text-xs text-muted">
                {available} available
              </span>
            </div>
          )}

          <Button
            variant="primary"
            leftIcon={ShoppingCart}
            onClick={handleAddToCart}
            disabled={!product.isAvailable || available === 0}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
