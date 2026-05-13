const right_arrow = document.getElementById("right_arrow");
const left_arrow = document.getElementById("left_arrow");
const slideer = document.getElementById("slider");
const dot_parent = document.querySelector("#dot_parent");
let count = 0;
let child_index = 0;

function update_dot(n) {
  for (let dot of dot_parent.children) {
    dot.classList.remove("opacity-100");
    dot.classList.add("opacity-50");
  }
  dot_parent.children[n].classList.add("opacity-100");
  dot_parent.children[n].classList.remove("opacity-50");
}

function slide(e) {
  if (e.target.id == "right_arrow" && count != -300) {
    count -= 100;
    slideer.style.transform = `translateX(${count}%)`;
    child_index++;
    update_dot(child_index);
  }
  if (e.target.id == "left_arrow" && count != 0) {
    count += 100;
    slideer.style.transform = `translateX(${count}%)`;
    child_index--;
    update_dot(child_index);
  }
}

function auto_slide() {
  slideer.style.transform = `translateX(${count}%)`;
  update_dot(child_index);
  count -= 100;
  child_index++;
  if (count == -400) {
    count = 0;
  }
  if (child_index == 4) {
    child_index = 0;
  }
}

setInterval(auto_slide, 3000);

right_arrow.addEventListener("click", slide);
left_arrow.addEventListener("click", slide);
