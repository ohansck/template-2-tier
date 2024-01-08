let express = require ('express')
let bodyParser = require('body-parser')
let Axios = require('axios')
const fs = require('fs');
let Path = require('path')



let app = express()
const PORT = process.env.PORT || 8181;
const URL = process.env.URL || 'https://google.com'

app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, '/views'))
app.use(express.static(Path.join(__dirname,'/public')))


  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data
 

app.get('/', (req,res)=>{
  res.render('index')
});

app.post('/image', (req, res) => {
  const {image_url, image_size} = req.params;

  try {
    axios({
      method: 'get',
      url: `${URL}/filteredimage`,
      params: {image_url, image_size},
      responseType: 'blob'
    })
    .then( data => {
      res.send(data);
    })
  } catch (error) {
    console.error(error.message);
  }
  
})




app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
    console.log(`press CTRL + C to stop server`)
})