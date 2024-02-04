export function updateInfoSelected(){
    
    let nameSelected = document.getElementById('info-name');
    let nameSummary = document.getElementById('summary-name');
    let nameInput = document.getElementById('inputName');
    
    nameSelected.textContent = nameInput.value;
    nameSummary.textContent = nameInput.value;
}
    