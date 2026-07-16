// 0. GESTION DE L'ÉCRAN DE CHARGEMENT (PRELOADER - DURÉE : 2 SECONDES)
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPct = document.getElementById('loading-pct');
    
    if (preloader && loadingBar && loadingPct) {
        // Empêcher le défilement de la page pendant le chargement
        document.body.style.overflow = 'hidden';
        
        const duration = 2000; // 2000 ms = 2 secondes
        const intervalTime = 20; // Mise à jour toutes les 20 ms
        const steps = duration / intervalTime;
        let step = 0;
        
        const progressInterval = setInterval(() => {
            step++;
            const progress = Math.min((step / steps) * 100, 100);
            
            // Mise à jour de la barre de progression et du pourcentage
            loadingBar.style.width = `${progress}%`;
            loadingPct.textContent = `${Math.round(progress)}%`;
            
            if (step >= steps) {
                clearInterval(progressInterval);
                
                // Transition de disparition (fade out)
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    document.body.style.overflow = ''; // Restaurer le scroll
                    
                    // Retrait définitif de l'élément du layout après transition
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 200);
            }
        }, intervalTime);
    }
});


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
    "        self.stack = ['Python', 'Flutter', 'Dart', 'SQL', 'Web HTML/CSS', 'AI Prompting']",
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
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });

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
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealOnScroll.observe(el));


// 4. ANIMATION DES COMPTEURS DE STATISTIQUES (AU DEFILEMENT)
const statsSection = document.querySelector('.stats-section');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const startCounters = () => {
    statNumbers.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 100;
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
            animated = true;
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
    if (e.keyCode == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.keyCode == 85) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
    }
});


// 6. INTÉGRATION DE L'AGENT IA CHATBOT : LOPAMBA IA (INTELLIGENCE AMÉLIORÉE)
const chatLauncher = document.getElementById('chat-launcher');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

