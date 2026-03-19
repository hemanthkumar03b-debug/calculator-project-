let display = document.getElementById('display');
let historyList = document.getElementById('historyList');

let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Update history UI
function updateHistoryUI() {
    historyList.innerHTML = '';
    history.slice().reverse().forEach(item => {
        let div = document.createElement('div');
        div.className = 'history-item';
        div.innerText = item;

        div.onclick = () => display.value = item.split('=')[0];

        historyList.appendChild(div);
    });
}

// Append value
function append(val) {
    display.value += val;
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Backspace
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Calculate
function calculate() {
    try {
        let result = eval(display.value);
        let record = display.value + ' = ' + result;

        display.value = result;

        history.push(record);
        localStorage.setItem('calcHistory', JSON.stringify(history));

        updateHistoryUI();
    } catch {
        display.value = 'Error';
    }
}

// CLEAR HISTORY (FULLY WORKING)
function clearHistory() {
    if (confirm('Clear all history?')) {
        history = [];
        localStorage.removeItem('calcHistory');
        historyList.innerHTML = '';
        display.value = '';

        // Toast message
        let msg = document.createElement('div');
        msg.innerText = 'History Cleared';
        msg.style.position = 'fixed';
        msg.style.bottom = '20px';
        msg.style.right = '20px';
        msg.style.background = '#000';
        msg.style.color = '#fff';
        msg.style.padding = '8px 12px';
        msg.style.borderRadius = '8px';

        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 1500);
    }
}

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (!isNaN(e.key) || ['+', '-', '*', '/', '.', '%'].includes(e.key)) {
        append(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Load history
updateHistoryUI();