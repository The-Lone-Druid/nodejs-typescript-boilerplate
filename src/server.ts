import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config';
import Logging from './library/logging';
import { UserRoutes } from './routes';

const router = express();

// Connect to MongoDB
mongoose
    .connect(config.mongo.url, {
        dbName: config.mongo.dbName,
        retryWrites: true,
        w: 'majority'
    } as mongoose.ConnectOptions)
    .then(() => {
        Logging.info(
            `Connected to MongoDB - ${config.server.env.toUpperCase()} environment.`
        );
        StartServer();
    })
    .catch((err: any) => {
        console.log(err);
        Logging.error('Unable to connect: ');
        Logging.error(err);
    });

// Only start the server if Mongo is connected
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(
            `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );

        res.on('finish', () => {
            // log the response
            Logging.info(
                `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
            );
        });

        next();
    });

    router.use(
        express.urlencoded({
            extended: true
        })
    );
    router.use(express.json());

    // API Rules
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method == 'OPTIONS') {
            res.header(
                'Access-Control-Allow-Methods',
                'PUT, POST, PATCH, DELETE, GET'
            );
            return res.status(200).json({});
        }

        next();
    });

    // Use all your routes here
    router.use('/users', UserRoutes);

    // Health check
    router.get('/ping', (req, res, next) => {
        res.status(200).json({
            message: 'pong'
        });
    });

    // Error handling
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        return res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server started on port ${config.server.port}.`);
    });
};
