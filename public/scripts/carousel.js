function Carousel() {
  this.carousel = document.querySelector(".carousel");
  this.index = 0;
  this.rotate = 0;
  this.updateRotate = function (direction) {
    if (this.rotate === 0 && direction === 1) {
      this.rotate = 288;
    } else if ((this.rotate === 288) & (direction === -1)) {
      this.rotate = 0;
    } else {
      this.rotate += -direction * 72;
    }
  };
}

let c = new Carousel();

function moveCarousel(c, direction) {
  c.index += direction;
  c.carousel.style.transform =
    "translateZ(-145px) rotateY(" + c.index * 72 + "deg)";
  c.updateRotate(direction);
  document.querySelectorAll(".cell").forEach((cell, i) => {
    console.log(`cell ${i} c.rotate ${c.rotate}`);
    let deg = cell.style.transform.split("deg")[0].split("(")[1];
    if ((c.rotate === 0 && deg == 0) || c.rotate / deg === 1) {
      cell.style.opacity = 1;
    } else {
      cell.style.opacity = 0.5;
    }
  });
}

let timer = setInterval(() => {
  moveCarousel(c, -1);
}, 5000);

function forceCarousel(e) {
  clearInterval(timer);
  timer = setInterval(
    () => {
      moveCarousel(c, -1);
    },
    5000,
    "right"
  );

  let direction = e.target.id === "right" ? -1 : 1;
  moveCarousel(c, direction);
}

document
  .querySelectorAll(".arrow")
  .forEach((arrow) =>
    arrow.children[0].addEventListener("click", forceCarousel)
  );

document.querySelectorAll(".cell").forEach((cell, i) => {
  if (i !== 0) cell.style.opacity = 0.5;
});
