import say from 'say';

/**
 * Speak the given text out loud using the system's TTS.
 * @param text - Text to speak
 */
function speakText(text: string) {
    say.speak(text, undefined, 1.0, (err) => {
        if (err) {
            console.error('Error speaking text:', err);
        } else {
            console.log('Finished speaking.');
        }
    });
}

// Example usage
speakText("Hello from Node.js!");
