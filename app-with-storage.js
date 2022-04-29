// عناصر استفاده شده
const newItemInput = document.querySelector(".new-item > input");
const addItemBtn = document.querySelector(".new-item > button");
const itemsList = document.querySelector(".items");

// اجرای مقدار دهی اولیه
initFromStorage(itemsList);

// افزودن آیتم جدید
addItemBtn.addEventListener("click", () => {
  const value = getValidValue(newItemInput);
  if (value) {
    const item = makeNewItem(itemsList, value);
    itemsList.appendChild(item);
    updateStorage(itemsList);
    newItemInput.value = "";
  }
});

// تعریف توابع

// متن آیتم
function setItemText(item, text) {
  const span = item.querySelector("span");
  span.textContent = text;
}

// قابلیت حذف آیتم
function setItemDelete(item, list) {
  const delBtn = item.querySelector("button");
  delBtn.addEventListener("click", () => {
    item.remove();
    updateStorage(list);
  });
}

// قابلیت تیک زدن آیتم
function setItemCheck(item, isChecked, list) {
  const checkInput = item.querySelector("input");
  checkInput.checked = isChecked;
  updateItemClass(item, checkInput);
  checkInput.addEventListener("change", () => {
    updateItemClass(item, checkInput);
    updateStorage(list);
  });
}
function updateItemClass(item, checkInput) {
  if (checkInput.checked) {
    item.classList.add("done");
  } else {
    item.classList.remove("done");
  }
}

// ایجاد آیتم جدید
function makeNewItem(list, text, isChecked = false) {
  const template = list.querySelector(".template");
  const item = template.cloneNode(true);
  item.classList.remove("template");
  setItemText(item, text);
  setItemDelete(item, list);
  setItemCheck(item, isChecked, list);
  return item;
}

// گرفتن مقدار صحیح از ورودی
function getValidValue(input) {
  if (!input.value) {
    alert("ابتدا باید چیزی بنویسید");
    input.focus();
    return null;
  }
  return input.value;
}

// ذخیره لیست آیتم ها
function updateStorage(list) {
  const items = list.querySelectorAll(".item:not(.template)");
  const array = Array.from(items, (item) => {
    const span = item.querySelector("span");
    const input = item.querySelector("input");
    return {
      text: span.textContent,
      isChecked: input.checked,
    };
  });
  localStorage.setItem("todo-items", JSON.stringify(array));
}

// گرفتن مقادر ذخیره شده
function getStorageValues() {
  const jsonArray = localStorage.getItem("todo-items") || "[]";
  return JSON.parse(jsonArray);
}

// مقدار دهی اولیه از ایتم های ذخیره شده
function initFromStorage(list) {
  const values = getStorageValues();
  values.forEach(({ text, isChecked }) => {
    const item = makeNewItem(list, text, isChecked);
    itemsList.appendChild(item);
  });
}
