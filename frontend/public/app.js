const formD = document.querySelector('form');
const pic = document.querySelector('#resImage img');

formD.addEventListener('submit', (e) => {
e.preventDefault();
const imageURL = formD.imgURL.value;
const imageSize = formD.imgSize.value;
console.log(imageURL, imageSize);

axios({
    method: 'get',
    url: 'https://my-imgapp.onrender.com/filteredimage',
    params: {image_url: imageURL, image_size: imageSize},
    responseType: 'blob'
  })
    .then(function (response) {
        console.log(response);
      //response.data.pipe(fs.createWriteStream('filterimage.jpg'))
      pic.setAttribute('src', window.URL.createObjectURL(response.data))
    })
   
    .catch(e => {
        console.log(e);
    } );
})