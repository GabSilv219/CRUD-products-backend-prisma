import express from "express";
import { router } from "./routes";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3033, () => console.log("Server is running on PORT: 3033"));