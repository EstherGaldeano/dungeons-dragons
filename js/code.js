//API DATA
const apiURL= 'https://www.dnd5eapi.co/api';

async function fetchData(endpoint){
    const response = await fetch (apiURL +'/'+endpoint);
    if (!response.ok) return []
    const data = await response.json();
    return data;
}

/**************************CLASES***************************************** */
const classPanel = document.querySelector('#class-panel');
const template = document.querySelector('#box-classes-template').content;
const fragment = document.createDocumentFragment();

async function fetchClassFromFile(){
    let responseClass = await fetch('../data/character-class.json');
    let classData = await responseClass.json();

    classData.forEach(item =>{
        template.querySelector('p').textContent = item.name;
        template.querySelector('img').src = item.imgURL;
        template.querySelector('img').alt = item.name;
        template.querySelector('button').dataset.name = item.name.toLowerCase();
        const box = template.cloneNode(true);
        box.querySelector("div");
        
        fragment.appendChild(box);
    });

classPanel.appendChild(fragment);
}
window.addEventListener('DOMContentLoaded',  fetchClassFromFile);


/**************************RACE***************************************** */
const racePanel = document.querySelector('#race-subrace-panel');
const raceTemplate = document.querySelector('#box-races-template').content;
const raceFragment = document.createDocumentFragment();


async function fetchToTemplate() {
let raceResponse = await fetch('../data/character-race.json');
let raceData = await raceResponse.json();

raceData.forEach(item => {  
    raceTemplate.querySelector('img').src = item.imgURL;
    raceTemplate.querySelector('img').alt = item.index;
    raceTemplate.querySelector('p').textContent = item.name;
    raceTemplate.querySelector('button').dataset.name = item.index;
    const box = raceTemplate.cloneNode(true);
    raceFragment.appendChild(box);  
});
    racePanel.appendChild(raceFragment);




/**************************ALIGNMENT***************************************** */

    const alignmentTemplate = document.querySelector('#box-alignments-template').content; 
    const alignmentPanel = document.querySelector('#alignment-panel');
    const alignmentFragment = document.createDocumentFragment();

    let alignmentResponse = await fetch('../data/character-alignments.json');
    let alignmentData = await alignmentResponse.json();
    let dndAlignments = [];
    let alignDetails = [];
    let dndAligDetails = '';

    fetchData('alignments').then(async (item)=>{
        dndAlignments = item.results;
        await dndAlignments.forEach(async item=>{
            alignmentTemplate.querySelector('p').textContent = item.name;
            let desc = '';
            await fetchData(item.url.substring(5,item.url.length)).then(async (element)=>{
                desc = element.desc;
                alignmentTemplate.querySelector('#alignment-detail').textContent = desc;
                //  alignmentTemplate.querySelector('alignment-detail').textContent = item.desc;
                  const alignmentBox = alignmentTemplate.cloneNode(true);
                  alignmentFragment.appendChild(alignmentBox); 
            });
            alignmentPanel.appendChild(alignmentFragment);
        });
        
    });




/**************************SKILLS***************************************** */

    const skillsTemplate = document.querySelector('#box-skills-template').content;
    const skillsPanel = document.querySelector('#ability-panel');
    const abilityContainer = document.querySelector('#ability-container');
    const skillsFragment = document.createDocumentFragment();
    let skillsDnD = [];

    fetchData('ability-scores').then((item) => {
        skillsDnD = item.results;

        skillsDnD.forEach(item => {
            skillsTemplate.querySelector('span').textContent = item.name;
            const skillsBox = skillsTemplate.cloneNode(true);
            skillsFragment.appendChild(skillsBox);
            });
        skillsPanel.insertBefore(skillsFragment, abilityContainer);
    });
}


