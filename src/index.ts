import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.post("/", (req: Request, res: Response) => {
    console.log(req);
    res.send("Hello from Express + TypeScript 🚀");
});
app.get('/', (req: Request, res: Response) => {
    res.send('GET request to the homepage');
});
app.post("/echo", (req: Request, res: Response) => {
    res.json({ youSent: req.body });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
