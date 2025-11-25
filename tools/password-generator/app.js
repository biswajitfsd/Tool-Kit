var passwordGen = {
    length: 16,
    options: {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        excludeAmbiguous: false
    },
    history: [],
    maxHistory: 10,

    // Character sets
    chars: {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        ambiguous: '0OlI1'
    },

    init: function () {
        this.loadPreferences();
        this.loadHistory();
        this.updateLength(this.length);
        this.renderHistory();
    },

    generatePassword: function () {
        // Build character set based on options
        let charset = '';

        if (this.options.uppercase) {
            charset += this.chars.uppercase;
        }
        if (this.options.lowercase) {
            charset += this.chars.lowercase;
        }
        if (this.options.numbers) {
            charset += this.chars.numbers;
        }
        if (this.options.symbols) {
            charset += this.chars.symbols;
        }

        // Validate at least one option is selected
        if (charset === '') {
            alert('Please select at least one character type!');
            return;
        }

        // Exclude ambiguous characters if selected
        if (this.options.excludeAmbiguous) {
            for (let char of this.chars.ambiguous) {
                charset = charset.replace(new RegExp(char, 'g'), '');
            }
        }

        // Generate password using crypto API for security
        let password = '';
        const randomValues = new Uint32Array(this.length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < this.length; i++) {
            password += charset[randomValues[i] % charset.length];
        }

        // Display password
        const passwordDisplay = document.getElementById('generatedPassword');
        passwordDisplay.textContent = password;
        document.querySelector('.password-display').classList.remove('empty');

        // Calculate and display strength
        this.calculateStrength(password);

        // Add to history
        this.addToHistory(password);

        // Animate generate button
        const btn = document.querySelector('.generate-btn i');
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            btn.style.transform = 'rotate(0deg)';
        }, 500);
    },

    calculateStrength: function (password) {
        let entropy = 0;
        const length = password.length;

        // Calculate character set size
        let charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

        // Calculate entropy: log2(charsetSize^length)
        if (charsetSize > 0) {
            entropy = length * Math.log2(charsetSize);
        }

        // Determine strength level
        let strength = 'weak';
        let strengthClass = 'weak';

        if (entropy < 40) {
            strength = 'Weak';
            strengthClass = 'weak';
        } else if (entropy < 60) {
            strength = 'Fair';
            strengthClass = 'fair';
        } else if (entropy < 80) {
            strength = 'Good';
            strengthClass = 'good';
        } else if (entropy < 100) {
            strength = 'Strong';
            strengthClass = 'strong';
        } else {
            strength = 'Very Strong';
            strengthClass = 'very-strong';
        }

        // Update UI
        const strengthText = document.getElementById('strengthText');
        const strengthBar = document.getElementById('strengthBar');
        const entropyText = document.getElementById('entropyText');

        strengthText.textContent = strength;
        strengthText.className = 'strength-text ' + strengthClass;

        strengthBar.className = 'strength-bar-fill ' + strengthClass;

        entropyText.textContent = `Entropy: ${Math.round(entropy)} bits`;
    },

    copyPassword: function () {
        const password = document.getElementById('generatedPassword').textContent;

        if (password === 'Click Generate to create password') {
            alert('Please generate a password first!');
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(password).then(() => {
            // Show success feedback
            const copyBtn = document.getElementById('copyBtn');
            const icon = copyBtn.querySelector('i');

            copyBtn.classList.add('copied');
            icon.className = 'fas fa-check';

            setTimeout(() => {
                copyBtn.classList.remove('copied');
                icon.className = 'fas fa-copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy password. Please copy manually.');
        });
    },

    updateLength: function (value) {
        this.length = parseInt(value);
        document.getElementById('lengthValue').textContent = this.length;
        this.savePreferences();
    },

    savePreferences: function () {
        // Update options from checkboxes
        this.options.uppercase = document.getElementById('uppercaseCheck').checked;
        this.options.lowercase = document.getElementById('lowercaseCheck').checked;
        this.options.numbers = document.getElementById('numbersCheck').checked;
        this.options.symbols = document.getElementById('symbolsCheck').checked;
        this.options.excludeAmbiguous = document.getElementById('ambiguousCheck').checked;

        // Save to localStorage
        localStorage.setItem('passwordGenPrefs', JSON.stringify({
            length: this.length,
            options: this.options
        }));
    },

    loadPreferences: function () {
        const saved = localStorage.getItem('passwordGenPrefs');
        if (saved) {
            try {
                const prefs = JSON.parse(saved);
                this.length = prefs.length || 16;
                this.options = prefs.options || this.options;

                // Update UI
                document.getElementById('lengthSlider').value = this.length;
                document.getElementById('uppercaseCheck').checked = this.options.uppercase;
                document.getElementById('lowercaseCheck').checked = this.options.lowercase;
                document.getElementById('numbersCheck').checked = this.options.numbers;
                document.getElementById('symbolsCheck').checked = this.options.symbols;
                document.getElementById('ambiguousCheck').checked = this.options.excludeAmbiguous;
            } catch (e) {
                console.error('Error loading preferences:', e);
            }
        }
    },

    addToHistory: function (password) {
        // Add to beginning of array
        this.history.unshift({
            password: password,
            timestamp: new Date().toISOString()
        });

        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history = this.history.slice(0, this.maxHistory);
        }

        // Save and render
        this.saveHistory();
        this.renderHistory();
    },

    renderHistory: function () {
        const historyList = document.getElementById('historyList');

        if (this.history.length === 0) {
            historyList.innerHTML = `
                <div class="history-empty">
                    <i class="fas fa-history"></i>
                    <p>No passwords generated yet</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = this.history.map((item, index) => `
            <div class="history-item">
                <div class="history-password">${this.escapeHtml(item.password)}</div>
                <button class="history-copy-btn" onclick="passwordGen.copyFromHistory(${index})" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');
    },

    copyFromHistory: function (index) {
        const password = this.history[index].password;

        navigator.clipboard.writeText(password).then(() => {
            const btn = event.target.closest('.history-copy-btn');
            const icon = btn.querySelector('i');

            icon.className = 'fas fa-check';

            setTimeout(() => {
                icon.className = 'fas fa-copy';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy password.');
        });
    },

    clearHistory: function () {
        if (this.history.length === 0) {
            alert('History is already empty!');
            return;
        }

        if (confirm('Clear password history? This cannot be undone.')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    },

    saveHistory: function () {
        localStorage.setItem('passwordGenHistory', JSON.stringify(this.history));
    },

    loadHistory: function () {
        const saved = localStorage.getItem('passwordGenHistory');
        if (saved) {
            try {
                this.history = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading history:', e);
                this.history = [];
            }
        }
    },

    escapeHtml: function (text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize password generator when page loads
document.addEventListener('DOMContentLoaded', function () {
    passwordGen.init();
});
