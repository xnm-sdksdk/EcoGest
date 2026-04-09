import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const PORT = 8080;
const app = express();
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(express.json());
app.use(limiter);

app.listen(PORT, () => console.log(`EcoGest API running on port ${PORT}`));
