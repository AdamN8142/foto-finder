class Photo {
  
  constructor(id,file,title,caption,favorite){
    this.id = id ||Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false

  }

 
    updatePhoto(title, caption, photosArray, index) {
    this.title = title;
    this.caption = caption;
    photosArray.splice(index, 1, this)
    this.saveToStorage(photosArray);
  }

  saveToStorage(photosArray, isNewCard){
    if(isNewCard===true){
      photosArray.push(this)
    } localStorage.setItem('allPhotos',JSON.stringify(photosArray))
  }


  deleteFromStorage(photosArray, index){
    photosArray.splice(index,1)
    this.saveToStorage(photosArray)
  }
}


  // static deleteFromStorage(id){
  //   var photos = localStorage.getItem('photosObject');
  //   photos = JSON.parse(photos);
  //   delete photos[id];
  //   photos = JSON.stringify(photos);
  //   localStorage.setItem('photosObject', photos); 
  // }

   // saveToStorage(stringifiedObject){
  //   var photos = localStorage.getItem('photosObject') || '{}'
  //   // We do this because if theres nothing in local storage, it will give us back null 
  //   photos = JSON.parse(photos);

  //   photos[this.id] = stringifiedObject;

  //   photos = JSON.stringify(photos);
  //   localStorage.setItem('photosObject', photos); 
  // }
