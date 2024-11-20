function initPinInput() {
  const pinInput = document.getElementById("pinInput");
  const pinDisplay = document.getElementById("pin-display");
  const confirmButton = document.getElementById("confirmPin");
  const digits = pinDisplay.children;
  let previousLength = 0;

  // Focus the hidden input when the modal opens
  pinModal.addEventListener("shown.bs.modal", () => {
    pinInput.focus();
  });

  // Keep focus on the hidden input
  document.addEventListener("click", () => {
    pinInput.focus();
  });

  // Handle input changes
  pinInput.addEventListener("input", (e) => {
    const value = e.target.value;

    // Show all entered digits in black color
    for (let i = 0; i < 4; i++) {
      if (i < value.length) {
        // Show the actual digit in black
        digits[i].textContent = value[i];
        digits[i].style.color = "black";
      } else {
        // Show dots for empty positions
        digits[i].textContent = "•";
        digits[i].style.color = ""; // Reset to default color
      }
    }

    previousLength = value.length;
  });

  // Clear the display when the modal is closed
  function clearPinDisplay() {
    pinInput.value = "";
    for (let digit of digits) {
      digit.textContent = "•";
      digit.style.color = ""; // Reset to default color
    }
    previousLength = 0;
  }

  // Add event listeners for modal closing and confirm button
  document
    .getElementById("cancelPin")
    .addEventListener("click", clearPinDisplay);
  confirmButton.addEventListener("click", clearPinDisplay); // Added confirm button reset
  pinModal.addEventListener("click", (event) => {
    if (event.target === pinModal) {
      clearPinDisplay();
    }
  });
}

// Initialize the PIN input functionality when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  initPinInput();
});
