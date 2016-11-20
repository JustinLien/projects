/*
*
* Displays a gallery of images, given a JSON array containing
* a list of image URLs with drag/drop feature.
*
*/
'use strict';

let imageGallery = (function() {
  const _createList = function(index) {
    const list = document.createElement('li');
    
    list.setAttribute('ondrop', 'drop(event)');
    list.setAttribute('id', 'l' + (index + 1));
    list.setAttribute('draggable', true);
    list.setAttribute('ondragstart', 'drag(event)');
    list.setAttribute('ondragover', 'showDrop(event)');

    return list;
  };

  const _createImg = function(image, index) {
    const imageObj = new Image();

    imageObj.src = image;
    imageObj.setAttribute('draggable', false);

    return imageObj;
  };

  const create = function(image) {
    let imageElements = [];
    let newList;
    let newImage;

    if (!Array.isArray(image)) {
      throw err;
    }

    for (let i = 0; i < image.length - 1; i++) {
      newList = _createList(i);
      newImage = _createImg(image[i].url);
      newList.appendChild(newImage);
      imageElements.push(newList);
    }

    return imageElements;
  };

  return {
    create
  };
}());

function showDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData('image/png', event.target.id);
}

function insertBefore(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function checkImageInsertion(id1, id2) {
  let imageList = document.getElementsByTagName('li');
  
  imageList = Array.prototype.slice.call(imageList);

  imageList.forEach((v,i) => {
    if (v.id === id1) {
      id1 = i;
    } else if (v.id === id2) {
      id2 = i;
    }

  });
  
  return id1 < id2;
}

function drop(event) {
  event.preventDefault();

  let parentElement = event.target.parentNode;
  let transferElementID = event.dataTransfer.getData('image/png');
  let transferElement = document.getElementById(transferElementID);

  // Determine if we are inserting before or after the container.
  let insertBeforeOrAfter = checkImageInsertion(parentElement.id, transferElementID);
  
  if (insertBeforeOrAfter) {
    insertBefore(transferElement, parentElement);
  } else {
    insertAfter(transferElement, parentElement);
  }
}

const images = [
  {"url" : "http://localhost:3000/pictures/1.png"},
  {"url" : "http://localhost:3000/pictures/2.png"},
  {"url" : "http://localhost:3000/pictures/3.png"},
  {"url" : "http://localhost:3000/pictures/4.png"},
  {"url" : "http://localhost:3000/pictures/5.png"},
  {"url" : "http://localhost:3000/pictures/6.png"},
  {"url" : "http://localhost:3000/pictures/7.png"},
  {"url" : "http://localhost:3000/pictures/8.png"},
  {"url" : "http://localhost:3000/pictures/9.png"},
  {"url" : "http://localhost:3000/pictures/10.png"},
  {"url" : "http://localhost:3000/pictures/11.png"},
  {"url" : "http://localhost:3000/pictures/12.png"}
];

const grid = document.getElementById('grid');
const myImage = imageGallery.create(images);

myImage.forEach((image) => {
  grid.appendChild(image);
});
