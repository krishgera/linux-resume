window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const terminal = document.getElementById('terminal');
    const introduction = document.getElementById('introduction');
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command');
    const prompt = document.getElementById('prompt');

    let currentDirectory = '/';
    const fileSystem = {
        '/': ['Contact', 'About'],
        '/Contact': [], // Contact details will be handled separately
        '/About': [] // About details will be handled separately
    };

    function updatePrompt() {
        prompt.textContent = `user@krish:${currentDirectory}$ `;
    }

    function bootSequence() {
        let dots = '';
        const maxDots = 5;
        const dotsElement = document.getElementById('dots');
        const bootText = document.getElementById('booting-text');

        bootText.textContent = 'System Booting';

        const dotInterval = setInterval(() => {
            if (dots.length >= maxDots) {
                clearInterval(dotInterval);
                loadingScreen.classList.add('hidden');
                terminal.classList.remove('hidden');
                introduction.classList.remove('hidden');
                commandInput.focus();
            } else {
                dots += '.';
                dotsElement.textContent = dots;
            }
        }, 500);
    }

    bootSequence();

    function displayMessage(message, isHTML = false) {
        const messageElement = document.createElement('div');
        if (isHTML) {
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        output.appendChild(messageElement);
        output.scrollTop = output.scrollHeight;
    }

    function clearTerminal() {
        output.textContent = '';
    }

    function listDirectory() {
        if (currentDirectory === '/Contact/') {
            displayMessage('<span style="color: red;">krishgera@outlook.com       +447747151769</span>', true);
        } else if (currentDirectory === '/About/') {
            displayMessage('A Computer Science graduate with a talent for discovering and fixing vulnerabilities. Proficient in Python, C++, JavaScript, CSS, C# and React Native.', false);
            displayMessage('<a href="https://github.com/krishgera" style="color: blue;" target="_blank">Check out my GitHub</a>', true);
        } else {
            displayMessage(fileSystem[currentDirectory].join('\n'));
        }
    }

    function executeCommand(command) {
        commandInput.value = '';
        let parts = command.trim().split(' ');
        let cmd = parts[0].toLowerCase();
        let arg = parts.slice(1).join(' ');

        displayMessage(`user@krish:${currentDirectory}$ ${command}`);

        if (cmd === 'ls') {
            listDirectory();
        } else if (cmd === 'cd') {
            if (!arg || arg === '~') {
                currentDirectory = '/';
            } else if (arg === '..') {
                let pathParts = currentDirectory.trim().split('/');
                pathParts.pop();
                currentDirectory = pathParts.join('/') || '/';
            } else if (Object.keys(fileSystem).includes(currentDirectory + arg)) {
                currentDirectory += arg + '/';
            } else {
                displayMessage('Directory not found');
            }
            updatePrompt();
        } else if (cmd === 'clear') {
            clearTerminal();
        } else {
            displayMessage('Command not found');
        }
    }

    commandInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            executeCommand(this.value);
        }
    });
});
