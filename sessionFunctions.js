function SessionGetItems(){
    const raw = sessionStorage.getItem('items');
    if(raw != null)
        return JSON.parse(raw);
    else
        return [];
}

function SessionAddItem(itemName){
    const raw = sessionStorage.getItem('items');
    var parsed = [];
    if (raw != null){
        parsed = JSON.parse(raw);
    }
    parsed.push(itemName);
    sessionStorage.setItem('item',JSON.stringify(parsed));
}

function SessionDeleteItem(itemName){
    const rawItems = sessionStorage.getItem('items');
    var parsedItems = [];
    if (rawItems != null){
        parsedItems = JSON.parse(rawItems);
    }
    const indexItems = parsedItems.indexOf(itemName);
    if (indexItems > -1) { // only splice array when item is found
        parsedItems.splice(indexItems, 1); // 2nd parameter means remove one item only
    }
    sessionStorage.setItem('item',JSON.stringify(parsedItems));

    
    const rawSales = sessionStorage.getItem('sales');
    if(raw == null)
        return;
    var parsedSales = JSON.parse(rawSales);
    Object.keys(parsedSales).forEach((person)=>{
        try{
            delete parsedSales[person][itemName];
        }
        catch {return}    
    });
}

function SessionGetSales(){
    const raw = sessionStorage.getItem('sales');
    if(raw != null)
        return JSON.parse(raw);
    else
        return {};
}

function SessionUpdateSales(person,item,amount){
    const raw = sessionStorage.getItem('sales');
    var parsed = {};
    if (raw != null){
        parsed = JSON.parse(raw);
    }
    // Check if person exists
    if (parsed[person] == undefined){
        parsed[person] = {};
    }

    // Check if item exists
    if (parsed[person][item] == undefined){
        parsed[person][item] = 0;
    }

    parsed[person][item] += amount;
    
    sessionStorage.setItem('item',JSON.stringify(parsed));
}

function SessionDeletePerson(person){
    const raw = sessionStorage.getItem('sales');
    var parsed = {};
    if (raw != null){
        parsed = JSON.parse(raw);
    } else
        return;

    try{
        delete parsed[person];
    } catch {
        console.log(person + " Does not exist")
    }
}