import express, {Express} from "express";
import path from "path";
import * as database from "./config/database";
import dotenv from "dotenv";
import methodOverride from "method-override";

import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";

// Cấu hình file env
dotenv.config();

database.connect();

const app : Express = express();
const port : number | string =  process.env.PORT || 3000;

// Cài body-parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Cài đặt method-override
app.use(methodOverride("_method"));


// Nhúng file tĩnh thư mục public
app.use(express.static("public"));

// Cài đặt pug
app.set("views","./views");
app.set("view engine","pug");

// App local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// tity
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End tity



// Gọi hàm 
clientRoutes(app);
adminRoutes(app);

app.listen(port , ()=>{
    console.log(`App listening on port ${port}`);
});
