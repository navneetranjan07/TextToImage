const token = "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"
const inputTxt = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")

const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.lang = 'en-IN'
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;

    window.speechSynthesis.speak(speakInput)
}
window.onload = () =>{
    speakFunc("Transform your imagination into image")
}

async function query() {
    image.src = 'https://cdn.dribbble.com/users/227277/screenshots/5414281/loader-black.gif'
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ "inputs": inputTxt.value }),
        }
    );
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () {
    speakFunc("Please wait... image creation in progress")
    query().then((response) => {
        const objectURL = URL.createObjectURL(response)
        image.src = objectURL
        speakFunc("Image created successfully")
    });
})
