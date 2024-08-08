// navbar icon function
export const handleMenuToggle = () => {
  const navMenu = document.getElementById("navMenu");
  if (navMenu.classList.contains("hidden")) {
    navMenu.classList.remove("hidden");
  } else {
    navMenu.classList.add("hidden");
  }
};

export const handleDropdownToggle = () => {
  const button = document.getElementById("dropdownButton");
  const menu = document.getElementById("dropdownMenu");

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside of it
  window.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.add("hidden");
    }
  });
};
