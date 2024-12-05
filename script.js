function draw() {
    var canvas = document.getElementById("myCanvas");
    
    // Set canvas size dynamically based on window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        
        // Calculate proportional sizes
        var rectWidth = canvas.width * 0.7;  // 80% of canvas width
        var rectHeight = canvas.height * 0.5; // 70% of canvas height
        
        // First rectangle
        context.fillStyle = "rgb(94, 9, 150, .8)";
        context.fillRect(canvas.width * 0.12, canvas.height * 0.1, rectWidth, rectHeight); 
        
        // Second rectangle
        context.fillStyle = "rgba(153, 95, 163, .8)";
        context.fillRect(canvas.width * 0.18, canvas.height * 0.3, rectWidth, rectHeight);


        // Add text in the overlapping area
        context.fillStyle = "rgba(250, 250, 255, 255)";  // Text color
        context.font = "bold " + Math.min(canvas.width, canvas.height) * 0.12 + "px 'Titan One', sans-serif"; // Dynamic font size
        context.textAlign = "center"; // Center the text horizontally
        context.textBaseline = "middle"; // Center the text vertically
        
        var overlapX = canvas.width * 0.15 + rectWidth / 2;
        var overlapY = canvas.height * 0.25 + rectHeight / 2;
        
        context.fillText("Haley Breslin", overlapX, overlapY);
    }
}

// Call draw when the window resizes to adjust dynamically
window.onload = draw;
window.onresize = draw;
