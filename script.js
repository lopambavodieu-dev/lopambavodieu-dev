// 1. Génération dynamique du flux de code Python défilant dans l'ordinateur
const codeContainer = document.getElementById('python-code');

const pythonLines = [
    "import sqlite3",
    "import tkinter as tk",
    "from secrets import token_hex",
    "",
    "class VoldigoodSolutions:",
    "    def __init__(self):",
    "        self.developer = 'Lopamba Vodieu Vodieu'",
    "        self.stack = ['Python', 'Flutter', 'Dart', 'SQL', 'Web HTML/CSS']",
    "        self.creative_skills = ['Design 3D', 'Branding']",
    "",
    "    def run_portfolio(self):",
    "        print(f'System loading: {self.developer}')",
    "        print('Status: Online & Ready for projects.')",
    "",
    "    def play_guitar(self):",
    "        return '🎸 Smooth melodies playing...'",
    "",
    "if __name__ == '__main__':",
    "    app = VoldigoodSolutions()",
    "    app.run_portfolio()",
    "    conn = sqlite3.connect('app_data.db')",
    "    print('Database Status: CONNECTED')",
    ""
];

// Duplication des lignes pour assurer un défilé infini sans coupure brute
const loopingCode = [...pythonLines, ...pythonLines, ...pythonLines, ...pythonLines].join('\n');
codeContainer.textContent = loopingCode;


// 2. SCRIPTS DE SÉCURITÉ DU SITE (Anti-copie et inspection)

// Désactiver le clic droit sur tout le site
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Bloquer les raccourcis d'inspection et de vol de code source
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode == 123) {
        e.preventDefault();
    }
    // Ctrl+Shift+I et Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) {
        e.preventDefault();
    }
    // Ctrl+U (Affichage du code source)
    if (e.ctrlKey && e.keyCode == 85) {
        e.preventDefault();
    }
    // Ctrl+S (Sauvegarder la page)
    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
    }
});