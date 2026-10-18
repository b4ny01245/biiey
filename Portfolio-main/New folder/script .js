// Dynamic Telemetry String Simulation
const telemetryLogs = [
    "$ vortex init --cluster-mesh",
    "✔ Core engine authenticated safely...",
    "✔ Connecting deep violet-to-pink network nodes...",
    "⚡ Cyber-Cyan high-priority highlights syncing...",
    "● Matrix fully optimized. System stable at 99.99% efficiency."
];

const terminalElement = document.getElementById('terminal-stream');
let logIndex = 0;

function streamTelemetry() {
    if (logIndex < telemetryLogs.length) {
        if (logIndex === 0) {
            terminalElement.innerHTML = '';
        }
        
        const line = document.createElement('div');
        line.style.marginBottom = '0.5rem';
        line.style.textAlign = 'left';
        line.style.paddingLeft = '2rem';
        line.textContent = telemetryLogs[logIndex];
        
        // Highlight system logs dynamically
        if(telemetryLogs[logIndex].includes('⚡')) {
            line.style.color = '#00F0FF'; // Cyber-cyan color
        } else if(telemetryLogs[logIndex].includes('✔')) {
            line.style.color = '#FF0080'; // Pink trace color
        }
        
        terminalElement.appendChild(line);
        logIndex++;
        setTimeout(streamTelemetry, 1200);
    }
}

// Interactive Navigation Active Tracking Framework
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
});

// Trigger setup execution upon viewport convergence
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(streamTelemetry, 800);
});
