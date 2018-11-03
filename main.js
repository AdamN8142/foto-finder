var titleInput       = document.querySelector('.title-input')
var captionInput     = document.querySelector('.caption-input')
var chooseFileBtn    = document.querySelector('.choose-file-btn')
var viewFavoritesBtn = document.querySelector('.view-favorites-btn')
var addToAlbumButton = document.querySelector('.add-to-album-btn')
var searchInput      = document.querySelector('.search-bar')
var cardContainer    = document.querySelector('.card-container')


  addToAlbumButton.addEventListener('click', createNewCard);


function createNewCard(){
  var title = titleInput.value;
  var caption = captionInput.value;
  var photo = new Photo(0,0,title,caption,0);
  var cardContent = document.createElement('article')
  cardContent.innerHTML =  

         `<h3 class = 'card-title'>${photo.title}</h3>
          <div class = 'card-pic image'></div>
          <p class = 'card-text'>${photo.caption}</p>
          <section class = 'bottom-of-card'>
            <div class = 'icon-section'>
              <img class = 'delete-icon icon'src="Images/delete.svg">
              <img class = 'favorite-icon icon'src="Images/favorite.svg">
            </div> 
          </section>`;
       
        addCardToPage(cardContent);
}


  function addCardToPage(cardContent){
    cardContainer.prepend(cardContent);
  }

