//API DATA
const apiURL= 'https://www.dnd5eapi.co/api';

//RELLENAMOS TEMPLATE CON LOS DATOS DEL JSON

const classPanel = document.querySelector('#class-panel');
const template = document.querySelector('#box-classes-template').content;
const fragment = document.createDocumentFragment();

async function fetchClassFromFile(){
    let responseClass = await fetch('../data/character-class.json');
    let classData = await responseClass.json();
    
    classData.forEach(item =>{
        template.querySelector('p').textContent = item.class_name;
        template.querySelector('img').src = item.imgURL;
        template.querySelector('img').alt = item.class_name;
        const box = template.cloneNode(true);
        box.querySelector("div");
        box.querySelector('div').addEventListener("click",showClassDetail);
        fragment.appendChild(box);
    });

    classPanel.appendChild(fragment);
}
window.addEventListener('DOMContentLoaded',  fetchClassFromFile);

//TEMPLATE INFO
const racePanel = document.querySelector('#race-subrace-panel');
const templateRace = document.querySelector('#box-races-template').content;
const fragmentRace = document.createDocumentFragment();

/******************************LLAMADA API CON ENDPOINT *******************/
async function fetchData(endpoint){
    const response = await fetch (apiURL +'/'+endpoint);
    if (!response.ok) return []
    const data = await response.json();
    return data;
}

async function fetchRacesToTemplate() {
let responseRace = await fetch('../data/character-race.json');
let raceData = await responseRace.json();

//---------------------JSON RACE IMAGE-------------------------------------
    raceData.forEach(item => {
        
        templateRace.querySelector('img').src = item.imgURL;
        templateRace.querySelector('img').alt = item.index;
        templateRace.querySelector('p').textContent = item.name;

        const box = templateRace.cloneNode(true);
        fragmentRace.appendChild(box);
        
    });racePanel.appendChild(fragmentRace);
    
//---------------------API RACE NAME-------------------------------------
    // let dndRaces = [] 
    // fetchData('races').then((item) => {
    //     dndRaces = item.results;
    
    //     dndRaces.forEach(item=>{
    //         templateRace.querySelector('p').textContent = item.name;
    //         const boxRace = templateRace.cloneNode(true);
    //         fragmentRace.appendChild(boxRace);
    //     });
    //     racePanel.appendChild(fragmentRace);
    // });


//************** API ALIGNMENT*************/
    const templateAlignment = document.querySelector('#box-alignments-template').content; 
    const alignmentPanel = document.querySelector('#alignment-panel');
    const fragmentAlignment = document.createDocumentFragment();
            let responseAlignment = await fetch('../data/character-alignments.json');
        let alignmentData = await responseAlignment.json();
    let dndAlignments = [];

    fetchData('alignments').then((item)=>{
        dndAlignments = item.results;
        dndAlignments.forEach(item=>{
            templateAlignment.querySelector('p').textContent = item.name;
            alignmentData.forEach(element =>{
                if(element.id === item.index){
                    templateAlignment.querySelector('img').src = element.imgURL;
                }
            });
            const boxAlignment = templateAlignment.cloneNode(true);
            fragmentAlignment.appendChild(boxAlignment); 
        });
        alignmentPanel.appendChild(fragmentAlignment);

});
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRacesToTemplate();
});





function changeCentralPanel(panelId) {
    // Ocultar todos los paneles centrales
    document.getElementById('welcome-panel').style.display = 'none';
    document.getElementById('race-subrace-panel').style.display = 'none';
    document.getElementById('class-panel').style.display = 'none';
    document.getElementById('alignment-panel').style.display = 'none';
    document.getElementById('backstory-panel').style.display = 'none';
    document.getElementById('ability-panel').style.display = 'none';

    // Mostrar el panel central correspondiente al ID
    if(panelId==="class"||panelId==="race-subrace"){
        document.getElementById(panelId + '-panel').style.display = 'flex';
    }else{
        document.getElementById(panelId + '-panel').style.display = 'block';
        document.getElementById(panelId + '-panel').style.height = '80vh';
        
    }
    
}

function showClassDetail(){
    this.style.background = 'black';
}


// function showInfoInterface(){
    
//     const container = document.querySelector('.list-classes');    

//     const classList = document.querySelector('#class-list');
    
//     for (const dandclass of dandclasses){
//         let itemList = document.createElement('li');
//         let doneIcon = document.createElement('img');
        
//         itemList.classList.add('list-group-class');
//         itemList.innerText = dandclass.name;
//         classList.appendChild(itemList);
//     }
// }

