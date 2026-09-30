/* Request an Introduction — private enquiry dialog.
 *
 * Any [data-intro-open] element opens the native <dialog id="introduction">
 * (focus trap, Escape to close and background inertness come from showModal).
 * Focus returns to the opener on close.
 *
 * Submissions are posted to Netlify Forms (form name "introduction"). The
 * destination address lives only in the Netlify dashboard, never in this code.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// International numbers: optional +, digits and common separators, 7–15 digits in total
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

const MESSAGES = {
  required: "Required.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid telephone number, including the country code.",
  select: "Please select the nature of your enquiry.",
};

function validate(field) {
  const value = field.value.trim();
  if (!value) return field.tagName === "SELECT" ? MESSAGES.select : MESSAGES.required;
  if (field.type === "email" && !EMAIL.test(value)) return MESSAGES.email;
  if (field.type === "tel") {
    const digits = value.replace(/\D/g, "").length;
    if (!PHONE_CHARS.test(value) || digits < 7 || digits > 15) return MESSAGES.phone;
  }
  return "";
}

function showError(field, message) {
  const holder = field.closest(".field");
  const slot = holder.querySelector("[data-error]");
  slot.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
  holder.classList.toggle("is-invalid", Boolean(message));
}

export function init() {
  const dialog = document.getElementById("introduction");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const form = dialog.querySelector("form");
  const status = dialog.querySelector("[data-intro-status]");
  const submit = form.querySelector(".intro__submit");
  const submitLabel = submit.querySelector("[data-submit-label]");
  const formView = dialog.querySelector('[data-intro-view="form"]');
  const doneView = dialog.querySelector('[data-intro-view="done"]');
  const fields = [...form.querySelectorAll("[required]")];
  let opener = null;

  function open(trigger) {
    opener = trigger;
    if (!doneView.hidden) reset();
    dialog.showModal();
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => dialog.classList.add("is-open"));
    dialog.querySelector("#intro-name").focus();
  }

  function close() {
    dialog.classList.remove("is-open");
    dialog.close();
  }

  function reset() {
    form.reset();
    fields.forEach((f) => showError(f, ""));
    status.textContent = "";
    formView.hidden = false;
    doneView.hidden = true;
  }

  dialog.addEventListener("close", () => {
    dialog.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    // Return focus to whatever opened the dialog
    if (opener && document.contains(opener)) opener.focus();
  });

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-intro-open]");
    if (trigger) {
      e.preventDefault();
      // Close the mobile menu first if the trigger lives there
      document.querySelector("[data-menu-toggle][aria-expanded='true']")?.click();
      open(trigger);
      return;
    }
    if (e.target.closest("[data-intro-close]")) close();
  });

  // Click on the backdrop (outside the panel) closes the dialog
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });

  // Inline validation: after a field is left, and live once it has shown an error
  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.value.trim() || field.dataset.touched) showError(field, validate(field));
      field.dataset.touched = "1";
    });
    const live = () => {
      if (field.getAttribute("aria-invalid") === "true") showError(field, validate(field));
    };
    field.addEventListener("input", live);
    field.addEventListener("change", live);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";

    let firstInvalid = null;
    fields.forEach((field) => {
      const message = validate(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = "Please complete every field before submitting.";
      firstInvalid.focus();
      return;
    }

    form.elements.Submitted.value = new Date().toISOString();
    submit.disabled = true;
    submitLabel.textContent = "Submitting…";

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      formView.hidden = true;
      doneView.hidden = false;
      doneView.focus();
    } catch (err) {
      status.textContent =
        "Your request could not be submitted. Please check your connection and try again.";
    } finally {
      submit.disabled = false;
      submitLabel.textContent = "Submit for consideration";
    }
  });
}
