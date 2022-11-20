const Add = document.querySelector("#add");
const Double = document.querySelector("#double");
const Millionalres = document.querySelector("#millionalres");
const Richest = document.querySelector("#richest");
const Total = document.querySelector("#total");
const main = document.querySelector("main");
let persons = [];
// Add User
let randomUser = async () => {
  let fe = await fetch("https://randomuser.me/Api");
  let res = await fe.json();
  let person = {
    name: `${res.results[0].name.first} ${res.results[0].name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };
  persons.push(person);
  addToDom(person);
};
let addToDom = (person) => {
  removeTotal();
  let div = document.createElement("div");
  let usDollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  div.innerHTML = `<span> ${person.name}</span> <span>${usDollar.format(
    person.wealth
  )}</span>`;
  div.classList.add("person");
  main.appendChild(div);
};

addEventListener("load", function () {
  for (let i = 0; i < 3; i++) {
    randomUser();
  }
});

const doubleMoney = async () => {
  persons = persons.map((item) => {
    return {
      name: item.name,
      wealth: item.wealth * 2,
    };
  });
  refreshData();
};
const showMillionalres = async () => {
  persons = persons.filter((item) => item.wealth > 1000000);
  refreshData();
};
const sortUser = async () => {
  persons = persons.sort((a, b) => b.wealth - a.wealth);
  refreshData();
};
const calcTotal = async () => {
  removeTotal();
  let x = 0;
  let totalWealth = persons.reduce((x, person) => (x += person.wealth), 0);
  let ele = document.createElement("div");
  let usDollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  ele.innerHTML = `<span> Total</span> <span>${usDollar.format(
    totalWealth
  )}</span>`;
  ele.classList.add("total");
  main.appendChild(ele);
};

Add.addEventListener("click", randomUser);
Double.addEventListener("click", doubleMoney);
Millionalres.addEventListener("click", showMillionalres);
Richest.addEventListener("click", sortUser);
Total.addEventListener("click", calcTotal);

const refreshData = () => {
  main.innerHTML = `<main><h2> <strong>Person</strong> Wealth </h2> </main>`;
  persons.forEach((item) => addToDom(item));
};

const removeTotal = () => {
  let classArray = document.getElementsByClassName("total")[0];
  if (classArray != null) {
    classArray.remove();
  }
};
