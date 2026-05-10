const right_arrow = document.getElementById("right_arrow");
const left_arrow = document.getElementById("left_arrow");
const slideer = document.getElementById("slider");
const dot_parent = document.querySelector("#dot_parent");
let count = 0;
let child_index = 0;

function slide(e) {
  if (e.target.id == "right_arrow" && count != -300) {
    count -= 100;
    slideer.style.transform = `translateX(${count}%)`;
    dot_parent.children[child_index].style.opacity = "0.5";
    child_index++;
    dot_parent.children[child_index].style.opacity = "1";
  }
  if (e.target.id == "left_arrow" && count != 0) {
    count += 100;
    slideer.style.transform = `translateX(${count}%)`;
    dot_parent.children[child_index].style.opacity = "0.5";
    child_index--;
    dot_parent.children[child_index].style.opacity = "1";
  }
}

right_arrow.addEventListener("click", slide);
left_arrow.addEventListener("click", slide);
