export const validateEmail = (email) => {
  if (!email) return { valid: false, message: "Email is required" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  return { valid: true, message: "" };
};

export const validatePassword = (password) => {
  if (!password) return { valid: false, message: "Password is required" };
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  return { valid: true, message: "" };
};

export const validatePhoneNumber = (phone) => {
  if (!phone) return { valid: false, message: "Phone number is required" };
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: "Please enter a valid phone number" };
  }
  return { valid: true, message: "" };
};

export const validateRequired = (value, fieldName = "This field") => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true, message: "" };
};

export const validatePrice = (price) => {
  if (!price && price !== 0) return { valid: false, message: "Price is required" };
  const num = Number(price);
  if (isNaN(num) || num <= 0) {
    return { valid: false, message: "Please enter a valid price" };
  }
  return { valid: true, message: "" };
};

export const validateQuantity = (quantity) => {
  if (!quantity && quantity !== 0) return { valid: false, message: "Quantity is required" };
  const num = Number(quantity);
  if (isNaN(num) || num < 0) {
    return { valid: false, message: "Please enter a valid quantity" };
  }
  return { valid: true, message: "" };
};
