const right_arrow = document.getElementById("right_arrow");
const left_arrow = document.getElementById("left_arrow");
const slideer = document.getElementById("slider");
let count = 0;

function slide(e) {
  if (e.target.id == "right_arrow" && count != -300) {
    count -= 100;
    slideer.style.transform = `translateX(${count}%)`;
  }
  if (e.target.id == "left_arrow" && count != 0) {
    count += 100;
    slideer.style.transform = `translateX(${count}%)`;
  }
}

right_arrow.addEventListener("click", slide);
left_arrow.addEventListener("click", slide);
