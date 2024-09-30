window.addEventListener('load',function(){
        // phần ads hiện slider (cc)
        let currentSlideIndex = 1;
        let slides = document.querySelectorAll('.ads_img img');
        let dots = document.querySelectorAll('.slider-dots .dot');
        function showSlide(index) {
            for (let i = 0; i < slides.length; i++) {
                if (i + 1 === index) {
                    slides[i].style.display = 'block';
                } else {
                    slides[i].style.display = 'none';
                }
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('actdot');
            }
            slides[index - 1].style.display = 'block';
            dots[index - 1].classList.add('actdot');
        }
        function nextSlide() {
            currentSlideIndex++;
            if (currentSlideIndex > slides.length) currentSlideIndex = 1;
            showSlide(currentSlideIndex);
        }
        
        function currentSlide(index) {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
        }
        showSlide(currentSlideIndex);
        setInterval(nextSlide, 5000);
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', function() {
                showSlide(i + 1);
                currentSlideIndex = i + 1; 
            });
        }
    // tìm sách nè (cc)
    let search = document.querySelector("input[type=search]");
    search.oninput = function() {
        let searchValue = this.value.toLowerCase();
        let texts = document.querySelectorAll(".book a");

        // Reset styles before search
        for (let i = 0; i < texts.length; i++) {
            let bookContainer = texts[i].parentElement.parentElement;
            bookContainer.style.border = "none";
            bookContainer.classList.remove('enlarged');
        }

        if (searchValue !== '') {
            let found = false;
            for (let i = 0; i < texts.length; i++) {
                if (texts[i].textContent.toLowerCase().includes(searchValue)) {
                    let bookContainer = texts[i].parentElement.parentElement;
                    if (!found) {
                        found = true;
                        setTimeout(() => {
                            bookContainer.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });
                        },2000)
                        setTimeout(() => {
                            bookContainer.classList.add('enlarged');
                        }, 3000);
                    }
                }
            }
        }
    };

// phần thanh trượt js
    function scrollBooks(direction, container) {
        const scrollAmount = container.offsetWidth; // Scroll by the width of the container
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Apply functionality to all bookshelves
    let bookshelves = document.querySelectorAll('.bookshelf');
    for (let bs of bookshelves) {
        const prevButton = bs.querySelector('.prev');
        const nextButton = bs.querySelector('.next');
        const container = bs.querySelector('.books-container');

        prevButton.addEventListener('click', () => scrollBooks(-1, container));
        nextButton.addEventListener('click', () => scrollBooks(1, container));
    }
    // thay đổi sách (cc)
    function shuffleBooks() {
        const container = document.querySelector('.books');
        const books = Array.from(container.children);

        for (let i = books.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            container.appendChild(books[j]); 
        }
    }
    shuffleBooks();

    // lệnh nhấn vào link mỗi cuốn sách (cc)
    function sameLink(){
        let linkBook = document.querySelectorAll(".book a");
        for(let i = 0; i < linkBook.length; i++){
            linkBook[i].href = "../html/inbook.html";
        };
    }
    sameLink();
    
    // Phần popup nha mậy (cc)
    let myBooks = document.querySelectorAll(".book img");
    let myId = document.getElementById("popImg");
    let popup = document.querySelector(".popup");
    let closepop = document.querySelector(".close-pop");
    for (let im of myBooks){
        im.onclick = function(){
            myId.src = this.src;
            popup.classList.add("show");
        }
    }
    closepop.onclick = function(event){
        event.preventDefault();
        popup.classList.remove("show");
    }
    // quay về đầu + infor (cc)
    // Lấy phần tử nút cuộn lên đầu
    let scrollToTopButton = document.getElementById('scrollToTop');
    let contactButtons = document.querySelector('.contact-buttons');

    // Hiển thị nút khi cuộn xuống trang
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // Hiển thị nút khi cuộn xuống hơn 200px
            scrollToTopButton.style.display = 'block';
            contactButtons.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
            contactButtons.style.display = 'none';
        }
    });
        // Cuộn lên đầu khi nhấn nút
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    
})
