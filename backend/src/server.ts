import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
const cors = require('cors');
(async () => {

  // Init the Express application
  const app = express();

  app.use(cors({
    origin: '*'
}));

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get('/filteredimage', async (req:Request, res:Response)=>{ 
   
    let image_url:any = req.query.image_url
    let image_size:any = req.query.image_size

    try{
      const filterimage = await filterImageFromURL(image_url,image_size)
    res.status(200).sendFile(filterimage)

    res.on("close",()=>{
      deleteLocalFiles([filterimage])
    })
    //to catch errors
   } catch (e) {

    //if user does not put image url and image size
    if(!image_url && !image_size){
      res.status(404).send('resource is not available')

      //if user does put image size and not image url
    }else if (!image_url) {
      res.status(400).send('Please enter an image URL');

      //if user put image url and no image size
    } else if (!image_size){
      res.status(400).send('please enter an image dimension you want')
      
      //to catch any other error
    }else{
      res.status(404).send('please check your input and try again')
    }
   }
  })
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}&image_size={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();