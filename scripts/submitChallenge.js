document.getElementById("submit").addEventListener("click", submitChallenge);

function submitChallenge() {
  let answers = {};
  document.querySelectorAll("input[type='radio']").forEach((r) => {
    if (r.checked) {
      answers[r.name] = r.value;
    }
  });

  let requestParams = {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(answers),
  };
  fetch("http://httpbin.org/post", requestParams)
    .then(hideForm)
    .catch((error) => alert("Error submitting form: %s", error));
}

function hideForm() {
  document.getElementById("challenge").style.display = "none";
  document.getElementById("success").style.display = "block";
}
