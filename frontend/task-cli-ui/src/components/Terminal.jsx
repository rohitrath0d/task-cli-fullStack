import React, { useState, useRef, useEffect } from 'react';


// Add an @import to your CSS file that imports Tailwind CSS.
// import "tailwindcss";  --- Hence, I have added this in App.css/index.css file


const Terminal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [promptText] = useState('user@webterm:~$ ');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Show terminal with animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Make the terminal scroll properly:
  // Modify this in useEffect, so the latest command is always visible:
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Improve input focus (Auto-focus on click anywhere in terminal)

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleCommand = async () => {
    if (!inputValue.trim()) return;

    // Send the inputValue to the backend
    const response = await fetch("http://localhost:5000/cli", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputValue }),
    });

    const result = await response.json();
    setHistory([...history, `$ ${inputValue}`, result.output]);
    setInputValue(""); // Clear input field
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;

  //   setHistory(prev => [...prev, { text: inputValue, type: 'command' }]);

  //   try {
  //     const response = `Executed command: ${inputValue}`;

  //     const chars = response.split('');
  //     let currentText = '';

  //     for (let char of chars) {
  //       await new Promise(resolve => setTimeout(resolve, 25));
  //       currentText += char;
  //       setHistory(prev => [
  //         ...prev.slice(0, -1),
  //         { text: currentText, type: 'output' }
  //       ]);
  //     }
  //   } catch (error) {
  //     setHistory(prev => [...prev, { text: `Error: ${error.message}`, type: 'error' }]);
  //   }

  //   setInputValue('');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add the user's command to history
    setHistory((prev) => [...prev, { text: `${promptText}${inputValue}`, type: "command" }]);

    try {
      const response = await fetch("http://localhost:5000/cli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: inputValue }), // Send inputValue as command
      });

      const result = await response.json();
      //   if (response.ok) {
      //     setHistory((prev) => [...prev, { text: result.output, type: "output" }]);
      //   } else {
      //     setHistory((prev) => [...prev, { text: `Error: ${result.error}`, type: "error" }]);
      //   }
      // } catch (error) {
      //   setHistory((prev) => [...prev, { text: `Error: ${error.message}`, type: "error" }]);
      // }

      const responseText = result.output || "No output received";


      // Split the response into multiple lines for better formatting
      const formattedResponse = responseText.split("\n").map(line => ({
        text: line,
        type: 'output',
      }));

      // Update history with formatted response
      setHistory(prev => [...prev, ...formattedResponse]);

    } catch (error) {
      setHistory(prev => [...prev, { text: `Error: ${error.message}`, type: 'error' }]);
    }

    setInputValue(""); // Clear input field
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div
        className={`w-full max-w-3xl transition-all duration-500 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
      >
        {/* Terminal Window Frame */}
        <div className="bg-gray-800 rounded-t-lg p-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-gray-400 text-sm">Terminal</div>
        </div>

        {/* Terminal Content */}
        <div
          className="w-full h-96 bg-black text-green-500 font-mono p-4 rounded-b-lg overflow-hidden flex flex-col border border-gray-700 shadow-lg"
          onClick={handleTerminalClick}
        >
          {/* Welcome Message */}
          <div className="text-blue-500 mb-2">
            Welcome to Web Terminal. Type "help" for commands.
          </div>

          {/* Initial Command Input */}
          <form onSubmit={handleSubmit} className="flex group mb-4">
            <span className="text-green-500 opacity-70 group-focus-within:opacity-100">
              {promptText}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-green-500 focus:outline-none ml-1 caret-green-500"
              autoFocus
            />
          </form>

          {/* Command History */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto"
          >
            {history.map((entry, index) => (
              <div
                key={index}
                className={`mb-1 ${entry.type === 'error' ? 'text-red-500' :
                  entry.type === 'system' ? 'text-blue-500' :
                    'text-green-500'
                  }`}
              >
                {entry.type === 'command' && (
                  <span className="opacity-70">{promptText}</span>
                )}
                {entry.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Terminal;