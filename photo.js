class Photo {
  
  constructor(id,file,title,caption,favorite){
    this.id = id || Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false
  }

    updatePhoto(title, caption, photosArray, index,favorite) {
    this.title = title;
    this.caption = caption;
    this.favorite = favorite;
    photosArray.splice(index, 1, this)
    this.saveToStorage(photosArray);
  }

  saveToStorage(photosArray, isNewCard){
    if(isNewCard===true){
      photosArray.push(this)
    } 
    localStorage.setItem('allPhotos',JSON.stringify(photosArray))
  }


  deleteFromStorage(photosArray, index){
    photosArray.splice(index,1)
    this.saveToStorage(photosArray)
  }
}