if (chatLauncher && chatContainer && chatClose && chatInput && chatSend && chatMessages) {
    
    chatLauncher.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function handleUserMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'user');
        chatInput.value = '';

        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            typingIndicator.remove();
            const botResponse = generateBotResponse(messageText);
            appendMessage(botResponse, 'bot');
        }, 1200);
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('chat-typing-indicator');
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    // Fonction utilitaire pour normaliser le texte (suppression d'accents et uniformisation)
    function cleanText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function generateBotResponse(userInput) {
        const cleaned = cleanText(userInput);

        // Base de connaissances intelligente classée par thématiques
        const knowledgeBase = [
            {
                keys: ['bonjour', 'salut', 'hello', 'hey', 'hi', 'bonsoir', 'yo'],
                reply: "Bonjour ! Ravi de vous accueillir sur mon espace de discussion. 😊 Comment puis-je vous guider ? Je peux vous renseigner sur mes compétences, les avantages de mes services, ou comment démarrer un projet."
            },
            {
                keys: ['prompt', 'engineering', 'ia', 'intelligence artificielle', 'gpt', 'midjourney', 'llm', 'claude'],
                reply: "L'<strong>Ingénierie de Prompt (Prompt Engineering)</strong> est une de mes expertises clés. Elle consiste à structurer et optimiser les instructions destinées aux IA génératives. Pour un client, cela permet :<br>• D'automatiser intelligemment les processus métiers.<br>• De générer du contenu hautement qualitatif et ultra-ciblé.<br>• D'intégrer des fonctionnalités cognitives avancées directement dans vos applications."
            },
            {
                keys: ['avantage', 'benefice', 'interet', 'gain', 'pourquoi', 'valeur', 'utilite'],
                reply: "Investir dans mes services vous apporte des bénéfices concrets :<br>• 🌐 <strong>Site Web :</strong> Une présence mondiale et crédible 24h/24 pour attirer de nouveaux prospects en continu.<br>• 📱 <strong>Application Mobile :</strong> Une proximité maximale avec vos clients grâce aux notifications instantanées.<br>• 👥 <strong>Community Manager :</strong> Une e-réputation active qui fédère vos abonnés pendant que vous gagnez du temps.<br>• 🎨 <strong>Identité Visuelle & Affiches :</strong> Une image de marque inoubliable, professionnelle et impactante face à vos concurrents."
            },
            {
                keys: ['competence', 'techno', 'stack', 'python', 'flutter', 'code', 'langage', 'sqlite', 'html', 'css', 'javascript', 'js', 'dart', 'tkinter'],
                reply: "Mes compétences techniques principales couvrent :<br>• 🤖 <strong>Prompt Engineering</strong> : Structuration d'invites IA avancées.<br>• 📱 <strong>Applications Mobiles</strong> : Flutter & Dart.<br>• 💻 <strong>Logiciels de Bureau</strong> : Python & Tkinter.<br>• 🌐 <strong>Applications Web</strong> : HTML5, CSS3 premium, JavaScript.<br>• 🗄️ <strong>Bases de données</strong> : SQLite.<br>• 🎨 <strong>Création Visuelle</strong> : Design de marque (logos 2D/3D, branding) sous la marque <i>Voldigood Design</i>."
            },
            {
                keys: ['contact', 'joindre', 'telephone', 'téléphone', 'whatsapp', 'mail', 'ecrire', 'numero', 'numéro', 'facebook', 'linkedin', 'adresse'],
                reply: "Vous pouvez me contacter très simplement :<br>• 📱 <strong>WhatsApp / Tél</strong> : <a href='https://wa.me/243995372992' target='_blank' style='color:#00d4ff; text-decoration:underline;'>+243 995 372 992</a><br>• 🌐 <strong>LinkedIn</strong> : <a href='https://www.linkedin.com/in/vodieu-lopamba-676525377' target='_blank' style='color:#00d4ff; text-decoration:underline;'>Consulter mon profil</a><br>• 📘 <strong>Facebook</strong> : <a href='https://www.facebook.com/voldi.lopamba' target='_blank' style='color:#00d4ff; text-decoration:underline;'>Suivre ma page</a>."
            },
            {
                keys: ['service', 'faire', 'travail', 'creer', 'aide', 'prestation', 'offre', 'developpement', 'conception', 'branding', 'logo', 'community'],
                reply: "Je propose des services d'accompagnement complets :<br>1️⃣ <strong>Création Web</strong> (Sites vitrines responsives).<br>2️⃣ <strong>Développement Mobile</strong> (Applications performantes Android & iOS via Flutter).<br>3️⃣ <strong>Logiciels sur mesure</strong> (Bureautique Python/SQLite).<br>4️⃣ <strong>Identité Visuelle & Affiches</strong> (Logos professionnels et visuels publicitaires).<br>5️⃣ <strong>Marketing Digital & Community Management</strong> (Animation des réseaux sociaux)."
            },
            {
                keys: ['cv', 'curriculum', 'telecharger', 'télécharger', 'pdf', 'parcours', 'diplome', 'etude'],
                reply: "Vous pouvez télécharger mon CV complet au format PDF directement en cliquant sur le bouton <strong>'Télécharger mon CV'</strong> disponible en haut de la page d'accueil. N'hésitez pas à l'étudier !"
            },
            {
                keys: ['projet', 'realisation', 'travaux', 'oeuvre', 'portfolio', 'exemple', 'creations'],
                reply: "Voici un aperçu de mes projets phares :<br>• 📂 <strong>Gestion de Cours</strong> : Logiciel bureautique robuste écrit en Python avec interface Tkinter et stockage SQLite.<br>• 📱 <strong>Application Mobile</strong> : Un produit multiplateforme natif développé sous Flutter.<br>• 🎨 <strong>Identité Voldigood</strong> : Travail complet de branding, de design de logo 3D et de communication visuelle.<br>Pour voir des images de mes réalisations graphiques, n'hésitez pas à explorer la galerie défilante située au milieu de mon site !"
            },
            {
                keys: ['tarif', 'prix', 'combien', 'devis', 'cout', 'coût', 'budget', 'facture', 'payer'],
                reply: "Mes tarifs s'adaptent à la complexité et à l'envergure de chaque projet. Pour obtenir une estimation gratuite ou en discuter de vive voix, contactez-moi directement par WhatsApp (<a href='https://wa.me/243995372992' target='_blank' style='color:#00d4ff; text-decoration:underline;'>+243 995 372 992</a>). Nous trouverons la formule adéquate."
            },
            {
                keys: ['voldigood', 'design', 'affiche', 'visuel', 'maquette'],
                reply: "<strong>Voldigood Design</strong> est ma marque signature pour tous les travaux créatifs et artistiques. J'y réalise des chartes graphiques, des maquettes d'applications, des logos 2D/3D et des affiches publicitaires à fort impact visuel."
            },
            {
                keys: ['localisation', 'habite', 'ou es-tu', 'adresse', 'pays', 'ville', 'congo', 'kinshasa', 'rdc'],
                reply: "Je suis basé à <strong>Kinshasa, en République Démocratique du Congo (RDC)</strong>. 🇨🇩 Je travaille aussi bien en local qu'à distance (télétravail) avec des clients du monde entier."
            },
            {
                keys: ['dispo', 'libre', 'recruter', 'embaucher', 'freelance', 'emploi', 'contrat'],
                reply: "Je suis actuellement <strong>disponible</strong> pour de nouvelles missions en freelance, des collaborations de court/moyen terme ou des opportunités de télétravail. Échangeons sur vos besoins !"
            },
            {
                keys: ['guitare', 'musicien', 'musique', 'art', 'passion'],
                reply: "En dehors de la programmation, je suis un guitariste passionné. 🎸 La musique développe ma rigueur et ma créativité, des atouts que je retranscris directement dans l'architecture de mon code !"
            },
            {
                keys: ['gaufre', 'patisserie', 'cuisine', 'manger', 'gaufres'],
                reply: "Vous avez l'œil ! En effet, la pâtisserie (particulièrement la confection de bonnes gaufres traditionnelles 🧇) est l'un de mes loisirs favoris pour me détendre loin des écrans."
            },
            {
                keys: ['qui es-tu', 'ton nom', 'lopamba', 'assistant', 'ia', 'robot'],
                reply: "Je suis <strong>Lopamba IA</strong>, un assistant virtuel créé pour représenter Lopamba Vodieu Vodieu. Je suis configuré pour répondre de manière autonome aux premières interrogations des visiteurs."
            },
            {
                keys: ['methode', 'process', 'etape', 'comment', 'deroule', 'workflow'],
                reply: "Pour chaque projet, je suis une méthodologie rigoureuse :<br>1️⃣ <strong>Cahier des charges</strong> : Analyse précise de vos besoins.<br>2️⃣ <strong>Maquettage & Design</strong> : Validation du style visuel.<br>3️⃣ <strong>Développement</strong> : Phase d'écriture de code propre.<br>4️⃣ <strong>Tests</strong> : Détection et correction des anomalies.<br>5️⃣ <strong>Livraison</strong> : Mise en ligne et suivi d'utilisation."
            }
        ];

        // Recherche d'une correspondance par mot clé
        for (const item of knowledgeBase) {
            const hasMatch = item.keys.some(key => cleaned.includes(cleanText(key)));
            if (hasMatch) {
                return item.reply;
            }
        }

        // Réponse par défaut améliorée si aucune correspondance n'est trouvée
        return "Je ne suis pas certain de saisir l'objet de votre demande. 🤔<br><br>" +
               "N'hésitez pas à me poser une question claire concernant :<br>" +
               "• Mes <strong>compétences</strong> (Développement, Prompt Engineering, Design)<br>" +
               "• Les <strong>avantages</strong> clients de mes services (site, appli, réseaux sociaux, affiches, logo)<br>" +
               "• Mes <strong>réalisations</strong> ou mon <strong>CV</strong><br>" +
               "• Mes <strong>tarifs</strong> et ma <strong>localisation</strong><br><br>" +
               "Pour toute demande spécifique, cliquez directement sur l'icône WhatsApp pour me joindre en direct au <strong>+243 995 372 992</strong> !";
    }
}
