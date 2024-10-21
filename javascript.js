document.addEventListener('DOMContentLoaded', function() {
    var icon = document.getElementById('icon');
    var moreText = document.querySelector('.more-text');
    
    // Atur tampilan awal elemen moreText
    moreText.style.display = 'none';
    
    icon.addEventListener('click', function() {
        if (moreText.style.display === 'none' || moreText.style.display === '') {
            // Munculkan teks dengan efek transisi
            moreText.style.display = 'block';
            moreText.style.maxHeight = '1000px'; // Tentukan nilai besar untuk animasi
            moreText.style.opacity = '1';
            icon.classList.remove('bi-caret-down-square-fill'); // Hapus ikon panah ke bawah
            icon.classList.add('bi-caret-up-square-fill'); // Tambah ikon panah ke atas
        } else {
            // Sembunyikan teks dengan transisi
            moreText.style.maxHeight = '0';
            moreText.style.opacity = '0';
            setTimeout(function() {
                moreText.style.display = 'none';
            }, 500); // Sembunyikan setelah transisi selesai (500ms sesuai durasi transisi)
            icon.classList.remove('bi-caret-up-square-fill'); // Hapus ikon panah ke atas
            icon.classList.add('bi-caret-down-square-fill'); // Tambah ikon panah ke bawah
        }
    });
});
const brandsContainer = document.querySelector('.brands-container');
const brandsControlsContainer = document.querySelector('.brands-controls');
const brandsControls = ['previous', 'next'];
const brandsItems = document.querySelectorAll('.brands-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('brands-item-1', 'brands-item-2', 'brands-item-3', 'brands-item-4', 'brands-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`brands-item-${i + 1}`);
        });
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `brands-controls-${control}`;
            button.innerHTML = control === 'previous' ? '<i class="bi bi-caret-left-fill"></i>' : '<i class="bi bi-caret-right-fill"></i>'; 
            brandsControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...brandsControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

    setCurrentState(control) {
        if (control.className.includes('brands-controls-next')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }
}

const exampleCarousel = new Carousel(brandsContainer, brandsItems, brandsControls);
exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.updateGallery();

document.addEventListener('DOMContentLoaded', function () {
    const brandItems = document.querySelectorAll('.brands-item');
    const galleries = document.querySelectorAll('.gallery');
    const previousButton = document.querySelector('.brands-controls-previous');
    const nextButton = document.querySelector('.brands-controls-next');

    let currentIndex = 0;

    function showGallery(index) {
        galleries.forEach(gallery => {
            gallery.classList.add('gallery-hidden');
        });
        galleries[index].classList.remove('gallery-hidden');
    }

    function updateGalleryOnSlide(index) {
        brandItems.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        showGallery(index);
    }

    brandItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentIndex = index;
            updateGalleryOnSlide(currentIndex);
        });
    });

    previousButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + brandItems.length) % brandItems.length;
        updateGalleryOnSlide(currentIndex);
    });

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % brandItems.length;
        updateGalleryOnSlide(currentIndex);
    });

    // Initialize the first gallery as visible
    showGallery(currentIndex);
});

document.addEventListener("scroll", function () {
    var parallaxElements = document.querySelectorAll(".carousel-item img");
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    parallaxElements.forEach(function (elem) {
        var speed = 0.5;
        var offset = scrollTop * speed;
        elem.style.transform = "translateY(" + offset + "px)";
    });
});

function toggleAnswer(element) {
    var answer = element.querySelector('.faq-answer');
    var arrow = element.querySelector('.faq-arrow');
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        answer.style.maxHeight = null;
    } else {
        element.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.faq-card');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

$(document).ready(function() {
    function checkScroll() {
        $('.about-image').each(function() {
            var elementPosition = $(this).offset().top;
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            if (elementPosition < (scrollTop + windowHeight - 100)) {
                $(this).addClass('zoom-in');
            }
        });
    }

    // Check on scroll and on page load
    $(window).on('scroll', checkScroll);
    checkScroll();
});

AOS.init();
