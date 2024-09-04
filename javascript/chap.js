window.addEventListener('load', function(){
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