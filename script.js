document.addEventListener("DOMContentLoaded", () => {
    const scanButton = document.getElementById("scanButton");
    const bikeDetails = document.getElementById("bikeDetails");
    const ownerDetails = document.getElementById("ownerDetails");
    const slider = document.getElementById("slider");
    const bikeImage = document.getElementById("bikeImage");

    async function scanNFC() {
        if (!("NDEFReader" in window)) {
            alert("NFC not supported on this device.");
            return;
        }

        try {
            // Hide the scan button permanently
            scanButton.style.display = "none";

            const reader = new NDEFReader();
            await reader.scan();
            bikeDetails.textContent = "Scanning NFC...";

            reader.onreading = (event) => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    const data = JSON.parse(decoder.decode(record.data));

                    // Update UI with bike & owner details
                    bikeDetails.textContent = `🚲 Bike: ${data.bikeModel}, Number: ${data.bikeNumber}`;
                    ownerDetails.textContent = `👤 Owner: ${data.ownerName}, 📞 Contact: ${data.ownerContact}`;

                    // Display bike image
                    bikeImage.src = data.imageURL;
                    slider.classList.remove("hidden"); // Show the image slider
                }

                // Ensure button stays hidden after scanning
                scanButton.remove(); 
            };
            
            // If an error occurs, don't bring the button back
            reader.onreadingerror = () => {
                console.log("NFC Read Error");
            };

        } catch (error) {
            console.log("NFC Scan Error:", error);
        }
    }

    scanButton.addEventListener("click", scanNFC);
});
