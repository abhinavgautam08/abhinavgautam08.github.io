// DOMContentLoaded event listener taaki jab page load ho tab code chale
document.addEventListener('DOMContentLoaded', function() {
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Failed', err));
    }
    
    // Yahan hum html elements ko select kar rahe hain
    var body = document.body;
    var themeToggle = document.querySelector('.theme-toggle');
    var themeIcon = document.getElementById('theme-icon');
    var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    // mobile menu button ke andar ka icon
    var menuIcon = mobileMenuBtn.querySelector('i'); 
    var avatarContainer = document.getElementById('avatar-container');
    var avatarImg = document.getElementById('avatar-img');

    // Theme (Dark/Light) set karne ka variable
    // Local storage se check kar rahe hain ki pehle se kya set hai
    var isDark = false;
    if (localStorage.getItem('theme') !== 'light') {
        isDark = true;
    }

    // Function banaya theme update karne ke liye
    function updateTheme() {
        if (isDark == true) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            
            // Icon change kar rahe hain moon wala
            themeIcon.classList.remove('ph-sun');
            themeIcon.classList.add('ph-moon');
            themeIcon.style.color = '#FFD700'; 
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            
            // Icon change kar rahe hain sun wala
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
            themeIcon.style.color = '#1E90FF';
        }
        
        // Local storage me save kar rahe hain
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Pehli baar function chala rahe hain
    updateTheme();

    // Jab button click hoga tab kya hoga
    themeToggle.addEventListener('click', function() {
        // true ko false aur false ko true kar rahe hain
        if (isDark == true) {
            isDark = false;
        } else {
            isDark = true;
        }
        updateTheme();
    });

    // -------------------------------------------------------------
    // Mobile Menu ka code yahan hai
    // -------------------------------------------------------------
    var isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', function() {
        if (isMenuOpen == false) {
            isMenuOpen = true;
            mobileMenu.classList.add('open');
            // Icon badal rahe hain cross wala
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
        } else {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            // Icon wapis list wala
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        }
    });

    // Saare links par loop chala rahe hain taaki click pe menu band ho jaye
    var menuLinks = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', function() {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        });
    }

    // -------------------------------------------------------------
    // Avatar change karne ka simple logic
    // -------------------------------------------------------------
    // Ye saari photo ki link hai
    var avatars = [];
    avatars.push('https://abhinavgautam08.pages.dev/assets/avatar-CTUsVRGB.webp');
    avatars.push('../src/assets/avatar1.webp');
    avatars.push('../src/assets/avatar2.webp');
    avatars.push('../src/assets/avatar3.webp');
    avatars.push('../src/assets/avatar4.webp');
    avatars.push('../src/assets/avatar5.webp');
    avatars.push('../src/assets/avatar6.webp');
    avatars.push('../src/assets/avatar7.webp');
    avatars.push('../src/assets/avatar8.webp');
    avatars.push('../src/assets/avatar9.webp');
    avatars.push('../src/assets/avatar10.webp');
    avatars.push('../src/assets/avatar11.webp');
    avatars.push('../src/assets/avatar12.webp');
    avatars.push('../src/assets/avatar13.webp');

    var currentAvatarIndex = 0;

    if (avatarContainer) {
        avatarContainer.addEventListener('dblclick', function() {
            currentAvatarIndex = currentAvatarIndex + 1;
            // Agar index length se bada ho gaya to wapis 0 kar dalo
            if (currentAvatarIndex >= avatars.length) {
                currentAvatarIndex = 0;
            }
            
            // Thoda animation effect
            avatarImg.style.opacity = '0';
            
            // Thodi der baad image change karenge
            setTimeout(function() {
                avatarImg.src = avatars[currentAvatarIndex];
                avatarImg.style.opacity = '1';
            }, 300);
        });
    }

    // -------------------------------------------------------------
    // SPA Routing (Page change bina refresh ke)
    // -------------------------------------------------------------
    var sections = document.querySelectorAll('.section');
    var navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    function router() {
        // Hash check kar rahe hain url me (jaise #home)
        var hash = window.location.hash;
        if (!hash) {
            hash = '#home';
        }
        
        var page = hash.substring(1); // # hata diya

        // Pehle sab section ko chupa do
        for (var i = 0; i < sections.length; i++) {
            sections[i].classList.remove('active');
        }

        // Jo page chahiye usko dikhao
        var target = document.getElementById(page);
        if (target) {
            target.classList.add('active');
        } else {
            // Agar kuch nahi mila to home dikhao
            document.getElementById('home').classList.add('active');
        }

        // Link ko active color karne ke liye loop
        for (var j = 0; j < navLinks.length; j++) {
            var link = navLinks[j];
            if (link.getAttribute('href') === '#' + page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }

        // Data load karne ke functions call kar rahe hain
        if (page === 'projects') {
            loadProjects();
        }

        if (page === 'certificate') {
            loadCertificates();
        }
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    // -------------------------------------------------------------
    // API se data lane wala code function
    // -------------------------------------------------------------
    var projectsLoaded = false;

    var certificatesLoaded = false;

    function loadProjects() {
        if (projectsLoaded == true) {
            return; // Agar pehle se load hai to wapis mat karo
        }
        
        var grid = document.getElementById('projects-grid');
        
        // Fetch use kar rahe hain data lane ke liye
        fetch('https://pwd.abhinavgautam08.workers.dev/api/projects')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.length === 0) {
                    grid.innerHTML = '<p>No projects found.</p>';
                    return;
                }
                
                grid.innerHTML = ''; // Loading text hata diya
                
                // Har project ke liye card bana rahe hain standard loop se
                for (var i = 0; i < data.length; i++) {
                    var p = data[i];
                    var card = document.createElement('div');
                    card.className = 'project-card';
                    
                    // HTML bana rahe hain
                    var techHtml = '';
                    if (p.technologies) {
                        for (var k = 0; k < p.technologies.length; k++) {
                            techHtml += '<span class="tech-tag">' + p.technologies[k] + '</span>';
                        }
                    }
                    
                    var linksHtml = '';
                    if (p.githubLink) {
                        linksHtml += '<a href="' + p.githubLink + '" target="_blank"><i class="ph-fill ph-github-logo"></i></a>';
                    }
                    if (p.deployLink) {
                        linksHtml += '<a href="' + p.deployLink + '" target="_blank"><i class="ph ph-arrow-square-out"></i></a>';
                    }

                    card.innerHTML = 
                        '<h3>' + p.title + '</h3>' +
                        '<p style="margin-bottom: 1rem; opacity: 0.9;">' + p.description + '</p>' +
                        '<div class="tech-stack">' + techHtml + '</div>' +
                        '<div class="project-links">' + linksHtml + '</div>';
                    
                    grid.appendChild(card);
                }
                projectsLoaded = true;
            })
            .catch(function(err) {
                console.log('Error aaya:', err);
                grid.innerHTML = '<p>Failed to load projects.</p>';
            });
    }



    function loadCertificates() {
        if (certificatesLoaded == true) return;
        var listContainer = document.getElementById('certificates-list');

        fetch('https://pwd.abhinavgautam08.workers.dev/api/certificates')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.length === 0) {
                    listContainer.innerHTML = '<p>No certificates found.</p>';
                    return;
                }
                listContainer.innerHTML = '';

                for (var i = 0; i < data.length; i++) {
                    var section = data[i];
                    var secDiv = document.createElement('div');
                    secDiv.className = 'certificate-section';
                    
                    var itemsHtml = '<ul style="list-style:none; padding:0;">';
                    for (var j = 0; j < section.items.length; j++) {
                        var item = section.items[j];
                        var linkHtml = '';
                        if (item.link) {
                            var linkText = item.linkText || 'View';
                            linkHtml = ' - <a href="' + item.link + '" target="_blank" class="cert-link">' + linkText + '</a>';
                        }
                        
                        itemsHtml += 
                            '<li class="certificate-item">' +
                                '<span style="font-weight:500; margin-right:0.5rem;">' + (j + 1) + '. ' + item.name + '</span>' +
                                '<span style="opacity:0.8;">' + item.description + linkHtml + '</span>' +
                            '</li>';
                    }
                    itemsHtml += '</ul>';
                    
                    secDiv.innerHTML = '<h3 style="color: var(--primary); margin-bottom:1rem;">' + section.title + '</h3>' + itemsHtml;
                    listContainer.appendChild(secDiv);
                }
                certificatesLoaded = true;
            })
            .catch(function(err) {
                console.log(err);
                listContainer.innerHTML = '<p>Failed to load certificates.</p>';
            });
    }

    // Icon select karne ka function if-else se


    // Favicon change karne ka code
    var favicon = document.getElementById('dynamic-favicon');
    if (favicon) {
        var iconIndex = 0;
        setInterval(function() {
            iconIndex = iconIndex + 1;
            if (iconIndex >= avatars.length) {
                iconIndex = 0;
            }
            favicon.href = avatars[iconIndex];
        }, 30000);
    }
});

