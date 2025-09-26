import express,{ type Request, type Response }  from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

app.post("/echo", (req: Request, res: Response) => {
  res.json({ youSent: req.body });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
