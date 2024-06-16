const searchInput = document.getElementById('search-input');
const searchForm= document.getElementById('search-form');
const searchButton = document.getElementById('search-button');
const pokeName = document.getElementById('pokemon-name');
const pokeId = document.getElementById('pokemon-id');
const pokeWeight = document.getElementById("weight");
const pokeImgContainer= document.getElementById('sprite-container')
const pokeHeight = document.getElementById('height');
const pokeTypes = document.getElementById('types');


searchForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const {value} = searchInput;
  const response = fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${value.toLowerCase()}`);
  response.then(e=>e.json()).then(data=>updateUI(data)).catch(()=>alert("Pokémon not found"));

})


const updateUI= (pokeData)=>{

  const {types,stats}= pokeData;
  displayTopOutput(pokeData)
   


  const baseStats=stats.map(({base_stat,stat})=>{
  document.getElementById(stat.name).textContent=base_stat})


 types.forEach(({type})=>{
    let typesHTML= `<span class="type uppercase  ${type.name}">${type.name}</span>`;
   pokeTypes.insertAdjacentHTML('afterbegin', typesHTML);
 
  })


}

const displayTopOutput=(pokeData)=>{
    resetUI();
    const {name,id,height,weight}= pokeData;
    pokeName.textContent= name;
    pokeId.textContent=`#${id}`;
    pokeWeight.textContent=`Weight: ${weight}`; 
    pokeHeight.textContent= `Height: ${height}`;
    pokeImgUI(pokeData);
}


const pokeImgUI=(img)=>{
    const {sprites}= img;
    const {front_default}= sprites;
    const pokeImg = `<img id='sprite' src=${front_default}>` 
    pokeImgContainer.insertAdjacentHTML('afterbegin',pokeImg)
}

const resetUI=()=>{
    pokeImgContainer.innerHTML=null;
    pokeTypes.innerHTML=null;
}

