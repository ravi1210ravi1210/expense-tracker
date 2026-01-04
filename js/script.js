/* ===== NAVBAR ===== */
const menuIcon = document.getElementById("menuIcon");
const navMenu = document.getElementById("navMenu");

menuIcon.onclick = function () {
  navMenu.classList.toggle("active");

  if (menuIcon.innerHTML === "☰") {
    menuIcon.innerHTML = "✖";
  } else {
    menuIcon.innerHTML = "☰";
  }
};

/* ===== EXPENSE TRACKER ===== */
let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");
let expenseDate = document.getElementById("expenseDate");
let addBtn = document.getElementById("addBtn");
let expenseList = document.getElementById("expenseList");
let totalEl = document.getElementById("total");

let total = 0;

/* load saved data */
let savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
savedExpenses.forEach(addExpenseToUI);
updateTotal();

/* add expense */
addBtn.onclick = function () {
  let name = expenseName.value;
  let amount = Number(expenseAmount.value);
  let date = expenseDate.value;

  if (name === "" || amount === 0 || date === "") {
    alert("Please fill all fields");
    return;
  }

  let expense = { name, amount, date };
  savedExpenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(savedExpenses));

  addExpenseToUI(expense);
  updateTotal();

  expenseName.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
};

/* add to UI */
function addExpenseToUI(expense) {
  let li = document.createElement("li");
  li.innerHTML = `${expense.date} | ${expense.name} - ₹${expense.amount}
    <button class="del">❌</button>`;

  li.querySelector(".del").onclick = function () {
    savedExpenses = savedExpenses.filter(e => e !== expense);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));
    li.remove();
    updateTotal();
  };

  expenseList.appendChild(li);
}

/* update total */
function updateTotal() {
  total = 0;
  savedExpenses.forEach(e => total += e.amount);
  totalEl.innerText = total;
}
