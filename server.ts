import { Server, ServerOptions } from "@hapi/hapi";
import { plugins } from "./config/plugins";
import { routes } from './routes';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// initialize the Server
export const init = async (): Promise<Server> => {
    try {
        const serverOptions: ServerOptions = {
            port: PORT,
            host: HOST
        };

        const server: Server = new Server(serverOptions);   // Create the Server 
        await server.register(plugins);    // Setup Hapi Plugins
        server.route(routes) // Register routes
        await server.initialize();
        return server;
    } catch (err) {
        console.error("Error while initializing server: " + err)
        throw err;
    }
};

const startServer = async () => {
    try {
        const server = await init();
        await server.start();
        console.info(`Server started successfully at: http://${HOST}:${PORT}`);
    } catch (err) {
        console.error("Error while starting server: ", err);
        throw err;
    }
}

startServer();
