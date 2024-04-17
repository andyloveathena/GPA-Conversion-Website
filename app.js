let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();
// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象動畫結束後的狀態
// parameter5 ex: -=1 等於提早1秒執行的意思
time_line.fromTo(
  hero,
  1,
  { height: "0%" },
  { height: "100%", ease: Power2.easeInOut }
);
time_line.fromTo(
  hero,
  1,
  { width: "80%" },
  { width: "100%", ease: Power2.easeInOut }
);
time_line.fromTo(
  slider,
  1,
  { x: "-100%" },
  { x: "0%", ease: Power2.easeInOut },
  "-=1.2"
);
time_line.fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

window.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    e.preventDefault();
  }
});

let allButtons = document.querySelectorAll("button");

allButtons.forEach((each) => {
  each.addEventListener("click", (c) => {
    c.preventDefault();
  });
});

let check = document.querySelectorAll("select");
let credits = document.querySelectorAll(".class-credit");

check.forEach((ech) => {
  ech.addEventListener("change", () => {
    setGpa();
    colorChange(ech);
    //e.target==<select>
    //想得到select裡面value的值只需要select.value即可
  });
});

credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGpa();
  });
});
//點擊刪除按鈕以後會發生的事
let tshbtn = document.querySelectorAll(".trash-button");
tshbtn.forEach((tsh) => {
  tsh.addEventListener("click", () => {
    tsh.parentElement.parentElement.classList.add("remove");
  });
});
tshbtn.forEach((tsh) => {
  let form = tsh.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGpa();
  });
});

function colorChange(vocabulary) {
  if (vocabulary.value == "A" || vocabulary.value == "A-") {
    //select裡面的value
    vocabulary.style.backgroundColor = "lightgreen";
  }
  if (
    vocabulary.value == "B+" ||
    vocabulary.value == "B" ||
    vocabulary.value == "B-"
  ) {
    //select裡面的value
    vocabulary.style.backgroundColor = "yellow";
  }
  if (
    vocabulary.value == "C+" ||
    vocabulary.value == "C" ||
    vocabulary.value == "C-"
  ) {
    //select裡面的value
    vocabulary.style.backgroundColor = "orange";
  }
  if (
    vocabulary.value == "D+" ||
    vocabulary.value == "D" ||
    vocabulary.value == "D-"
  ) {
    //select裡面的value
    vocabulary.style.backgroundColor = "red";
  }
  if (vocabulary.value == "F") {
    //select裡面的value
    vocabulary.style.backgroundColor = "grey";
  }
}
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}
function setGpa() {
  let credits = document.querySelectorAll(".class-credit");
  let creditsSum = 0; //GPA計算用分母
  let selects = document.querySelectorAll("select");
  let sum = 0; //GPA計算用分子
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      //如果不是nan執行以下代碼

      creditsSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < selects.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      //如果不是nan執行以下代碼
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }
  let result;
  if (sum == 0) {
    result = 0;
  } else {
    result = (sum / creditsSum).toFixed(2); //小數點後第2位
  }
  document.getElementById("result-gpa").innerText = result;
}

