// ******************************** API/JSON MANAGEMENT *******************************//
const apiURL = 'https://www.dnd5eapi.co/api';

async function fetchData(endpoint) {
    const response = await fetch(apiURL + '/' + endpoint);
    if (!response.ok) return []
    const data = await response.json();
    return data;
}

/************************** CLASES ***************************************** */
const classPanel = document.querySelector('#class-panel');
const template = document.querySelector('#box-classes-template').content;
const fragment = document.createDocumentFragment();

async function fetchClassFromFile() {
    let responseClass = await fetch('../data/character-class.json');
    let classData = await responseClass.json();

    classData.forEach(item => {
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
window.addEventListener('DOMContentLoaded', fetchClassFromFile);


/************************** RACE***************************************** */
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


    function showModalRace(e) {
        showRaceDetail(e.target.dataset.name);
    }
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
            skillsBox.getElementById('numeroInput').id += item.name;
            skillsBox.getElementById('setAbilityButton').dataset.ability = item.name;
            let skillPointsStorage = localStorage.getItem('skillPoints');
            if(skillPointsStorage !== null) {
                let skillPoints = JSON.parse(skillPointsStorage);
                for (let skill of skillPoints) {
                    if(item.name === skill.id) {
                        skillsBox.getElementById('numeroInput' + skill.id).value = skill.value;
                    }
                }
                diceMovement('dice-ability');
                let abilityStatus = document.getElementById('ability-pending');
                abilityStatus.textContent = 'Done';
            }
            skillsFragment.appendChild(skillsBox);
        });
        skillsPanel.insertBefore(skillsFragment, abilityContainer);
    });
}

/************************** CENTRAL PANEL MANAGEMENT ***************************************** */
function changeCentralPanel(panelId) {
    let charInfoList = document.getElementsByClassName('character-info');
    for (let charInfo of charInfoList) {
        if (charInfo.dataset.set === panelId) {
            charInfo.style.backgroundColor = 'grey';
        } else {
            charInfo.style.backgroundColor = '#302c2c';
        }
    }
    // Ocultar todos los paneles centrales
    document.getElementById('welcome-panel').style.display = 'none';
    document.getElementById('race-subrace-panel').style.display = 'none';
    document.getElementById('class-panel').style.display = 'none';
    document.getElementById('alignment-panel').style.display = 'none';
    document.getElementById('avatar-panel').style.display = 'none';
    document.getElementById('ability-panel').style.display = 'none';

    // Mostrar el panel central correspondiente al ID
    if (panelId === "class" ||
        panelId === "race-subrace" ||
        panelId === "alignment") {
        document.getElementById(panelId + '-panel').style.display = 'flex';

    } else {
        document.getElementById(panelId + '-panel').style.display = 'block';
    }
}

// ******************************** SECTION RACE DATA MANAGEMENT *******************************//
function showModalRace(e) {
    showRaceDetail(e.target.dataset.name);
}

async function showRaceDetail(raceIndex) {
    fetchData('races/' + raceIndex).then(async (item) => {
        let name = document.getElementById('modal-name-race');
        let speed = document.getElementById('speed');
        let age = document.getElementById('age');
        let alignment = document.getElementById('alignment');
        let size = document.getElementById('size');
        let raceImg = document.getElementById('modal-race-img');

        await fetch('../data/character-race.json').then(async (item) => {
            const classData = await item.json();
            classData.forEach(item => {
                if (item.name.toLowerCase() === raceIndex) {
                    raceImg.src = item.imgURL;
                }
            });
        });

        name.textContent = item.name;
        localStorage.setItem('raceName', item.name);
        speed.textContent = 'SPEED: ' + item.speed;
        age.textContent = 'AGE: ' + item.age;
        alignment.textContent = 'ALIGNMENT: ' + item.alignment;
        size.textContent = 'SIZE: ' + item.size;

    });
}

function selectOptionRace(e) {
    let raceName = document.getElementById('modal-name-race');
    let navRace = document.getElementById('nav-race-name');
    let summaryRace = document.getElementById('summary-race');

    navRace.textContent = raceName.textContent;
    summaryRace.textContent = raceName.textContent;
    diceMovement('dice-race');
    navRaceOK = true;
    showPdfButton();
}

