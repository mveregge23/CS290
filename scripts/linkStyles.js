document.querySelectorAll("a").forEach((a) => {
  if (window.location.href.indexOf(a.href) > -1) {
    a.style.color = "#8b0000";
    a.style.textDecoration = "underline solid #8b0000";
  }
});
