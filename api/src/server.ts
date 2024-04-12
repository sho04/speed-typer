import express from 'express';
import cors from 'cors';

// @ts-ignore
import helmet from 'helmet';
import morgan from 'morgan';

import router from './router';

// Create Express server
const app = express(); // New express instance
const port = 3050; // Port number

// Express configuration
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
})); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan

app.use(express.json()); // Enable JSON parsing
app.use("/api", router()); // Enable auth router


// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;