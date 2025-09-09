// Password Strength Checker and Generator Application
// All functionality is client-side for security

// Common weak passwords to check against
const COMMON_PASSWORDS = [
    'password', '123456', '123456789', '12345678', '12345', '1234567', '1234567890',
    'password123', 'password1', 'password!', 'qwerty', 'abc123', 'monkey', '1234567890',
    'dragon', '123123', 'baseball', 'iloveyou', 'trustno1', '1234567', 'welcome',
    'login', 'admin', 'princess', 'master', 'sunshine', 'ashley', 'bailey',
    'passw0rd', 'shadow', '123456', 'password', 'qwerty123', 'michael', 'football'
];

// Similar characters to exclude if option is selected
const SIMILAR_CHARS = 'iIl1oO0';

// Character sets for password generation
const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Password history storage
let passwordHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initPasswordChecker();
    initPasswordGenerator();
    // initBreachChecker(); // Removed HIBP breach checker
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Tab Navigation
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update button states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Password Strength Checker
function initPasswordChecker() {
    const passwordInput = document.getElementById('password-input');
    const togglePassword = document.getElementById('togglePassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthScore = document.getElementById('strengthScore');
    const requirementsList = document.getElementById('requirementsList');
    const suggestionsList = document.getElementById('suggestionsList');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('show-password');
    });
    
    // Real-time password strength analysis
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        analyzePassword(password);
    });
}

// Analyze password strength
function analyzePassword(password) {
    if (!password) {
        resetStrengthIndicator();
        return;
    }
    
    const analysis = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
        common: !isCommonPassword(password)
    };
    
    // Calculate strength score
    let score = 0;
    let strength = 'Weak';
    
    // Base score from requirements
    Object.values(analysis).forEach(met => {
        if (met) score += 10;
    });
    
    // Additional points for length
    if (password.length >= 12) score += 15;
    if (password.length >= 16) score += 15;
    if (password.length >= 20) score += 10;
    
    // Check for patterns
    if (!hasRepeatingChars(password)) score += 10;
    if (!hasSequentialChars(password)) score += 10;
    if (hasGoodVariety(password)) score += 10;
    
    // Determine strength level
    if (score >= 80) strength = 'Very Strong';
    else if (score >= 60) strength = 'Strong';
    else if (score >= 40) strength = 'Medium';
    else strength = 'Weak';
    
    // Update UI
    updateStrengthIndicator(strength, score, analysis);
    updateSuggestions(password, analysis);
}

// Check if password is common
function isCommonPassword(password) {
    const lowerPassword = password.toLowerCase();
    return COMMON_PASSWORDS.some(common => 
        lowerPassword === common || 
        lowerPassword.includes(common) && common.length > 4
    );
}

// Check for repeating characters
function hasRepeatingChars(password) {
    return /(.)\1{2,}/.test(password);
}

// Check for sequential characters
function hasSequentialChars(password) {
    const sequences = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl',
                      'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv',
                      'uvw', 'vwx', 'wxy', 'xyz', '012', '123', '234', '345', '456', '567',
                      '678', '789', '890'];
    
    const lowerPassword = password.toLowerCase();
    return sequences.some(seq => lowerPassword.includes(seq));
}

// Check character variety
function hasGoodVariety(password) {
    const uniqueChars = new Set(password).size;
    return uniqueChars >= password.length * 0.7;
}

// Update strength indicator UI
function updateStrengthIndicator(strength, score, analysis) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthScore = document.getElementById('strengthScore');
    const requirementsList = document.getElementById('requirementsList');
    
    // Update strength bar
    strengthBar.className = 'strength-bar';
    switch(strength) {
        case 'Very Strong':
            strengthBar.classList.add('very-strong');
            break;
        case 'Strong':
            strengthBar.classList.add('strong');
            break;
        case 'Medium':
            strengthBar.classList.add('medium');
            break;
        default:
            strengthBar.classList.add('weak');
    }
    
    // Update text
    strengthLabel.textContent = strength;
    strengthScore.textContent = `${Math.min(100, score)}/100`;
    
    // Update requirements checklist
    requirementsList.querySelectorAll('li').forEach(li => {
        const requirement = li.getAttribute('data-requirement');
        if (analysis[requirement]) {
            li.classList.add('met');
        } else {
            li.classList.remove('met');
        }
    });
}

// Update password suggestions
function updateSuggestions(password, analysis) {
    const suggestionsList = document.getElementById('suggestionsList');
    const suggestions = [];
    
    if (!analysis.length) {
        suggestions.push('Use at least 8 characters (12+ recommended)');
    } else if (password.length < 12) {
        suggestions.push('Consider using 12 or more characters for better security');
    }
    
    if (!analysis.uppercase) {
        suggestions.push('Add uppercase letters (A-Z)');
    }
    
    if (!analysis.lowercase) {
        suggestions.push('Add lowercase letters (a-z)');
    }
    
    if (!analysis.number) {
        suggestions.push('Include numbers (0-9)');
    }
    
    if (!analysis.special) {
        suggestions.push('Add special characters (!@#$%^&*)');
    }
    
    if (!analysis.common) {
        suggestions.push('This appears to be a common password. Try something more unique');
    }
    
    if (hasRepeatingChars(password)) {
        suggestions.push('Avoid repeating characters (like "aaa" or "111")');
    }
    
    if (hasSequentialChars(password)) {
        suggestions.push('Avoid sequential characters (like "abc" or "123")');
    }
    
    if (!hasGoodVariety(password)) {
        suggestions.push('Use a wider variety of characters');
    }
    
    // Display suggestions
    suggestionsList.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<li>Great job! Your password is strong!</li>';
    } else {
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
    }
}

