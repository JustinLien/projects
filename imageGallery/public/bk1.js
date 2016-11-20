/*
*
* Create a webpage that displays a gallery of images, 
* given a JSON array containing a list of image URLs.
*
*/
'use strict';

// let imageApp = (function() {

let imageApp = function() {

  let drag = function (event) {
    console.log('drag');

    // event.preventDefault();
    // let data = ev.dataTransfer.getData('image');
  };

  let create = function(image) {

    let imageElements = [];
    let tempDiv;
    let tempImage;

    if (!Array.isArray(image)) {
      throw err;
    }

    for (let i=0;i <image.length-1; i++) {
      tempDiv = document.createElement('div');
      tempDiv.setAttribute('ondrop', 'drop(event)');
      tempDiv.setAttribute('id', 'd' + (i+1));

      tempImage = new Image();
      tempImage.src = image[i].url;
      tempImage.setAttribute('draggable', true);
      tempImage.setAttribute('ondragstart', 'drag(event)');
      tempImage.setAttribute('ondragover', 'showDrop(event)');
      tempImage.setAttribute('id', 'i' + (i+1));

      tempDiv.appendChild(tempImage);

      imageElements.push(tempDiv);
    }

    return imageElements;
  };

  
  return {
    create: create
  };
}
// }());

function showDrop(event) {
  // event.target.style.color = 'blue';
  // event.target.style.opacity = '.4';
  event.preventDefault();
}

function drag(event) {

  console.log('event.target: ', event.target);
  event.dataTransfer.setData('image/png', event.target.id);
  // event.dataTransfer.dropEffect = 'move';

  // event.preventDefault();
};


function drop(event) {
  event.preventDefault();

  let data = event.dataTransfer.getData('image/png');
  let parentElement = event.target.parentNode;

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

  console.log('event: ', event.target.id);

  

  // move this image to the next

  console.log('document.getElementById(data): ', document.getElementById(data));

  parentElement.replaceChild(document.getElementById(data), event.target);
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

console.log('grid: ', grid);
