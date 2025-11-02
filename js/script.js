document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================
    // A. MATRIX EFFECT
    // ==========================================================
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const charSize = 10;
    let columns = Math.floor(canvas.width / charSize);
    let y_positions = Array(columns).fill(0);

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = `${charSize}pt monospace`;

        y_positions.forEach((y, index) => {
            const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            const x = index * charSize;
            
            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.99) {
                y_positions[index] = 0;
            } else {
                y_positions[index] = y + charSize;
            }
        });
    }

    setInterval(drawMatrix, 50); 

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / charSize);
        y_positions = Array(columns).fill(0);
    });

    // ==========================================================
    // B. TERMINAL LOGIKASI
    // ==========================================================
    
    const outputElement = document.getElementById('terminal-output');
    const inputLineElement = document.getElementById('terminal-input-line');
    const commandForm = document.getElementById('command-form');
    const commandInput = document.getElementById('command-input');
    const profileDataElement = document.getElementById('profile-data');
    const terminalBody = document.getElementById('terminal-body');
    const terminalContainer = document.querySelector('.terminal-container'); // 🟢 Terminal konteynerini topish

    const initialTextLines = [
        "Initializing system sequence...",
        "Scanning network interfaces...",
        "Connection status: [ OK ]",
        "Security protocols loaded.",
        "Welcome, operator.",
        "",
        "Type 'help' for available commands.",
        ""
    ];

    let lineIndex = 0;
    let charIndex = 0;

    // 1. Dastlabki matnni yozish effekti
    function typeWriter() {
        if (lineIndex < initialTextLines.length) {
            const currentLine = initialTextLines[lineIndex];
            if (charIndex < currentLine.length) {
                outputElement.textContent += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40);
            } else {
                outputElement.textContent += '\n'; 
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 300); 
            }
        } else {
            inputLineElement.classList.remove('hidden');
            commandInput.focus();
        }
    }

    // 2. Buyruqni jo'natish (Enter bosilganda)
    commandForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const command = commandInput.value.trim().toLowerCase();
        
        const echo = document.createElement('div');
        echo.innerHTML = `<span class="prompt-user">root@cyberspace</span>:<span class="prompt-path">~</span>$ ${command}`;
        outputElement.appendChild(echo);
        
        commandInput.value = '';

        processCommand(command);
        
        terminalBody.scrollTop = terminalBody.scrollHeight;
    });

    // 3. Buyruqlarni qayta ishlash logikasi (YANGILANDI)
    function processCommand(cmd) {
        profileDataElement.classList.add('hidden');
        
        if (cmd === 'social') {
            profileDataElement.classList.remove('hidden');
        
        } else if (cmd === 'help') {
            const helpText = document.createElement('pre');
            helpText.style.color = '#00ff00';
            helpText.textContent = [
                'Available commands:',
                '  social   - Show contact protocols and biography',
                '  help     - Display this help message',
                '  clear    - Clear the terminal screen',
                '  reboot   - Restart the console (visual effect)',
                '  exit     - Shut down the terminal' // 🟢 'exit' qo'shildi
            ].join('\n');
            outputElement.appendChild(helpText);
        
        } else if (cmd === 'clear') {
            outputElement.innerHTML = ''; 
        
        } else if (cmd === 'reboot') {
            outputElement.innerHTML = 'System rebooting...\n';
            lineIndex = 0;
            charIndex = 0;
            inputLineElement.classList.add('hidden'); 
            setTimeout(typeWriter, 500);
        
        // 🟢 YANGI BUYRUQ: EXIT
        } else if (cmd === 'exit') {
            const exitText = document.createElement('pre');
            exitText.style.color = '#00ff00';
            exitText.textContent = 'Shutting down console... Goodbye.';
            outputElement.appendChild(exitText);
            
            // Kiritish maydonini o'chirish
            inputLineElement.classList.add('hidden');
            
            // Terminalni 1 soniyadan keyin silliq yo'qotish
            setTimeout(() => {
                terminalContainer.classList.add('fade-out');
            }, 1000);
        
        } else if (cmd === '') {
            // Hech narsa qilmaslik
        
        } else {
            const errorText = document.createElement('pre');
            errorText.style.color = '#ff0000';
            errorText.textContent = `bash: command not found: ${cmd}`;
            outputElement.appendChild(errorText);
        }
    }

    // 4. Terminalga bosish
    terminalBody.addEventListener('click', () => {
        commandInput.focus();
    });

    // 5. Boshlash
    typeWriter();
});