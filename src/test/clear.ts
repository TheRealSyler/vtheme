export const clearTheme = (storage = true) => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  if (storage) {
    localStorage.clear();
  }
};
