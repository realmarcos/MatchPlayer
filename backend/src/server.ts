import express from 'express';
import "./dotenv";
const app = express();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});