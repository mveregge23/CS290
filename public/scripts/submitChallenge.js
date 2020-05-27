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
  fetch("/challenge", requestParams)
    .then((response) => {
      response.json().then((json) => {
        hideForm(json.passed);
      });
    })
    .catch((error) => alert("Error submitting form: %s", error));
}

function hideForm(passed) {
  document.getElementById("challenge").style.display = "none";
  document.getElementById("challengeBlurb").style.display = "none";
  if (passed) document.getElementById("success").style.display = "block";
  else document.getElementById("failure").style.display = "block";
}
