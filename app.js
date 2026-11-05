const express = require('express');
const path = require('path');
const app = express();
const ExpressError = require('./expressError');

const { findMean, findMedian, findMode} = require('./helpers');

app.use(express.json());
app.use(express.static(__dirname));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Calculate mean
app.get('/mean', (req, res) => {
  const { nums } = req.query;
  
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }
  
  const numbers = nums.split(',').map(n => parseFloat(n.trim()));
  
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'All values must be valid numbers' });
  }
  
  const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  
  res.json({
    operation: 'mean',
    value: mean
  });
});

// Calculate median
app.get('/median', (req, res) => {
  const { nums } = req.query;
  
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }
  
  const numbers = nums.split(',').map(n => parseFloat(n.trim()));
  
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'All values must be valid numbers' });
  }
  
  const sorted = numbers.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  let median;
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }
  
  res.json({
    operation: 'median',
    value: median
  });
});

// Calculate mode
app.get('/mode', (req, res) => {
  const { nums } = req.query;
  
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }
  
  const numbers = nums.split(',').map(n => parseFloat(n.trim()));
  
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'All values must be valid numbers' });
  }
  
  const frequency = {};
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
  
  let maxFreq = 0;
  let modes = [];
  
  for (const num in frequency) {
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      modes = [parseFloat(num)];
    } else if (frequency[num] === maxFreq) {
      modes.push(parseFloat(num));
    }
  }
  
  res.json({
    operation: 'mode',
    value: modes.length === 1 ? modes[0] : modes
  });
});

app.listen(3000, () => {
  console.log(`Calculator server running at http://localhost:3000`);
});
