import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';
import { router } from './router';
import { Connector } from './config';
// const hash = "$2b$10$WW/7QGzkIqe9T5dQ6b4o0.bVBd4vRJ2jg4271A96xojuL3UYjSvhu";
// const hash2 = "$2b$10$CJL2kfMvvHkl9EGushhAjexpmDHUvYV27QWZmMWXVenmezSQDjnTC";
// console.log(Connector.comparePass("123456789", hash));

const app = express();
try {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/api', router);
    app.get('**', (req, res) => {
        res.sendfile(path.join(__dirname,'front/index.html'));
    })   
} catch (error) {
    
}


// TODO : dev mode
// A utiliser pour changer le port
// app.listen(process.env.PORT || 4000,()=>{});

// TODO : prod mode
app.listen(process.env.PORT || 80,()=>{});