document.addEventListener('DOMContentLoaded', function () {
    // ===================================================================
    // HỆ THỐNG MODAL THÔNG BÁO CHUNG
    // ===================================================================
    class NotificationModal {
        constructor() {
            this.modal = document.getElementById('notification-modal');
            this.modalIcon = document.getElementById('modal-icon');
            this.modalTitle = document.getElementById('modal-title');
            this.modalMessage = document.getElementById('modal-message');
            this.modalClose = document.getElementById('modal-close');
            this.modalOk = document.getElementById('modal-ok');
            this.initEvents();
        }
        initEvents() {
            this.modalClose.addEventListener('click', () => this.hide());
            this.modalOk.addEventListener('click', () => this.hide());
            this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.hide(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.modal.classList.contains('show')) this.hide(); });
        }
        show(title, message, type = 'success') {
            this.modalTitle.textContent = title;
            this.modalMessage.textContent = message;
            this.updateIcon(type);
            this.modal.classList.add('show');
        }
        hide() { this.modal.classList.remove('show'); }
        updateIcon(type) {
            this.modalIcon.className = 'modal-icon';
            let iconSVG = '';
            switch (type) {
                case 'success':
                    iconSVG = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                    break;
                case 'error':
                    iconSVG = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                    break;
                case 'warning':
                    iconSVG = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                    break;
            }
            this.modalIcon.innerHTML = iconSVG;
        }
    }
    const notification = new NotificationModal();

    // ===================================================================
    // CẤU HÌNH EMAILJS
    // ===================================================================
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'W3YvWq1cRLZ_zygS7',
        ORDER_SERVICE_ID: 'service_pfgd9x4',
        ORDER_TEMPLATE_ID: 'template_2m8ynti',
        CONTACT_SERVICE_ID: 'service_ejqlkit',
        CONTACT_TEMPLATE_ID: 'template_gdfmh3s'
    };
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // ===================================================================
    // "DATABASE" SẢN PHẨM & TỒN KHO
    // ===================================================================
    const initialProducts = [
        { id: 'SP001', name: 'Giày Cao Gót Thời Trang', price: 1900000, shortDesc: 'Giày cao gót đẹp mắt...', longDesc: 'Giày cao gót nữ thời trang với thiết kế thanh lịch...', icon: '👠', sizes: ['35', '36', '37', '38', '39', '40'], material: 'Da Mềm', origin: 'Pháp', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP002', name: 'Sneaker Nữ Năng Động', price: 1750000, shortDesc: 'Phong cách trẻ trung, thoải mái.', longDesc: 'Mẫu sneaker nữ thiết kế cho sự thoải mái tối đa.', icon: '👟', sizes: ['36', '37', '38', '39'], material: 'Vải Canvas', origin: 'Hàn Quốc', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP003', name: 'Bốt Nữ Cổ Ngắn', price: 2500000, shortDesc: 'Cá tính và sành điệu.', longDesc: 'Bốt da cổ ngắn, phù hợp cho mọi loại trang phục.', icon: '👢', sizes: ['37', '38', '39', '40'], material: 'Da Thật', origin: 'Anh', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP004', name: 'Giày Búp Bê Da Mềm', price: 1200000, shortDesc: 'Dịu dàng và nữ tính.', longDesc: 'Thiết kế búp bê cổ điển với chất liệu da mềm cao cấp.', icon: '🥿', sizes: ['35', '36', '37', '38'], material: 'Da Cừu', origin: 'Ý', stock: 100, category: 'Công sở', gender: 'Nữ' },
        { id: 'SP005', name: 'Sandal Nữ Đế Xuồng', price: 1350000, shortDesc: 'Thoải mái cho ngày hè.', longDesc: 'Sandal đế xuồng giúp tăng chiều cao mà vẫn dễ chịu.', icon: '👡', sizes: ['36', '37', '38', '39'], material: 'Da tổng hợp', origin: 'Tây Ban Nha', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP006', name: 'Giày Lười Nữ (Loafer)', price: 1800000, shortDesc: 'Lịch sự và tiện lợi.', longDesc: 'Giày lười nữ phong cách công sở, dễ dàng phối đồ.', icon: '👞', sizes: ['37', '38', '39', '40'], material: 'Da Bò', origin: 'Mỹ', stock: 100, category: 'Công sở', gender: 'Nữ' },
        { id: 'SP007', name: 'Giày Thể Thao Nữ', price: 1600000, shortDesc: 'Dành cho tập luyện.', longDesc: 'Giày thể thao chuyên dụng cho nữ, hỗ trợ vận động.', icon: '👟', sizes: ['36', '37', '38', '39', '40'], material: 'Vải Lưới', origin: 'Đức', stock: 100, category: 'Thể thao', gender: 'Nữ' },
        { id: 'SP008', name: 'Dép Nữ Quai Ngang', price: 950000, shortDesc: 'Đơn giản và hiện đại.', longDesc: 'Dép lê nữ với quai ngang bản to, đế êm ái.', icon: '🩴', sizes: ['35', '36', '37', '38'], material: 'Cao su', origin: 'Thái Lan', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP009', name: 'Giày Oxford Nữ', price: 2300000, shortDesc: 'Cổ điển và thanh lịch.', longDesc: 'Giày oxford nữ da bóng, phong cách vintage.', icon: '👞', sizes: ['36', '37', '38', '39'], material: 'Da Bóng', origin: 'Pháp', stock: 100, category: 'Công sở', gender: 'Nữ' },
        { id: 'SP010', name: 'Giày Tây Nam Lịch Lãm', price: 2800000, shortDesc: 'Đẳng cấp doanh nhân.', longDesc: 'Giày tây nam làm từ da thật 100%, đế khâu tay.', icon: '👞', sizes: ['39', '40', '41', '42', '43'], material: 'Da Bò Cao Cấp', origin: 'Ý', stock: 100, category: 'Công sở', gender: 'Nam' },
        { id: 'SP011', name: 'Giày Thể Thao Nam', price: 1650000, shortDesc: 'Thiết kế mạnh mẽ, bền bỉ.', longDesc: 'Giày thể thao nam với thiết kế mạnh mẽ, hỗ trợ tập luyện.', icon: '👟', sizes: ['40', '41', '42', '43', '44'], material: 'Mesh Synthetic', origin: 'Đức', stock: 100, category: 'Thể thao', gender: 'Nam' },
        { id: 'SP012', name: 'Bốt Nam Da Lộn', price: 2700000, shortDesc: 'Phong trần và nam tính.', longDesc: 'Bốt cổ cao da lộn, phù hợp cho các chuyến đi.', icon: '🥾', sizes: ['41', '42', '43', '44'], material: 'Da Lộn', origin: 'Mỹ', stock: 100, category: 'Thời trang', gender: 'Nam' },
        { id: 'SP013', name: 'Giày Lười Nam (Driver)', price: 1950000, shortDesc: 'Tiện lợi và trẻ trung.', longDesc: 'Giày lười nam với đế cao su, phù hợp lái xe và đi dạo.', icon: '👞', sizes: ['39', '40', '41', '42'], material: 'Da Nappa', origin: 'Bồ Đào Nha', stock: 100, category: 'Công sở', gender: 'Nam' },
        { id: 'SP014', name: 'Sandal Nam Quai Chéo', price: 1100000, shortDesc: 'Thoáng mát và chắc chắn.', longDesc: 'Sandal nam với thiết kế quai chéo, đế chống trượt.', icon: '🩴', sizes: ['40', '41', '42', '43'], material: 'Da PU', origin: 'Việt Nam', stock: 100, category: 'Thời trang', gender: 'Nam' },
        { id: 'SP015', name: 'Sneaker Nam Streetwear', price: 1800000, shortDesc: 'Phong cách đường phố năng động.', longDesc: 'Sneaker phong cách streetwear với thiết kế độc đáo.', icon: '👟', sizes: ['39', '40', '41', '42', '43'], material: 'Canvas & Da', origin: 'Hàn Quốc', stock: 100, category: 'Thời trang', gender: 'Nam' },
        { id: 'SP016', name: 'Giày Chạy Bộ Nam', price: 2100000, shortDesc: 'Nhẹ và đàn hồi tốt.', longDesc: 'Giày chuyên dụng cho chạy bộ, công nghệ đệm khí.', icon: '🏃', sizes: ['40', '41', '42', '43', '44'], material: 'Vải dệt', origin: 'Nhật Bản', stock: 100, category: 'Thể thao', gender: 'Nam' },
        { id: 'SP017', name: 'Dép Nam Da Thật', price: 1500000, shortDesc: 'Sang trọng và bền bỉ.', longDesc: 'Dép nam quai ngang làm từ da bò thật nguyên tấm.', icon: '🩴', sizes: ['39', '40', '41', '42'], material: 'Da Bò', origin: 'Việt Nam', stock: 100, category: 'Thời trang', gender: 'Nam' },
        { id: 'SP018', name: 'Giày Monk Strap Nam', price: 3200000, shortDesc: 'Khác biệt và tinh tế.', longDesc: 'Giày tây nam với thiết kế khóa cài thay cho dây buộc.', icon: '👞', sizes: ['40', '41', '42', '43'], material: 'Da Bê', origin: 'Pháp', stock: 100, category: 'Công sở', gender: 'Nam' },
        { id: 'SP019', name: 'Giày Cao Gót Stiletto', price: 2150000, shortDesc: 'Gót nhọn quyến rũ, tôn dáng.', longDesc: 'Mẫu giày cao gót Stiletto kinh điển, không thể thiếu trong tủ đồ của phái đẹp.', icon: '👠', sizes: ['35', '36', '37', '38', '39'], material: 'Da PU bóng', origin: 'Pháp', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP020', name: 'Giày Slip-on Vải Nữ', price: 1300000, shortDesc: 'Tiện lợi, dễ dàng mang vào.', longDesc: 'Giày slip-on bằng vải canvas thoáng khí, phù hợp cho việc đi dạo.', icon: '👟', sizes: ['36', '37', '38', '39', '40'], material: 'Vải Canvas', origin: 'Mỹ', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP021', name: 'Bốt Nữ Cổ Cao Qua Gối', price: 2950000, shortDesc: 'Thời thượng và ấm áp.', longDesc: 'Bốt da lộn cổ cao qua gối, lý tưởng cho mùa đông.', icon: '👢', sizes: ['37', '38', '39'], material: 'Da lộn', origin: 'Hàn Quốc', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP022', name: 'Giày Mary Jane Cổ Điển', price: 1750000, shortDesc: 'Phong cách nữ sinh thanh lịch.', longDesc: 'Giày Mary Jane với quai ngang đặc trưng, gót vuông dễ đi.', icon: '🥿', sizes: ['35', '36', '37', '38', '39'], material: 'Da Bò', origin: 'Nhật Bản', stock: 100, category: 'Công sở', gender: 'Nữ' },
        { id: 'SP023', name: 'Giày Espadrilles Nữ', price: 1400000, shortDesc: 'Đế cói, đậm chất mùa hè.', longDesc: 'Giày đế cói Espadrilles mang lại cảm giác nhẹ nhàng, thư thái.', icon: '👡', sizes: ['36', '37', '38', '39'], material: 'Vải bố và cói', origin: 'Tây Ban Nha', stock: 100, category: 'Thời trang', gender: 'Nữ' },
        { id: 'SP024', name: 'Chunky Sneaker Nữ', price: 1950000, shortDesc: 'Đế "bánh mì" cá tính.', longDesc: 'Mẫu sneaker đế dày đang thịnh hành, giúp tăng chiều cao đáng kể.', icon: '👟', sizes: ['36', '37', '38', '39', '40'], material: 'Da tổng hợp', origin: 'Đài Loan', stock: 100, category: 'Thể thao', gender: 'Nữ' }
    ];
    let productsDB = JSON.parse(localStorage.getItem('products')) || initialProducts;
    const saveProductsDB = () => localStorage.setItem('products', JSON.stringify(productsDB));
    if (!localStorage.getItem('products')) {
        saveProductsDB();
    }
    
    const coupons = {
        "GIAM10": { type: "percentage", value: 10 },
        "KHAITRUONG": { type: "fixed", value: 50000 },
        "FREESHIP": { type: "fixed", value: 30000 }
    };
    let appliedCoupon = null;
    let currentPage = 1;
    const productsPerPage = 6;

    // ===================================================================
    // LẤY CÁC THẺ HTML CẦN THIẾT
    // ===================================================================
    const productGrid = document.getElementById('productGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    const sortOptions = document.getElementById('sortOptions');
    const searchInput = document.getElementById('searchInput');
    const totalStockEl = document.getElementById('totalStock');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCount = document.getElementById('cartCount');
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');
    const accountLink = document.querySelector('a[href="account.html"]');
    const mainNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const productModal = document.getElementById('productModal');
    const orderModal = document.getElementById('orderModal');
    const successModal = document.getElementById('successModal');
    const orderForm = document.getElementById('orderForm');
    const contactForm = document.getElementById('contactForm');
    const adminLink = document.getElementById('adminLink');
    const adminSection = document.getElementById('admin');
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalOrdersEl = document.getElementById('totalOrders');
    const orderDetailsContainer = document.getElementById('orderDetailsContainer');
    const customerLink = document.getElementById('customerLink');
    const customerDashboard = document.getElementById('customerDashboard');
    const customerTotalSpending = document.getElementById('customerTotalSpending');
    const customerTotalItems = document.getElementById('customerTotalItems');
    const customerOrderHistoryContainer = document.getElementById('customerOrderHistoryContainer');
    const filterSidebar = document.getElementById('filterSidebar');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponCodeInput = document.getElementById('couponCodeInput');
    const couponMessage = document.getElementById('couponMessage');
    const wishlistLink = document.getElementById('wishlistLink');
    
    // ===================================================================
    // QUẢN LÝ TRẠNG THÁI ỨNG DỤNG
    // ===================================================================
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = [];
    let showOnlyFavorites = false;
    
    // ===================================================================
    // KIỂM TRA PHIÊN ĐĂNG NHẬP VÀ PHÂN QUYỀN GIAO DIỆN
    // ===================================================================
    const loggedInUserSession = sessionStorage.getItem('loggedInUser');
    let currentUser = null;
    adminLink.style.display = 'none';
    customerLink.style.display = 'none';
    wishlistLink.style.display = 'none';

    if (loggedInUserSession) {
        currentUser = JSON.parse(loggedInUserSession);
        accountLink.textContent = `Đăng Xuất (${currentUser.username})`;
        accountLink.href = "#";
        accountLink.onclick = function(e) { 
            e.preventDefault(); 
            // Clear user-specific data on logout
            wishlist = [];
            showOnlyFavorites = false;
            sessionStorage.removeItem('loggedInUser'); 
            localStorage.removeItem('rememberedUser'); 
            window.location.href = 'Shoes.html'; 
        };

        if (currentUser.role === 'admin') { 
            document.body.classList.add('admin-view'); 
            adminLink.style.display = 'flex';
            const stockOption = document.createElement('option');
            stockOption.value = 'stock-desc';
            stockOption.textContent = 'Tồn kho giảm dần';
            sortOptions.appendChild(stockOption);
        } else { 
            document.body.classList.add('customer-view'); 
            customerLink.style.display = 'flex'; 
            wishlistLink.style.display = 'flex';
            // Load customer's wishlist
            wishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.username}`)) || [];
        }
    }

    function showAllMainSections() {
        document.querySelectorAll('main > section').forEach(sec => {
            if (sec.id !== 'admin' && sec.id !== 'customerDashboard') { sec.style.display = 'block'; } 
            else { sec.style.display = 'none'; }
        });
    }
    mainNavLinks.forEach(link => link.addEventListener('click', showAllMainSections));

    // ===================================================================
    // BỘ LỌC, TÌM KIẾM, SẮP XẾP & PHÂN TRANG
    // ===================================================================
    if (sortOptions) {
        sortOptions.addEventListener('change', () => {
            currentPage = 1;
            applyAndRenderProducts();
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            applyAndRenderProducts();
        });
    }

    function renderFilters() {
        const categories = [...new Set(productsDB.map(p => p.category))];
        const genders = [...new Set(productsDB.map(p => p.gender))];
        const allSizes = [...new Set(productsDB.flatMap(p => p.sizes))].sort((a,b) => a - b);

        document.getElementById('categoryFilter').innerHTML = `<label><input type="radio" name="category" value="all" checked><span>Tất cả</span></label>${categories.map(c => `<label><input type="radio" name="category" value="${c}"><span>${c}</span></label>`).join('')}`;
        document.getElementById('genderFilter').innerHTML = `<label><input type="radio" name="gender" value="all" checked><span>Tất cả</span></label>${genders.map(g => `<label><input type="radio" name="gender" value="${g}"><span>${g}</span></label>`).join('')}`;
        document.getElementById('priceFilter').innerHTML = `<label><input type="radio" name="price" value="all" checked><span>Tất cả</span></label><label><input type="radio" name="price" value="0-1700000"><span>Dưới 1,700,000đ</span></label><label><input type="radio" name="price" value="1700000-2000000"><span>1,700,000đ - 2,000,000đ</span></label><label><input type="radio" name="price" value="2000000-999999999"><span>Trên 2,000,000đ</span></label>`;
        document.getElementById('sizeFilter').innerHTML = allSizes.map(s => `<label><input type="checkbox" name="size" value="${s}"><span>${s}</span></label>`).join('');

        document.querySelectorAll('#filterSidebar input').forEach(input => {
            input.addEventListener('change', () => {
                currentPage = 1; 
                applyAndRenderProducts();
            });
        });
        document.getElementById('resetFilters').addEventListener('click', () => {
             document.querySelectorAll('#filterSidebar input').forEach(input => {
                if(input.type === 'radio') input.checked = input.value === 'all';
                if(input.type === 'checkbox') input.checked = false;
             });
             searchInput.value = ''; // Also clear search input
             currentPage = 1;
             applyAndRenderProducts();
        });
    }

    function applyAndRenderProducts() {
        let processedProducts = [...productsDB];
        
        // 1. LỌC YÊU THÍCH (WISHLIST)
        if (showOnlyFavorites) {
            processedProducts = processedProducts.filter(p => wishlist.includes(p.id));
        }

        // 2. TÌM KIẾM
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            processedProducts = processedProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.longDesc.toLowerCase().includes(searchTerm)
            );
        }

        // 3. LỌC (FILTERS)
        const category = document.querySelector('input[name="category"]:checked').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const priceRange = document.querySelector('input[name="price"]:checked').value;
        const selectedSizes = [...document.querySelectorAll('input[name="size"]:checked')].map(cb => cb.value);

        if (category !== 'all') processedProducts = processedProducts.filter(p => p.category === category);
        if (gender !== 'all') processedProducts = processedProducts.filter(p => p.gender === gender);
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            processedProducts = processedProducts.filter(p => p.price >= min && p.price <= max);
        }
        if (selectedSizes.length > 0) processedProducts = processedProducts.filter(p => selectedSizes.some(size => p.sizes.includes(size)));

        // 4. SẮP XẾP
        const sortBy = sortOptions.value;
        switch (sortBy) {
            case 'price-asc': processedProducts.sort((a, b) => a.price - b.price); break;
            case 'price-desc': processedProducts.sort((a, b) => b.price - a.price); break;
            case 'name-asc': processedProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': processedProducts.sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'newest': processedProducts.reverse(); break;
            case 'stock-desc': if(currentUser && currentUser.role === 'admin') processedProducts.sort((a, b) => b.stock - a.stock); break;
            default: processedProducts.sort((a, b) => a.id.localeCompare(b.id)); break;
        }

        // 5. PHÂN TRANG
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = processedProducts.slice(startIndex, endIndex);
        
        renderProducts(paginatedProducts);
        renderPagination(processedProducts.length);
    }
    
    function renderPagination(totalProducts) {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        if (totalPages <= 1) return;

        paginationContainer.innerHTML += `<button class="pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">&lt;</button>`;

        let pagesToShow = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
        } else {
            if (currentPage <= 3) {
                pagesToShow = [1, 2, 3, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pagesToShow = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else {
                pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        pagesToShow.forEach(page => {
            paginationContainer.innerHTML += page === '...' ? `<span class="pagination-btn ellipsis">...</span>` : `<button class="pagination-btn page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
        });
        
        paginationContainer.innerHTML += `<button class="pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">&gt;</button>`;
    
        document.querySelectorAll('.pagination-btn:not(.disabled):not(.ellipsis)').forEach(button => {
            button.addEventListener('click', (e) => {
                currentPage = Number(e.currentTarget.dataset.page);
                applyAndRenderProducts();
            });
        });
    }
    
    // ===================================================================
    // HIỂN THỊ SẢN PHẨM ĐỘNG
    // ===================================================================
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        let message = '';
        if (showOnlyFavorites && productsToRender.length === 0) {
            message = 'Danh sách yêu thích của bạn đang trống.';
        } else if (productsToRender.length === 0) {
            message = 'Không tìm thấy sản phẩm phù hợp.';
        }
    
        if (message) {
            productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: #888; margin-top: 2rem;">${message}</p>`;
            return;
        }

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            let favoriteButtonHTML = '';
            if (currentUser && currentUser.role !== 'admin') {
                const isFavorited = wishlist.includes(product.id);
                favoriteButtonHTML = `
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" onclick="toggleWishlist('${product.id}')" title="Thêm vào yêu thích">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                `;
            }

            let actionElement = (currentUser && currentUser.role === 'admin') 
                ? `<div class="product-stock">Tồn kho: <strong>${product.stock}</strong></div>`
                : `<button class="buy-button" onclick='openProductDetail(${JSON.stringify(product).replace(/'/g, "&apos;")})'>Xem Chi Tiết</button>`;
            
            card.innerHTML = `
                ${favoriteButtonHTML}
                <div class="product-image"><span style="font-size: 4rem;">${product.icon}</span></div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <p class="product-description">${product.shortDesc}</p>
                    ${actionElement}
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // ===================================================================
    // HÀM XỬ LÝ WISHLIST
    // ===================================================================
    window.toggleWishlist = function(productId) {
        if (!currentUser || currentUser.role === 'admin') return;

        const productIndex = wishlist.indexOf(productId);
        if (productIndex > -1) {
            wishlist.splice(productIndex, 1); // Remove from wishlist
        } else {
            wishlist.push(productId); // Add to wishlist
        }
        saveWishlist();
        applyAndRenderProducts(); // Re-render to update the button state
    }

    function saveWishlist() {
        if (!currentUser) return;
        localStorage.setItem(`wishlist_${currentUser.username}`, JSON.stringify(wishlist));
    }

    if (wishlistLink) {
        wishlistLink.addEventListener('click', (e) => {
            e.preventDefault();
            showOnlyFavorites = !showOnlyFavorites; // Toggle the flag
            e.currentTarget.classList.toggle('active', showOnlyFavorites);
            currentPage = 1;
            applyAndRenderProducts();
        });
    }

    // ===================================================================
    // CÁC HÀM XỬ LÝ GIAO DIỆN CHUNG
    // ===================================================================
    window.openProductDetail = function(product) {
        document.getElementById('modalNotification').classList.remove('show');
        document.getElementById('modalProductName').innerText = product.name;
        document.getElementById('modalProductPrice').innerText = formatPrice(product.price);
        document.getElementById('modalProductDescription').innerText = product.longDesc;
        document.getElementById('modalProductIcon').innerText = product.icon;
        document.getElementById('modalProductMaterial').innerText = product.material;
        document.getElementById('modalProductOrigin').innerText = product.origin;
        const sizeSelect = document.getElementById('modalProductSize');
        sizeSelect.innerHTML = '';
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.text = `Size ${size}`;
            sizeSelect.appendChild(option);
        });
        document.getElementById('modalProductQuantity').value = 1;
        document.getElementById('addToCartBtn').onclick = () => addToCartFromModal(product.id);
        document.getElementById('orderNowBtn').onclick = () => orderNowFromModal(product.id);
        productModal.classList.add('active');
    }
    window.closeProductDetail = () => productModal.classList.remove('active');
    
    window.orderNowFromModal = function(productId) {
        const product = productsDB.find(p => p.id === productId);
        const quantity = parseInt(document.getElementById('modalProductQuantity').value);
        const size = document.getElementById('modalProductSize').value;
        const modalNotification = document.getElementById('modalNotification');
        modalNotification.classList.remove('show');
        if (quantity > product.stock) {
            modalNotification.innerText = `Xin lỗi, sản phẩm này chỉ còn lại ${product.stock} chiếc.`;
            modalNotification.classList.add('show');
            setTimeout(() => modalNotification.classList.remove('show'), 5000);
            return;
        }
        cart = [];
        const productToOrder = { id: product.id, name: product.name, price: product.price, icon: product.icon, size: size, quantity: quantity };
        addItemToCart(productToOrder);
        closeProductDetail();
        window.checkout();
    }
    window.toggleCart = () => { cartSidebar.classList.toggle('active'); cartOverlay.classList.toggle('active'); }
    window.showSuccessModal = () => successModal.classList.add('active');
    window.closeSuccessModal = () => {
        successModal.classList.remove('active');
        cart = [];
        updateCartUI();
        orderForm.reset();
        applyAndRenderProducts();
    }
    
    // ===================================================================
    // XỬ LÝ GIỎ HÀNG, THANH TOÁN & MÃ GIẢM GIÁ
    // ===================================================================
    function addToCartFromModal(productId) {
        const product = productsDB.find(p => p.id === productId);
        const quantity = parseInt(document.getElementById('modalProductQuantity').value);
        const modalNotification = document.getElementById('modalNotification');
        modalNotification.classList.remove('show');
        if (quantity > product.stock) {
            modalNotification.innerText = `Xin lỗi, sản phẩm này chỉ còn lại ${product.stock} chiếc.`;
            modalNotification.classList.add('show');
            setTimeout(() => modalNotification.classList.remove('show'), 5000);
            return;
        }
        const productInCart = { id: product.id, name: product.name, price: product.price, icon: product.icon, size: document.getElementById('modalProductSize').value, quantity: quantity };
        addItemToCart(productInCart);
        closeProductDetail();
    }
    function addItemToCart(product) {
        const cartItemId = `${product.id}-${product.size}`;
        const existingItem = cart.find(item => item.cartItemId === cartItemId);
        if (existingItem) { existingItem.quantity += product.quantity; } 
        else { cart.push({ ...product, cartItemId: cartItemId }); }
        updateCartUI();
    }
    window.removeFromCart = (cartItemId) => { cart = cart.filter(item => item.cartItemId !== cartItemId); updateCartUI(); }
    function updateCartUI() {
        localStorage.setItem('cart', JSON.stringify(cart));
        const cartTotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.innerText = formatPrice(cartTotalValue);
        if (cart.length === 0) {
            cartContent.innerHTML = '<p style="text-align: center; color: #999; margin: 2rem 0;">Giỏ hàng trống</p>';
        } else {
            cartContent.innerHTML = cart.map(item => `<div class="cart-item"><div class="cart-item-img">${item.icon}</div><div class="cart-item-info"><h4>${item.name}</h4><p>Size: ${item.size}</p><p>${item.quantity} x ${formatPrice(item.price)}</p></div><div class="cart-item-actions"><strong>${formatPrice(item.quantity * item.price)}</strong><button onclick="removeFromCart('${item.cartItemId}')">Xóa</button></div></div>`).join('');
        }
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    function updateOrderSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === 'percentage') {
                discount = subtotal * (appliedCoupon.value / 100);
            } else if (appliedCoupon.type === 'fixed') {
                discount = appliedCoupon.value;
            }
        }
        const finalTotal = Math.max(0, subtotal - discount);
        document.getElementById('summarySubtotal').innerText = formatPrice(subtotal);
        document.getElementById('summaryDiscount').innerText = `- ${formatPrice(discount)}`;
        document.getElementById('summaryTotal').innerText = formatPrice(finalTotal);
        const qrImage = document.getElementById('qrCodeImage');
        if (qrImage) {
            const qrAmountText = document.getElementById('qrAmountText');
            qrAmountText.innerText = `Số tiền: ${formatPrice(finalTotal)}`;
            const baseQRUrl = 'https://api.vietqr.io/image/970436-1034671262-compact.png';
            qrImage.src = `${baseQRUrl}?accountName=NGUYEN%20DINH%20TUAN%20ANH&amount=${finalTotal}`;
        }
    }
    function applyCoupon() {
        const code = couponCodeInput.value.trim().toUpperCase();
        if (coupons[code]) {
            appliedCoupon = coupons[code];
            couponMessage.innerText = `Áp dụng mã "${code}" thành công!`;
            couponMessage.className = 'success';
            couponCodeInput.disabled = true;
            applyCouponBtn.disabled = true;
        } else {
            appliedCoupon = null;
            couponMessage.innerText = 'Mã giảm giá không hợp lệ hoặc đã hết hạn.';
            couponMessage.className = 'error';
        }
        updateOrderSummary();
    }
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCoupon);
    }
    window.checkout = function() {
        if (!currentUser) { notification.show('Yêu Cầu Đăng Nhập', 'Bạn cần đăng nhập để hoàn tất thanh toán.', 'warning'); return; }
        if (cart.length === 0) { notification.show('Giỏ Hàng Trống', 'Vui lòng thêm sản phẩm vào giỏ trước khi thanh toán.', 'warning'); return; }
        if (cartSidebar.classList.contains('active')) toggleCart();
        appliedCoupon = null;
        couponCodeInput.value = '';
        couponCodeInput.disabled = false;
        applyCouponBtn.disabled = false;
        couponMessage.innerText = '';
        couponMessage.className = '';
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const userData = users[currentUser.username];
        if (userData) {
            document.getElementById('customerName').value = currentUser.username;
            document.getElementById('customerPhone').value = userData.phone;
            document.getElementById('customerAddress').value = userData.address;
        }
        orderModal.classList.add('active');
        updateOrderSummary();
        const qrContainer = document.getElementById('qrCodeContainer');
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', (event) => {
                qrContainer.style.display = event.target.value === 'qr' ? 'block' : 'none';
            });
        });
        document.querySelector('input[name="paymentMethod"][value="cash"]').dispatchEvent(new Event('change'));
    }
    function formatPrice(price) { return (price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); }

    // ===================================================================
    // XỬ LÝ SỰ KIỆN & PANEL ADMIN/CUSTOMER
    // ===================================================================
    if (adminLink) { adminLink.addEventListener('click', (e) => { e.preventDefault(); document.querySelectorAll('main > section').forEach(sec => sec.style.display = (sec.id === 'admin') ? 'block' : 'none'); updateAdminPanel(); }); }
    if (customerLink) { customerLink.addEventListener('click', (e) => { e.preventDefault(); document.querySelectorAll('main > section').forEach(sec => sec.style.display = (sec.id === 'customerDashboard') ? 'block' : 'none'); updateCustomerDashboard(); }); }
    function updateAdminPanel() {
        renderAdminStats();
        renderUserAccounts();
        renderProducts(productsDB);
    }
    function updateCustomerDashboard() {
        if (!currentUser) return;
        const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        const myOrders = allOrders.filter(order => order.customer.name === currentUser.username);
        const totalSpending = myOrders.reduce((sum, order) => sum + order.total, 0);
        const totalItems = myOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
        customerTotalSpending.innerText = formatPrice(totalSpending);
        customerTotalItems.innerText = totalItems;
        customerOrderHistoryContainer.innerHTML = myOrders.length > 0 ? myOrders.map(order => `<div class="order-history-item"><p><strong>Tổng tiền đơn hàng:</strong> ${formatPrice(order.total)}</p><ul>${order.items.map(item => `<li>${item.name} (Size: ${item.size}) - Số lượng: ${item.quantity}</li>`).join('')}</ul></div>`).join('') : '<p>Bạn chưa có đơn hàng nào.</p>';
    }
    function renderAdminStats() {
        const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        totalRevenueEl.innerText = formatPrice(allOrders.reduce((sum, order) => sum + order.total, 0));
        totalOrdersEl.innerText = allOrders.length;
        if (totalStockEl) { totalStockEl.innerText = productsDB.reduce((sum, product) => sum + product.stock, 0); }
        if (allOrders.length > 0) {
            const reversedOrders = allOrders.slice().reverse();
            orderDetailsContainer.innerHTML = reversedOrders.map(order => {
                const customerName = order.customer ? order.customer.name : 'Không rõ';
                const paymentMethodText = order.paymentMethod || 'Không rõ';
                const orderItemsHTML = Array.isArray(order.items) ? order.items.map(item => `<li>${item.name} (Size: ${item.size}) - Số lượng: ${item.quantity}</li>`).join('') : '<li>Lỗi dữ liệu sản phẩm</li>';
                return `<div class="order-history-item"><p><strong>Khách hàng:</strong> ${customerName} | <strong>Thanh toán:</strong> ${paymentMethodText} | <strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p><ul>${orderItemsHTML}</ul></div>`;
            }).join('');
        } else {
            orderDetailsContainer.innerHTML = '<p>Chưa có đơn hàng nào.</p>';
        }
    }
    function renderUserAccounts() {
        const userListContainer = document.getElementById('userListContainer');
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        let tableHTML = `<table class="user-table"><thead><tr><th>Tên đăng nhập</th><th>Số điện thoại</th><th>Địa chỉ</th><th>Vai trò</th></tr></thead><tbody>`;
        for (const username in users) {
            const user = users[username];
            tableHTML += `<tr><td>${username}</td><td>${user.phone || 'Chưa có'}</td><td>${user.address || 'Chưa có'}</td><td style="text-transform: capitalize; ${user.role === 'admin' ? 'font-weight: bold; color: #d93025;' : ''}">${user.role}</td></tr>`;
        }
        tableHTML += `</tbody></table>`;
        userListContainer.innerHTML = tableHTML;
    }
    
    // ===================================================================
    // XỬ LÝ FORM ĐẶT HÀNG & GỬI EMAIL
    // ===================================================================
    if (orderForm) {
        orderForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.innerText = 'Đang xử lý...';
            submitButton.disabled = true;
            cart.forEach(cartItem => {
                const productInDB = productsDB.find(p => p.id === cartItem.id);
                if (productInDB) { productInDB.stock -= cartItem.quantity; }
            });
            saveProductsDB();
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let discount = 0;
            if (appliedCoupon) {
                if (appliedCoupon.type === 'percentage') {
                    discount = subtotal * (appliedCoupon.value / 100);
                } else if (appliedCoupon.type === 'fixed') {
                    discount = appliedCoupon.value;
                }
            }
            const finalTotal = Math.max(0, subtotal - discount);
            const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
            const paymentMethodValue = document.querySelector('input[name="paymentMethod"]:checked').value;
            const paymentMethodText = paymentMethodValue === 'qr' ? 'Chuyển khoản (QR)' : 'Thanh toán khi nhận hàng';
            const newOrder = { 
                items: [...cart], 
                total: finalTotal,
                paymentMethod: paymentMethodText,
                customer: { name: document.getElementById('customerName').value, phone: document.getElementById('customerPhone').value, address: document.getElementById('customerAddress').value }, 
                notes: document.getElementById('customerNotes').value 
            };
            allOrders.push(newOrder);
            localStorage.setItem('allOrders', JSON.stringify(allOrders));
            const appliedCode = appliedCoupon ? couponCodeInput.value.trim().toUpperCase() : "Không áp dụng";
            const templateParams = {
                customer_name: newOrder.customer.name,
                customer_phone: newOrder.customer.phone,
                customer_address: newOrder.customer.address,
                payment_method: newOrder.paymentMethod,
                order_details: newOrder.items.map(item => `<li>${item.name} (Size: ${item.size}) - Số lượng: ${item.quantity} - Giá: ${formatPrice(item.price)}</li>`).join(''),
                discount_code: appliedCode,
                total_price: formatPrice(newOrder.total),
                notes: newOrder.notes || 'Không có'
            };
            emailjs.send(EMAILJS_CONFIG.ORDER_SERVICE_ID, EMAILJS_CONFIG.ORDER_TEMPLATE_ID, templateParams)
                .then(function(response) {
                   console.log('EMAIL SENT!', response.status, response.text);
                   orderModal.classList.remove('active');
                   showSuccessModal();
                }, function(error) {
                   console.log('EMAIL FAILED...', error);
                   notification.show('Gửi Đơn Hàng Thất Bại', 'Lỗi: ' + JSON.stringify(error), 'error');
                })
                .finally(() => {
                    submitButton.innerText = 'Xác Nhận Đặt Hàng';
                    submitButton.disabled = false;
                });
        });
    }

    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const messageP = document.getElementById('form-message');
            submitButton.innerText = 'Đang gửi...';
            submitButton.disabled = true;
            messageP.innerText = '';
            const templateParams = {
                from_name: document.getElementById('contact-name').value,
                from_email: document.getElementById('contact-email').value,
                message: document.getElementById('contact-message').value
            };
            emailjs.send(EMAILJS_CONFIG.CONTACT_SERVICE_ID, EMAILJS_CONFIG.CONTACT_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    messageP.style.color = 'green';
                    messageP.innerText = 'Cảm ơn bạn! Tin nhắn đã được gửi thành công.';
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    messageP.style.color = 'red';
                    messageP.innerText = 'Lỗi! Không thể gửi tin nhắn. Vui lòng thử lại.';
                })
                .finally(() => {
                    submitButton.innerText = 'Gửi Tin Nhắn';
                    submitButton.disabled = false;
                });
        });
    }
    
    // --- KHỞI CHẠY LẦN ĐẦU ---
    if (filterSidebar) {
        renderFilters();
        applyAndRenderProducts();
    } else {
        renderProducts(productsDB);
    }
    updateCartUI();
});