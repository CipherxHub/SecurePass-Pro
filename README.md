# SecurePass Pro - Advanced Password Security Suite

A modern, secure, and feature-rich password strength checker and generator web application built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### Password Strength Checker
- **Real-time Analysis**: Instant feedback as you type
- **Comprehensive Scoring**: Based on multiple factors including:
  - Password length (8+ characters required, 12+ recommended)
  - Character variety (uppercase, lowercase, numbers, symbols)
  - Pattern detection (sequential, repeating characters)
  - Common password detection
- **Visual Feedback**: 
  - Color-coded strength bar with smooth animations
  - Progress score (0-100)
  - Requirements checklist with live updates
- **Smart Suggestions**: Context-aware tips to improve password strength


### Password Generator
- **Customizable Options**:
  - Adjustable length (8-32 characters)
  - Toggle uppercase letters
  - Toggle lowercase letters
  - Toggle numbers
  - Toggle special characters
  - Option to exclude similar-looking characters (i, I, l, 1, o, O, 0)
- **Cryptographically Secure**: Uses Web Crypto API for true randomness
- **One-Click Actions**:
  - Copy to clipboard with visual feedback
  - Generate new password instantly
- **Password History**: Keeps last 5 generated passwords (session only)

### Modern UI/UX
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Professional transitions and visual feedback
- **Accessibility**: Keyboard shortcuts and focus management
- **Clean Interface**: Intuitive tab-based navigation

## 🔒 Security Features

- **100% Client-Side**: All processing happens in your browser
- **No Data Storage**: Passwords are never stored or transmitted
- **Secure API Usage**: HIBP API uses k-anonymity model (only partial hash sent)
- **Crypto API**: Uses browser's built-in cryptographic functions
- **HTTPS Required**: Breach checking requires secure connection

## 🎯 How to Use

### Running the Application

1. Open the `index.html` file in a modern web browser
2. Or serve the files using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (requires http-server package)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

### Password Strength Checker

1. Click on the "Strength Checker" tab
2. Type or paste a password in the input field
3. View real-time feedback:
   - Strength indicator bar changes color and width
   - Score updates from 0-100
   - Requirements show checkmarks when met
   - Suggestions appear to help improve the password
4. Toggle visibility with the eye icon

### Password Generator

1. Click on the "Generator" tab
2. Adjust settings as needed:
   - Slide to set password length
   - Check/uncheck character types to include
   - Enable "Exclude Similar Characters" for better readability
3. Click "Generate Password" or the refresh icon
4. Copy the password with the copy button
5. View recent passwords in the history section

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + G**: Switch to generator tab and generate new password
- **Ctrl/Cmd + C**: Copy generated password (when field is focused)

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #3b82f6;  /* Primary blue */
    --accent-secondary: #8b5cf6; /* Secondary purple */
    --success: #10b981;          /* Green for success */
    --warning: #f59e0b;          /* Orange for warnings */
    --danger: #ef4444;           /* Red for danger */
}
```

### Modifying Password Criteria

Edit the constants in `script.js`:

```javascript
const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
```

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Opera 47+

**Note**: Requires modern browser with support for:
- Web Crypto API
- CSS Custom Properties
- ES6+ JavaScript features


## 📱 Mobile Support

The application is fully responsive and touch-friendly:
- Optimized for screens from 320px to 4K
- Touch-optimized controls
- Mobile-specific UI adjustments
- Smooth performance on mobile devices

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript ES6+**: Modern syntax, async/await, crypto API
- **No Dependencies**: Pure vanilla implementation



## 🚦 Performance

- **Lightweight**: < 50KB total size (uncompressed)
- **Fast Loading**: No external dependencies
- **Optimized**: Debounced inputs, efficient DOM updates
- **Smooth**: Hardware-accelerated animations

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and use this code for your projects. Contributions are welcome!

## ⚠️ Disclaimer

While this tool helps create and evaluate strong passwords, always follow these best practices:
- Use unique passwords for each account
- Enable two-factor authentication where available
- Use a password manager for storing passwords
- Regularly update passwords for sensitive accounts
- Never share passwords with others

## 🎉 Credits

- Icons: Heroicons (MIT License)
- Font: Inter (Open Font License)

---

**Built with ❤️ for better password security**
