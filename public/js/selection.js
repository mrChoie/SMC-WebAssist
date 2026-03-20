const buildingCategory = document.getElementById("buildingCategory");
const inquiryCategory = document.getElementById("inquiryCategory");
const chevronDown = document.getElementById("chevron_down");

const buildingSelections = [
  {
    buttonId: "engiBtn",
    categoryId: "engineeringCategory",
    closeButtonId: "closeBtn1",
    buildingCode: "b1",
  },
  {
    buttonId: "collBtn",
    categoryId: "collegeCategory",
    closeButtonId: "closeBtn2",
    buildingCode: "b2",
  },
  {
    buttonId: "mainBtn",
    categoryId: "smcmainCategory",
    closeButtonId: "closeBtn3",
    buildingCode: "b3",
  },
  {
    buttonId: "annexBtn",
    categoryId: "annexCategory",
    closeButtonId: "closeBtn4",
    buildingCode: "b4",
  },
];

const inquirySelections = Array.from({ length: 8 }, (_, index) => ({
  buttonId: `selectBtn${index + 1}`,
  category: String(index + 1),
}));

function toggleDisplay(element, classToShow, classToHide, shouldShow) {
  if (!element) {
    return;
  }

  element.classList.toggle(classToShow, shouldShow);
  element.classList.toggle(classToHide, !shouldShow);
}

function showInquirySection() {
  toggleDisplay(buildingCategory, "d-flex", "d-none", false);
  toggleDisplay(inquiryCategory, "d-block", "d-none", true);
  toggleDisplay(chevronDown, "d-block", "d-none", true);
}

function hideInquirySection() {
  toggleDisplay(buildingCategory, "d-flex", "d-none", true);
  toggleDisplay(inquiryCategory, "d-block", "d-none", false);
  toggleDisplay(chevronDown, "d-block", "d-none", false);
}

function showSelectedBuilding(categoryElement, buildingCode) {
  addBuildParam(buildingCode);
  showInquirySection();
  toggleDisplay(categoryElement, "d-flex", "d-none", true);
}

function resetSelectedBuilding(categoryElement) {
  hideInquirySection();
  toggleDisplay(categoryElement, "d-flex", "d-none", false);
}

function addBuildParam(buildingCode) {
  const url = new URL(window.location);
  url.searchParams.set("building", buildingCode);
  window.history.pushState({}, "", url);
}

function redirectToTicketForm(category) {
  const params = new URLSearchParams(window.location.search);
  const buildingCode = params.get("building");
  const url = new URL("/smc-webassist/ticket-form", window.location.origin);

  url.searchParams.set("building", buildingCode);
  url.searchParams.set("category", category);

  window.location.href = url.toString();
}

buildingSelections.forEach(
  ({ buttonId, categoryId, closeButtonId, buildingCode }) => {
    const button = document.getElementById(buttonId);
    const categoryElement = document.getElementById(categoryId);
    const closeButton = document.getElementById(closeButtonId);

    button?.addEventListener("click", () => {
      showSelectedBuilding(categoryElement, buildingCode);
    });

    closeButton?.addEventListener("click", () => {
      resetSelectedBuilding(categoryElement);
    });
  }
);

inquirySelections.forEach(({ buttonId, category }) => {
  const button = document.getElementById(buttonId);

  button?.addEventListener("click", () => {
    redirectToTicketForm(category);
  });
});
