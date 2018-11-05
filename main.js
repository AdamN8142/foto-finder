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



var photosArray = [];


window.onload = function(){
  if(localStorage.getItem('allPhotos')!==null){
    loadFromLocal();
  }
}

function createNewCard(){
  var title = titleInput.value;
  var caption = captionInput.value;
  var file = chooseFileBtn.files[0];
  // the files[0] works the same way as .value, just for files
  var photoUrl = URL.createObjectURL(file);
  var photo = new Photo(Date.now(),photoUrl,title,caption);
  photo.saveToStorage(photosArray,true)
  addToPage(photo);
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
  <h3 class = 'card-title'contenteditable = true>${photo.title}</h3>
  <img src = '${photo.file}' class = 'image'>
  <p class = 'card-text' contenteditable = true>${photo.caption}</p>
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

function loadFromLocal(){
  photosArray = JSON.parse(localStorage.getItem('allPhotos'));
  photosArray = photosArray.map(function(photo){
    return photo = new Photo(photo.id,photo.file,photo.title,photo.caption,photo.favorite);
  })
  photosArray.forEach(function(photo){
    addToPage(photo);
  })
}

  // function addToLocalStorage(photo){
//   var stringifiedObject = JSON.stringify(photo)
//   photo.saveToStorage(stringifiedObject);
// }




