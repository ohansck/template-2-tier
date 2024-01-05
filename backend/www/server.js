"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const cors = require('cors');
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    app.use(cors({
        origin: '*'
    }));
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    app.get('/filteredimage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let image_url = req.query.image_url;
        let image_size = parseInt(req.query.image_size);
        try {
            const filterimage = yield util_1.filterImageFromURL(image_url, image_size);
            res.status(200).sendFile(filterimage);
            res.on("close", () => {
                util_1.deleteLocalFiles([filterimage]);
            });
            //to catch errors
        }
        catch (e) {
            //if user does not put image url and image size
            if (!image_url && !image_size) {
                res.status(404).send('resource is not available');
                //if user does put image size and not image url
            }
            else if (!image_url) {
                res.status(400).send('Please enter an image URL');
                //if user put image url and no image size
            }
            else if (!image_size) {
                res.status(400).send('please enter an image dimension you want');
                //to catch any other error
            }
            else {
                res.status(404).send('please check your input and try again');
            }
        }
    }));
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
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}&image_size={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map