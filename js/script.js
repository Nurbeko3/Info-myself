document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================
  // 1. MATRIX EFFECT (Background)
  // ==========================================================
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const charSize = 14;
  let columns = Math.floor(canvas.width / charSize);
  let y_positions = Array(columns).fill(0);

  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FF00";
    ctx.font = `${charSize}px monospace`;

    y_positions.forEach((y, index) => {
      const char = matrixChars.charAt(
        Math.floor(Math.random() * matrixChars.length)
      );
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

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / charSize);
    y_positions = Array(columns).fill(0);
  });

  // ==========================================================
  // 2. NAVIGATION LOGIC
  // ==========================================================
  const navBtns = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".screen-section");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all
      navBtns.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      // Add active to clicked
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // ==========================================================
  // 3. TERMINAL TYPING EFFECT
  // ==========================================================
  const outputElement = document.getElementById("terminal-output");
  const initialLines = [
    "Initializing NurbekOS v2.0...",
    "Loading kernel modules... [OK]",
    "Mounting file system... [OK]",
    "Scanning for vulnerabilities... [NONE FOUND]",
    "Starting audio subsystem (Saxophone.drv)... [OK]",
    "System READY.",
    "Welcome, User.",
    "\nType 'help' for commands or use the Navigation Menu.",
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (lineIndex < initialLines.length) {
      const currentLine = initialLines[lineIndex];
      // Append text directly for speed, animate last line or so if desired
      // For now, let's type line by line cleanly

      const p = document.createElement("div");
      p.textContent = "> " + currentLine;
      outputElement.appendChild(p);

      lineIndex++;
      setTimeout(typeWriter, 100); // Fast typing between lines
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 500);

  // ==========================================================
  // 4. TERMINAL INTERACTION (Easter Egg)
  // ==========================================================
  const cmdInput = document.getElementById("cmd-input");

  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = cmdInput.value.trim().toLowerCase();
      const div = document.createElement("div");
      div.innerHTML = `<span style='color:white'>root@cyberspace:~$</span> ${cmd}`;
      outputElement.appendChild(div);

      let response = "";
      if (cmd === "help") {
        response = "Available: skills, music, contact, clear, whoami";
      } else if (cmd === "whoami") {
        response = "Nurbek. Pentester. Coder. Musician.";
      } else if (cmd === "clear") {
        outputElement.innerHTML = "";
        response = "";
      } else if (cmd === "skills") {
        document.querySelector('[data-target="skills-section"]').click();
        response = "Navigating to Skills...";
      } else if (cmd === "music") {
        document.querySelector('[data-target="music-section"]').click();
        response = "Navigating to Music...";
      } else {
        response = `Command not found: ${cmd}`;
      }

      if (response) {
        const respDiv = document.createElement("div");
        respDiv.style.color = "#ccc";
        respDiv.textContent = response;
        outputElement.appendChild(respDiv);
      }

      cmdInput.value = "";
      // Scroll to bottom
      const termWindow = document.querySelector(".terminal-content");
      termWindow.scrollTop = termWindow.scrollHeight;
    }
  });
});
