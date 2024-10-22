document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            const levelCounts = {};
            const tableBody = document.getElementById('tableBody');

            // Process the JSON data to count occurrences of each level and populate the table
            for (const file in jsonData[""]) {
                jsonData[""][file].forEach(item => {
                    const level = item["Level"];
                    if (levelCounts[level]) {
                        levelCounts[level]++;
                    } else {
                        levelCounts[level] = 1;
                    }

                    // Add data to the table
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item["Class"]}</td>
                        <td>${item["Start Line"]}</td>
                        <td>${item["End Line"]}</td>
                        <td>${item["Displacement"]}</td>
                        <td>${item["Level"]}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }

            // Prepare data for the bar chart
            const labels = Object.keys(levelCounts);
            const data = Object.values(levelCounts);

            // Create the bar chart
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Count of Elements by Level',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Initialize DataTables
            $(document).ready(function() {
                $('#dataTable').DataTable();
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
