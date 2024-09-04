window.onload = function() {
    // Xử lý sự kiện submit của form
    document.getElementById("order-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn việc gửi form mặc định
        document.getElementById("success-message").style.display = "block"; // Hiển thị thông báo thành công
        document.getElementById("order-form").style.display = "none"; // Hiển thị thông báo thành công

    });
};
