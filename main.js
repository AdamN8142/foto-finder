var titleInput       = document.querySelector('.title-input')
var captionInput     = document.querySelector('.caption-input')
var chooseFileBtn    = document.querySelector('.choose-file-btn')
var viewFavoritesBtn = document.querySelector('.view-favorites-btn')
var addToAlbumButton = document.querySelector('.add-to-album-btn')
var searchInput      = document.querySelector('.search-bar')
var cardContainer    = document.querySelector('.card-container')


addToAlbumButton.addEventListener('click', createNewCard);
cardContainer.addEventListener('click', removeCard);
cardContainer.addEventListener('click', updateCard);
searchInput.addEventListener('keyup',searchCards);


var photosArray = [];


window.onload = function(){
  if(localStorage.getItem('allPhotos')!==null){
    loadFromLocal();
  }
}

function createNewCard(){
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
}


function addToPage(photo){
  var cardContent = document.createElement('article');
  cardContent.dataset.id =`${photo.id}`
  cardContent.classList.add('card')
  cardContent.innerHTML =  
  `
  <h3 class = 'card-title card-info'contenteditable = true>${photo.title}</h3>
  <img src = '${photo.file}' class = 'image'>
  <p class = 'card-text card-info' contenteditable = true>${photo.caption}</p>
  <section class = 'bottom-of-card'>
  <div class = 'icon-section'>
  <button class = 'delete-icon icon'></button>
  <button class = 'favorite-icon icon'></button>
  </div> 
  </section>
  `;
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
        })  
      photosArray[index].updatePhoto(title,caption,photosArray,index)
    }
  }
}

function removeCard(){
  if (event.target.classList.contains('delete-icon')) {
    var cardElement = event.target.closest('.card');
    var photoID = parseInt(cardElement.dataset.id);
    var index = photosArray.findIndex(function(photo){
      return photo.id === photoID
    })

    cardElement.remove();
    photosArray[index].deleteFromStorage(photosArray,index)
  } 
}


// function editFavorite(){
//   if(event.target.classList.contains('.favorite-icon')){
//     var selectedCard = event.target.closest('.card');
//     var selectedCardId = selectedCard.dataset.name;
//     var index = photosArray.findIndex(function(desiredCard)){
//       return desiredCard.id == selectedCardId;
//     }
//   }
// }



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
  photosArray.forEach(function(photo){
    addToPage(photo);
  })
}





