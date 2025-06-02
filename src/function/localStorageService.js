const KEY = "projectList";

// If the data array is not in localStorage, initialize the localStorage
if(!localStorage.getItem(KEY)){
    localStorage.setItem(KEY, "[]")
}

// Turn a data array to JSON string and store it to localStorage
export function StoreListItem(arrayList){
    const JSONList = JSON.stringify(arrayList);
    localStorage.setItem(KEY, JSONList);
}


// Turn the JSON string in localStorage back to a data array
export function RestoreListItem(){
    const storedList = localStorage.getItem(KEY);
    const arrayList = JSON.parse(storedList);
    return arrayList;
}