const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentCountSpan = document.getElementById("comment-count");
const clearAllButton = document.getElementById("clear-all-comments");
const pinModal = document.getElementById("pinModal");
const pinInput = document.getElementById("pinInput");
const confirmPinButton = document.getElementById("confirmPin");
const cancelPinButton = document.getElementById("cancelPin");
const pinError = document.getElementById("pinError");

const CORRECT_PIN = "2580";

// Start with an empty comments array
let comments = JSON.parse(localStorage.getItem("comments")) || [];

function renderComments() {
  commentList.innerHTML = "";
  comments.forEach((comment, index) => {
    const newComment = document.createElement("li");
    newComment.classList.add("comment");
    newComment.innerHTML = `
            <div class="flex gap-4 author">
                <div class="thumb">
                    <img src="../../html.themestransmit.com/html/minfotailwind/assets/img/blog/comment-author.png" class="rounded-full w-14 h-14" alt="${
                      comment.name
                    }">
                </div>
                <div class="flex-1">
                    <h4 class="mb-1 text-lg font-medium text-black dark:text-white">${
                      comment.name
                    }</h4>
                    <p class="text-sm leading-1.875">${comment.date}</p>
                </div>
                ${
                  comment.isNew
                    ? '<div><button class="text-sm font-medium dark:font-light text-black dark:text-white delete-comment" data-comment-index="' +
                      index +
                      '">Delete</button></div>'
                    : ""
                }
            </div>
            <div class="description md:ml-16 md:pl-2">
                <p class="my-4 text-sm md:text-regular leading-1.875">
                    ${comment.message}
                </p>
                <p>
                    <button class="text-sm font-medium dark:font-light text-black dark:text-white" data-twe-collapse-init="" data-twe-target="#reply_form${
                      index + 2
                    }" aria-label="Reply Comment">
                        Reply
                    </button>
                </p>
                <form action="#" method="post" id="reply_form${
                  index + 2
                }" class="mt-2 !visible hidden" data-twe-collapse-item="">
                    <textarea name="replyComment" rows="5" class="w-full h-24 p-4 text-sm bg-transparent border border-platinum dark:border-greyBlack focus:border-theme dark:focus:border-theme rounded-lg outline-none resize-none"></textarea>
                    <div class="space-x-3 button-group text-end">
                        <button type="reset" class="px-4 py-2 text-sm font-light text-black dark:text-white border rounded-md border-platinum dark:border-greyBlack dark:hover:bg-greyBlack" aria-label="Cancel" data-twe-collapse-init="" data-twe-target="#reply_form${
                          index + 2
                        }">Cancel</button>
                        <button type="submit" class="px-4 py-2 text-sm font-light text-white border rounded-md border-theme bg-theme" aria-label="Reply Comment">Reply</button>
                    </div>
                </form>
            </div>
        `;
    commentList.appendChild(newComment);
  });
  commentCountSpan.textContent = comments.length;
}

// Show PIN modal
function showPinModal() {
  pinModal.classList.remove("hidden");
  pinModal.classList.add("flex");
  pinInput.value = "";
  pinError.classList.add("hidden");
}

// Hide PIN modal
function hidePinModal() {
  pinModal.classList.add("hidden");
  pinModal.classList.remove("flex");
  pinInput.value = "";
  pinError.classList.add("hidden");
}

// Clear all comments if PIN is correct
function clearCommentsWithPin() {
  const enteredPin = pinInput.value;
  if (enteredPin === CORRECT_PIN) {
    comments = [];
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
    hidePinModal();
  } else {
    pinError.classList.remove("hidden");
  }
}

// Initial render
renderComments();

// Event Listeners
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = commentForm.querySelector('input[name="name"]');
  const messageInput = commentForm.querySelector('textarea[name="message"]');

  // Remove isNew flag from all existing comments
  comments.forEach((comment) => (comment.isNew = false));

  // Add new comment with isNew flag
  const newComment = {
    name: nameInput.value,
    message: messageInput.value,
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    isNew: true,
  };

  comments.unshift(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));

  renderComments();

  nameInput.value = "";
  messageInput.value = "";
});

commentList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-comment")) {
    const commentIndex = parseInt(event.target.dataset.commentIndex);
    comments.splice(commentIndex, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }
});

// PIN modal event listeners
clearAllButton.addEventListener("click", showPinModal);
cancelPinButton.addEventListener("click", hidePinModal);
confirmPinButton.addEventListener("click", clearCommentsWithPin);

// Handle Enter key in PIN input
pinInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    clearCommentsWithPin();
  }
});

// Close modal when clicking outside
pinModal.addEventListener("click", (event) => {
  if (event.target === pinModal) {
    hidePinModal();
  }
});

// Remove isNew flag when page loads
window.addEventListener("load", () => {
  comments.forEach((comment) => (comment.isNew = false));
  localStorage.setItem("comments", JSON.stringify(comments));
  renderComments();
});
