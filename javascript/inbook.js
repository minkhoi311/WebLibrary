window.addEventListener('load', function(){
    let popularLinks = document.querySelectorAll('.popular_content > li > a');
    let audioSection = document.querySelector('.audio-flex');
    let modal = document.getElementById('notification-modal');
    let acceptButton = document.getElementById('accept');
    let acceptBuyButton = document.getElementById('acceptbuy');
    
    // Add event listeners to each link
    for (let i = 0; i < popularLinks.length; i++) {
        popularLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hiển thị phần audio nếu "Sách nói" được nhấn
            if (this.getAttribute('href') === '#podcast') {
                audioSection.style.display = 'block';
            } else {
                audioSection.style.display = 'none';
            }

            // Hiển thị modal nếu "Sách giấy" được nhấn
            if (this.getAttribute('href') === '#paperbook') {
                modal.style.display = 'block';
            }

            // Cập nhật class active cho liên kết hiện tại
            for (let j = 0; j < popularLinks.length; j++) {
                popularLinks[j].classList.remove('active');
            }
            this.classList.add('active');
        });
    }

    // Đóng modal khi nhấn vào nút đồng ý
    acceptButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Chuyển hướng đến trang đăng ký mua sách khi nhấn vào nút đăng ký mua
    acceptBuyButton.addEventListener('click', () => {
        window.location.href = '../html/buybook.html';
    });

    // Đóng modal khi nhấn ra ngoài vùng modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    // Phần audio
    let audioElement = document.getElementById('audio-element'); // thanh âm
    let rewindButton = document.getElementById('rewind-btn');    // nút nghe lại -15s
    let forwardButton = document.getElementById('forward-btn');  // nhanh +15s
    let speedControlButton = document.getElementById('speed-control'); // chỉnh tốc độ
    let backTrackButton = document.getElementById('back-track');  // quay lại chap trước
    let nextTrackButton = document.getElementById('next-track');  // đi sang chap khác
    let chapterLinks = document.querySelectorAll('.chapter-items li a');  // các chap
    
    // Tạo biến để theo dõi chỉ số chương hiện tại
    let currentChapterIndex = chapterLinks.length - 1;
    
    // Load các audio lại
    for (let i = 0; i < chapterLinks.length; i++) {
        chapterLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            // Cập nhật chỉ số chương hiện tại
            currentChapterIndex = i;
            audioElement.src = `../resources/audio/kid/dmplk/chap${10 - currentChapterIndex}.mp3`;
            audioElement.play();
        });
    }
    
    // Back Track button functionality
    backTrackButton.addEventListener('click', function() {
        if (currentChapterIndex >= chapterLinks.length - 1) {
            alert("Đây là chương số 1");
        } else {
            currentChapterIndex++;
            audioElement.src = `../resources/audio/kid/dmplk/chap${10 - currentChapterIndex}.mp3`;
            audioElement.play();
        }
    });
    
    // Next Track button functionality
    nextTrackButton.addEventListener('click', function() {
        if (currentChapterIndex <= 0) {
            alert("Đây là chương mới nhất rồi!");
        } else {
            currentChapterIndex--;
            audioElement.src = `../resources/audio/kid/dmplk/chap${10 - currentChapterIndex}.mp3`;
            audioElement.play();
        }
    });
    

    // Rewind button functionality
    rewindButton.addEventListener('click', function() {
        audioElement.currentTime -= 15;
    });

    // Forward button functionality
    forwardButton.addEventListener('click', function() {
        audioElement.currentTime += 15;
    });

    // Chỉnh tốc độ nghe
    let speedOptions = ['x0.5', 'x1', 'x2', 'x3'];
    let currentSpeedIndex = 1; // Bắt đầu từ tốc độ x1, vì x0.5 đã được thêm vào
    speedControlButton.addEventListener('click', function() {
        // Cập nhật chỉ số tốc độ hiện tại
        currentSpeedIndex = (currentSpeedIndex + 1) % speedOptions.length;
        // Lấy giá trị tốc độ từ mảng và cập nhật thuộc tính playbackRate của audioElement
        audioElement.playbackRate = parseFloat(speedOptions[currentSpeedIndex].replace('x', ''));
        // Cập nhật nội dung của button để hiển thị tốc độ hiện tại
        speedControlButton.textContent = `Speed ${speedOptions[currentSpeedIndex]}`;
    });

    for (let link of chapterLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let chapter = this.getAttribute('href').replace('#chap', '');
            let newSource = `../resources/audio/kid/dmplk/chap${chapter}.mp3`;
            // Cập nhật nguồn âm thanh và phát
            audioElement.src = newSource;
            audioElement.play();
        });
    }

    //code cũ
    // phần thanh trượt js
    function scrollBooks(direction, container) {
        let scrollAmount = container.offsetWidth; // Scroll by the width of the container
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // lệnh nhấn vào link mỗi cuốn sách (cc)
    function sameLink(){
        let linkBook = document.querySelectorAll(".book a");
        for(let i = 0; i < linkBook.length; i++){
            linkBook[i].href = "../html/inbook.html";
        };
    }
    sameLink();

    // Apply functionality to all bookshelves
    let bookshelves = document.querySelectorAll('.bookshelf');
    for (let bs of bookshelves) {
        let prevButton = bs.querySelector('.prev');
        let nextButton = bs.querySelector('.next');
        let container = bs.querySelector('.books-container');

        prevButton.addEventListener('click', () => scrollBooks(-1, container));
        nextButton.addEventListener('click', () => scrollBooks(1, container));
    }
    
// lấy thông tin người dùng
    function getCurrentUserFromLocalStorage() {
        let userJson = localStorage.getItem('currentUser');
        if (userJson !== null) {
            return JSON.parse(userJson);
        }
        return null;
    }

    // Tính năng comment
    let commentsList = document.querySelector(".comments-list");
    let btnCmt = document.getElementById("submit-cmt");
    
    btnCmt.addEventListener("click", function(event) {
        event.preventDefault();
    
        // Get the comment text and current user
        let commentText = document.getElementById("comment-text").value;
        let user = getCurrentUserFromLocalStorage();
        let currentTime = new Date().toLocaleString('vi-VN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
        });
                //chuyển đổi sang DOM
        let newCommentElement = document.createElement('div');
        newCommentElement.classList.add('comment');
    
        newCommentElement.innerHTML = `
            <p class="comment-name">${user.username}</p>
            <p class="comment-text">${commentText}</p>
            <p class="comment-date">${currentTime}</p>
        `;
    
        commentsList.insertBefore(newCommentElement, commentsList.firstChild);
        document.getElementById("comment-text").value = '';
    });

    // Phần popup nha mậy (CC)
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
    
});
