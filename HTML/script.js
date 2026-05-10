const right_arrow = document.getElementById("right_arrow");
const slideer = document.getElementById("slider");
let count = 0;

function slide() {
  if (count > -300) {
    count -= 100;
    slideer.style.transform = `translateX(${count}%)`;
  }
}

right_arrow.addEventListener("click", slide);
