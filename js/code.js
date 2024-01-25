//API DATA
const apiURL= 'https://www.dnd5eapi.co/api';

//RELLENAMOS TEMPLATE CON LOS DATOS DEL JSON

/**************************CLASES***************************************** */
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

/**************************RACE***************************************** */
    const racePanel = document.querySelector('#race-subrace-panel');
    const raceTemplate = document.querySelector('#box-races-template').content;
    const raceFragment = document.createDocumentFragment();

    async function fetchData(endpoint){
        const response = await fetch (apiURL +'/'+endpoint);
        if (!response.ok) return []
        const data = await response.json();
        return data;
}
    async function fetchToTemplate() {
    let raceResponse = await fetch('../data/character-race.json');
    let raceData = await raceResponse.json();

    raceData.forEach(item => {  
        raceTemplate.querySelector('img').src = item.imgURL;
        raceTemplate.querySelector('img').alt = item.index;
        raceTemplate.querySelector('p').textContent = item.name;
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

    fetchData('alignments').then((item)=>{
        dndAlignments = item.results;
        dndAlignments.forEach(item=>{
            alignmentTemplate.querySelector('p').textContent = item.name;
            alignmentData.forEach(element =>{
                if(element.id === item.index){
                    alignmentTemplate.querySelector('img').src = element.imgURL;
                }
            });
            const alignmentBox = alignmentTemplate.cloneNode(true);
            alignmentFragment.appendChild(alignmentBox); 
        });
        alignmentPanel.appendChild(alignmentFragment);
    });

/**************************SKILLS***************************************** */

    const skillsTemplate = document.querySelector('#box-skills-template').content;
    const skillsPanel = document.querySelector('#ability-panel');
    const skillsFragment = document.createDocumentFragment();
    let skillsDnD = [];

    fetchData('ability-scores').then((item) => {
        skillsDnD = item.results;

        skillsDnD.forEach(item => {
            skillsTemplate.querySelector('span').textContent = item.name;
            const skillsBox = skillsTemplate.cloneNode(true);
            skillsFragment.appendChild(skillsBox);
            });
        skillsPanel.appendChild(skillsFragment);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchToTemplate();
});

function changeCentralPanel(panelId) {
    // Ocultar todos los paneles centrales
    document.getElementById('welcome-panel').style.display = 'none';
    document.getElementById('race-subrace-panel').style.display = 'none';
    document.getElementById('class-panel').style.display = 'none';
    document.getElementById('alignment-panel').style.display = 'none';
    document.getElementById('avatar-panel').style.display = 'none';
    document.getElementById('ability-panel').style.display = 'none';

    // Mostrar el panel central correspondiente al ID
    if(panelId==="class"||panelId==="race-subrace" || panelId==="alignment"){
        document.getElementById(panelId + '-panel').style.display = 'flex';

    }else{
        document.getElementById(panelId + '-panel').style.display = 'block';
       // document.getElementById(panelId + '-panel').style.width ='80vh';

    }   
}

function showClassDetail(){
    this.style.background = 'black';
}

function sumar() {
    var input = document.getElementById('numeroInput');
    input.value = parseInt(input.value) + 1;
}

function restar() {
    var input = document.getElementById('numeroInput');
    input.value = parseInt(input.value) - 1;
}

