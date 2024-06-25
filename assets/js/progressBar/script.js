

document.addEventListener("DOMContentLoaded", () => {
    const progressBarElement = document.getElementById('page-scroll-progress');
    const header = document.querySelector('.header');

    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let height = document.documentElement.scrollHeight - window.innerHeight;
        let scrollPosition = document.documentElement.scrollTop;
        let width = (scrollPosition / height) * 100;
        progressBarElement.style.width = `${width}%`;
        
    });

    const lastOne = document.querySelector('.last-one');
    const totalImages = 191;
    const container = document.querySelector('.animation-container');

    
    for (let i = 2; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `./assets/img/imgs/water/water_${i}.jpg`;
        img.alt = `Water Animation Frame ${i}`;
        container.appendChild(img);
    }

    
    if (lastOne) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(totalImages - 1, Math.floor(scrollFraction * totalImages));
            updateActiveImage(frameIndex);
        });
    } else {
        console.error('"last-one" não encontrado.');
    }

    function updateActiveImage(index) {
        const images = container.querySelectorAll('img');
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    const introImage = document.querySelector('.intro img');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    observer.observe(introImage);

    
    const handleLocation = async () => {
        const path = window.location.pathname;
        const routePath = routes[path];
        if (routePath) {
            const html = await fetch(routePath).then((data) => data.text());
            document.getElementById("main-page").innerHTML = html;
            setActiveLink(path);
        } else {
            console.error(`Route not found for ${path}`);
        }
    };

    window.onpopstate = handleLocation;

        const route = (event) => {
            event.preventDefault();
            const href = event.currentTarget.getAttribute("href");
            window.history.pushState({}, "", href);
            handleLocation();
            animateMain();
        
            
            const indicatorBars = document.querySelectorAll(".indicator-bar");
            indicatorBars.forEach(bar => {
                bar.style.width = "0"; 
            });
        
        
            const activeLink = event.currentTarget;
            const indicatorBar = activeLink.querySelector(".indicator-bar");
            indicatorBar.style.width = "40px"; 
        };
        const animatedTec = document.getElementById("main-page")
        const animateMain = () =>{
            console.log('ta funcionando');
            animatedTec.classList.toggle('fade-out'); 
            
            
        }

    const setActiveLink = (path) => {
        const links = document.querySelectorAll("#option");
        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === path) {
                link.classList.add("active");
            }
        });
    };

    const routes = {
        "/": "/assets/pages/tecnology.html",
        "/inovation": "/assets/pages/inovation.html",
        "/business": "/assets/pages/business.html",
    };

    window.route = route;
    handleLocation();


});


document.addEventListener('DOMContentLoaded', function() {
    var questions = document.querySelectorAll('.question');
    
    questions.forEach(function(question) {
        question.addEventListener('mouseover', function() {
            var answer = this.nextElementSibling;
            if (answer && answer.classList.contains('answer')) {
                answer.style.display = 'block';
            }
        });

        question.addEventListener('mouseout', function() {
            var answer = this.nextElementSibling;
            if (answer && answer.classList.contains('answer')) {
                answer.style.display = 'none';
            }
        });
    });
});

