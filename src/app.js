import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from './config/passport.js';
import sessionsRouter from './routes/sessionsRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch(error => {
        console.error("Error al intentar conectar a la base de datos", error);
    });

// Rutas
app.use('/api/sessions', sessionsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
