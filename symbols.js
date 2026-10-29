// SVG icon symbols. Injected into the page so <use href="#i-name"> works everywhere (including file://).
document.body.insertAdjacentHTML("afterbegin", `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="i-arrow" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </symbol>
  <symbol id="i-search" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </symbol>
  <symbol id="i-bag" viewBox="0 0 24 24">
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </symbol>
  <symbol id="i-menu" viewBox="0 0 24 24">
    <path d="M4 8h16M4 16h16" />
  </symbol>
  <symbol id="i-close" viewBox="0 0 24 24">
    <path d="M6 6l12 12M18 6L6 18" />
  </symbol>
  <symbol id="i-plus" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" />
  </symbol>
  <symbol id="i-check" viewBox="0 0 24 24">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </symbol>
</svg>`);
