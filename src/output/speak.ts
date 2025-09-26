import say from 'say';

/**
 * Speak the given text out loud using the system's TTS.
 * @param text - Text to speak
 */
export function speakText(text: string) {
    // say.speak(text, voice, speed, callback)

    say.speak(text, 'en-us+f3', 1.5, (err) => {
        if (err) {
            console.error('Error speaking text:', err);
        } else {
            console.log('Finished speaking.');
        }
    });
}

// Example usage