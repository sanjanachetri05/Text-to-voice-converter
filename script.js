const synth = window.speechSynthesis;
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const speakBtn = document.getElementById('speakBtn');
const clearBtn = document.getElementById('clearBtn');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const historyList = document.getElementById('historyList');

let voices = [];
const HISTORY_KEY = 'vf_history';

function getVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = voices
        .map((voice, i) => `<option value="${i}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
}

// Speak and Add to History
speakBtn.addEventListener('click', () => {
    if (synth.speaking) return;

    if (textInput.value.trim() !== '') {
        const utterThis = new SpeechSynthesisUtterance(textInput.value);
        utterThis.voice = voices[voiceSelect.value];
        utterThis.rate = rate.value;
        utterThis.pitch = pitch.value;

        synth.speak(utterThis);
        addToHistory(textInput.value, true);
    }
});

// Clear input
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    synth.cancel(); // Stops any ongoing speech
});

// History Logic
function addToHistory(text, save = true) {
    const shortText = text.length > 50 ? text.substring(0, 50) + "..." : text;
    const div = document.createElement('div');
    div.className = "history-item p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border dark:border-slate-700 text-sm dark:text-slate-300 flex justify-between items-center animate-fade-in";
    div.dataset.text = text;

    div.innerHTML = `
        <span class="flex-1 mr-4">${shortText}</span>
        <div class="flex items-center gap-3">
            <button class="reuse-btn text-indigo-500 hover:underline">Reuse</button>
            <button class="delete-btn text-red-500 hover:underline">Delete</button>
        </div>
    `;

    // attach listeners (avoid inline onclick and escaping issues)
    const reuseBtn = div.querySelector('.reuse-btn');
    reuseBtn.addEventListener('click', () => reuseText(text));
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteHistory(deleteBtn));

    if (historyList.children.length >= 3) {
        historyList.removeChild(historyList.lastChild);
    }
    historyList.prepend(div);

    if (save) {
        try {
            let arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
            arr.unshift(text);
            arr = arr.slice(0, 3);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
        } catch (e) {}
    }
}

function reuseText(text) {
    textInput.value = text;
}

function deleteHistory(btn) {
    const item = btn.closest('.history-item');
    if (!item) return;
    const text = item.dataset.text;
    item.remove();
    try {
        let arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        arr = arr.filter(t => t !== text);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
    } catch (e) {}
}

// Update Labels
rate.oninput = () => document.getElementById('speedVal').innerText = rate.value;
pitch.oninput = () => document.getElementById('pitchVal').innerText = pitch.value;

// Initial voice load
getVoices();

// Load history from storage on startup
(function loadHistory(){
    try {
        const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        if (Array.isArray(arr)) {
            arr.forEach(text => addToHistory(text, false));
        }
    } catch (e) {}
})();