/**************************CENTRAL PANEL***************************************** */
function changeCentralPanel(panelId) {
    // Ocultar todos los paneles centrales
    document.getElementById('welcome-panel').style.display = 'none';
    document.getElementById('race-subrace-panel').style.display = 'none';
    document.getElementById('class-panel').style.display = 'none';
    document.getElementById('alignment-panel').style.display = 'none';
    document.getElementById('avatar-panel').style.display = 'none';
    document.getElementById('ability-panel').style.display = 'none';

    // Mostrar el panel central correspondiente al ID
    if(panelId==="class"||
        panelId==="race-subrace" || 
        panelId==="alignment"){
        document.getElementById(panelId + '-panel').style.display = 'flex';

    }else{
        document.getElementById(panelId + '-panel').style.display = 'block';
       // document.getElementById(panelId + '-panel').style.width ='80vh';

    }   
}


//Disable the button if input is empty
function nameButtonDisabled(){
    const button = document.getElementById('nameButton');

    if(document.getElementById('inputName').value!==''){
        button.disabled=false;
    }else{
        button.disabled=true;
    }
}


//when click, navbar and summary info updated
function clickInputWelcome(){
let nameSelected = document.getElementById('info-name');
let nameSummary = document.getElementById('summary-name');
let nameInput = document.getElementById('inputName');
nameSelected.textContent = nameInput.value;
nameSummary.textContent = nameInput.value;

diceMovement('dice-welcome');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchToTemplate();
});


function showModalRace(e) {
    showRaceDetail(e.target.dataset.name);
}


async function showRaceDetail(raceIndex){
    fetchData('races/'+raceIndex).then(async (item)=>{
        let name = document.getElementById('modal-name-race');
        let speed = document.getElementById('speed');
        let age = document.getElementById('age');
        let alignment = document.getElementById('alignment');
        let size = document.getElementById('size');
        let raceImg = document.getElementById('modal-race-img');

        await fetch('../data/character-race.json').then(async (item) => {
            const classData = await item.json();
            classData.forEach(item =>{
                if(item.name.toLowerCase()===raceIndex){
                    raceImg.src=item.imgURL;
                }
            }); 
        });

        name.textContent=item.name;
        speed.textContent=item.speed;
        age.textContent=item.age;
        alignment.textContent=item.alignment;
        size.textContent=item.size;

    });
}

function selectOptionRace(e){
    let raceName = document.getElementById('modal-name-race');
    let navRace = document.getElementById('nav-race-name');
    let summaryRace = document.getElementById('summary-race');

    navRace.textContent = raceName.textContent;
    summaryRace.textContent = raceName.textContent;
    diceMovement('dice-race');
}


function showModalClass(e) {
    showClassDetail(e.target.dataset.name);
}

async function showClassDetail(classesIndex){
    fetchData('classes/'+classesIndex).then(async (item)=>{
        let name = document.getElementById('modal-name-class');
        let info = document.getElementById('info');
        let hit = document.getElementById('hit');
        let profi = document.getElementById('profi');
        let equipment = document.getElementById('equipment');
        let modalImage = document.getElementById('modal-class-img');
        let profiString = "";
        let equipmentString = "";

        item.proficiencies.map(item => {profiString += item.name + ", "});
        profiString = profiString.substring(0, profiString.length-2);

        item.starting_equipment.map(item => {equipmentString += item.equipment.name + ", "});
        equipmentString = equipmentString.substring(0, equipmentString.length-2);

        await fetch('../data/character-class.json').then(async (item) => {
            const classData = await item.json();
            classData.forEach(item =>{
                if(item.name.toLowerCase()===classesIndex){
                    info.textContent=item.information;
                    modalImage.src=item.imgURL;
                }
            }); 
        });
        
        name.textContent=item.name;
        hit.textContent=item.hit_die;
        profi.textContent = profiString;
        equipment.textContent = equipmentString;
        

    });
}

