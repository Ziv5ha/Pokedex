//Inputs
const searchBox = document.getElementById("search-box")
const searchButton = document.getElementById("search-button")
// Outputs
const idElem = document.getElementById("pokemon-id")
const nameElem = document.getElementById("pokemon-name")
const renderElem = document.getElementById("pokemon-render")
const speciesElem = document.getElementById("pokemon-species")
const typeElem = document.getElementById("pokemon-type")
const heightElem = document.getElementById("pokemon-height")
const weightElem = document.getElementById("pokemon-weight")
const familyTreeElem = document.getElementById("pokemon-family-tree")
const descriptionElem = document.getElementById("pokemon-description")

async function getPokemon(pokemonId){
    const pokemonPromise = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    return pokemonPromise.data
}
async function displayPokemon(pokemonId){
    deleteTypes()
    const pokemonData = await getPokemon(pokemonId)
    idElem.innerText = pokemonData.id
    nameElem.innerText = pokemonData.name
    renderElem.src = `https://img.pokemondb.net/sprites/home/normal/${pokemonData.name}.png`
    speciesElem.innerText = pokemonData.species.name
    displayTypes(pokemonData.types)
    heightElem.innerText = pokemonData.height
    weightElem.innerText = pokemonData.weight
    console.log(pokemonData)
}
//pokemons can have multible types. this function handles those types
function displayTypes(types){
    for (const type of types){
        const typeSpan = document.createElement("span")
        typeSpan.innerText = type.type.name
        typeSpan.classList.add("type-box", `${type.type.name}`)
        typeElem.appendChild(typeSpan)
    }
}
// Reset types before the next search
function deleteTypes(){
    const prevTypes = document.getElementsByClassName("type-box")
    if (prevTypes.length>0) typeElem.innerHTML = ""
}
displayPokemon(280)

