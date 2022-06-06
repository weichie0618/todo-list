let form_btn = document.querySelector("form button");
let sec = document.querySelector("section");
form_btn.addEventListener("click", (e) => {
  e.preventDefault();

  let todo = e.target.parentElement,
    todoText = todo.children[0].value,
    todoMonth = todo.children[1].value,
    todoDate = todo.children[2].value;

  let list = document.createElement("div");
  list.classList.add("list");
  list.style.animation = "scale 0.3s forwards";
  let list_t = document.createElement("p");
  list_t.classList.add("list-t");
  list_t.innerText = todoText;
  let list_d = document.createElement("p");
  list_d.classList.add("list-d");
  list_d.innerText = todoMonth + "/" + todoDate;
  list.appendChild(list_t);
  list.appendChild(list_d);

  let check = document.createElement("button");
  check.classList.add("check");
  check.innerHTML = '<i class="fa-solid fa-calendar-check"></i>';
  list.appendChild(check);
  check.addEventListener("click", (e) => {
    let li = e.target.parentElement;
    li.classList.toggle("done");
    li.style.animation = "scale 0.3s forwards";
  });

  let trash = document.createElement("button");
  trash.classList.add("trash");
  trash.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  list.appendChild(trash);
  trash.addEventListener("click", (e) => {
    let re = e.target.parentElement;

    let rm = re.children[0].innerText;
    let array = JSON.parse(localStorage.getItem("list"));
    let int = 1;
    array.forEach((e, index) => {
      if (int > 1) {
        return;
      } else if (e.todoText == rm) {
        array.splice(index, 1);
        console.log(array);
        int++;
        localStorage.setItem("list", JSON.stringify(array));
      }
    });
    re.addEventListener("animationend", () => {
      re.remove();
    });
    re.style.animation = "small 0.3s forwards";
  });

  let myListArray = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };
  let lis = localStorage.getItem("list");
  if (lis == null) {
    localStorage.setItem("list", JSON.stringify(myListArray));
  } else {
    let todo = JSON.parse(lis);
    todo.push(myListArray);
    localStorage.setItem("list", JSON.stringify(todo));
  }

  sec.appendChild(list);

  console.log(todoText, todoMonth, todoDate);
});

let local = localStorage.getItem("list");
if (local != null) {
  let myList = JSON.parse(local);
  myList.forEach((e) => {
    let list = document.createElement("div");
    list.classList.add("list");
    list.style.animation = "scale 0.3s forwards";
    let list_t = document.createElement("p");
    list_t.classList.add("list-t");
    list_t.innerText = e.todoText;
    let list_d = document.createElement("p");
    list_d.classList.add("list-d");
    list_d.innerText = e.todoMonth + "/" + e.todoDate;
    list.appendChild(list_t);
    list.appendChild(list_d);

    let check = document.createElement("button");
    check.classList.add("check");
    check.innerHTML = '<i class="fa-solid fa-calendar-check"></i>';
    list.appendChild(check);
    check.addEventListener("click", (e) => {
      let v = e.target.parentElement;
      v.classList.toggle("done");
    });
    let trash = document.createElement("button");
    trash.classList.add("trash");
    trash.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    list.appendChild(trash);
    trash.addEventListener("click", (e) => {
      let re = e.target.parentElement;

      let rm = re.children[0].innerText;
      let mylist = localStorage.getItem("list");
      let array = JSON.parse(mylist);
      let int = 1;
      array.forEach((e, index) => {
        if (int > 1) {
          return;
        } else if (e.todoText == rm) {
          array.splice(index, 1);
          console.log(array);
          int++;
          localStorage.setItem("list", JSON.stringify(array));
        }
      });
      re.addEventListener("animationend", () => {
        re.remove();
      });
      re.style.animation = "small 0.3s forwards";
    });
    list.appendChild(trash);
    sec.appendChild(list);
  });
}
