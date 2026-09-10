export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const groupBy = (array, key) => {
  if (!array || !key) return {};
  return array.reduce((groups, item) => {
    const groupKey = typeof key === "function" ? key(item) : item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

export const sortBy = (array, key, order = "asc") => {
  if (!array || !key) return array || [];
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const filterAndSort = (array, filters, sortKey, sortOrder) => {
  let result = array || [];
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value !== undefined && value !== null && value !== "") {
      result = result.filter((item) => item[key] === value);
    }
  });
  if (sortKey) {
    result = sortBy(result, sortKey, sortOrder);
  }
  return result;
};

export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