// ******************************** END SECTION * RACE DATA MANAGEMENT *******************************//


// ******************************** SECTION CLASS DATA MANAGEMENT *******************************//

function showModalClass(e) {
    showClassDetail(e.target.dataset.name);
}

async function showClassDetail(classesIndex) {
    fetchData('classes/' + classesIndex).then(async (item) => {
        let name = document.getElementById('modal-name-class');
        let info = document.getElementById('info');
        let hit = document.getElementById('hit');
        let profi = document.getElementById('profi');
        let equipment = document.getElementById('equipment');
        let modalImage = document.getElementById('modal-class-img');
        let profiString = "";
        let equipmentString = "";

        item.proficiencies.map(item => {
            profiString += item.name + ", "
        });
        profiString = profiString.substring(0, profiString.length - 2);

        item.starting_equipment.map(item => {
            equipmentString += item.equipment.name + ", "
        });
        equipmentString = equipmentString.substring(0, equipmentString.length - 2);

        await fetch('../data/character-class.json').then(async (item) => {
            const classData = await item.json();
            classData.forEach(item => {
                if (item.name.toLowerCase() === classesIndex) {
                    info.textContent = item.information;
                    modalImage.src = item.imgURL;
                }
            });
        });

        name.textContent = item.name;
        localStorage.setItem('className', item.name);
        hit.textContent = 'HIT DIE: ' + item.hit_die;
        profi.textContent = 'PROFICIENCY: ' + profiString;
        equipment.textContent = 'EQUIPMENT: ' + equipmentString;


    });
}

async function selectOptionClass(e) {
    let className = document.getElementById('modal-name-class');
    let equipment = document.getElementById('equipment');
    let profi = document.getElementById('profi');

    let navClass = document.getElementById('nav-class-name');
    let summaryClass = document.getElementById('summary-class');
    let summaryIMG = document.getElementById('summary-class-image');

    let summaryEquip = document.getElementById('summary-equip');
    let summaryProfi = document.getElementById('summary-profi');

    navClass.textContent = className.textContent;
    summaryEquip.textContent = equipment.textContent;
    localStorage.setItem('characterEquip', equipment.textContent);
    summaryProfi.textContent = profi.textContent;
    localStorage.setItem('characterProfi', profi.textContent);
    summaryClass.textContent = className.textContent;
    navClasses = true;
    showPdfButton();

    await fetch('../data/character-class.json').then(async (item) => {
        const classData = await item.json();
        classData.forEach(item => {
            if (item.name === className.textContent) {
                summaryIMG.src = item.imgURL;
                localStorage.setItem('classIMG',item.imgURL);
            }
        });
    });

    diceMovement('dice-class');
}

// ******************************** END SECTION * RACE DATA MANAGEMENT *******************************//



// ******************************** SECTION ALIGNMENT DATA MANAGEMENT *******************************//

function showModalAlign(e) {
    showAlignDetail(e.target.dataset.name);
}

function selectAlignment(e) {
    let clickableCells = document.querySelectorAll('.selection');
    let infoSelectedAlign = document.getElementById('align-pending');
    let summaryAlignment = document.getElementById('summary-alignment');
    clickableCells.forEach(function (cell) {
        cell.addEventListener('click', function () {
            let textContent = this.textContent;
            clickableCells.forEach(cellToCmp => {
                if(textContent === cellToCmp.textContent){
                    cellToCmp.classList.add('aligment-seleted');
                }else {
                    cellToCmp.classList.remove('aligment-seleted');                   
                }
            });
            infoSelectedAlign.textContent = textContent;
            summaryAlignment.textContent = textContent;
            localStorage.setItem('alignmentName', textContent);
            alignDone();
        });
    });
}

function alignDone() {
    diceMovement('dice-align');
    navAlignment = true;
    showPdfButton();
}


// ******************************** END SECTION * ALIGNMENT DATA MANAGEMENT *******************************//



// ******************************** SECTION DICE BEHAVIOUR *******************************//

function diceMovement(diceName) {
    diceIMG = document.getElementById(diceName);
    diceIMG.src = '../images/icons/dice-green.png';
    diceIMG.style = 'transform: rotate(30deg);';
}

let timesRolled = 0;

