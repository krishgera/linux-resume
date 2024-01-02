window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const terminal = document.getElementById('terminal');
    const introduction = document.getElementById('introduction');
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command');
    const prompt = document.getElementById('prompt');

    let currentDirectory = '/';
    const fileSystem = {
        '/': ['Resume', 'Contact', 'About'],
        '/Resume': ['CV_KrishGera.pdf'],
        '/Contact': ['Email.MD', 'Phone.MD'],
        '/About': ['AboutMe.md']
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

    function displayMessage(message) {
        output.textContent += `${message}\n`;
        output.scrollTop = output.scrollHeight;
    }

    function clearTerminal() {
        output.textContent = '';
    }

    function showFile(fileName) {
        const baseUrl = 'https://krishgera.github.io/';

        if (fileName === 'CV_KrishGera.pdf') {
            const a = document.createElement('a');
            a.href = `${baseUrl}${fileName}`;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            displayMessage('Downloading CV_KrishGera.pdf...');
        } else if (fileName.endsWith('.MD') || fileName.endsWith('.md')) {
            fetch(`${baseUrl}${fileName}`)
                .then(response => response.text())
                .then(data => displayMessage(data))
                .catch(error => displayMessage('Error loading file'));
        } else {
            displayMessage('File not found');
        }
    }

    function executeCommand(command) {
        commandInput.value = '';
        let parts = command.trim().split(' ');
        let cmd = parts[0].toLowerCase();
        let arg = parts.slice(1).join(' ');

        displayMessage(`user@krish:${currentDirectory}$ ${command}`);

        if (cmd === 'ls') {
            displayMessage(fileSystem[currentDirectory].join('\n'));
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
        } else if (cmd === 'show') {
            if (fileSystem[currentDirectory].includes(arg)) {
                showFile(arg);
            } else {
                displayMessage('File not found');
            }
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
