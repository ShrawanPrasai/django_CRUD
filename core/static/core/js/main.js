// Django CRUD Project - Enhanced JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });
  }

  // Auto-hide messages with animation
  const messages = document.querySelectorAll(".message");
  messages.forEach((message, index) => {
    setTimeout(
      () => {
        message.style.opacity = "0";
        message.style.transform = "translateX(100px)";
        setTimeout(() => {
          message.remove();
        }, 300);
      },
      5000 + index * 500,
    ); // Stagger the removal
  });

  // Enhanced form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "var(--danger-color)";
          field.style.boxShadow = "0 0 0 3px rgba(235, 51, 73, 0.1)";

          // Shake animation
          field.style.animation = "shake 0.5s";
          setTimeout(() => {
            field.style.animation = "";
          }, 500);

          // Remove error after 3 seconds
          setTimeout(() => {
            field.style.borderColor = "";
            field.style.boxShadow = "";
          }, 3000);
        }
      });

      if (!isValid) {
        e.preventDefault();
        showMessage("Please fill in all required fields.", "error");

        // Scroll to first error
        const firstError = form.querySelector("[required]:not(:valid)");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          firstError.focus();
        }
      }
    });
  });

  // Enhanced search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = this.value.trim();
        if (query.length > 2) {
          // Add loading state
          this.style.borderColor = "var(--warning-color)";
        }
      }, 500);
    });

    searchInput.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)";
    });

    searchInput.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
    });
  }

  // Table row hover effects with preview
  const tableRows = document.querySelectorAll("tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
      this.style.boxShadow = "var(--shadow-md)";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "";
    });
  });

  // Button loading states
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.tagName === "BUTTON" && !this.classList.contains("btn-danger")) {
        const originalText = this.innerHTML;
        this.innerHTML = "⏳ Loading...";
        this.disabled = true;

        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
        }, 2000);
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.querySelector(".search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Escape to close mobile menu
    if (e.key === "Escape") {
      const navMenu = document.querySelector(".nav-menu");
      const navToggle = document.querySelector(".nav-toggle");
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    }
  });

  // Add search hint
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    const hint = document.createElement("small");
    hint.style.cssText =
      "color: var(--light-text); margin-top: 0.5rem; display: block; font-size: 0.875rem;";
    hint.innerHTML = "💡 Tip: Press <kbd>Ctrl+K</kbd> to quickly focus search";
    searchForm.appendChild(hint);
  }

  // Initialize tooltips
  const elementsWithTitles = document.querySelectorAll("[title]");
  elementsWithTitles.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = this.getAttribute("title");
      tooltip.style.cssText = `
                position: absolute;
                background: var(--dark-text);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
            `;
      this.style.position = "relative";
      this.appendChild(tooltip);
    });

    element.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".tooltip");
      if (tooltip) {
        tooltip.remove();
      }
    });
  });

  // Add page load animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  window.addEventListener("load", function () {
    document.body.style.opacity = "1";
  });
});

// Utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function showMessage(message, type = "success") {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type} message-slide-in`;
  messageDiv.innerHTML = `
        <div class="message-icon">
            ${type === "success" ? "✅" : ""}
            ${type === "error" ? "❌" : ""}
            ${type === "warning" ? "⚠️" : ""}
            ${type === "info" ? "ℹ️" : ""}
        </div>
        <div class="message-content">${message}</div>
        <button class="message-close" onclick="this.parentElement.remove()">×</button>
    `;

  const messagesContainer =
    document.querySelector(".messages-container") ||
    document.querySelector(".content-wrapper");
  if (messagesContainer) {
    messagesContainer.insertBefore(messageDiv, messagesContainer.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = "0";
      messageDiv.style.transform = "translateX(100px)";
      setTimeout(() => {
        messageDiv.remove();
      }, 300);
    }, 5000);
  }
}

function ajaxRequest(url, method = "GET", data = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Add CSS animation for shake effect
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    kbd {
        background: var(--light-bg);
        border: 1px solid var(--border-color);
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 0.8em;
        font-family: monospace;
    }
`;
document.head.appendChild(style);
