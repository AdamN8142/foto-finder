var titleInput       = document.querySelector('.title-input')
var captionInput     = document.querySelector('.caption-input')
var chooseFileBtn    = document.querySelector('.choose-file-btn')
var viewFavoritesBtn = document.querySelector('.view-favorites-btn')
var addToAlbumButton = document.querySelector('.add-to-album-btn')
var searchInput      = document.querySelector('.search-bar')
var cardContainer    = document.querySelector('.card-container')


  addToAlbumButton.addEventListener('click', createNewCard);
  cardContainer.addEventListener('click', removeCard);

var photosArray = [];

function createNewCard(){
  var title = titleInput.value;
  var caption = captionInput.value;
  var file = chooseFileBtn.files[0];
  var photoUrl = URL.createObjectURL(file);
  var photo = new Photo(0,photoUrl,title,caption,0);
  var cardContent = document.createElement('article');
  cardContent.dataset.id =`${photo.id}`
  cardContent.classList.add('card')
  cardContent.innerHTML =  
        `
           <h3 class = 'card-title'>${photo.title}</h3>
            <img src = '${photo.file}' class = 'image'>
            <p class = 'card-text'>${photo.caption}</p>
            <section class = 'bottom-of-card'>
              <div class = 'icon-section'>
                <button class = 'delete-icon icon'></button>
                <button class = 'favorite-icon icon'></button>
              </div> 
            </section>
         `;
  addCardToPage(cardContent);
  // addToLocalStorage(photo)
  photo.saveToStorage(photosArray,true)
}


function addCardToPage(cardContent){
  cardContainer.prepend(cardContent);

}



  function removeCard(){
  if (event.target.classList.contains('delete-icon')) {
    var cardElement = event.target.closest('.card');
    var photoID = parseInt(cardElement.dataset.id);
    var index = photosArray.findIndex(function(photo){
      return photo.id = photoID
    })
    photosArray[index].deleteFromStorage(photosArray,index)
    cardElement.remove();
    
    } 

  }

  // function addToLocalStorage(photo){
//   var stringifiedObject = JSON.stringify(photo)
//   photo.saveToStorage(stringifiedObject);
// }




