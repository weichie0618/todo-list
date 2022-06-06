let btn = document.querySelector("form button");
let sec = document.querySelector("section");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "") {
    return alert("請輸入內容");
  }

  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDate;

  todo.appendChild(text);
  todo.appendChild(time);

  let check = document.createElement("button");
  check.classList.add("check");
  check.innerHTML = '<i class="fa-solid fa-check"></i>';
  check.addEventListener("click", (e) => {
    let v = e.target.parentElement;
    v.classList.toggle("done");
  });

  let trash = document.createElement("button");
  trash.classList.add("trash");
  trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  trash.addEventListener("click", (e) => {
    let re = e.target.parentElement;
    let rm = re.children[0].innerText;
    let myListArray = JSON.parse(localStorage.getItem("list"));
    myListArray.forEach((e, index) => {
      if (e.todoText == rm) {
        myListArray.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(myListArray));
      }
    });
    re.addEventListener("animationend", () => {
      console.log(re);
      re.remove();
    });
    re.style.animation = "smail 0.3s forwards";
  });

  todo.appendChild(check);
  todo.appendChild(trash);
  todo.style.animation = "scale 0.3s forwards";

  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };
  console.log(myTodo);
  let mylist = localStorage.getItem("list");
  if (mylist == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(mylist);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  sec.appendChild(todo);
  form[0].value = "";
  form[1].value = "";
  form[2].value = "";
});

loadDate();
function loadDate() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((e) => {
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = e.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerHTML = e.todoMonth + "/" + e.todoDate;

      let check = document.createElement("button");
      check.classList.add("check");
      check.innerHTML = '<i class="fa-solid fa-check"></i>';
      check.addEventListener("click", (e) => {
        let li = e.target.parentElement;
        li.classList.toggle("done");
      });

      let trash = document.createElement("button");
      trash.classList.add("trash");
      trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      trash.addEventListener("click", (e) => {
        let re = e.target.parentElement;

        let rm = re.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((e, index) => {
          if (e.todoText == rm) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
        re.addEventListener("animationend", () => {
          re.remove();
        });
        re.style.animation = "smail 0.3s forwards";
      });
      todo.appendChild(text);
      todo.appendChild(time);
      todo.appendChild(check);
      todo.appendChild(trash);

      sec.appendChild(todo);
    });
    console.log(myListArray);
  }
}
function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}
let sort = document.querySelector("div.sort button");
sort.addEventListener("click", () => {
  let myListArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(myListArray));

  let sect = sec.children.length;

  for (let i = 0; i < sect; i++) {
    sec.children[0].remove();
  }

  loadDate();
});
