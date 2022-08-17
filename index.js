import 'dotenv/config';
import './database/connectdb.js'
import  express  from "express";
import authRoutes from "./routes/Auth-Route.js";

const app = express();

app.use(express.json());
app.use('/api/v1/', authRoutes);

const PORT = process.env.PORT || 8898;
app.listen(PORT, () => {
    console.log("Server is running on port 8898");
});