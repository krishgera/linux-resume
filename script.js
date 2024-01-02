window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command');
    const prompt = document.getElementById('prompt');
  
    let currentDirectory = '/';
    const fileSystem = {
      '/': ['Resume', 'Contact', 'About'],
      '/Resume': ['CV_KrishGera.pdf'],
      '/Contact': ['Email: krishgera@outlook.com', 'Phone: +447747151769'],
      '/About': ['AboutMe.md']
    };
  
    // Function to update the prompt with the current directory
    function updatePrompt() {
      prompt.textContent = `user@krish:${currentDirectory}$ `;
    }
  
    // Function to handle the booting sequence
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
          commandInput.focus();
        } else {
          dots += '.';
          dotsElement.textContent = dots;
        }
      }, 500);
    }
  
    bootSequence();
  
    // Function to display a message in the terminal
    function displayMessage(message) {
      output.textContent += message;
      output.scrollTop = output.scrollHeight;
    }
  
    // Function to execute commands
    function executeCommand(command) {
      let parts = command.split(' ');
      let cmd = parts[0].toLowerCase();
      let arg = parts.slice(1).join(' ');
  
      // Add the command to the output
      displayMessage(`user@krish:${currentDirectory}$ ${command}\n`);
  
      if (cmd === 'ls') {
        displayMessage(`${fileSystem[currentDirectory].join('\n')}\n`);
      } else if (cmd === 'cd') {
        if (arg === '..') {
          if (currentDirectory !== '/') {
            currentDirectory = '/'; // Only go up to the root
          }
        } else if (fileSystem[currentDirectory].includes(arg)) {
          currentDirectory += `${arg}/`;
        } else {
          displayMessage(`Directory not found: ${arg}\n`);
        }
        updatePrompt();
      } else if (cmd === 'show') {
        // Add logic for 'show' command
      } else {
        displayMessage(`Command not found: ${cmd}\n`);
      }
  
      commandInput.value = ''; // Clear the command input
    }
  
    commandInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        executeCommand(this.value);
        e.preventDefault(); // Prevent the form from submitting
      }
    });
  });
  