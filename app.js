// عناصر استفاده شده
const newItemInput = document.querySelector(".new-item > input");
const addItemBtn = document.querySelector(".new-item > button");
const itemsList = document.querySelector(".items");

// افزودن آیتم جدید
addItemBtn.addEventListener("click", () => {
  const value = getValidValue(newItemInput);
  if (value) {
    const item = makeNewItem(itemsList, value);
    itemsList.appendChild(item);
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
function setItemDelete(item) {
  const delBtn = item.querySelector("button");
  delBtn.addEventListener("click", () => {
    item.remove();
  });
}

// قابلیت تیک زدن آیتم
function setItemCheck(item, isChecked) {
  const checkInput = item.querySelector("input");
  checkInput.checked = isChecked;
  updateItemClass(item, checkInput);
  checkInput.addEventListener("change", () => {
    updateItemClass(item, checkInput);
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
  setItemDelete(item);
  setItemCheck(item, isChecked);
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
