// Custom Modal Notification System
class NotificationModal {
    constructor() {
        this.modal = document.getElementById('notification-modal');
        this.modalIcon = document.getElementById('modal-icon');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.modalClose = document.getElementById('modal-close');
        this.modalOk = document.getElementById('modal-ok');
        this.currentCallback = null;

        this.initEvents();
    }

    initEvents() {
        // Close modal events
        this.modalClose.addEventListener('click', () => this.hide());
        this.modalOk.addEventListener('click', () => this.hide());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.hide();
            }
        });
    }

    show(title, message, type = 'success', callback = null) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.currentCallback = callback;

        // Update icon based on type
        this.updateIcon(type);

        // Show modal with animation
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Auto hide after 5 seconds if it's a success message
        if (type === 'success') {
            setTimeout(() => {
                if (this.modal.classList.contains('show')) {
                    this.hide();
                }
            }, 5000);
        }
    }

    hide() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Execute callback if exists
        if (this.currentCallback) {
            setTimeout(this.currentCallback, 300); // Wait for animation
            this.currentCallback = null;
        }
    }

    updateIcon(type) {
        // Reset all classes
        this.modalIcon.className = 'modal-icon';
        
        let iconSVG = '';
        
        switch (type) {
            case 'success':
                this.modalIcon.classList.add('success');
                iconSVG = `
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                              stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                break;
            case 'error':
                this.modalIcon.classList.add('error');
                iconSVG = `
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                              stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                break;
            case 'warning':
                this.modalIcon.classList.add('warning');
                iconSVG = `
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" 
                              stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                break;
        }
        
        this.modalIcon.innerHTML = iconSVG;
    }
}

// Initialize notification system
const notification = new NotificationModal();

// User Database Management
const userDB = {
    // Lấy tất cả người dùng từ localStorage
    getUsers: function() {
        return JSON.parse(localStorage.getItem('users') || '{}');
    },
    // Lưu lại tất cả người dùng
    saveUsers: function(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },
    // Lấy một người dùng cụ thể
    getUser: function(username) {
        return this.getUsers()[username];
    },
    // Thêm người dùng mới
    addUser: function(username, data) {
        const users = this.getUsers();
        users[username] = data;
        this.saveUsers(users);
    },
    // Tạo tài khoản admin mặc định nếu chưa có
    init: function() {
        const users = this.getUsers();
        if (!users['admin']) {
            users['admin'] = {
                password: 'admin123', // Mật khẩu admin
                phone: '0123456789',
                address: 'Administrator',
                role: 'admin' // Vai trò
            };
            this.saveUsers(users);
        }
    }
};

// Khởi tạo DB (tạo tài khoản admin nếu cần)
userDB.init();

// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    const loginFormContainer = document.getElementById('login-form');
    const signupFormContainer = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const rememberMeCheckbox = document.getElementById('remember-me');

    // --- Form switching functionality ---
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.classList.remove('active');
        signupFormContainer.classList.add('active');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormContainer.classList.remove('active');
        loginFormContainer.classList.add('active');
    });

    // --- Sign Up Form Handler ---
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const phone = document.getElementById('signup-phone').value;
        const address = document.getElementById('signup-address').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        // 1. Check if passwords match
        if (password !== confirmPassword) {
            notification.show(
                'Lỗi Mật Khẩu',
                'Mật khẩu nhập lại không khớp. Vui lòng thử lại!',
                'error'
            );
            return;
        }

        // 2. Check if username already exists
        if (userDB.getUser(username)) {
            notification.show(
                'Tên Đăng Nhập Đã Tồn Tại',
                'Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác.',
                'warning'
            );
            return;
        }

        // 3. Save new user data
        const newUserData = {
            password: password,
            phone: phone,
            address: address,
            role: 'customer' // Default role is customer
        };
        userDB.addUser(username, newUserData);

        // Show success notification with callback
        notification.show(
            'Đăng Ký Thành Công!',
            'Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.',
            'success',
            () => {
                signupForm.reset();
                showLoginLink.click(); // Auto switch to login form
            }
        );
    });

    // --- Login Form Handler ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // 1. Get user data
        const userData = userDB.getUser(username);

        // 2. Validate credentials
        if (!userData) {
            notification.show(
                'Tài Khoản Không Tồn Tại',
                'Tên đăng nhập không tồn tại trong hệ thống!',
                'error'
            );
            return;
        }

        if (userData.password !== password) {
            notification.show(
                'Mật Khẩu Không Chính Xác',
                'Mật khẩu bạn nhập không đúng. Vui lòng thử lại!',
                'error'
            );
            return;
        }

        // 3. Save login session
        sessionStorage.setItem('loggedInUser', JSON.stringify({
            username: username,
            role: userData.role
        }));

        // 4. Handle "Remember Me" functionality
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // 5. Show success notification and redirect
        notification.show(
            'Đăng Nhập Thành Công!',
            `Chào mừng ${username} quay trở lại với ShoeMart!`,
            'success',
            () => {
                // SỬA LỖI Ở ĐÂY: Chuyển hướng đến index.html thay vì Shoes.html
                window.location.href = 'index.html';
            }
        );
    });
    
    // --- Handle "Remember Me" on page load ---
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('login-username').value = rememberedUser;
        rememberMeCheckbox.checked = true;
    }
});