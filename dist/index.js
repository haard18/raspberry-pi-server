import express, {} from "express";
const app = express();
const port = 3000;
// Middleware to parse JSON
app.use(express.json());
// Routes
app.get("/", (req, res) => {
    res.send("Hello from Express + TypeScript 🚀");
});
app.post("/echo", (req, res) => {
    res.json({ youSent: req.body });
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map