function rollDice(e, setValue = false) {
    let diceSum = 0;
    let dices = []
    let dice1 = document.getElementById('dice1');
    let dice2 = document.getElementById('dice2');
    let dice3 = document.getElementById('dice3');
    let dice4 = document.getElementById('dice4');
    let totalAfterDiscount = document.getElementById('dice-total');
    let diceButton = document.getElementById('diceButton');


    for (i = 0; i < 4; i++) {
        dices[i] = Math.floor(Math.random() * 6) + 1;
        diceSum += dices[i];
    }

    let minNum = Math.min(...dices);
    let minIndex = dices.indexOf(minNum);
    let diceTotal = diceSum - minNum;

    totalAfterDiscount.style = 'background:white;';

    timesRolled++;

    [dice1, dice2, dice3, dice4, totalAfterDiscount].forEach(dice => {
        dice.style = 'transform: rotate(' + timesRolled * 360 + 'deg);';
    });

    setTimeout(() => {
        resetRoll(diceButton, totalAfterDiscount, diceTotal)
    }, 1000);

    setTimeout(() => {
        clearDices(dices)
    }, 500);

    [dice1, dice2, dice3, dice4][minIndex].style.backgroundColor = 'black';
    [dice1, dice2, dice3, dice4][minIndex].style.color = 'white';
    totalAfterDiscount.style = 'background:lightgreen;';
    setTimeout(() => {
        if (setValue) {
            document.getElementById('numeroInput' + e.target.dataset.ability).value = totalAfterDiscount.textContent;
        }
    }, 1000);

}

function resetRoll(diceButton, totalAfterDiscount, diceTotal) {
    //diceButton.disabled = false;
    totalAfterDiscount.textContent = diceTotal;
}


function clearDices(dices) {
    let dice1 = document.getElementById('dice1');
    let dice2 = document.getElementById('dice2');
    let dice3 = document.getElementById('dice3');
    let dice4 = document.getElementById('dice4');
    dice1.textContent = dices[0];
    dice2.textContent = dices[1];
    dice3.textContent = dices[2];
    dice4.textContent = dices[3];
}



function diceDone() {
    let abilities = [];
    let abilitiesToSet = document.getElementById('ability-tr');
    let abilitiesToGet = document.getElementsByClassName('skills-container');
    for (let item of abilitiesToGet) {
        let ability = item.getElementsByTagName('input')[0].value;
        let abilityId = item.getElementsByTagName('input')[0].id;
        let abilityShortId = abilityId.substring(abilityId.length - 3, abilityId.length);
        abilitiesToSet.querySelector('#td-' + abilityShortId).textContent = ability;
        abilities.push({'id': abilityShortId, 'value': ability});
    }
    localStorage.setItem('skillPoints', JSON.stringify(abilities));

    diceMovement('dice-ability');
    let abilityStatus = document.getElementById('ability-pending');
    abilityStatus.textContent = 'Done';
    navAbility = true;
    showPdfButton();
}

// ******************************** END SECTION * DICE BEHAVIOUR *******************************//


// ******************************** SECTION AVATAR *******************************//



function avatarDone(isDefault = true) {
    diceMovement('dice-avatar');
    let avatarStatus = document.getElementById('avatar-pending');
    if(isDefault) {
        let avatarDefault = document.getElementById('user-avatar');
        localStorage.setItem('avatarURL', avatarDefault.src);
    }
    avatarStatus.textContent = 'Done';
    navAvatar = true;
    showPdfButton();
}

function changeAvatar(elem) {
    console.log(elem)
}

function attachImage() {
    document.getElementById('formFileLg').onchange = function (evt) {
        let files = evt.target.files;

        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('user-avatar').src = fr.result;
                localStorage.setItem('avatarURL', fr.result);
                avatarDone(false);
            }
            fr.readAsDataURL(files[0]);
        }
    }
}

// ******************************** END SECTION * AVATAR *******************************//


// ******************************** SECTION PDF CREATION *******************************//

let navWelcome = false;
let navRaceOK = false;
let navClasses = false;
let navAlignment = false;
let navAbility = false;
let navAvatar = false;


function showPdfButton() {

    let pdfButton = document.getElementById('print-pdf-button');

    if (navWelcome && navRaceOK && navClasses && navAlignment && navAbility && navAvatar) {
        pdfButton.hidden = false;
        mostrarAlerta();
    }
}

