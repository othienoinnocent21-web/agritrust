import { ORDER_STATUS } from "../constants/app";
import {
  calculateItemSubtotal,
  calculateOrderTotal,
} from "./orderCalculations";
import { generateId } from "./helpers";

export const groupCartByFarmer = (cartItems) => {
  const groups = {};
  cartItems.forEach((item) => {
    const key = String(item.farmerId ?? "unknown");
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
};

export const buildOrderPayload = (groupItems, buyer, delivery) => {
  const first = groupItems[0];
  const buyerLocation = buyer.location || delivery.deliveryLocation;
  const items = groupItems.map((i) => ({
    productId: i.productId,
    productName: i.productName,
    productImage: i.productImage,
    quantity: i.quantity,
    unit: i.unit,
    unitPrice: i.unitPrice,
    subtotal: calculateItemSubtotal(i.unitPrice, i.quantity),
  }));

  const totalAmount = Number(calculateOrderTotal(items).toFixed(2));

  const farmer = {
    id: first.farmerId,
    name: first.farmerName,
    avatar: first.farmerAvatar || null,
    location: first.farmerLocation || "",
  };

  const buyerObj = {
    id: buyer.id,
    name: buyer.name,
    avatar: buyer.avatar || null,
    location: buyerLocation,
  };

  return {
    id: `ORD-${generateId()}`,
    buyerId: buyer.id,
    buyerName: buyer.name,
    buyerAvatar: buyer.avatar || null,
    buyerLocation,
    buyer: buyerObj,
    farmerId: first.farmerId,
    farmerName: first.farmerName,
    farmerAvatar: first.farmerAvatar || null,
    farmerLocation: first.farmerLocation || "",
    farmer: farmer,
    items,
    products: items.map((it) => ({
      id: it.productId,
      title: it.productName,
      price: it.unitPrice,
      quantity: it.quantity,
    })),
    totalAmount,
    total: totalAmount,
    deliveryLocation: delivery.deliveryLocation,
    deliveryNotes: delivery.deliveryNotes || "",
    status: ORDER_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const buildOrdersFromCart = (cartItems, buyer, delivery) => {
  const groups = groupCartByFarmer(cartItems);
  return Object.values(groups).map((items) =>
    buildOrderPayload(items, buyer, delivery)
  );
};
