
let cardContainer = document.getElementById("cardContainer")

async function getCategories() {
    try {
        const res = await fetch("assets/data/categories.json")
        const finalRes = await res.json()
        console.log(finalRes);
        finalRes.forEach(category => {
            cardContainer.appendChild(renderCard(category))
        });
    } catch (error) {
        console.log(`this is error from catchaya`, error)
    }
}
getCategories()

function renderCard(categoryData) {
    const card = document.createElement("div")
    card.classList.add("underlay")
    card.innerHTML = `
        <div class="boxs__box">
        <div class="boxs__box__header display-h">
            <h2>${categoryData.category}</h2>
            <img src="${categoryData.image}" alt="" width="40px">
        </div>
        <p>${categoryData.description.en}</p>
        <div class="boxs__box__button display-h">
            <button class="display-h">
            Explore Now
            <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
        </div>
    `
    return card
}
