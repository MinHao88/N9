new Vue({
    el: '#app',
    data: {
        // --- 核心状态 ---
        langIndex: 0,
        currentTab: 'home',
        activeTab: 'home',

        // --- 弹窗控制 ---
        showModal: false,
        showRegister: false,

        // --- 表单数据 ---
        username: '',
        password: '',
        confirmPassword: '',

        // --- 用户信息 ---
        userInfo: {
            balance: 0,
            username: '',
            email: '',
            joinDate: new Date().toLocaleDateString()
        },

        // --- 加载和错误状态 ---
        isLoading: false,
        error: '',
        successMessage: '',

        // --- 翻译包 ---
        translations: [
            { // 0: 中文
                title: "我的应用",
                home: "首页", activity: "活动", profile: "我的",
                welcome: "欢迎回来", login: "登录", register: "注册",
                username_ph: "请输入用户名", password_ph: "请输入密码",
                confirm_password_ph: "请再次输入密码",
                monthly_income: "月收入", daily_checkin: "每日签到",
                login_success: "登录成功！",
                register_success: "注册成功！请登录",
                login_failed: "登录失败，请重试",
                password_mismatch: "两次密码不一致",
                fields_required: "请填写所有字段",
                username_required: "用户名不能为空",
                password_too_short: "密码至少6位",
                invalid_username: "用户名不能为空"
            },
            { // 1: English
                title: "My App",
                home: "Home", activity: "Activity", profile: "Profile",
                welcome: "Welcome Back", login: "Login", register: "Sign Up",
                username_ph: "Enter Username", password_ph: "Enter Password",
                confirm_password_ph: "Confirm Password",
                monthly_income: "Monthly Income", daily_checkin: "Daily Check-in",
                login_success: "Login successful!",
                register_success: "Registration successful! Please login",
                login_failed: "Login failed, please try again",
                password_mismatch: "Passwords do not match",
                fields_required: "Please fill in all fields",
                username_required: "Username is required",
                password_too_short: "Password must be at least 6 characters",
                invalid_username: "Username cannot be empty"
            },
            { // 2: Vietnamese
                title: "Ứng Dụng Của Tôi",
                home: "Trang Chủ", activity: "Hoạt Động", profile: "Hồ Sơ",
                welcome: "Chào Mừng Trở Lại", login: "Đăng Nhập", register: "Đăng Ký",
                username_ph: "Nhập Tên Đăng Nhập", password_ph: "Nhập Mật Khẩu",
                confirm_password_ph: "Xác Nhận Mật Khẩu",
                monthly_income: "Thu Nhập Hàng Tháng", daily_checkin: "Điểm Danh Mỗi Ngày",
                login_success: "Đăng nhập thành công!",
                register_success: "Đăng ký thành công! Vui lòng đăng nhập",
                login_failed: "Đăng nhập thất bại, vui lòng thử lại",
                password_mismatch: "Mật khẩu không khớp",
                fields_required: "Vui lòng điền tất cả các trường",
                username_required: "Tên đăng nhập không được để trống",
                password_too_short: "Mật khẩu phải có ít nhất 6 ký tự",
                invalid_username: "Tên đăng nhập không được để trống"
            }
        ]
    },

    computed: {
        currentLangLabel() {
            const labels = ['中文', 'English', 'Tiếng Việt'];
            return labels[this.langIndex];
        },

        t() {
            return this.translations[this.langIndex];
        }
    },

    methods: {
        // 切换语言
        toggleLang() {
            this.langIndex = (this.langIndex + 1) % this.translations.length;
            this.saveToStorage();
        },

        // 切换标签页
        switchTab(tabName) {
            this.currentTab = tabName;
            this.activeTab = tabName;
        },

        // 打开模态框
        openModal(isRegister = false) {
            this.showModal = true;
            this.showRegister = isRegister;
            this.error = '';
            this.successMessage = '';
            this.resetForm();
        },

        // 关闭模态框
        closeModal() {
            this.showModal = false;
            this.resetForm();
        },

        // 切换登录/注册模式
        toggleAuthMode() {
            this.showRegister = !this.showRegister;
            this.error = '';
            this.successMessage = '';
            this.resetForm();
        },

        // 重置表单
        resetForm() {
            this.username = '';
            this.password = '';
            this.confirmPassword = '';
            this.error = '';
            this.successMessage = '';
        },

        // 表单验证
        validateForm() {
            // 检查用户名
            if (!this.username.trim()) {
                this.error = this.t.username_required;
                return false;
            }

            // 检查用户名长度
            if (this.username.length < 3) {
                this.error = '用户名至少3位';
                return false;
            }

            // 检查密码
            if (!this.password) {
                this.error = this.t.fields_required;
                return false;
            }

            // 检查密码长度
            if (this.password.length < 6) {
                this.error = this.t.password_too_short;
                return false;
            }

            // 注册时检查确认密码
            if (this.showRegister) {
                if (!this.confirmPassword) {
                    this.error = this.t.fields_required;
                    return false;
                }
                if (this.password !== this.confirmPassword) {
                    this.error = this.t.password_mismatch;
                    return false;
                }
            }

            return true;
        },

        // 模拟登录/注册
        async handleLogin() {
            if (!this.validateForm()) {
                return;
            }

            this.isLoading = true;
            this.error = '';
            this.successMessage = '';

            try {
                // 模拟 API 延迟
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 模拟登录逻辑
                this.userInfo.username = this.username;
                this.userInfo.balance = Math.floor(Math.random() * 100000) / 100;

                if (this.showRegister) {
                    this.successMessage = this.t.register_success;
                    // 延迟后自动切换到登录模式
                    setTimeout(() => {
                        this.showRegister = false;
                        this.successMessage = '';
                    }, 1500);
                } else {
                    this.successMessage = this.t.login_success;
                    // 延迟后关闭弹窗
                    setTimeout(() => {
                        this.closeModal();
                    }, 1000);
                }

                this.saveToStorage();
            } catch (err) {
                this.error = this.t.login_failed;
                console.error('Login error:', err);
            } finally {
                this.isLoading = false;
            }
        },

        // 退出登录
        logout() {
            this.userInfo = {
                balance: 0,
                username: '',
                email: '',
                joinDate: new Date().toLocaleDateString()
            };
            this.saveToStorage();
        },

        // 本地存储 - 保存
        saveToStorage() {
            try {
                localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                localStorage.setItem('langIndex', this.langIndex);
                console.log('✅ 数据已保存到本地');
            } catch (err) {
                console.error('Storage error:', err);
            }
        },

        // 本地存储 - 读取
        loadFromStorage() {
            try {
                const savedUser = localStorage.getItem('userInfo');
                if (savedUser) {
                    this.userInfo = JSON.parse(savedUser);
                }
                const savedLang = localStorage.getItem('langIndex');
                if (savedLang) {
                    this.langIndex = parseInt(savedLang);
                }
                console.log('✅ 数据已从本地读取');
            } catch (err) {
                console.error('Load storage error:', err);
            }
        }
    },

    mounted() {
        this.loadFromStorage();
        console.log("✅ App Loaded Successfully!");
        console.log("📚 Languages: Chinese, English, Vietnamese");
        console.log("👤 Current User:", this.userInfo);
    }
});