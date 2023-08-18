const calculateBtn = getElementById('calculate-btn')
const savingsBtn = getElementById("save-btn")
const resetAllBtn = getElementById('reset-all-btn')

const form1 = getElementById("form1");
const savingForm = getElementById('saving-form');

function getTotalExpenses(){
    const foodCost = getInputValue("food-input-field");
    const rentCost = getInputValue("rent-input-field");
    const clothesCost = getInputValue("clothes-input-field");

    const totalExpenses = parseFloat(foodCost) + parseFloat(rentCost) + parseFloat(clothesCost);
    return totalExpenses;
}

function resetAll(){
const isReset = confirm("Are you sure to reset all?");

//confirm before reset the calculation records.
if(!isReset){
    return;
}

setElementInnerText("total-expense-container", "00");
setElementInnerText("balance-container", "00");
setElementInnerText("saving-amount-container", "00");
setElementInnerText("remaining-balance-container", "00");
}

//event listeners
let currentBalance = null;
calculateBtn.addEventListener('click', function(ev){
    ev.preventDefault();
    //check empty fields
    if(!getInputValue('income-input-field') || !getInputValue("food-input-field") || !getInputValue("rent-input-field") || !getInputValue("clothes-input-field")){
        return alert("Please fill in all fields")
    }

    //check negative value
    if(getInputValue('income-input-field') < 0 || getInputValue("food-input-field") < 0 || getInputValue("rent-input-field") < 0 || getInputValue("clothes-input-field") < 0){
        return alert("Please give positive amount")
    }

    const totalExpenses = getTotalExpenses();
    const income = getInputValue('income-input-field')

    //check if expenses more than income or not
    if(totalExpenses > income){
        return alert("Expenses shouldn't be more than income");
    }

    const balance = income - totalExpenses;
    currentBalance = balance;

    setElementInnerText('balance-container', balance)
    setElementInnerText('total-expense-container', totalExpenses);

    form1.reset()
})

savingsBtn.addEventListener('click', function(ev){
    ev.preventDefault()
    if(currentBalance){
        const savingPercentage = getInputValue('savings-input-field');

        //check empty field
        if(!savingPercentage){
            return alert("Please input savings percentage")
        }

        //check negative input
        if(savingPercentage < 0){
            return alert("Please give positive input")
        }

        const savingsAmount = (currentBalance * savingPercentage) / 100;

        //check whether the savings amount is greater than the current balance
        if(savingsAmount > currentBalance){
            return alert("You can not save more than your balance")
        }

        const remainingBalance = currentBalance - savingsAmount;
        setElementInnerText('saving-amount-container', savingsAmount.toFixed(2));
        setElementInnerText('remaining-balance-container', remainingBalance.toFixed(2));
        savingForm.reset()
    }else{
        alert("You don't have balance")
    }
})

resetAllBtn.addEventListener('click', resetAll)