//when click, navbar and summary info updated
function clickInputWelcome() {
    let nameSelected = document.getElementById('info-name');
    let nameSummary = document.getElementById('summary-name');
    let nameInput = document.getElementById('inputName');

    //guardo el dato en almacenamiento local por si lo necesito más adelante
    localStorage.setItem('characterName', nameInput.value);

    nameSelected.textContent = nameInput.value;
    nameSummary.textContent = nameInput.value;

    diceMovement('dice-welcome');
    navWelcome = true;
    showPdfButton();
}
function mostrarAlerta() {
    let alert = document.getElementById('alert');
    alert.style.display = 'block';
    setTimeout(function () {
        alert.style.opacity = '1';
    }, 10);

    setTimeout(function () {
        alert.style.opacity = '0';
        setTimeout(function () {
            alert.style.display = 'none';
        }, 500);
    }, 3000);

}

//Disable the button if input is empty
function nameButtonDisabled() {
    const button = document.getElementById('name-button');

    if (document.getElementById('inputName').value !== '') {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchToTemplate();
    selectAlignment();
    attachImage();
    loadLocalStorage();

});

const loadLocalStorage =() => {

    //NAME
    let summaryName = document.getElementById('summary-name');  
    let navName = document.getElementById('info-name');
    let nameStorage = localStorage.getItem('characterName');
    if(nameStorage !== null){
        summaryName.textContent = nameStorage;
        navName.textContent = nameStorage;
        diceMovement('dice-welcome');
        navWelcome = true;
    }

    //RACE
    let summaryRace = document.getElementById('summary-race');
    let navRace = document.getElementById('nav-race-name');
    let raceStorage = localStorage.getItem("raceName");

    if (raceStorage !== null) {
        summaryRace.textContent = raceStorage;
        navRace = raceStorage;
        diceMovement('dice-race');
        navRaceOK = true;

    }

    //CLASS
    let summaryClass = document.getElementById('summary-class');
    let navClass = document.getElementById('nav-class-name');
    let summaryClassIMG = document.getElementById('summary-class-image');
    let classStorage = localStorage.getItem("className");
    let classIMGStorage = localStorage.getItem('classIMG');

    if (classStorage !== null) {
        summaryClass.textContent = classStorage;
        navClass.textContent = classStorage;
        diceMovement('dice-class');
        navClasses = true;
    }

    if (classIMGStorage !== null){
        summaryClassIMG.src = classIMGStorage;
    }

    //ALIGNMENT
    let summaryAlignment = document.getElementById('summary-alignment');
    let navAlignmentElem = document.getElementById('align-pending');
    let alignmentNameStorage = localStorage.getItem('alignmentName');

    if (alignmentNameStorage !== null) {
        
        summaryAlignment.textContent = alignmentNameStorage;
        navAlignmentElem.textContent = alignmentNameStorage;
        diceMovement('dice-align');
        navAlignment = true;
    }

    //EQUIPMENT
    let summaryEquipment = document.getElementById('summary-equip');
    let equipmentStorage = localStorage.getItem('characterEquip');

    if (equipmentStorage !== null) {
        summaryEquipment.textContent = equipmentStorage;
    }


    //PROFICIENCY
    let summaryProfi = document.getElementById('summary-profi');
    let profiStorage = localStorage.getItem('characterProfi');

    if (profiStorage !== null) {
    summaryProfi.textContent = profiStorage;
    }


    //ABILITIES
    let abilityTr = document.getElementById('ability-tr');
    
    let skillPointsStorage = localStorage.getItem('skillPoints');
    if(skillPointsStorage !== null) {
        let skillPoints = JSON.parse(skillPointsStorage);
        for (let item of skillPoints) {
            abilityTr.querySelector('#td-' + item.id).textContent = item.value;
        }
        navAbility = true;
    }

    //AVATAR
    let navAvatarElem = document.getElementById('avatar-pending');
    let summaryAvatar = document.getElementById('user-avatar');
    let avatarStorage = localStorage.getItem('avatarURL');

    if (avatarStorage !== null) {
        summaryAvatar.src = avatarStorage;
        navAvatarElem.textContent = 'Done';
        diceMovement('dice-avatar');
        
        navAvatar = true;
    }

        showPdfButton();
}