const inputAmount = document.getElementById('number');
const addForm = document.getElementById('addForm');


const budgetForm = document.querySelector('.budget-form')
const expenseForm = document.querySelector(".expense-form")

const budgetAmount = document.getElementById('budgetAmount');
const balanceAmount = document.getElementById("balanceAmount");

const btn = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName('close')[0]

btn.addEventListener('click', function(){
    expenseName.value ="";
    expenseNumber.value = "";
    expenseForm.style.display = 'block';
    editFormElement.style.display = 'none';
    modal.style.display = 'block'
})

closeBtn.addEventListener("click", ()=>{
    modal.style.display = 'none';
})

window.addEventListener("click", function(e){
    if(e.target === modal){
        modal.style.display = 'none';
    }
})


function getBudgetAmount(amount){
    if(!amount){
        inputAmount.style.border = `1px solid red`;
        inputAmount.placeholder = "input cannot be empty"
        inputAmount.style.color = 'red';

        setTimeout(()=>{
            inputAmount.style.color = "#495057";
            inputAmount.placeholder = ""
            inputAmount.style.border = '1px solid grey';
        }, 2000)
    } else{
        budgetAmount.innerText = amount;
        balanceAmount.innerText = amount;
        expenseForm.style.display = 'block';
        budgetForm.style.display = 'none';
        editForm.style.display ='none'
        inputAmount.value ="";
    }
    

}



const expenseName = document.getElementById("expName");
const expenseNumber = document.getElementById("expNumber");
const submitExpense = document.getElementById("expForm"); 
const expValue = document.getElementById("expValue");
const displayExpense = document.getElementById("displayExpenses")

const expenseAmount = document.getElementById("expensesAmount");
const balanceRemaining = document.getElementById("balanceAmount");

let id = 0;
let details = [];

function updateBalanceAmount(){
    balanceRemaining.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText)

}

function calculateExpenses(){
    let totalexp =0;
  for(let i =0; i<details.length; i++){
    totalexp = details[i].number + totalexp
  }
  updateBalanceAmount()
     expenseAmount.innerText = totalexp;
}


function displayExpenses(details){
    expValue.innerHTML = null;
    for(let i =0; i < details.length; i++){
        let detailsTag = details[i];
        expValue.innerHTML += `<div class="expValue" id="${detailsTag.id}">
        <div id="expTitleName" class="exp"><p>${detailsTag.name}</p></div>
        <div id="expValueAmount" class="exp"><p> <span>$ </span> ${detailsTag.number}</p></div>
        <div id="edite_delete">
          <p>
            <button id="${detailsTag.id}" onclick="editExpensesDetails(${detailsTag.id})"> <img src="img/edit.svg" width="15" alt=""  /></button> 
            <button id="${detailsTag.id}" onclick="deleteExpensesDetails(${detailsTag.id})"><img src="img/trash.svg" width="15" alt="" /></button>
          </p>
        </div>
      </div>`;

    
    }

    calculateExpenses()
    displayExpense.style.display ="block";

}

function addexpenses(name, number){
    if(!name.length || !number.length){
        expenseName.style.border = `1px solid red`
       expenseName.placeholder = "enter a valid expense"
        expenseName.style.color = 'red';

        expenseNumber.style.border = '1px solid red';
       expenseNumber.placeholder = "enter a valid number";
        expenseNumber.style.color = "red";

        setTimeout(()=>{
            expenseName.style.border = ""
            expenseName.Placeholder = ""
            expenseName.style.color = '';

            expenseNumber.style.border = ""
            expenseNumber.placeholder =""
            expenseNumber.style.color ="";
    
        },2000)
    } else{
        const expenseDetails = {
            id: id,
            name: name,
            number: parseInt(number)
        }
        id++;
        details.push(expenseDetails);
        displayExpenses(details)
        expenseName.value ="";
        expenseNumber.value ="";
    }


}
const editFormElement = document.getElementById('editForm')
const saveEdits = document.getElementById('saveEdit');
const editExpenseName = document.getElementById("editExpName");
const editExpNumber = document.getElementById("editExpNumber")

function editExpensesDetails(id){
expenseForm.style.display = 'none';
budgetForm.style.display  ='none';
editFormElement.style.display = 'block';
details.findIndex((item)=>{
    if(item.id == id){
        editExpenseName.value = item.name;
        editExpNumber.value = item.number;
        saveEdits.children[2].id = item.id;
        modal.style.display = 'block';
    }
})
}

function getExpensesValues(editExpenseName, editExpNumber, id){
    let edited = details.findIndex((items)=> items.id == id);
    details[edited].name = editExpenseName;
    details[edited].number = parseInt(editExpNumber);
    displayExpenses(details);

}

function deleteExpensesDetails(id){
    let del = details.findIndex((items)=> items.id ==id);
    details.splice(del, 1);
   
    displayExpenses(details)
}

function callBudget(){
    budgetForm.style.display ="block";
    expenseForm.style.display = 'none'
}

saveEdits.addEventListener("submit", (e)=>{
    e.preventDefault();
    getExpensesValues(editExpenseName.value, editExpNumber.value, saveEdits.children[2].id);
})

addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    getBudgetAmount(inputAmount.value)
})

submitExpense.addEventListener("submit", (e)=>{
    e.preventDefault();
    addexpenses(expenseName.value, expenseNumber.value);

})

