import { useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingBasket, Trash2 } from "lucide-react";
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import OrderItemRow from "../../components/orders/OrderItemRow";
import OrderTotals from "../../components/orders/OrderTotals";
import { ROUTES } from "../../constants";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    isEmpty,
  } = useCart();
  const { addToast } = useToast();

  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const handleQuantityChange = (item, next) => {
    updateQuantity(item.id, next);
  };

  const handleRemove = (item) => {
    removeItem(item.id);
    addToast({
      type: "info",
      title: "Item removed",
      message: `${item.productName} removed from cart.`,
    });
  };

  const handleClear = () => {
    clearCart();
    addToast({
      type: "info",
      title: "Cart cleared",
      message: "All items removed from your cart.",
    });
    setClearDialogOpen(false);
  };

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">Your Cart</h1>
        <span className="text-sm text-muted">{totalItems} item(s)</span>
      </div>

      {isEmpty ? (
        <EmptyState
          title="Your cart is empty."
          description="Browse the marketplace and add products to get started."
          icon={ShoppingCart}
          actionLabel="Browse Marketplace"
          onAction={() => navigate(ROUTES.BUYER_MARKETPLACE)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-2">
            {items.map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                editable
                showAvailable
                onQuantityChange={(qty) => handleQuantityChange(item, qty)}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div>
            <div className="bg-white border border-border rounded-xl p-6 space-y-6">
              <OrderTotals items={items} />

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  to={ROUTES.BUYER_MARKETPLACE}
                  leftIcon={ShoppingBasket}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={ShoppingCart}
                  onClick={() => navigate(ROUTES.BUYER_CHECKOUT)}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  leftIcon={Trash2}
                  onClick={() => setClearDialogOpen(true)}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        onConfirm={handleClear}
        title="Clear cart?"
        description="Are you sure you want to remove all items from your cart?"
        confirmLabel="Clear Cart"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default Cart;
