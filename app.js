console.log('Time to Party🎉');

// NOTE const creates a variable, but the variable cannot be changed
const animals = [
  {
    name: 'Bob',
    picture: '🦒',
    diet: 'leaves',
    feature: 'long neck',
    habitat: 'desert'
  },
  {
    name: 'Jerry',
    picture: '🐅',
    diet: 'meat',
    feature: 'teeth',
    habitat: 'jungle'
  },
  {
    name: 'Tina',
    picture: '🦙',
    diet: 'grass',
    feature: 'long neck',
    habitat: 'mountain'
  },
  {
    name: 'Reggie',
    picture: '🐘',
    diet: 'sugarcane',
    feature: 'teeth',
    habitat: 'desert'
  },
  {
    name: 'Sanchez',
    picture: '🐐',
    diet: 'grass',
    feature: 'teeth',
    habitat: 'mountain'
  },
  {
    name: 'Perry',
    picture: '🐒',
    diet: 'fruit',
    feature: 'arms',
    habitat: 'jungle'
  },
  {
    name: 'Iggy',
    picture: '🐻',
    diet: 'fruit',
    feature: 'arms',
    habitat: 'mountain'
  },
  {
    name: 'Johnny',
    picture: '🦕',
    diet: 'leaves',
    feature: 'long neck',
    habitat: 'volcanic'
  },
  {
    name: 'Ulysses',
    picture: '🦖',
    diet: 'meat',
    feature: 'arms',
    habitat: 'volcanic'
  },
  {
    name: 'Oslo',
    picture: '🦧',
    diet: 'fruit',
    feature: 'arms',
    habitat: 'jungle'
  },
]

let killer = animals[9]
createAKiller() // for testing, we started with oslo always being the killer, but ended with creating a killer that randomly selects one, and overwrites the animals[9] choice

// NOTE the animals to draw, needs to be an array of animals, when we invoke the function
function drawAnimals(animalsToDraw) {
  // find the animals (all of them) ✅
  // Create local variable to add animal pictures to ✅
  let animalHTML = ''
  // debugger
  // loop over animals, adding their picture to the variable
  // animals.forEach((animal) => {
  animalsToDraw.forEach((animal) => {
    console.log(animal.name); // 🧪 are we looping as we expected to? 
    animalHTML += `<span title="${animal.name}">${animal.picture}</span>`
  })
  // log 🧪 testing is very important
  console.log('all animals', animalHTML);
  // get element to draw into
  const animalPartyElm = document.getElementById('animal-party')
  // change innerHTML to my variable
  animalPartyElm.innerHTML = animalHTML // 🧪 Did it draw to the page?
}

drawAnimals(animals)
// drawAnimals([
//   {
//     name: 'Perry',
//     picture: '🐒',
//     diet: 'fruit',
//     feature: 'thumbs',
//     habitat: 'jungle'
//   }
// ])

function drawDesertAnimals() {
  let desertAnimals = animals.filter((animal) => {
    return animal.habitat == 'desert'
  })
  console.log('🌵 animals', desertAnimals);
  // debugger
  drawAnimals(desertAnimals)
}

function drawMountainAnimals() {
  let mountainAnimals = animals.filter(animal => animal.habitat == 'mountain')
  drawAnimals(mountainAnimals)
}

// NOTE this opens the door for any habitat to be found, via the parameter
function drawAnimalsByHabitat(habitat) {
  let habitatAnimals = animals.filter((animal) => animal.habitat == habitat)
  drawAnimals(habitatAnimals)
}

function drawAnimalsByDiet(dietType) {
  let dietAnimals = animals.filter((animal) => animal.diet == dietType)
  drawAnimals(dietAnimals)
}

// NOTE this takes in two params, example case would be; property: 'feature', value: 'arms
function drawFilteredAnimalsByAnything(property, value) {
  // let filteredAnimals = animals.filter(animal => animal['feature'] == value)
  // debugger
  // NOTE the [ ] on animal, allow us to pass a variable as the the property we want to access, on the animal object, instead of using the . to specify which property
  let filteredAnimals = animals.filter(animal => animal[property] == value)
  drawAnimals(filteredAnimals)
}

function drawEverything() {
  drawAnimals(animals)
}

function murderTakePlace() {
  // NOTE Math floor and Math random used in this fashion will give us a random animal out of the array
  // The && works as an AND, both conditions must be true, for the condition to evaluate as true
  let potentialVictims = animals.filter(animal => animal != killer && animal.picture != '👻')
  let randomAnimal = potentialVictims[Math.floor(Math.random() * potentialVictims.length)]
  console.log('🎲🎲', randomAnimal);
  randomAnimal.picture = '👻'
  drawAnimals(animals)
  checkForAllDeadAnimals()
}

murderTakePlace()

function accuseKiller() {
  let accusedName = window.prompt("Who done it?")
  console.log('accusing', accusedName);
  let accusedAnimal = animals.find(animal => animal.name == accusedName)
  console.log("Are you really accusing", accusedAnimal);
  if (accusedAnimal == killer) {
    window.alert('You got em, book em 🚓')
  } else if (accusedAnimal.picture == '👻') {
    window.alert("Uhh detective, that is one of the victims... Imma need that badge from you")
    murderTakePlace()
  } else {
    window.alert("You stupid, might want to look over the clues again")
    murderTakePlace()
    generateClue()
  }
}

function checkForAllDeadAnimals() {
  let deadAnimals = animals.filter(animal => animal.picture == '👻')
  if (deadAnimals.length == animals.length - 1) {
    console.warn("all animals are dead, you failed to catch the killer")
    window.alert("All animals are dead and the killer got away")
  }
}


let potentialClues = ['picture', 'habitat', 'feature', 'diet']
function generateClue() {
  let clueProperty = potentialClues.pop()
  // let clueProperty = potentialClues.unshift() pop removes the last item, and unshift removes the first item
  console.log('give me a clue', clueProperty);

  const clueElm = document.getElementById('clues')

  switch (clueProperty) {
    case 'diet':
      clueElm.innerHTML += `<p>Scraps of ${killer.diet} were found at the scene of the crime</p>`
      break
    case 'feature':
      clueElm.innerHTML += `<p>There as signs indicating the victim was killed using ${killer.feature}</p>`
      break
    case 'habitat':
      clueElm.innerHTML += `<p>There was a trail of blood leading into the ${killer.habitat} area of the party</p>`
      break
    case 'picture':
      clueElm.innerHTML += `<p>Witnesses described seeing something that looked roughly like <span class="blurry">${killer.picture}</span></p>`
      break
    default:
      clueElm.innerHTML += `<p> There is no more information to gleam from this</p>`
  }
}

function createAKiller() {
  killer = animals[Math.floor(Math.random() * animals.length)]
}
