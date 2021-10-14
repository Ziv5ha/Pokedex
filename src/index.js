//Inputs
const searchBox = document.getElementById("search-box")
const searchButton = document.getElementById("search-button")
// Outputs
const spriteElem = document.getElementById("pokemon-sprite")
const idElem = document.getElementById("pokemon-id")
const nameElem = document.getElementById("pokemon-name")
const renderElem = document.getElementById("pokemon-render")
const speciesElem = document.getElementById("pokemon-species")
const typeElem = document.getElementById("pokemon-type")
const heightElem = document.getElementById("pokemon-height")
const weightElem = document.getElementById("pokemon-weight")
const specialtyElem = document.getElementById("pokemon-specialty")
const familyTreeElem = document.getElementById("pokemon-family-tree")

async function getPokemon(pokemonId){
    try{
        const pokemonPromise = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        return pokemonPromise.data
    } catch (error){
        handleError()
        throw error
    }
    
}
async function displayPokemon(pokemonId){
    try{
        removeError()
        deleteTypes()
        const pokemonData = await getPokemon(pokemonId)
        spriteElem.src = pokemonData.sprites.front_default
        idElem.innerText = pokemonData.id
        nameElem.innerText = pokemonData.name
        renderElem.src = `https://img.pokemondb.net/sprites/home/normal/${pokemonData.name}.png`
        speciesElem.innerText = pokemonData.species.name
        displayTypes(pokemonData.types)
        heightElem.innerText = pokemonData.height
        weightElem.innerText = pokemonData.weight
        specialtyElem.innerText = calculateSpecialty(pokemonData.stats)
        console.log(pokemonData)
    } catch (error){
        throw `can't find Pokemon. ${error}`
    }
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
// displayPokemon(280)
function searchPokemon(){
    displayPokemon(searchBox.value)
}
searchButton.addEventListener("click", searchPokemon)

// Error handles
function handleError(){
    const errorElem = document.createElement("div")
    errorElem.id = "error"
    errorElem.innerText = `Error! can't find Pokemon`
    document.body.appendChild(errorElem)
}
function removeError(){
    const checkPrevError = document.getElementById("error")
    if (checkPrevError !== null){
        document.body.removeChild(checkPrevError)
    }
}
// Speciality calculates the pokemon's speciality and returns it.
// For example: alakazam have low defence and very high sp.attack so it's speciality is sp.attack.
function calculateSpecialty(statsObj){
    const sipmleStatsObj = {
        HP: statsObj[0].base_stat,
        ATK: statsObj[1].base_stat,
        DEF: statsObj[2].base_stat,
        SPATK: statsObj[3].base_stat,
        SPDEF: statsObj[4].base_stat,
        }
    const statsArr = [sipmleStatsObj.HP, sipmleStatsObj.ATK, sipmleStatsObj.DEF, sipmleStatsObj.SPATK, sipmleStatsObj.SPDEF]
    const highestStat = Math.max(...statsArr)
    for (const [statName, statValue] of Object.entries(sipmleStatsObj)){
        if (statValue === highestStat) return `The Pokemon's highest stat is ${statName}: ${statValue}`
    }
}

displayPokemon(280)