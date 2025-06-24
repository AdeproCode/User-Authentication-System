
const express = require('express');
const router = express.Router();

let quotes = ["The journey matters", "Keep moving", "Code hard"];

/**
 * @swagger
 * /quotes:
 *   get:
 *     summary: Get all quotes
 *     responses:
 *       200:
 *         description: A list of quotes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/quotes', (req, res) => {
  res.json(quotes);
});

/**
 * @swagger
 * /quotes:
 *   post:
 *     summary: Add a new quote
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quote added
 */
router.post('/quotes', (req, res) => {
  const { text } = req.body;
  if (text) {
    quotes.push(text);
    res.status(201).json({ message: 'Quote added' });
  } else {
    res.status(400).json({ error: 'Text is required' });
  }
});

module.exports = router;
