document.addEventListener("DOMContentLoaded", () => {
    const bikeDetails = document.getElementById("bikeDetails");
    const ownerDetails = document.getElementById("ownerDetails");
    const slider = document.getElementById("slider");

    async function scanNFC() {
        if (!("NDEFReader" in window)) {
            alert("NFC not supported on this device.");
            return;
        }

        try {
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
                    
                    // Show the image slider
                    slider.classList.remove("hidden");
                }
            };
        } catch (error) {
            console.log("NFC Scan Error:", error);
        }
    }

    // Start NFC scanning when the page loads
    scanNFC();
});
