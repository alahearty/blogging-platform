const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogging Platform API',
      version: '1.0.0',
      description: 'API documentation for the Blogging Platform',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
    components: {
      schemas: {
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the comment'
            },
            content: {
              type: 'string',
              description: 'The content of the comment'
            },
            author: {
              type: 'string',
              description: 'The author of the comment'
            },
            postId: {
              type: 'string',
              description: 'The id of the post the comment belongs to'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the comment was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the comment was last updated'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Blogging Application API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));