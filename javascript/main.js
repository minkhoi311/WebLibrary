window.addEventListener('load',function(){
        // phần nút đăng nhập nè má
    function getCurrentUserFromLocalStorage() {
        let userJson = localStorage.getItem('currentUser');
        if (userJson !== null) {
            return JSON.parse(userJson);
        }
        return null;
    }
    function updateUI() {
        let user = getCurrentUserFromLocalStorage();
        let loginButton = document.getElementById('login-btn');
        let welcomeMessage = document.getElementById('welcome-message');
            
        if (user && user.username) {
            loginButton.style.display = 'none';
            welcomeMessage.innerHTML = `Chào mừng, ${user.username}!`;
            welcomeMessage.style.display = 'block';
        } else {
            loginButton.style.display = 'block';
            welcomeMessage.style.display = 'none';
        }
    }
    updateUI();

    let loginButton = document.getElementById('login-btn');
    loginButton.onclick = function() {
        window.location.href = 'html/login.html';
    };

// tìm sách nè 
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
                        }, 5000);
                    }
                }
            }
        }
    };
    // phần ads hiện slider
    let currentSlideIndex = 1;
    let slides = document.querySelectorAll('.ads_img img');
    let dots = document.querySelectorAll('.slider-dots .dot');
    function showSlide(index) {
        for (let i = 0; i < slides.length; i++) {
            // do mảng là từ 0 nên i phải cộng 1
            if (i + 1 === index) {
                slides[i].style.display = 'block';
            } else {
                //các slide còn lại bị ẩn
                slides[i].style.display = 'none';
            }
        }
        for (let i = 0; i < dots.length; i++) {
            //xóa actdot phía trước
            dots[i].classList.remove('actdot');
        }
        // thêm actdot hiện tại
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

// Quản lý các nút "popular content"
    let popularItems = document.querySelectorAll('.popular_content > li > a');
    popularItems.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

            // Xóa class 'action' khỏi tất cả các mục
            popularItems.forEach(link => link.classList.remove('action'));
            // Thêm class 'action' vào mục được nhấn
            this.classList.add('action');

            // Ẩn tất cả các "bookshelf"
            let bookshelves = document.querySelectorAll('.bookshelf');
            bookshelves.forEach(function(bookshelf) {
                // Xóa class "action" để reset hiệu ứng
                bookshelf.classList.remove('action');
                // Ẩn đi tất cả các bookshelf
                bookshelf.style.display = 'none';
            });

            // Hiển thị "bookshelf" tương ứng với mục được nhấn
            let targetId = this.getAttribute('href').substring(1); // Lấy ID từ href
            let targetBookshelf = document.getElementById(targetId);
            if (targetBookshelf) {
                targetBookshelf.style.display = 'block';
                // Sử dụng timeout ngắn để đảm bảo lớp "action" được thêm lại sau khi display block
                setTimeout(() => {
                    targetBookshelf.classList.add('action');
                }, 10); // Thêm class "action" sau một thời gian ngắn để kích hoạt transition
            }
        });
    });
// hiện thanh trắng của popular content nhaaaaa
    document.querySelectorAll('.popular_content > li > a').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.popular_content > li > a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
// thay đổi sách
    function shuffleBooks() {
        let container = document.querySelector('.books');
        let books = Array.from(container.children);

        for (let i = books.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            container.appendChild(books[j]); 
        }
    }
    shuffleBooks();

// nộp form á nha má
    document.querySelector('.send').addEventListener('click', function() {
        // Get input values
        var name = document.getElementById('text_about').value;
        var email = document.getElementById('email_about').value;
        var feedback = document.getElementById('trinhbay_about').value;
        
        // Validate inputs
        if (!name || !email || !feedback) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
              // Lưu data
        var feedbackData = {
            name: name,
            email: email,
            feedback: feedback
        };
        var feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedbackData);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
        // Clear the form
        document.getElementById('text_about').value = '';
        document.getElementById('email_about').value = '';
        document.getElementById('trinhbay_about').value = '';

        // Show thank-you message
        document.getElementById('thank-you-message').style.display = 'block';

        setTimeout(function() {
            document.getElementById('thank-you-message').style.display = 'none';
        }, 8000);
    });
// lệnh nhấn vào link mỗi cuốn sách 
    function sameLink(){
        let linkBook = document.querySelectorAll(".book a");
        for(let i = 0; i < linkBook.length; i++){
            linkBook[i].href = "html/inbook.html";
        };
    }
    sameLink();

// quay về đầu + infor
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

    // Phần popup nha mậy
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
});

