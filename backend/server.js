const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();
dotenv.config();
connectDB();

// app.get('/', (req, res) => {
//     res.send('Adding nodemon to the project');
// });

// app.get('/api/chat', (req, res) => {
//     res.send(chats)
// });

app.use(express.json()); // to accept json data 

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler);

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find(chat => chat._id === req.params.id);
    res.send(singleChat);
    //console.log(req.params.id);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    }
);