const customStorage = {
  getItem: (key) => {
    return sessionStorage.getItem(key); // گرفتن داده از sessionStorage
  },

  setItem: (key, value) => {
    sessionStorage.setItem(key, value); // ذخیره کردن داده در sessionStorage
  },

  removeItem: (key) => {
    sessionStorage.removeItem(key); // حذف داده از sessionStorage
  },
};

export { customStorage };
