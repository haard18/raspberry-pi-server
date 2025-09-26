import express, {} from "express";
const app = express();
const port = 3000;
// Middleware to parse JSON
app.use(express.json());
// Routes
app.post("/", (req, res) => {
    console.log(req);
    res.send("Hello from Express + TypeScript 🚀");
});
app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});
app.post("/echo", (req, res) => {
    res.json({ youSent: req.body });
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map