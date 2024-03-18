const setItem = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export { setItem, getItem, removeItem };
