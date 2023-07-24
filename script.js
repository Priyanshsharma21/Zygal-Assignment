document.addEventListener("DOMContentLoaded", function () {
    const letterInput = document.getElementById("letterInput");
    const textColorPicker = document.getElementById("textColorPicker");
    const bgColorPicker = document.getElementById("bgColorPicker");


    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    
    const downloadButton = document.getElementById("downloadButton");
  
    let letter = "X";
    let textColor = "#FF0000";
    let bgColor = "#FFFFFF";
  
    letterInput.addEventListener("input", function (event) {
      letter = event.target.value.toUpperCase().charAt(0);
      drawCanvas();
    });
  
    textColorPicker.addEventListener("input", function (event) {
      textColor = event.target.value;
      drawCanvas();
    });
  
    bgColorPicker.addEventListener("input", function (event) {
      bgColor = event.target.value;
      drawCanvas();
    });
  
    function drawCanvas() {
      // Set canvas background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Write the letter in the center of the canvas
      const fontSize = 20;
      const font = `${fontSize}px Arial`;
      const text = letter;
      const textWidth = ctx.measureText(text).width;
      const x = (canvas.width - textWidth) / 2;
      const y = canvas.height / 2 + fontSize / 2;
  
      ctx.fillStyle = textColor;
      ctx.font = font;
      ctx.fillText(text, x, y);
    }
  
    downloadButton.addEventListener("click", function () {
      // Download the pixel color data as a text file
      const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const hexData = [];
      for (let i = 0; i < pixelData.length; i += 4) {
        const hex = `0x${pixelData[i].toString(16).padStart(2, "0")}${pixelData[i + 1]
          .toString(16)
          .padStart(2, "0")}${pixelData[i + 2].toString(16).padStart(2, "0")}`;
        hexData.push(hex);
      }
      const fileContent = hexData.join(", ");
  
      const element = document.createElement("a");
      const file = new Blob([fileContent], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "canvas_pixel_data.txt";
      document.body.appendChild(element);
      element.click();
    });
  
    // Initial draw
    drawCanvas();
  });