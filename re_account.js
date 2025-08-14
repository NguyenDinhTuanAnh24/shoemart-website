document.addEventListener('DOMContentLoaded', function() {
    const passwordChangeForm = document.getElementById('passwordChangeForm');
    const messageElement = document.getElementById('message');
    
    // Kiểm tra URL để xác định chế độ (thay đổi hay đặt lại mật khẩu)
    const urlParams = new URLSearchParams(window.location.search);
    const isResetMode = urlParams.get('reset') === 'true';

    // Các thành phần UI cần điều khiển
    const accountTitle = document.querySelector('.account-title');
    const accountInfoDiv = document.querySelector('.account-info');
    const usernameGroup = document.getElementById('username-group');
    const currentPasswordGroup = document.getElementById('current-password-group');
    const currentPasswordInput = document.getElementById('currentPassword');
    const submitButton = passwordChangeForm.querySelector('button[type="submit"]');

    // --- Đối tượng quản lý người dùng ---
    const userDB = {
        getUsers: function() {
            return JSON.parse(localStorage.getItem('users') || '{}');
        },
        saveUsers: function(users) {
            localStorage.setItem('users', JSON.stringify(users));
        },
        getUser: function(username) {
            return this.getUsers()[username];
        },
        updateUserPassword: function(username, newPassword) {
            const users = this.getUsers();
            if (users[username]) {
                users[username].password = newPassword;
                this.saveUsers(users);
                return true;
            }
            return false;
        }
    };

    let username; // Biến để lưu tên người dùng cho thao tác hiện tại

    // --- CÀI ĐẶT GIAO DIỆN BAN ĐẦU ---
    if (isResetMode) {
        // Chế độ Đặt lại Mật khẩu
        accountTitle.textContent = 'Đặt Lại Mật Khẩu';
        if (accountInfoDiv) accountInfoDiv.style.display = 'none'; // Ẩn thông tin tài khoản
        usernameGroup.style.display = 'block'; // Hiện ô nhập tên đăng nhập
        currentPasswordGroup.style.display = 'none'; // Ẩn ô nhập mật khẩu cũ
        currentPasswordInput.required = false; // Bỏ yêu cầu bắt buộc cho mật khẩu cũ
        submitButton.textContent = 'Đặt Lại Mật Khẩu';
    } else {
        // Chế độ Thay đổi Mật khẩu (cho người đã đăng nhập)
        usernameGroup.style.display = 'none';
        const loggedInUserSession = sessionStorage.getItem('loggedInUser');
        if (!loggedInUserSession) {
            showMessage('Không tìm thấy phiên đăng nhập. Vui lòng đăng nhập lại.', 'error');
            passwordChangeForm.style.display = 'none';
            if (accountInfoDiv) accountInfoDiv.style.display = 'none';
            return; // Dừng thực thi nếu chưa đăng nhập
        }
        const loggedInUser = JSON.parse(loggedInUserSession);
        username = loggedInUser.username;

        // Điền thông tin người dùng vào trang
        const userData = userDB.getUser(username);
        if (userData && accountInfoDiv) {
            accountInfoDiv.innerHTML = `
                <div class="info-item">
                    <span class="info-label">Tên người dùng:</span>
                    <span class="info-value">${username}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Số điện thoại:</span>
                    <span class="info-value">${userData.phone || 'Chưa cập nhật'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày tham gia:</span>
                    <span class="info-value">14/08/2025</span>
                </div>`;
        }
    }

    // --- XỬ LÝ SUBMIT FORM DUY NHẤT ---
    passwordChangeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Các bước kiểm tra chung
        messageElement.textContent = '';
        messageElement.className = 'message';

        if (!newPassword || !confirmPassword) {
            showMessage('Vui lòng điền đầy đủ mật khẩu mới.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('Mật khẩu mới và mật khẩu xác nhận không khớp.', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showMessage('Mật khẩu mới phải có ít nhất 6 ký tự.', 'error');
            return;
        }

        if (isResetMode) {
            // --- Logic cho chế độ Đặt lại Mật khẩu ---
            const usernameToReset = document.getElementById('resetUsername').value;
            if (!usernameToReset) {
                showMessage('Vui lòng nhập tên đăng nhập.', 'error');
                return;
            }

            const userToUpdate = userDB.getUser(usernameToReset);
            if (!userToUpdate) {
                showMessage('Tên đăng nhập không tồn tại.', 'error');
                return;
            }
            
            // Cập nhật mật khẩu cho người dùng đã chỉ định
            const success = userDB.updateUserPassword(usernameToReset, newPassword);
            if (success) {
                showMessage('Đặt lại mật khẩu thành công! Bạn có thể quay về trang đăng nhập.', 'success');
                passwordChangeForm.reset();
            } else {
                showMessage('Đã có lỗi xảy ra. Vui lòng thử lại.', 'error');
            }

        } else {
            // --- Logic cho chế độ Thay đổi Mật khẩu ---
            const currentPassword = document.getElementById('currentPassword').value;
            if (!currentPassword) {
                showMessage('Vui lòng nhập mật khẩu hiện tại.', 'error');
                return;
            }
            
            // Lấy dữ liệu cho người dùng đã đăng nhập (biến 'username' đã được thiết lập)
            const currentUserData = userDB.getUser(username);
            
            if (!currentUserData || currentUserData.password !== currentPassword) {
                showMessage('Mật khẩu hiện tại không đúng.', 'error');
                return;
            }

            // Cập nhật mật khẩu cho người dùng đã đăng nhập
            const success = userDB.updateUserPassword(username, newPassword);
            if (success) {
                showMessage('Thay đổi mật khẩu thành công!', 'success');
                passwordChangeForm.reset();
            } else {
                showMessage('Đã có lỗi xảy ra. Vui lòng thử lại.', 'error');
            }
        }
    });

    function showMessage(msg, type) {
        messageElement.textContent = msg;
        messageElement.classList.add(type);
    }
});