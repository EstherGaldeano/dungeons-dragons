var { jsPDF } = window.jspdf;
var { html2canvas } = window.html2canvas;
var pdf = new jsPDF();
const printPDF = () => {
    let element = document.getElementById('summary');
    let clone = element.cloneNode(true);
    clone.style.width = '595px'; // Set width to match A4 size in pixels
    clone.style.height = '1020px'; // Set height to match A4 size in pixels

    // Append the clone to the document body to get accurate CSS
    document.body.appendChild(clone);

    window.html2canvas(clone).then(canvas => {
        // Remove the cloned element from the document body
        document.body.removeChild(clone);

        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/png');

        // Create a jsPDF instance
        var doc = new jsPDF('p', 'pt', 'a4', false);

        // Add the image (canvas) to the PDF
        doc.addImage(imgData, 'PNG', 10, 10, 595-20, 842-20); 


        // Save the PDF
        doc.save('character_sheet.pdf');
    });
};


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('print-pdf-button').addEventListener('click', printPDF)
});// jspdf.plugin.standard_fonts_metrics