import http from "http";
import dotenv from "dotenv";
import { router, matchRoute } from "./src/routes/router.js";
import "./src/config/DatabaseConfig.js";
import cors from "cors";
import parserMiddleware from "./src/middleware/ParserMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const corsMiddleware = cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

const server = http.createServer((req, res) => {
    corsMiddleware(req, res, () => {
        parserMiddleware(req, res, () => {
            try {
                const { method, url } = req;

                const { route, params } = matchRoute(url);

                if (router[route] && router[route][method]) {
                    const handlers = Array.isArray(router[route][method])
                        ? router[route][method]
                        : [router[route][method]];

                    let index = 0;
                    req.params = params;

                    const next = () => {
                        if (index < handlers.length) {
                            handlers[index++](req, res, next);
                        }
                    };
                    next();
                } else {
                    console.log(`No matching route for: ${method} ${url}`);
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Route Not Found" }));
                }
            } catch (error) {
                console.error("Server error:", error);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Internal Server Error" }));
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
