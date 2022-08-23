import 'dotenv/config';
import './database/connectdb.js'

import  express  from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from "./routes/Auth-Route.js";
import linkRoutes from "./routes/Link-Route.js";
import redirectRoutes from "./routes/Redirect-Route.js"

const app = express();

const whitelist = [process.env.ORIGIN,process.env.ORIGIN2]

app.use(cors({
    origin: function(origin, callback) {
        console.log(origin);
        if(whitelist.includes(origin))
            return callback(null, origin);

        return callback("error de CORS: " + origin + " no autorizado");
    }
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/links', linkRoutes);
app.use('/', redirectRoutes);

const PORT = process.env.PORT || 8898;
app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
});