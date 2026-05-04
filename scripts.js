const cookingContainer = document.querySelector(".cooking-container");
const cookingThings = [
    {
        title: "Japanese Curry",
        image: "/images/jpcurry_crop.jpg",
    },
    {
        title: "Potato Soup",
        image: "/images/potsoup.jpg",
    },
    {
        title: "Tomato Soup & Grilled Cheese",
        image: "/images/tomsoup.jpg",
    },
    {
        title: "Stromboli",
        image: "/images/stromb_crop.jpg",
    },
    {
        title: "Habaneros",
        image: "/images/habs.jpg",
    },
]

for (const item of cookingThings) {
    const itemDiv = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemTitle = document.createElement("p");
    itemImg.src = item.image;
    itemImg.alt = item.title;
    itemTitle.textContent = item.title;
    itemDiv.appendChild(itemImg);
    itemDiv.appendChild(itemTitle);
    cookingContainer.appendChild(itemDiv);
}
