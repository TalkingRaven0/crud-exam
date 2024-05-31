const SALES_TABLE = document.getElementById('DisplaySales');

const FORM_NEW_ITEM = document.getElementById('CreateItem');
const FORM_SALES = document.getElementById('UpdateSales');
const FORM_DEL_PERSON = document.getElementById('DeletePerson');
const FORM_DEL_ITEM = document.getElementById('DeleteItem');

const IN_NEW_ITEM = document.getElementById('NewItemName');
const IN_UP_PERSON = document.getElementById('UpdatePerson');
const IN_UP_ITEM = document.getElementById('UpdateItem');
const IN_UP_AMOUNT = document.getElementById('UpdateAmount');
const IN_DEL_PERSON = document.getElementById('DeletePerson');
const IN_DEL_ITEM = document.getElementById('DeleteItem');

FORM_NEW_ITEM.onsubmit = () => {
    AddItem(IN_NEW_ITEM.value);
    return false;
}

FORM_DEL_ITEM.onsubmit = () => {
    DeleteItem(IN_DEL_ITEM.value);
    return false;
}

function AddItem(itemName){
    // Check for Duplicates
    const currentOptions = Array.from(IN_UP_ITEM.querySelectorAll('option'));
    for(i = 0 ; i < currentOptions.length ; i++){
        if(currentOptions[i].value == itemName){
            console.log("Item already exists");
            return;
        }
    }

    var newOption = document.createElement('option');
    newOption.value = itemName;
    newOption.innerHTML = itemName;
    
    IN_UP_ITEM.appendChild(newOption);
}

function DeleteItem(itemName){
    // Check for Duplicates
    const targettedItem = IN_UP_ITEM.querySelector("option[value='"+itemName+"']");
    console.log(targettedItem);
    if(targettedItem != null){
        IN_UP_ITEM.removeChild(targettedItem);
    } else {
        console.log("Item Does Not Exist");
    }
}