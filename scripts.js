const catImages = [
    "catindryer.jpg", "babaAndBaby.jpg", "PXL_20260531_143439042.jpg", "PXL_20260630_024101277.jpg", "PXL_20260531_151157574.jpg", "20250406_180529.jpg", "catinfridge.jpg",  
    "PXL_20260630_024123147.jpg", "PXL_20260630_024156945.jpg", "PXL_20260630_024220649.MP.jpg", "PXL_20260630_024411250.jpg", "PXL_20260630_024435088.jpg",
    "PXL_20251103_000841904.jpg", "PXL_20251103_000842723.jpg", "PXL_20260528_013031843.jpg", "PXL_20251103_022555781.jpg", 
    "PXL_20260327_231953866.jpg", "Snapchat-668973871.jpg", "Snapchat-2123923997.jpg", 
    "Snapchat-4195133542.jpg", "Snapchat-6413555412.jpg",
];

const cookingThings = [
    "PXL_20260704_014509613.jpg",
    "PXL_20260702_010115411.MP.jpg",
    "jpcurry_crop.jpg",
    "potsoup.jpg",
    "tomsoup.jpg",
    "stromb_crop.jpg",
    "habs.jpg",
];

const catContainer = document.querySelector(".cat-container");
if (catContainer) {
    for (const img of catImages) {
        const imgElement = document.createElement("img");
        const imgA = document.createElement("a");
        imgA.href = `/images/cats/${img}`;
        imgA.target = "_blank";
        imgElement.alt = `Cat image: ${img}`;
        imgElement.src = `/images/cats/${img}`;
        imgA.appendChild(imgElement);
        catContainer.appendChild(imgA);
    }
}

const cookingContainer = document.querySelector(".cooking-container");
if (cookingContainer) {
    for (const item of cookingThings) {
        const itemDiv = document.createElement("div");
        const itemImg = document.createElement("img");
        const itemA = document.createElement("a");
        itemImg.src = `/images/cooking/${item}`;
        itemImg.alt = `Cooking image: ${item}`;
        itemA.href = `/images/cooking/${item}`;
        itemA.appendChild(itemImg);
        itemA.target = "_blank";
        itemDiv.appendChild(itemA);
        cookingContainer.appendChild(itemDiv);
    }
}
