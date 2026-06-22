// 1. Flux de code Python défilant en arrière-plan
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

const loopingCode = [...pythonLines, ...pythonLines, ...pythonLines, ...pythonLines].join('\n');
if (codeContainer) {
    codeContainer.textContent = loopingCode;
}


// 2. GESTION DU MENU HAMBURGER (RESPONSIVE MOBILE)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (mobileMenu && navLinks) {
    // Activer / désactiver le menu au clic sur l'icône hamburger
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });

    // Fermer le menu mobile de manière fluide après avoir cliqué sur un lien
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            navLinks.classList.remove('active');
        });
    });
}


// 3. ANIMATION D'ENTRÉE DES SECTIONS AU DEFILEMENT (SCROLL REVEAL)
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // L'animation se joue uniquement la première fois
        }
    });
}, {
    threshold: 0.15 // L'élément commence son animation quand 15% de sa hauteur est visible
});

revealElements.forEach(el => revealOnScroll.observe(el));


// 4. ANIMATION DES COMPTEURS DE STATISTIQUES (AU DEFILEMENT)
const statsSection = document.querySelector('.stats-section');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const startCounters = () => {
    statNumbers.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 100; // Contrôle la vitesse globale de l'animation
        const increment = target / speed;

        const updateCount = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + (target === 100 ? "%" : "+");
            }
        };
        updateCount();
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            startCounters();
            animated = true; // Fixe l'animation pour éviter de la répéter
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}


// 5. SCRIPTS DE SÉCURITÉ DU SITE (Anti-copie et inspection de base)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // Bloquer F12
    if (e.keyCode == 123) {
        e.preventDefault();
    }
    // Bloquer Ctrl+Shift+I et Ctrl+Shift+J (outils de dév)
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) {
        e.preventDefault();
    }
    // Bloquer Ctrl+U (visualiser le code source)
    if (e.ctrlKey && e.keyCode == 85) {
        e.preventDefault();
    }
    // Bloquer Ctrl+S (sauvegarde de la page web)
    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
    }
});


// 6. INTÉGRATION DE L'AGENT IA CHATBOT : LOPAMBA IA
const chatLauncher = document.getElementById('chat-launcher');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

if (chatLauncher && chatContainer && chatClose && chatInput && chatSend && chatMessages) {
    
    // Ouvrir / Fermer le widget de chat
    chatLauncher.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // Envoyer un message lors du clic ou de la touche Entrée
    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function handleUserMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // Message de l'utilisateur à l'écran
        appendMessage(messageText, 'user');
        chatInput.value = '';

        // Indicateur visuel d'écriture ("Lopamba IA écrit...")
        const typingIndicator = showTypingIndicator();

        // Réponse simulée après 1,5 seconde
        setTimeout(() => {
            typingIndicator.remove();
            const botResponse = generateBotResponse(messageText);
            appendMessage(botResponse, 'bot');
        }, 1500);
    }

    // Fonction d'ajout de bulle de message
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Afficher l'indicateur d'écriture
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('chat-typing-indicator');
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    // Traitement local des requêtes (Mots-clés / Réponses d'orientation)
    function generateBotResponse(userInput) {
        const input = userInput.toLowerCase();

        // Salutations
        if (input.includes('bonjour') || input.includes('salut') || input.includes('hello') || input.includes('hey')) {
            return "Bonjour ! Comment puis-je vous aider aujourd'hui ? Je peux vous renseigner sur le parcours ou les services de Lopamba.";
        }

        // Compétences techniques & Technologies
        if (input.includes('competence') || input.includes('compétence') || input.includes('techno') || input.includes('stack') || input.includes('python') || input.includes('flutter') || input.includes('code') || input.includes('langage') || input.includes('sqlite') || input.includes('html') || input.includes('css')) {
            return "Lopamba maîtrise plusieurs compétences clés :<br>• <strong>Développement de bureau</strong> : Python / Tkinter.<br>• <strong>Développement mobile</strong> : Flutter / Dart.<br>• <strong>Bases de données</strong> : SQLite.<br>• <strong>Développement web</strong> : HTML / CSS / JavaScript.<br>• <strong>Création visuelle</strong> : Design graphique & branding.";
        }

        // Tarifs / Prix / Devis
        if (input.includes('tarif') || input.includes('prix') || input.includes('combien') || input.includes('devis') || input.includes('cout') || input.includes('coût')) {
            return "Chaque projet est unique. Pour discuter de votre budget ou obtenir une estimation de devis, je vous invite à joindre directement Lopamba par WhatsApp en bas de page ou au <strong>+243 995 372 992</strong>.";
        }

        // Contact / WhatsApp
        if (input.includes('contact') || input.includes('joindre') || input.includes('telephone') || input.includes('téléphone') || input.includes('whatsapp') || input.includes('mail') || input.includes('adresse') || input.includes('ecrire') || input.includes('écrire')) {
            return "Vous pouvez contacter Lopamba directement :<br>• Par <strong>WhatsApp</strong> au : <a href='https://wa.me/243995372992' target='_blank' style='color:#00d4ff; text-decoration:underline;'>+243 995 372 992</a><br>• En consultant ses profils Facebook et LinkedIn indiqués au bas du site.";
        }

        // Services & Prestations
        if (input.includes('service') || input.includes('faire') || input.includes('travail') || input.includes('creer') || input.includes('créer') || input.includes('aide')) {
            return "Lopamba propose plusieurs types de prestations de services :<br>1️⃣ Création de sites vitrines,E-commerce et applications web sur mesure.<br>2️⃣ Conception d'applications mobiles performantes.<br>3️⃣ Création d'identités visuelles et logos professionnels 2D/3D.<br>4️⃣ Stratégies de marketing digital et campagnes publicitaires.<br>5️⃣ Community Management pour vos réseaux sociaux.";
        }

        // Divers / Passion musique & cuisine
        if (input.includes('guitare') || input.includes('musicien') || input.includes('musique')) {
            return "En plus du développement, Lopamba est un guitariste amateur passionné. La musique l'aide à nourrir sa créativité pour ses projets techniques ! 🎸";
        }
        if (input.includes('gaufre') || input.includes('patisserie') || input.includes('pâtisserie') || input.includes('manger')) {
            return "Ah ! Vous avez remarqué la gaufre dans les compétences ? En effet, en dehors des écrans, Lopamba apprécie beaucoup cuisiner des pâtisseries et faire de bonnes gaufres !  waffles  waffle 🧇";
        }

        // Présentation de l'IA
        if (input.includes('qui es-tu') || input.includes('ton nom') || input.includes('lopamba')) {
            return "Je suis <strong>Lopamba IA</strong>, un assistant conversationnel léger conçu pour vous guider rapidement à travers le portfolio et répondre à vos questions initiales.";
        }

        // Réponse par défaut
        return "Je ne suis pas sûr de bien comprendre votre demande. 🤔<br><br>Vous pouvez me demander ses compétences, ses services, ses coordonnées, ou en savoir plus sur son profil. Pour toute demande précise, vous pouvez directement cliquer sur le bouton WhatsApp pour joindre Lopamba au <strong>+243 995 372 992</strong>.";
    }
}
