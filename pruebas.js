
function changeCentralPanel(panelId) {
    // Ocultar todos los paneles centrales
    document.getElementById('welcome-panel').style.display = 'none';
    document.getElementById('race-subrace-panel').style.display = 'none';
    document.getElementById('class-panel').style.display = 'none';
    document.getElementById('alignment-panel').style.display = 'none';
    document.getElementById('backstory-panel').style.display = 'none';
    document.getElementById('ability-panel').style.display = 'none';

    // Mostrar el panel central correspondiente al ID
    if(panelId==="class"){
        document.getElementById(panelId + '-panel').style.display = 'flex';
        document.getElementById(panelId + '-panel').style.flex = '1';
    }else{
        document.getElementById(panelId + '-panel').style.display = 'block';
        document.getElementById(panelId + '-panel').style.height = '80vh';
        
    }
    
}