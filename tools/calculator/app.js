var calculator = {
    // State variables
    previousOperand: '',
    currentOperand: '0',
    operation: null,
    shouldResetDisplay: false,
    hasError: false,
    history: [],
    maxHistory: 10,

    // Initialization
    init: function () {
        this.loadHistory();
        this.updateDisplay();
        this.attachKeyboard();
    },

    // Keyboard support
    attachKeyboard: function () {
        document.addEventListener('keydown', (e) => {
            // Numbers
            if (e.key >= '0' && e.key <= '9') {
                this.appendNumber(e.key);
            }
            // Decimal
            else if (e.key === '.' || e.key === ',') {
                this.appendNumber('.');
            }
            // Operations
            else if (e.key === '+') {
                this.chooseOperation('+');
            }
            else if (e.key === '-') {
                this.chooseOperation('-');
            }
            else if (e.key === '*') {
                this.chooseOperation('×');
            }
            else if (e.key === '/') {
                e.preventDefault();
                this.chooseOperation('÷');
            }
            else if (e.key === '%') {
                this.chooseOperation('%');
            }
            // Actions
            else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.compute();
            }
            else if (e.key === 'Backspace') {
                this.delete();
            }
            else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
                this.clear();
            }
            // Advanced functions
            else if (e.key.toLowerCase() === 's') {
                this.sqrt();
            }
            else if (e.key.toLowerCase() === 'q') {
                this.square();
            }
            // Copy
            else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                this.copyResult();
            }
        });
    },

    // Append number
    appendNumber: function (number) {
        // Clear error
        if (this.hasError) {
            this.clear();
        }

        // Prevent multiple decimals
        if (number === '.' && this.currentOperand.includes('.')) return;

        // Limit length
        if (this.currentOperand.length >= 15 && !this.shouldResetDisplay) return;

        // Reset on new calculation
        if (this.shouldResetDisplay) {
            this.currentOperand = number === '.' ? '0.' : number.toString();
            this.shouldResetDisplay = false;
        } else {
            // Replace leading zero
            if (this.currentOperand === '0' && number !== '.') {
                this.currentOperand = number.toString();
            } else {
                this.currentOperand += number.toString();
            }
        }

        this.updateDisplay();
    },

    // Choose operation
    chooseOperation: function (op) {
        if (this.hasError) {
            this.clear();
            return;
        }

        if (this.currentOperand === '') return;

        // Compute previous operation
        if (this.previousOperand !== '' && !this.shouldResetDisplay) {
            this.compute();
        }

        this.operation = op;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    // Compute result
    compute: function () {
        if (this.hasError) {
            this.clear();
            return;
        }

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        let result;
        let expression = '';

        switch (this.operation) {
            case '+':
                result = prev + current;
                expression = `${prev} + ${current}`;
                break;
            case '-':
                result = prev - current;
                expression = `${prev} − ${current}`;
                break;
            case '×':
                result = prev * current;
                expression = `${prev} × ${current}`;
                break;
            case '÷':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                expression = `${prev} ÷ ${current}`;
                break;
            case '%':
                result = prev % current;
                expression = `${prev} % ${current}`;
                break;
            default:
                return;
        }

        // Check overflow
        if (!isFinite(result)) {
            this.showError('Result too large');
            return;
        }

        const formatted = this.formatResult(result);
        this.addToHistory(expression, formatted);

        this.currentOperand = formatted;
        this.operation = null;
        this.previousOperand = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    // Clear
    clear: function () {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.hasError = false;
        this.updateDisplay();
    },

    // Delete
    delete: function () {
        if (this.shouldResetDisplay || this.hasError) return;

        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    },

    // Square root
    sqrt: function () {
        if (this.hasError) {
            this.clear();
            return;
        }

        const current = parseFloat(this.currentOperand);
        if (current < 0) {
            this.showError('Invalid input');
            return;
        }

        const result = Math.sqrt(current);
        const formatted = this.formatResult(result);

        this.addToHistory(`√${current}`, formatted);
        this.currentOperand = formatted;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    // Square
    square: function () {
        if (this.hasError) {
            this.clear();
            return;
        }

        const current = parseFloat(this.currentOperand);
        const result = current * current;

        if (!isFinite(result)) {
            this.showError('Result too large');
            return;
        }

        const formatted = this.formatResult(result);
        this.addToHistory(`${current}²`, formatted);
        this.currentOperand = formatted;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    // Toggle sign
    toggleSign: function () {
        if (this.hasError) {
            this.clear();
            return;
        }

        const current = parseFloat(this.currentOperand);
        if (current === 0) return;

        this.currentOperand = this.formatResult(current * -1);
        this.updateDisplay();
    },

    // Reciprocal
    reciprocal: function () {
        if (this.hasError) {
            this.clear();
            return;
        }

        const current = parseFloat(this.currentOperand);
        if (current === 0) {
            this.showError('Cannot divide by zero');
            return;
        }

        const result = 1 / current;
        const formatted = this.formatResult(result);

        this.addToHistory(`1/${current}`, formatted);
        this.currentOperand = formatted;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    // Copy result
    copyResult: function () {
        const text = this.currentOperand;

        navigator.clipboard.writeText(text).then(() => {
            // Visual feedback
            const btn = document.querySelector('.copy-btn');
            const icon = btn.querySelector('i');
            const originalClass = icon.className;
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = 'linear-gradient(135deg, rgba(52, 199, 89, 0.3), rgba(48, 209, 88, 0.3))';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 1500);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    },

    // Show error
    showError: function (message) {
        this.currentOperand = 'Error';
        this.hasError = true;
        this.operation = null;
        this.previousOperand = '';
        this.updateDisplay();
    },

    // Format result
    formatResult: function (num) {
        // Round to avoid floating point errors
        const rounded = Math.round(num * 10000000000) / 10000000000;

        // Convert to string
        let str = rounded.toString();

        // Use exponential for very large/small numbers
        if (str.length > 15 || (Math.abs(rounded) > 0 && Math.abs(rounded) < 0.000001)) {
            str = rounded.toExponential(6);
        }

        return str;
    },

    // Add to history
    addToHistory: function (expression, result) {
        this.history.unshift({
            expression: expression,
            result: result,
            timestamp: Date.now()
        });

        // Limit size
        if (this.history.length > this.maxHistory) {
            this.history = this.history.slice(0, this.maxHistory);
        }

        this.saveHistory();
        this.renderHistory();
    },

    // Render history
    renderHistory: function () {
        const section = document.getElementById('historySection');
        const list = document.getElementById('historyList');

        if (this.history.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        list.innerHTML = this.history.map((item, index) => `
            <div class="history-item" onclick="calculator.useHistory(${index})">
                <div class="history-expression">${this.escapeHtml(item.expression)}</div>
                <div class="history-result">= ${this.escapeHtml(item.result)}</div>
            </div>
        `).join('');
    },

    // Use history item
    useHistory: function (index) {
        this.currentOperand = this.history[index].result;
        this.shouldResetDisplay = true;
        this.hasError = false;
        this.updateDisplay();
    },

    // Clear history
    clearHistory: function () {
        if (confirm('Clear all calculation history?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    },

    // Save history
    saveHistory: function () {
        localStorage.setItem('calcHistory', JSON.stringify(this.history));
    },

    // Load history
    loadHistory: function () {
        const saved = localStorage.getItem('calcHistory');
        if (saved) {
            try {
                this.history = JSON.parse(saved);
                this.renderHistory();
            } catch (e) {
                console.error('Error loading history:', e);
                this.history = [];
            }
        }
    },

    // Escape HTML
    escapeHtml: function (text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Update display
    updateDisplay: function () {
        const currentEl = document.getElementById('currentOperand');
        const previousEl = document.getElementById('previousOperand');

        currentEl.innerText = this.currentOperand;

        if (this.operation != null) {
            previousEl.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            previousEl.innerText = '';
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    calculator.init();
});
