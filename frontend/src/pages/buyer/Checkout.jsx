import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingBasket } from "lucide-react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useOrders from "../../hooks/useOrders";
import useProducts from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";
import OrderItemRow from "../../components/orders/OrderItemRow";
import OrderTotals from "../../components/orders/OrderTotals";
import { ROUTES } from "../../constants";
import { buildOrdersFromCart } from "../../utils/orderFactory";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, clearCart, isEmpty, totalPrice } = useCart();
  const { createOrder } = useOrders();
  const { getProductById, updateProduct } = useProducts();
  const { addToast } = useToast();

  const [deliveryLocation, setDeliveryLocation] = useState(user?.location || "");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isEmpty) {
    return (
      <div className="p-6">
        <EmptyState
          title="Your cart is empty."
          description="Add products to your cart before checking out."
          icon={ShoppingBasket}
          actionLabel="Browse Marketplace"
          onAction={() => navigate(ROUTES.BUYER_MARKETPLACE)}
        />
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!deliveryLocation.trim()) {
      setError("Delivery location is required");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const delivery = {
        deliveryLocation: deliveryLocation.trim(),
        deliveryNotes: deliveryNotes.trim(),
      };
      const orders = buildOrdersFromCart(items, user, delivery);

      const created = [];
      for (const order of orders) {
        const result = await createOrder(order);
        if (result.success) {
          created.push(result.data);
        } else {
          throw new Error(result.error);
        }
      }

      // Decrement available product quantities.
      for (const item of items) {
        const product = await getProductById(item.productId);
        if (product) {
          const remaining = Math.max(0, (product.quantity || 0) - item.quantity);
          await updateProduct(product.id, { quantity: remaining });
        }
      }

      clearCart();
      addToast({
        type: "success",
        title: "Order placed successfully.",
        message: `${created.length} order(s) placed.`,
      });
      navigate(ROUTES.BUYER_ORDERS);
    } catch (err) {
      setError(err.message || "Failed to place order");
      addToast({
        type: "error",
        title: "Order failed",
        message: err.message || "Could not place your order.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">Checkout</h1>
        <span className="text-sm text-muted">{items.length} item(s) · {totalPrice}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <OrderItemRow key={item.id} item={item} editable={false} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-text">Order Summary</h2>
            <OrderTotals items={items} />
          </div>

          <div className="bg-white border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-text">Delivery Information</h2>
            <Input
              label="Delivery location"
              name="deliveryLocation"
              placeholder="e.g. 123 Farm Road, Iowa, USA"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              error={error}
              required
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="deliveryNotes" className="text-sm font-medium text-text">
                Delivery notes (optional)
              </label>
              <textarea
                id="deliveryNotes"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Any special instructions for the farmer"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            leftIcon={ShoppingCart}
            onClick={handlePlaceOrder}
            loading={submitting}
            disabled={submitting}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
