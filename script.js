const jsonFiles = ['data1.json', 'data2.json', 'data3.json'];

jsonFiles.forEach((file, index) => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';

            // Create collapsible buttons and content divs for each section
            const projectButton = document.createElement('button');
            projectButton.className = 'collapsible';
            projectButton.textContent = `Project Information`;
            tableContainer.appendChild(projectButton);

            const projectContent = document.createElement('div');
            projectContent.className = 'content';
            projectContent.innerHTML = generateTable(data.project);
            tableContainer.appendChild(projectContent);

            const dcpButton = document.createElement('button');
            dcpButton.className = 'collapsible';
            dcpButton.textContent = `DCP File Details`;
            tableContainer.appendChild(dcpButton);

            const dcpContent = document.createElement('div');
            dcpContent.className = 'content';
            dcpContent.innerHTML = generateTable(data.dcp_file);
            tableContainer.appendChild(dcpContent);

            const timingButton = document.createElement('button');
            timingButton.className = 'collapsible';
            timingButton.textContent = `Timing Analysis`;
            tableContainer.appendChild(timingButton);

            const timingContent = document.createElement('div');
            timingContent.className = 'content';
            timingContent.innerHTML = generateTable(data.timing_analysis);
            tableContainer.appendChild(timingContent);

            document.getElementById('tables-container').appendChild(tableContainer);

            // Attach collapsible functionality
            const collapsibles = tableContainer.querySelectorAll('.collapsible');
            collapsibles.forEach(button => {
                button.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
function generateTable(data) {
    let tableHTML = '<table>';
    for (let key in data) {
        if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            tableHTML += `<tr><td>${key}</td><td>${generateTable(data[key])}</td></tr>`;
        } else if (Array.isArray(data[key])) {
            tableHTML += `<tr><td>${key}</td><td>${generateTable(data[key])}</td></tr>`;
        } else {
            tableHTML += `<tr><td>${key}</td><td>${data[key]}</td></tr>`;
        }
    }
    tableHTML += '</table>';
    return tableHTML;
}