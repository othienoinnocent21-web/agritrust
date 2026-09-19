export const calculateItemSubtotal = (unitPrice, quantity) =>
  Number(unitPrice || 0) * Number(quantity || 0);

export const calculateOrderTotal = (items = []) =>
  items.reduce(
    (sum, item) => sum + calculateItemSubtotal(item.unitPrice, item.quantity),
    0
  );

export const calculateTotalQuantity = (items = []) =>
  items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
