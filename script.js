//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    
const loadingRow = document.createElement('tr');
loadingRow.id = 'loading';  // Add this line to give the row an ID
loadingRow.innerHTML = '<td colspan="2" class="text-center">Loading...</td>';
output.appendChild(loadingRow);
    
    const createPromise = (index) => {
        const delay = 1000 + Math.random() * 2000;
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    name: `Promise ${index + 1}`,
                    time: delay / 1000
                });
            }, delay);
        });
    };
    
    const promises = [
        createPromise(0),
        createPromise(1),
        createPromise(2)
    ];
    
    const startTime = performance.now();
    
    Promise.all(promises)
        .then(results => {
            const endTime = performance.now();
            const totalTime = (endTime - startTime) / 1000;
            
            output.innerHTML = '';
            
            results.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.name}</td>
                    <td>${result.time.toFixed(3)}</td>
                `;
                output.appendChild(row);
            });
            
            // Add total row
            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
                <td><strong>Total</strong></td>
                <td>${totalTime.toFixed(3)}</td>
            `;
            output.appendChild(totalRow);
        })
        .catch(error => {
            console.error('Error:', error);
            output.innerHTML = '<tr><td colspan="2" class="text-danger">Error loading promises</td></tr>';
        });
});