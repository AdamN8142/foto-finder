var titleInput       = document.querySelector('.title-input')
var captionInput     = document.querySelector('.caption-input')
var chooseFileBtn    = document.querySelector('.choose-file-btn')
var viewFavoritesBtn = document.querySelector('.view-favorites-btn')
var addToAlbumButton = document.querySelector('.add-to-album-btn')
var searchInput      = document.querySelector('.search-bar')
var cardContainer    = document.querySelector('.card-container')
var showFavsOrAll    = document.querySelector('.toggle-button')
var moreOrLess       = document.querySelector('.more-less-toggle')
var favoriteButton   = document.querySelector('.view-favorites-btn')
var form             = document.querySelector('.form-content')

addToAlbumButton.addEventListener('click', createNewCard);
cardContainer.addEventListener('click', removeCard);
cardContainer.addEventListener('click', updateCard);
searchInput.addEventListener('keyup',searchCards);
cardContainer.addEventListener('click', editFavorite);
showFavsOrAll.addEventListener('click',favsOrAll)
moreOrLess.addEventListener('click',toggleMoreLess)
form.addEventListener('input',enableButtons)

var photosArray = [];

window.onload = function(){
  if(localStorage.getItem('allPhotos')!==null){
    loadFromLocal();
  }
    addToAlbumButton.disabled = true;
}

function enableButtons(){
  if(titleInput.value === ''|| captionInput.value === '' || chooseFileBtn.files.length === 0){
    addToAlbumButton.disabled = true
  }else{
    addToAlbumButton.disabled = false;
  }
}

function createNewCard(event){
  event.preventDefault();
  var reader = new FileReader();
  var file = chooseFileBtn.files[0];
  var title = titleInput.value;
  var caption = captionInput.value;
  reader.readAsDataURL(file);
  reader.onload = function(event){
    var photoURL = event.target.result;
    var photo = new Photo(Date.now(),photoURL,title,caption);
    photo.saveToStorage(photosArray,true)
    addToPage(photo);
  }
  clearInputs();
}

function clearInputs(){
  titleInput.value = "";
  captionInput.value = "";
  chooseFileBtn.value = "";
}

function addToPage(photo){
  var cardContent = document.createElement('article');
  cardContent.dataset.id =`${photo.id}`
  cardContent.classList.add('card')
  cardContent.innerHTML =  
  `<h3 class = 'card-title card-info'contenteditable = true>${photo.title}</h3>
  <img src = '${photo.file}' class = 'image'>
  <p class = 'card-text card-info' contenteditable = true>${photo.caption}</p>
  <section class = 'bottom-of-card'>
  <div class = 'icon-section'>
  <button class = 'delete-icon icon'></button>
  <button class = 'favorite-icon icon'></button>
  </div> 
  </section>`;
  cardContainer.prepend(cardContent);
}

function updateCard(event){
  if(event.target.closest('.card')!==null){
   event.target.onblur = function(event){
    var id = parseInt(event.target.closest('.card').dataset.id) 
    var title = document.querySelector(`.card[data-id="${id}"] .card-title`).innerText
    var caption = document.querySelector(`.card[data-id="${id}"] .card-text`).innerText
    var index = photosArray.findIndex(function(photo){
      return photo.id === id
    }); 
    var favorite = photosArray[index].favorite
    photosArray[index].updatePhoto(title,caption,photosArray,index,favorite)
    }
  }
}

function removeCard(){
  if (event.target.classList.contains('delete-icon')) {
    var cardElement = event.target.closest('.card');
    var photoID = parseInt(cardElement.dataset.id);
    var index = photosArray.findIndex(function(photo){
      return photo.id === photoID
    });
    photosArray[index].deleteFromStorage(photosArray,index)
    favoriteCounter();
    cardElement.remove();
  } 
}

function editFavorite(event){
  if(event.target.classList.contains('favorite-icon')){
    var selectedCard = event.target.closest('.card');
    var selectedCardId = selectedCard.dataset.id;
    var index = photosArray.findIndex(function(desiredCard){
      return desiredCard.id == selectedCardId;
    });
    photosArray[index].updatePhoto(photosArray[index].title, photosArray[index].caption,
      photosArray, index, !photosArray[index].favorite);
    changeOfHeart(photosArray[index])
    favoriteCounter();
  } 
}

function changeOfHeart(photo){
  var id = photo.id
  var favoriteIcon = document.querySelector(`.card[data-id="${id}"] .favorite-icon`)
  if(photo.favorite === true){
   favoriteIcon.style.backgroundImage = 'url(Images/favorite-active.svg)'
 } else{
   favoriteIcon.style.backgroundImage = 'url(Images/favorite.svg)'
 }
}

function viewFavorites(event){
  var favoritesArray = photosArray.filter(function(photo){
    return photo.favorite === true;
  })
  document.querySelector('.card-container').innerHTML ='';
  favoritesArray.forEach(function(photo){
    addToPage(photo);
    changeOfHeart(photo);
  });
  event.target.classList.replace('view-favorites-btn','show-all-btn');
  event.target.innerHTML = "Show All";
}

function showAll(event){
  document.querySelector('.card-container').innerHTML ='';
  photosArray.forEach(function(photo){
    addToPage(photo)
    changeOfHeart(photo)
  });
  event.target.classList.replace('show-all-btn','view-favorites-btn')  
  event.target.innerHTML = "View Favorites";
  favoriteCounter();
}

function showTen(){
  document.querySelector('.card-container').innerHTML ='';
  var lastTen = photosArray.filter(function(photo,index){
   return index >= photosArray.length-10 
 })
  lastTen.forEach(function(photo){
    addToPage(photo);
    changeOfHeart(photo);
  });
}

function toggleMoreLess(){
  if(event.target.classList.contains('show-more')){
    document.querySelector('.card-container').innerHTML ='';
    photosArray.forEach(function(photo){
      addToPage(photo);
      changeOfHeart(photo);
    });
    event.target.classList.replace('show-more','show-less')  
    event.target.innerHTML = "Show Less";} 
  else {
   showTen()
   event.target.classList.replace('show-less','show-more')  
   event.target.innerHTML = "Show More";}} 

  function favsOrAll(event){
    event.preventDefault();
    if (event.target.classList.contains('view-favorites-btn')){
      viewFavorites(event);
    }else if (event.target.classList.contains('show-all-btn')){
      showAll(event);
    }
  }

function searchCards(event){
  document.querySelector('.card-container').innerHTML ='';
  photosArray.forEach(function(photo){
    addToPage(photo);
  });
  var cardInfo = document.querySelectorAll('.card');
  cardInfo.forEach(function(elem){
    if(!elem.innerText.includes(event.target.value)){
      elem.closest('.card').remove();
    };
  })
}

function loadFromLocal(){
  photosArray = JSON.parse(localStorage.getItem('allPhotos'));
  photosArray = photosArray.map(function(photo){
    return photo = new Photo(photo.id,photo.file,photo.title,photo.caption,photo.favorite);
  })
  showTen();
  favoriteCounter();
}

function favoriteCounter(){
  var favoritesArray = photosArray.filter(function(photo){
    return photo.favorite === true;
  });
  if(showFavsOrAll.innerText !== 'Show All'){
    favoriteButton.innerHTML = `View ${favoritesArray.length} Favorites`;
  }
}
