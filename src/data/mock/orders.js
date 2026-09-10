import { ORDER_STATUS } from "../../constants/app";

const farmer = {
  id: 1,
  name: "John Farmer",
  location: "Iowa, USA",
  rating: 4.5,
};

const buyer = {
  id: 2,
  name: "Jane Buyer",
  avatar: null,
  location: "California, USA",
};

export const mockOrders = [
  {
    id: "ORD-001",
    buyerId: buyer.id,
    buyerName: buyer.name,
    buyerAvatar: buyer.avatar,
    buyerLocation: buyer.location,
    buyer: { ...buyer },
    farmerId: farmer.id,
    farmerName: farmer.name,
    farmerAvatar: farmer.avatar,
    farmerLocation: farmer.location,
    farmer: { ...farmer },
    items: [
      {
        productId: 1,
        productName: "Organic Tomatoes",
        productImage: "https://placehold.co/300x200/166534/FFFFFF?text=Tomatoes",
        quantity: 5,
        unit: "kg",
        unitPrice: 3.5,
        subtotal: 17.5,
      },
    ],
    products: [{ id: 1, title: "Organic Tomatoes", price: 3.5, quantity: 5 }],
    totalAmount: 17.5,
    total: 17.5,
    deliveryLocation: buyer.location,
    deliveryNotes: "",
    status: ORDER_STATUS.COMPLETED,
    createdAt: "2024-03-15T08:00:00Z",
    updatedAt: "2024-03-18T08:00:00Z",
  },
  {
    id: "ORD-003",
    buyerId: buyer.id,
    buyerName: buyer.name,
    buyerAvatar: buyer.avatar,
    buyerLocation: buyer.location,
    buyer: { ...buyer },
    farmerId: farmer.id,
    farmerName: farmer.name,
    farmerAvatar: farmer.avatar,
    farmerLocation: farmer.location,
    farmer: { ...farmer },
    items: [
      {
        productId: 2,
        productName: "Fresh Corn",
        productImage: "https://placehold.co/300x200/166534/FFFFFF?text=Corn",
        quantity: 10,
        unit: "ear",
        unitPrice: 2.0,
        subtotal: 20.0,
      },
    ],
    products: [{ id: 2, title: "Fresh Corn", price: 2.0, quantity: 10 }],
    totalAmount: 20.0,
    total: 20.0,
    deliveryLocation: buyer.location,
    deliveryNotes: "",
    status: ORDER_STATUS.PENDING,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
];

export const mockOrder = mockOrders[0];
