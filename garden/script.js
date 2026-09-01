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

const buildMoistureChart = (data) => {
    console.log(data);
    const labels = data.map(r => new Date(r.recordedAt).toLocaleString());
    const moistureData = data.map(r => r.moisturePercentage);

    new Chart(document.getElementById('moistureChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Soil Moisture',
                data: moistureData,
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    text: 'Soil Moisture Over Time'
                }
            }
        }
    });
};

const buildLightChart = (data) => {
    const labels = data.map(r => new Date(r.recordedAt).toLocaleString());
    const lightData = data.map(r => r.lightLux);

    new Chart(document.getElementById('lightChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Light Intensity (Lux)',
                data: lightData,
                fill: false,
                borderColor: 'rgba(255, 206, 86, 1)',
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
                    text: 'Light Intensity Over Time'
                }
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    loadPlantData().then(data => {
        buildTempChart(data);
        buildMoistureChart(data);
        buildLightChart(data);
    });
});





/* Load images and words*/
const yapContainer = document.getElementsByClassName('yapContainer')[0];

const imagesAndWords = [
    {
        "title":"Garden Cat: Guardian and Caretaker",
        "words":"Garden Cat(legal name) watches over our plants, ensuring they thrive under his vigilant gaze. Protected by his slumber and dreams.",
        "image":"garden_cat.png",
        "orientation":"left" //left/right
    },
    {
        "title":"Start of this year's Tomatoes",
        "words":"I'm planting tomatoes this year! Peppers are usually my go-to, but last year I had success with cherry tomatoes so I figured I'd try beefsteak tomatoes this year.",
        "image":"PXL_20260802_202903613.MP.jpg",
        "orientation":"right" //left/right
    },
        {
        "title":"Pumkin Patch: A Seasonal Delight",
        "words":"My lovely partner has been growing pumpkins in our garden, getting ready for Halloween and the fall.",
        "image":"PXL_20260815_223721856.jpg",
        "orientation":"left" //left/right
    },
]

const imageCSS = "max-width: min(100%, 300px); height: auto; margin: 20px; padding: 10px;"
const imageContainerCSS = "display: flex; flex-direction: column; align-items: center; justify-content: center; max-height: 300px; max-width: 300px; overflow: hidden;"
const outterDivCSS = "display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 20px; margin-top: 20px;"

if (yapContainer){
    for(const iw of imagesAndWords){
        const outterDiv = document.createElement("div")
        outterDiv.style.cssText = outterDivCSS;
        
        const leftDiv = document.createElement("div")
        const rightDiv = document.createElement("div")
        const title = document.createElement("h3")
        const words = document.createElement("p")
        const image = document.createElement("img")
        image.style.cssText = imageCSS
        const imageContainer = document.createElement("div")
        imageContainer.style.cssText = imageContainerCSS;
   
        title.textContent = iw.title
        words.textContent = iw.words
        image.src = `/images/garden/${iw.image}`
        imageContainer.appendChild(image)

        if (iw.orientation == "left"){
            console.log('here')
            rightDiv.appendChild(title)
            rightDiv.appendChild(words)
            outterDiv.appendChild(imageContainer)
            outterDiv.appendChild(rightDiv)
            yapContainer.appendChild(outterDiv)

        }
        else{//image on right
            leftDiv.appendChild(title)
            leftDiv.appendChild(words)
            outterDiv.appendChild(leftDiv)
            outterDiv.appendChild(imageContainer)
            yapContainer.appendChild(outterDiv)
        }
    }
}


/* Misc Images */
const miscImagesContainer = document.querySelector(".miscImages");
const miscImages = ["PXL_20260813_172533996.jpg", "PXL_20260704_200419945.jpg", "PXL_20260711_175316395.jpg", "PXL_20260531_151059327.jpg"];

if (miscImagesContainer) {
    for (const img of miscImages) {
        const imgElement = document.createElement("img");
        const imgDiv = document.createElement("div")
        imgElement.src = `/images/garden/${img}`;
        imgElement.style.cssText = "max-width: min(100%, 130px); height: auto; margin: 10px; padding: 10px;";
        imgDiv.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: center; max-height: 130px; max-width: 130px; overflow: hidden; border: 3px dashed var(--med); border-radius: 4px;";
        imgDiv.appendChild(imgElement);
        miscImagesContainer.appendChild(imgDiv);
    }

}