// Simple script to create a basic icon using Canvas
const fs = require('fs');
const { createCanvas } = require('canvas');

const size = 1024;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Background - Medical blue
ctx.fillStyle = '#4F46E5';
ctx.fillRect(0, 0, size, size);

// White cross/plus symbol
ctx.fillStyle = '#FFFFFF';
// Horizontal bar
ctx.fillRect(size * 0.3, size * 0.45, size * 0.4, size * 0.1);
// Vertical bar
ctx.fillRect(size * 0.45, size * 0.3, size * 0.1, size * 0.4);

// Text "SC" for SmartClinic
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 120px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('SC', size / 2, size * 0.75);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('src-tauri/icons/icon.png', buffer);
console.log('Icon created successfully!');
