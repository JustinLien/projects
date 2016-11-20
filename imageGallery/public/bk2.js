/*
*
* Create a webpage that displays a gallery of images, 
* given a JSON array containing a list of image URLs.
*
*/
'use strict';

// let imageApp = (function() {

let imageApp = function() {

  let create = function(image) {

    let imageElements = [];
    let tempDiv;
    let strImage;

    if (!Array.isArray(image)) {
      throw err;
    }

    for (let i=0;i <image.length-1; i++) {
      // tempDiv = document.createElement('li');
      // tempDiv.setAttribute('ondrop', 'drop(event)');
      // tempDiv.setAttribute('id', 'd' + (i+1));

      tempDiv = createList();

      // tempImage = new Image();
      // tempImage.src = image[i].url;
      // tempImage.setAttribute('draggable', true);
      // tempImage.setAttribute('ondragstart', 'drag(event)');
      // tempImage.setAttribute('ondragover', 'showDrop(event)');
      // tempImage.setAttribute('id', 'i' + (i+1));

      strImage = createImg(image[i].url, i);

      tempDiv.appendChild(strImage);

      imageElements.push(tempDiv);
    }

    return imageElements;
  };

  
  return {
    create: create
  };
}
// }());

let listID = 1;
function createList() {
  let li = document.createElement('li');
  
  li.setAttribute('ondrop', 'drop(event)');
  li.setAttribute('id', 'l' + (listID++));
  li.setAttribute('draggable', true);
  li.setAttribute('ondragstart', 'drag(event)');
  li.setAttribute('ondragover', 'showDrop(event)');

  return li;
}

function createImg(image, index) {
  let tempImage = new Image();

  tempImage.src = image;
  // tempImage.setAttribute('draggable', true);
  // tempImage.setAttribute('ondragstart', 'drag(event)');
  // tempImage.setAttribute('ondragover', 'showDrop(event)');
  tempImage.setAttribute('id', 'i' + (index+1));

  return tempImage;
}

function showDrop(event) {
  // event.target.style.color = 'blue';
  // event.target.style.opacity = '.4';
  event.preventDefault();
}

function drag(event) {
  // event.dataTransfer.setData('image/png', event.target.id);

  // event.dataTransfer.setData('image/png', event.target.id);
  // event.dataTransfer.setData('image/png', event.target.id);

  event.dataTransfer.setData('text/html', event.target.id);

  
};

function drop(event) {
  event.preventDefault();

  // let data = event.dataTransfer.getData('image/png');
  let data = event.dataTransfer.getData('text/html');
  let parentElement = event.target;
  parentElement.replaceChild(document.getElementById(data), event.target);

  // console.dir('dropping a duce', data);

  // console.log( 'event.target: ', event.target );
  // console.log( 'event.target.nodeName: ', event.target.nodeName );
  // console.log( 'event.target.parentElement: ', event.target.parentElement );
  // console.log( 'event.target.parentNode: ', event.target.parentNode );
  // console.log( 'document.getElementById(data): ', document.getElementById(data) );
  // event.target.appendChild(document.getElementById(data));

  // let tempDiv = document.createElement('div');
  // tempDiv.appendChild(document.createTextNode('test'));
  // let parent = event.target.parentNode;
  // parent.replaceChild(data, event.target);
  // event.target.appendParent(tempDiv);


  /*
  console.log('event: ', event.target.id);

  let tempDiv = document.createElement('div');
  tempDiv.setAttribute('ondrop', 'drop(event)');
  tempDiv.setAttribute('id', 'd' + (8+1));

  // move this image to the next

  tempDiv.appendChild(event.target);

  console.log('document.getElementById(data): ', document.getElementById(data));

  parentElement.insertBefore(tempDiv, event.target);
  */

  // 

  // the dropping container
  console.log('event.target: ', event.target.id);
  // console.log('event.target: ', document.getElementById(event.target.id));

  let target = document.getElementById(event.target.id);

  let id = document.getElementById(event.target.id);

  let newList = createList();
  newList.innerHTML = 'hey';
  console.log('id: ', id);

  console.dir('newList: ', newList);

  // id.parentNode.insertBefore(newList, id);
  // id.insertAdjacentHTML('beforebegin', newList);

  id.parentElement.insertBefore(newList, id);

  /*
  // nextSibling
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML += 'hey you guys';
  
  // event.target.parentNode.appendChild(tempDiv);

  let grid = document.getElementById('grid');
  target.appendChild(tempDiv);
  */

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


const myImage = imageApp().create(images);
// imageApp.create(images);
// console.log('myImage', myImage);

let grid = document.getElementById('grid');

myImage.forEach((image) => {
  // console.log('image: ', image);
  grid.appendChild(image);
});


