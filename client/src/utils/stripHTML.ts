const stripHTML = (str: string) => {
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = str;
  return tmpDiv.textContent || tmpDiv.innerText || "";
};

export default stripHTML;
