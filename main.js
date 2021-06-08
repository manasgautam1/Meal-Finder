const meal = document.getElementById('meal');
const search = document.getElementById('searchMeal');
const random = document.getElementById('randomMeal');
const searchedMeal = document.getElementById('searchedMeal');
const searchResult = document.getElementById('searchResult');
const mealByID = document.getElementById('mealByID');

search.addEventListener('click', searchMeal);
random.addEventListener('click', searchRandomMeal);
searchedMeal.addEventListener('click', seacrhMealById);

//FETCH RANDOM MEAL
async function fetchRandomMeal() {
  // console.log(id);
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);

  // console.log(res);
  const data = await res.json();

  // console.log(data);
  displayMealByID(data.meals[0]);
  searchResult.innerHTML = `<p class="p-random">Here's your random meal!!<p>`;
}

//RANDOM MEAL
function searchRandomMeal(e) {
  const input = meal.value;

  fetchRandomMeal();
  mealByID.innerHTML = '';
  searchedMeal.innerHTML = '';
}

//DISPLAY MEAL BY ID
function displayMealByID(meal) {
  mealByID.innerHTML = '';
  // console.log(meal);
  // console.log(meal.strInstructions);

  const div = document.createElement('div');
  text = `
  <h1>${meal.strMeal}</h1>
  <div class="img"><img src="${meal.strMealThumb}"></div>
  <div class="title">
  <p>Category : ${meal.strCategory}</p>
  <p>Area : ${meal.strArea}</p>
  </div>
  <div class="instructions">${meal.strInstructions}</div>
  <hr>
  <h2 class="ingredients-head">Ingredients</h2>
  `;

  let list = '';
  for (let i = 1; i <= 20; i++) {
    const nam1 = `strIngredient${i}`;
    const nam2 = `strMeasure${i}`;
    if (meal[nam1] === '') {
      break;
    } else {
      list += `<li class="ingredient-item">${meal[nam1]}-${meal[nam2]}</li>`;
    }
  }
  // console.log(list);
  text += list;
  text += '<hr>';
  div.innerHTML = text;

  mealByID.appendChild(div);
}

//FETCH MEAL BY ID
async function fetchMealByID(id) {
  // console.log(id);
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  // console.log(res);
  const data = await res.json();

  // console.log(data);
  displayMealByID(data.meals[0]);
}

//SEARCH MEAL BY ID
function seacrhMealById(e) {
  if (e.target.classList.contains('searchID')) {
    fetchMealByID(e.target.id);
    // console.log(e.target);
  }
}

//DISPLAY SEARCHED MEAL
function displaySearchedMeal(meals) {
  // console.log(meals);
  searchResult.innerHTML = `Search results for '${meal.value}':`;

  meals.forEach((meal) => {
    const div = document.createElement('div');
    // div.id=`${meal.idMeal}`;
    div.innerHTML = `<img src="${meal.strMealThumb}">
                     <div class="searchID" id="${meal.idMeal}">${meal.strMeal}</div>`;

    searchedMeal.appendChild(div);
  });
}

//FETCH SEARCHED MEAL
async function fetchSearchedMeal(key) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`
  );

  // console.log(res);
  const data = await res.json();

  // console.log(data);
  displaySearchedMeal(data.meals);
}

//SEARCH MEAL
function searchMeal(e) {
  e.preventDefault();

  const input = meal.value;

  if (input === '') {
    alert('Enter Search Item');
  } else {
    fetchSearchedMeal(input);
    mealByID.innerHTML = '';
    searchedMeal.innerHTML = '';
    searchedMeal.innerHTML = '';
  }
}

searchRandomMeal();