let plusbtn = document.querySelector(".plus-btn");
plusbtn.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grade"); //加入class至div

  //製作新的表格input
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type"); //加入class至input

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number"); //加入class至input

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit"); //加入class至input
  newInput3.addEventListener("change", () => {
    setGpa();
  });
  //製作select option ex:A,A-,B+,B,B-
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  newSelect.addEventListener("change", (e) => {
    setGpa();
    colorChange(e.target);
    //e.target==<select>
    //想得到select裡面value的值只需要select.value即可
  });

  //value = " "
  let option1 = document.createElement("option");
  option1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  option1.appendChild(textNode1);
  //value="A"
  let option2 = document.createElement("option");
  option2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  option2.appendChild(textNode2);
  //value="A-"
  let option3 = document.createElement("option");
  option3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  option3.appendChild(textNode3);
  //value="B+"
  let option4 = document.createElement("option");
  option4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  option4.appendChild(textNode4);
  //value="B"
  let option5 = document.createElement("option");
  option5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  option5.appendChild(textNode5);
  //value="B-"
  let option6 = document.createElement("option");
  option6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  option6.appendChild(textNode6);
  //value="C+"
  let option7 = document.createElement("option");
  option7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  option7.appendChild(textNode7);
  //value="C"
  let option8 = document.createElement("option");
  option8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  option8.appendChild(textNode8);
  //value="C-"
  let option9 = document.createElement("option");
  option9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  option9.appendChild(textNode9);
  //value="D+"
  let option10 = document.createElement("option");
  option10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  option10.appendChild(textNode10);
  //value="D"
  let option11 = document.createElement("option");
  option11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  option11.appendChild(textNode11);
  //value="D-"
  let option12 = document.createElement("option");
  option12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  option12.appendChild(textNode12);
  //value="F"
  let option13 = document.createElement("option");
  option13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  option13.appendChild(textNode13);
  //開始部署讓option附加到select
  newSelect.appendChild(option1);
  newSelect.appendChild(option2);
  newSelect.appendChild(option3);
  newSelect.appendChild(option4);
  newSelect.appendChild(option5);
  newSelect.appendChild(option6);
  newSelect.appendChild(option7);
  newSelect.appendChild(option8);
  newSelect.appendChild(option9);
  newSelect.appendChild(option10);
  newSelect.appendChild(option11);
  newSelect.appendChild(option12);
  newSelect.appendChild(option13);
  //開始製作Trash-button
  let trhButton = document.createElement("button");
  trhButton.classList.add("trash-button");
  let trh = document.createElement("i"); //trh垃圾桶圖案
  trh.classList.add("fas");
  trh.classList.add("fa-trash");
  trhButton.appendChild(trh);
  //按了按鈕會消除一整行,但只是隱形空間還是會占用

  trhButton.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove"); //增加remove這個class功能
    e.preventDefault();
  });
  //當form裡面的transition結束後消除一整行連同空間一起
  newForm.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGpa();
  });

  //開始部署讓input附加到div
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  //讓select.select裡面的資料
  //附加到div.grade 裡面的資料ex:A,A-,B+
  newDiv.appendChild(newSelect);
  newDiv.appendChild(trhButton);
  newForm.appendChild(newDiv);
  newForm.style.animation = "scaleUp 0.5s ease forwards"; //增加動畫功能至form使其慢慢放大
  document.querySelector(".all-inputes").appendChild(newForm);
});
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");

btn1.addEventListener("click", () => {
  handleSorting("descending"); //大到小descending
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); //小到大ascending
});

function handleSorting(direction) {
  let gr = document.querySelectorAll("div.grade"); //靜態node list接下來任何改變都需要重新呼叫
  let object_array = [];
  for (let i = 0; i < gr.length; i++) {
    let class_name = gr[i].children[0].value; //class category
    let class_number = gr[i].children[1].value; //class number
    let class_credit = gr[i].children[2].value; //class credit
    let class_grade = gr[i].children[3].value; //class grade

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      object_array.push(class_object);
    }
  }

  for (let i = 0; i < object_array.length; i++) {
    object_array[i].class_grade_number = convertor(object_array[i].class_grade);
  }

  object_array = mergeSort(object_array); //從這裡開始object_array使用mergeSort以後看ABCD由小排到大
  if (direction == "descending") {
    object_array = object_array.reverse();
  }
  let allInputes = document.querySelector(".all-inputes");
  allInputes.innerHTML = "";
  for (let i = 0; i < object_array.length; i++) {
    allInputes.innerHTML += `<form>
    <div class="grade">
      <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value=${object_array[i].class_name}
      /><!--
      --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${object_array[i].class_number}
      /><!--
      --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${object_array[i].class_credit}
      /><!--
      --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
      </select><!--
      --><button class="trash-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </form>`;
  }
  //select只能用js更改
  gr = document.querySelectorAll("div.grade"); //靜態node list接下來任何改變都需要重新呼叫
  for (let i = 0; i < object_array.length; i++) {
    gr[i].children[3].value = object_array[i].class_grade;
  }

  //使select 增加監聽器使其改變時變換顏色並且隨時更改其gpa值
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((ech) => {
    colorChange(ech);
    ech.addEventListener("change", (e) => {
      setGpa();
      colorChange(e.target);
    });
  });
  let allCredit = document.querySelectorAll(".class-credit");
  allCredit.forEach((each) => {
    each.addEventListener("change", () => {
      setGpa();
    });
  });
  let tshbtn = document.querySelectorAll(".trash-button");
  tshbtn.forEach((tsh) => {
    tsh.addEventListener("click", (e) => {
      tsh.parentElement.parentElement.classList.add("remove");
      e.preventDefault();
    });
  });
  tshbtn.forEach((tsh) => {
    let form = tsh.parentElement.parentElement;
    form.addEventListener("transitionend", (e) => {
      e.target.remove();
      setGpa();
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
//假如arr代入[4, 2, 7, 1]
//left = merge(left_left, left_right) = [2, 4].
//right = merge(right_left, right_right) = [1, 7].
//merge([2, 4], [1, 7]) = [1, 2, 4, 7].
