const KEY = "projectList";

// If the localStorage is empty, initialize the localStorage
if(!localStorage.getItem(KEY)){
    localStorage.setItem(KEY, "[]")
}

// Turn a data array to JSON string and store it to localStorage
export function saveToStorage(arrayData){
    const JSONList = JSON.stringify(arrayData);
    localStorage.setItem(KEY, JSONList);
}


// Turn the JSON string in localStorage back to a data array
export function loadFromStorage(){
    const storedData = localStorage.getItem(KEY);
    const JSONList = JSON.parse(storedData);
    return JSONList;
}