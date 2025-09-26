import express, { type Request, type Response } from "express";
import { gptService } from "./gpt/service.js";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Interface for the GPT request body
interface GPTRequestBody {
    text: string;
}

// Routes
app.post("/", (req: Request, res: Response) => {
    console.log(req);
            const { text } = req.body;

        // Validate text content
        if (typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({ 
                error: "Bad Request", 
                message: "Text must be a non-empty string" 
            });
        }

        // Get response from Pluto (GPT blockchain helper)
        const plutoResponse = gptService.getResponse(text);

        // Return the response
        res.json({
            success: true,
            user_input: text,
            pluto_response: plutoResponse,
            timestamp: new Date().toISOString()
        });
    res.send("Hello from Express + TypeScript 🚀");
});

app.get('/', (req: Request, res: Response) => {
    res.send('GET request to the homepage - Pluto Blockchain Helper Server');
});

app.post("/echo", (req: Request, res: Response) => {
    res.json({ youSent: req.body });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
