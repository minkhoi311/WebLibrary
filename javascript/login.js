window.onload = function() {
    //ẩn Đăng nhập và hiện đăng kí
    document.querySelector("#showSignup").addEventListener("click", function() {
        document.querySelector(".logins").style.display = "none"; 
        document.querySelector(".signups").style.display = "block"; 
    });
    // ẩn Đăng kí và hiện đăng nhập
    document.querySelector("#showLogin").addEventListener("click", function() {
        document.querySelector(".signups").style.display = "none"; 
        document.querySelector(".logins").style.display = "block"; 
    });
    // nhấn quên MK thì hiện bảng quên MK
    document.querySelector("#forgot").addEventListener("click", function() {
        document.querySelector(".logins").style.display = "none"; 
        document.querySelector(".signups").style.display = "none"; 
        document.querySelector(".forgot").style.display = "block"; 
    });

    document.querySelector("#backToLogin").addEventListener("click", function() {
        document.querySelector(".forgot").style.display = "none"; 
        document.querySelector(".logins").style.display = "block"; 
    });
};

function signup(event) {
    event.preventDefault();
    var username = document.getElementById("signup-username").value;
    var password = document.getElementById("signup-password").value;
    var phone = document.getElementById("signup-phone").value;
            //lấy thông tin nhập từ bàn phím
    if (!username || !password || !phone) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }   //khai báo user lưu 3 thông tin trên
    var user = {
        username: username,
        password: password,
        phone: phone
    };
    var json = JSON.stringify(user);
    localStorage.setItem(username, json); 
    // lưu JSON với dạng tên tài khoản nhập từ bàn phím
    alert("Đăng ký tài khoản thành công");

    // Hiển thị form đăng nhập và ẩn form đăng ký
    document.querySelector(".signups").style.display = "none";
    document.querySelector(".logins").style.display = "block"
}

function login(event) {
    event.preventDefault();
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
     // tiếp tục lấy thông tin từ bàn phím
    if (!username || !password) {
        alert("Hãy nhập tên đăng nhập và mật khẩu");
        return;
    }
    //lấy dữ liệu từ JSON
    var userJson = localStorage.getItem(username);
    if (userJson === null) {
        alert("Tên đăng nhập không tồn tại");
        return;
    }
    //chuyển đổi dữ liệu từ JSON
    var data = JSON.parse(userJson);
    //xét data nhập từ username, password từ bàn phím 
    if (username === data.username && password === data.password) {
        alert("Đăng nhập thành công");
        // lưu thêm với dạng 'currentUser' luôn
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.href = '../index.html';
    } else {
        alert("Mật khẩu không đúng");
    }
}
//quên mật khẩu
function forgot(event) {
    event.preventDefault();
    var username = document.getElementById("forgot-username").value;
    var phone = document.getElementById("forgot-phone").value;
    
    if (!username || !phone) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }
    
    var userJson = localStorage.getItem(username);
    if (userJson === null) {
        alert("Tên đăng ký không tồn tại");
        return;
    }

    var data2 = JSON.parse(userJson);
    if(username === data2.username && phone === data2.phone){
        alert(`Mật khẩu của tài khoản ${data2.username} là ${data2.password}`);
        document.querySelector(".forgot").style.display = "none";
        document.querySelector(".logins").style.display = "block"; 
    }
    else{
        alert("Mật khẩu hoặc tài khoản bạn nhập không đúng!")
    }
}