async function selectOptionClass(e){
    let className = document.getElementById('modal-name-class');
    let equipment = document.getElementById('equipment');
    let navClass = document.getElementById('nav-class-name');
    let summaryClass = document.getElementById('summary-class');
    let summaryEquip = document.getElementById('summary-equip');
    let summaryIMG = document.getElementById('summary-class-image');
    let summaryProfi = document.getElementById('summary-profi');

    navClass.textContent = className.textContent;
    summaryEquip.textContent = equipment.textContent;
    summaryClass.textContent = className.textContent;
    summaryProfi.textContent = className.textContent;

    await fetch('../data/character-class.json').then(async (item) => {
        const classData = await item.json();
        classData.forEach(item =>{
            if(item.name===className.textContent){
                summaryIMG.src=item.imgURL;
            }
        }); 
    });

    diceMovement('dice-class');
}


function showModalAlign(e) {
    showAlignDetail(e.target.dataset.name);
}

async function showClassDetail(classesIndex){
    fetchData('classes/'+classesIndex).then(async (item)=>{
        let name = document.getElementById('modal-name-class');
        let info = document.getElementById('info');
        let hit = document.getElementById('hit');
        let profi = document.getElementById('profi');
        let equipment = document.getElementById('equipment');
        let modalImage = document.getElementById('modal-class-img');
        let profiString = "";
        let equipmentString = "";

        item.proficiencies.map(item => {profiString += item.name + ", "});
        profiString = profiString.substring(0, profiString.length-2);

        item.starting_equipment.map(item => {equipmentString += item.equipment.name + ", "});
        equipmentString = equipmentString.substring(0, equipmentString.length-2);

        await fetch('../data/character-class.json').then(async (item) => {
            const classData = await item.json();
            classData.forEach(item =>{
                if(item.name.toLowerCase()===classesIndex){
                    info.textContent=item.information;
                    modalImage.src=item.imgURL;
                }
            }); 
        });
        
        name.textContent=item.name;
        hit.textContent=item.hit_die;
        profi.textContent = profiString;
        equipment.textContent = equipmentString;

    });
}



//**************DICE BEHAVIOUR ***********************/
let timesRolled = 0;
function rollDice(){
let diceSum=0;
let dices = []   
let dice1= document.getElementById('dice1');
let dice2= document.getElementById('dice2');
let dice3= document.getElementById('dice3');
let dice4= document.getElementById('dice4');
let totalAfterDiscount = document.getElementById('dice-total');
let diceButton = document.getElementById('diceButton');
diceButton.disabled = true;


for(i = 0; i < 4 ; i++){
    dices[i] = Math.floor(Math.random() * 6) + 1;
    console.log(dices[i]);
    diceSum+=dices[i];
}

let minNum = Math.min(...dices);
let minIndex = dices.indexOf(minNum); 
let diceTotal = diceSum - minNum;

totalAfterDiscount.style='background:white;';


timesRolled++;

[dice1, dice2, dice3, dice4,totalAfterDiscount].forEach(dice => {
    dice.style='transform: rotate('+timesRolled * 360+'deg);';
});
setTimeout(() => {resetRoll(diceButton,totalAfterDiscount,diceTotal)},1000);
setTimeout(() => {clearDices(dices)},500);
[dice1, dice2, dice3, dice4][minIndex].style.backgroundColor = 'black';
[dice1, dice2, dice3, dice4][minIndex].style.color = 'white';
totalAfterDiscount.style='background:lightgreen;';

}
function resetRoll(diceButton,totalAfterDiscount,diceTotal) {
    diceButton.disabled = false;
    totalAfterDiscount.textContent=diceTotal;
}

function clearDices(dices){
    let dice1= document.getElementById('dice1');
    let dice2= document.getElementById('dice2');
    let dice3= document.getElementById('dice3');
    let dice4= document.getElementById('dice4');
    dice1.textContent = dices[0];
    dice2.textContent = dices[1];
    dice3.textContent = dices[2];
    dice4.textContent = dices[3];
}







function diceDone(){
    diceMovement('dice-ability');
    let abilityStatus = document.getElementById('ability-pending');
    abilityStatus.textContent = 'Done';
}

function avatarDone(){
    diceMovement('dice-avatar');
    let avatarStatus = document.getElementById('avatar-pending');
    avatarStatus.textContent = 'Done';
}

function alignDone(){
    diceMovement('dice-align');
}