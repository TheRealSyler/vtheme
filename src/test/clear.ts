export const clearTheme = () => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  localStorage.clear();
};
