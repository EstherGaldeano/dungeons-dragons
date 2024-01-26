//API DATA
const apiURL= 'https://www.dnd5eapi.co/api';

async function fetchData(endpoint){
    const response = await fetch (apiURL +'/'+endpoint);
    if (!response.ok) return []
    const data = await response.json();
    return data;
}

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
            // const maxRotation = 5; //degrees
            // const maxTranslation = 1.5; //rem
            // const rot = Math.random() * maxRotation * 2 - maxRotation;
            // const trans = Math.random() * maxTranslation * 2 - maxTranslation;
            // box.querySelector(
            // "div"
            // ).style.transform = `rotate(${rot}deg) translate(${trans}rem)`;
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
      //  raceTemplate.querySelector('.race-info').textContent = item.name;
        const box = raceTemplate.cloneNode(true);
        raceFragment.appendChild(box);  
    });
        racePanel.appendChild(raceFragment);
    



/**************************ALIGNMENT***************************************** */
    const alignmentTemplate = document.querySelector('#box-alignments-template').content; 
    const alignmentPanel = document.querySelector('#alignment-panel');
    const alignmentFragment = document.createDocumentFragment();
   // let alignmentResponse = await fetch('../data/character-alignments.json');
  //  let alignmentData = await alignmentResponse.json();
    let dndAlignments = [];
    let dndAligDetails = '';

    function fetchAlignments(){
        fetchData('alignments')
        .then(res =>res.json())
        .then(data1=>{
                data1.data.forEach(item=>{
                alignmentTemplate.querySelector('p').textContent = item.name;
        });
        return fetch("https://www.dnd5eapi.co/api/alignments/"+item.name);
         })
         .then(res =>res.json())
         .then(data2=>{
            data2.data.forEach(element =>{
                alignmentTemplate.querySelector('.alignment-detail').textContent = element.desc;
            });
          });
      }


    // fetchData('alignments')
    // .then((item)=>{
    //      dndAlignments = item.results;
    //      dndAlignments.forEach(item=>{
    //         alignmentTemplate.querySelector('p').textContent = item.name;

    //         fetchData('alignments/'+ item.index).then((element)=>{  
    //         //    dndAligDetails = element;
    //             console.log(element.desc);
    //             alignmentTemplate.querySelector('.alignment-detail').textContent = element.desc;
    //         });

    //         const alignmentBox = alignmentTemplate.cloneNode(true);
    //         alignmentFragment.appendChild(alignmentBox); 
    //     });
    //     alignmentPanel.appendChild(alignmentFragment);
    // });




    async function fetchDataFromFile(){

        let response = await fetch('books7.json');
        let data = await response.json();
        let totalAmount=0;
        const bookQuantity = 2;
    
        data.forEach((data)=>{
          const price = data.price;
          totalAmount+=(price*bookQuantity);
        })
        console.log(totalAmount);
    }
    
    window.addEventListener('DOMContentLoaded',  fetchDataFromFile);

 window.addEventListener('DOMContentLoaded',  fetchAlignments);






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



        // alignmentData.forEach(element =>{
            //     if(element.id === item.index){
            //         alignmentTemplate.querySelector('img').src = element.imgURL;
            //     }
            // });


            