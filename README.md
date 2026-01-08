# VoiceFlow Pro — Modern Text-to-Speech Converter 🎙️

A sleek, responsive web application that converts text into spoken words using the native browser speech engine. **VoiceFlow Pro** features a minimalist design with a focus on user experience, offering real-time audio customization and a modern Dark Mode interface.

## ✨ Key Features
* **Real-time Conversion:** Instantly converts any typed text into high-quality speech.
* **OS-Native Voices:** Automatically detects and populates voices available on the user's device (Windows, macOS, Android, or iOS).
* **Audio Customization:** * **Speed Control:** Adjust playback rate from 0.5x to 2x.
    * **Pitch Tuning:** Change the voice tone from deep to high-pitched.
* **Dark Mode Support:** A beautiful, eye-friendly dark interface built with Tailwind CSS.
* **Smart History:** Remembers your last few snippets for quick reuse during the same session.
* **Immediate Stop:** One-click "Clear" functionality that kills the audio stream instantly.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure for better accessibility.
* **Tailwind CSS:** Modern, utility-first styling for a polished look.
* **Vanilla JavaScript (ES6+):** Core logic for DOM manipulation and state management.
* **Web Speech API:** Utilizes `speechSynthesis` and `SpeechSynthesisUtterance` for native audio processing (no external API keys required).

## 🚀 How to Run
1.  **Clone the project:**
    ```bash
    git clone [https://github.com/your-username/voiceflow-pro.git](https://github.com/your-username/voiceflow-pro.git)
    ```
2.  **Open the folder:** Navigate to the project directory.
3.  **Launch:** Open `index.html` in any modern web browser (Chrome, Edge, or Safari recommended).

## 🧠 Technical Highlights
* **Asynchronous Loading:** Uses `onvoiceschanged` event handling to ensure voice engines are loaded correctly across different browsers.
* **Memory Management:** Implements a queue-clearing logic using `synth.cancel()` to prevent overlapping audio streams.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

---
