import express from 'express';
import dotenv from 'dotenv';
import viewEngine from './config/viewEngine';
import initWebRouter from './route/webRoute';
dotenv.config();
const app = express();
viewEngine(app);
initWebRouter(app);
const port = process.env.PORT || 4444;
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
});