// Reset strength indicator
function resetStrengthIndicator() {
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthScore = document.getElementById('strengthScore');
    const requirementsList = document.getElementById('requirementsList');
    const suggestionsList = document.getElementById('suggestionsList');
    
    strengthBar.className = 'strength-bar';
    strengthLabel.textContent = 'No password entered';
    strengthScore.textContent = '0/100';
    
    requirementsList.querySelectorAll('li').forEach(li => {
        li.classList.remove('met');
    });
    
    suggestionsList.innerHTML = '<li>Enter a password to see suggestions</li>';
}

// Password Generator
function initPasswordGenerator() {
    const generateBtn = document.getElementById('generatePassword');
    const refreshBtn = document.getElementById('refreshPassword');
    const copyBtn = document.getElementById('copyPassword');
    const lengthSlider = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    
    // Update length display
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });
    
    // Generate password button
    generateBtn.addEventListener('click', generatePassword);
    refreshBtn.addEventListener('click', generatePassword);
    
    // Copy password button
    copyBtn.addEventListener('click', copyGeneratedPassword);
    
    // Generate initial password
    generatePassword();
}

// Generate a new password
function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;
    
    // Build character set
    let charset = '';
    if (includeUppercase) charset += CHAR_SETS.uppercase;
    if (includeLowercase) charset += CHAR_SETS.lowercase;
    if (includeNumbers) charset += CHAR_SETS.numbers;
    if (includeSymbols) charset += CHAR_SETS.symbols;
    
    // Remove similar characters if requested
    if (excludeSimilar) {
        charset = charset.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
    }
    
    // Check if at least one option is selected
    if (charset.length === 0) {
        alert('Please select at least one character type');
        return;
    }
    
    // Generate password
    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    // Ensure password meets all selected criteria
    password = ensurePasswordCriteria(password, {
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeSimilar,
        length
    });
    
    // Display password
    document.getElementById('generatedPassword').value = password;
    
    // Add to history
    addToHistory(password);
}

// Ensure password meets selected criteria
function ensurePasswordCriteria(password, options) {
    let chars = password.split('');
    let position = 0;
    
    // Helper function to get random character from set
    const getRandomChar = (set) => {
        if (options.excludeSimilar) {
            set = set.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
        }
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return set[array[0] % set.length];
    };
    
    // Ensure at least one of each selected type
    if (options.includeUppercase && !/[A-Z]/.test(password)) {
        chars[position++] = getRandomChar(CHAR_SETS.uppercase);
    }
    if (options.includeLowercase && !/[a-z]/.test(password)) {
        chars[position++] = getRandomChar(CHAR_SETS.lowercase);
    }
    if (options.includeNumbers && !/\d/.test(password)) {
        chars[position++] = getRandomChar(CHAR_SETS.numbers);
    }
    if (options.includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        chars[position++] = getRandomChar(CHAR_SETS.symbols);
    }
    
    // Shuffle the password
    for (let i = chars.length - 1; i > 0; i--) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const j = array[0] % (i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    return chars.join('');
}

// Copy generated password to clipboard
async function copyGeneratedPassword() {
    const passwordField = document.getElementById('generatedPassword');
    const copyFeedback = document.getElementById('copyFeedback');
    
    if (!passwordField.value) {
        alert('Please generate a password first');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(passwordField.value);
        
        // Show feedback
        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        passwordField.select();
        document.execCommand('copy');
        
        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }
}

// Add password to history
function addToHistory(password) {
    const historyList = document.getElementById('passwordHistory');
    
    // Add to array (max 5 items)
    passwordHistory.unshift(password);
    if (passwordHistory.length > 5) {
        passwordHistory.pop();
    }
    
    // Update UI
    historyList.innerHTML = '';
    passwordHistory.forEach((pwd, index) => {
        const li = document.createElement('li');
        
        // Truncate long passwords for display
        const displayPwd = pwd.length > 20 ? pwd.substring(0, 20) + '...' : pwd;
        li.textContent = displayPwd;
        
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-icon';
        copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        `;
        copyBtn.title = 'Copy password';
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(pwd);
                copyBtn.style.background = 'var(--success)';
                setTimeout(() => {
                    copyBtn.style.background = '';
                }, 1000);
            } catch (err) {
                alert('Failed to copy password');
            }
        });
        
        li.appendChild(copyBtn);
        historyList.appendChild(li);
    });
}


// Utility function to debounce inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + G to generate password
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        document.querySelector('[data-tab="generator"]').click();
        generatePassword();
    }
    
    // Ctrl/Cmd + C to copy generated password (when focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.id === 'generatedPassword') {
            e.preventDefault();
            copyGeneratedPassword();
        }
    }
});

// Service Worker registration for PWA support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
