import { createCanvas, registerFont } from 'canvas';

// Register font if needed
// registerFont('path/to/font.ttf', { family: 'FontName' });

const generateStatsJpeg = (data) => {
    const canvas = createCanvas(400, 250);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = 'black'; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = 'green'; // Set text color
    ctx.font = 'bold 18px Arial'; // Set font
    ctx.textAlign = 'center'; // Align text to center

    // Calculate text width dynamically for centering
    const titleWidth = ctx.measureText('Naukri Code 360 (Code Studio- Coding Ninjas)').width;
    const titleX = canvas.width - titleWidth / 2;
    ctx.fillText('Naukri Code 360 (Code Studio- Coding Ninjas)', titleX, 30);

    if (data.error === '') {
        // Draw statistics
        ctx.font = 'bold 16px Arial'; // Set font size for stats
        ctx.fillStyle = 'white'; // Set text color
        ctx.fillText(`Total Problems Solved: ${data.total}`, canvas.width / 2, 90);
        ctx.fillText(`Easy: ${data.easy}`, canvas.width / 2 - 100, 130);
        ctx.fillText(`Moderate: ${data.moderate}`, canvas.width / 2 + 80, 130);
        ctx.fillText(`Hard: ${data.hard}`, canvas.width / 2 - 100, 170);
        ctx.fillText(`Ninja: ${data.ninja}`, canvas.width / 2 + 80, 170);
    } else {
        // Draw error message
        ctx.fillStyle = 'red';
        ctx.font = 'bold 18px Arial';

        // Split error message into multiple lines if it exceeds the width
        const errorMessage = data.error;
        const maxLineWidth = 300; // Maximum width for wrapping
        let y = 100; // Starting y position for the error message
        let line = '';
        let words = errorMessage.split(' ');
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxLineWidth && i > 0) {
                ctx.fillText(line, canvas.width / 2, y);
                line = words[i] + ' ';
                y += 20; // Increase y position for the next line
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, canvas.width / 2, y); // Draw the last line
    }

    // Convert canvas to JPEG buffer
    return canvas.toBuffer('image/jpeg');
};

export default generateStatsJpeg;