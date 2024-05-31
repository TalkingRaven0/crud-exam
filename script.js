const SALES_TABLE = document.getElementById('DisplaySales');
const SELECT_FUNCTION = document.getElementById('functionality')

const FORM_NEW_ITEM = document.getElementById('CreateItem');
const FORM_SALES = document.getElementById('UpdateSales');
const FORM_DEL_PERSON = document.getElementById('DeletePerson');
const FORM_DEL_ITEM = document.getElementById('DeleteItem');

const IN_NEW_ITEM = document.getElementById('NewItemName');
const IN_UP_PERSON = document.getElementById('UpdatePerson');
const IN_UP_ITEM = document.getElementById('UpdateItem');
const IN_UP_AMOUNT = document.getElementById('UpdateAmount');
const IN_DEL_PERSON = document.getElementById('InDeletePerson');
const IN_DEL_ITEM = document.getElementById('InDeleteItem');

var currentActive = null;

SELECT_FUNCTION.onchange = ()=>{
    const value = SELECT_FUNCTION.value;
    if (currentActive != null)
        currentActive.classList.remove('active');
    currentActive = document.querySelector('#'+value);
    currentActive.classList.add('active');
}

FORM_NEW_ITEM.onsubmit = () => {
    AddItem(IN_NEW_ITEM.value);
    UpdateTable();
    return false;
}

FORM_SALES.onsubmit = () => {
    SessionUpdateSales(IN_UP_PERSON.value,IN_UP_ITEM.value,IN_UP_AMOUNT.value)
    UpdateTable();
    return false;
}

FORM_DEL_PERSON.onsubmit = () => {
    SessionDeletePerson(IN_DEL_PERSON.value);
    UpdateTable();
    return false;
}

FORM_DEL_ITEM.onsubmit = () => {
    DeleteItem(IN_DEL_ITEM.value);
    UpdateTable();
    return false;
}
// Add Sample Data
SessionAddItem("Sample Item");
SessionUpdateSales("John Doe", "Sample Item", "-100")

// Initializations
UpdateTable();
const ITEMS = SessionGetItems();
for(const i in ITEMS){
    var newOption = document.createElement('option');
    newOption.value = ITEMS[i];
    newOption.innerHTML = ITEMS[i];
    IN_UP_ITEM.appendChild(newOption);
}

//#region Functions

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
    
    SessionAddItem(itemName);
    IN_UP_ITEM.appendChild(newOption);
}

function DeleteItem(itemName){
    // Check for Duplicates
    const targettedItem = IN_UP_ITEM.querySelector("option[value='"+itemName+"']");
    if(targettedItem != null){
        IN_UP_ITEM.removeChild(targettedItem);
        SessionDeleteItem(itemName);
    } else {
        console.log(itemName+" Does Not Exist");
    }
}

function UpdateTable(){
    const ITEMS = SessionGetItems();
    const SALES = SessionGetSales();

    SALES_TABLE.innerHTML = '';

    // Initialize Table Headers
    const headerRow = document.createElement('tr');
    const personColumn = document.createElement('th');
    personColumn.innerHTML = "Sales Person";
    headerRow.appendChild(personColumn);
    for(const i in ITEMS){
        const itemHeader = document.createElement('th');
        itemHeader.innerHTML = ITEMS[i];
        headerRow.appendChild(itemHeader);
    }
    SALES_TABLE.appendChild(headerRow);

    // Iterate through each person
    Object.keys(SALES).forEach((person)=>{
        const personRow = document.createElement('tr');
        const nameColumn = document.createElement('td');
        nameColumn.innerHTML = person;
        personRow.appendChild(nameColumn);

        for (const i in ITEMS){
            const itemAmount = document.createElement('td');
            itemAmount.innerHTML = (SALES[person][ITEMS[i]]==undefined || SALES[person][ITEMS[i]]==0 ? '-' : SALES[person][ITEMS[i]]);
            personRow.appendChild(itemAmount);
        }

        SALES_TABLE.appendChild(personRow);
    });
}

//#endregion