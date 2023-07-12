import express, { Request, Response } from "express";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({ extended: true, parameterLimit: 5000, limit: "50mb" })
);

app.use("/", routes);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// If we have any error, we will call this middleware
app.use(errorHandler);

app.listen(4000, () => console.log("Running app"));

export default app;