const tempChartCanvas = document.getElementById('tempChart').getContext('2d');

async function loadPlantData() {
    try {
        const response = await fetch('data/week.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const plantData = await response.json();

        return plantData;
    }
    catch (error) {
        console.error('Error loading plant data:', error);
    }


}

const buildTempChart = (data) => {
    const labels = data.map(r => new Date(r.recordedAt).toLocaleString());
    const temperatureData = data.map(r => r.tempC);

    new Chart(tempChartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatureData,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Temperature Over Time'
                }
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    loadPlantData().then(data => {
        buildTempChart(data);
    });
});
