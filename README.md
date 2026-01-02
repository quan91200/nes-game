# 🎮 NES Web Emulator

Trình giả lập NES (Nintendo Entertainment System) chạy trực tiếp trên trình duyệt web với đầy đủ tính năng quản lý game và tùy chỉnh phím điều khiển.

## ✨ Tính năng

### 🎯 Chức năng chính
- ▶️ **Chơi game NES** trực tiếp trên trình duyệt
- 💾 **Lưu nhiều game** vào IndexedDB (không giới hạn)
- 📋 **Quản lý thư viện game** với 2 chế độ hiển thị: Danh sách & Lưới
- ⌨️ **Tùy chỉnh phím điều khiển** hoàn toàn
- 🚪 **Thoát game** nhanh chóng về sảnh
- 🎨 **Giao diện hiện đại** với gradient và hiệu ứng mượt mà

### 🎮 Quản lý game
- Tải ROM từ máy tính
- Tự động lưu game vào trình duyệt
- Xem danh sách game đã lưu (dạng List hoặc Grid)
- Xóa game không cần thiết
- Hiển thị thời gian lưu game

### ⌨️ Điều khiển
- Tùy chỉnh tất cả phím điều khiển
- Lưu cấu hình phím vào localStorage
- Reset về phím mặc định
- Phím thoát game tùy chỉnh được

## 🚀 Cài đặt

### Yêu cầu
- Trình duyệt: **Chrome/Edge** phiên bản mới (hỗ trợ File System Access API)
- Không cần cài đặt thêm gì, chỉ cần mở file HTML

### Cấu trúc thư mục
```
nes-emulator/
├── index.html          # File HTML chính
├── style.css           # File CSS styling
├── main.js             # File JavaScript logic
└── README.md           # File hướng dẫn này
```

### Chạy ứng dụng
1. Clone hoặc tải project về máy
2. Mở file `index.html` bằng trình duyệt Chrome/Edge
3. Bắt đầu chơi!

## 📖 Hướng dẫn sử dụng

### 1️⃣ Tải game lần đầu
1. Nhấn nút **"📂 Chọn ROM Game..."**
2. Chọn file ROM (.nes) từ máy tính
3. Game sẽ tự động load và lưu vào thư viện
4. Bắt đầu chơi ngay!

### 2️⃣ Chơi game đã lưu
1. Khi vào lại, danh sách game đã lưu sẽ hiện ra
2. Nhấn nút **"▶️ Chơi"** bên cạnh game muốn chơi
3. Game load ngay lập tức

### 3️⃣ Tùy chỉnh phím
1. Nhấn nút **"⌨️ Tùy chỉnh phím"** (khi đang chơi hoặc ở sảnh)
2. Nhấn **"Đổi phím"** bên cạnh phím muốn thay đổi
3. Nhấn phím mới trên bàn phím
4. Nhấn **"💾 Lưu cài đặt"** để lưu vĩnh viễn

### 4️⃣ Thoát game
- Nhấn phím **Escape** (hoặc phím tùy chỉnh) để thoát về sảnh

### 5️⃣ Chuyển đổi hiển thị
- Nhấn **"📋 Danh sách"** để xem dạng list
- Nhấn **"🔲 Lưới"** để xem dạng grid

## 🎮 Phím điều khiển mặc định

| Chức năng | Phím mặc định |
|-----------|---------------|
| Di chuyển | ↑ ↓ ← → (Arrow keys) |
| Nút A | Z |
| Nút B | X |
| Start | Enter |
| Select | Shift phải |
| Thoát game | Escape |

*Tất cả phím đều có thể tùy chỉnh!*

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc web
- **CSS3** - Styling với gradient và animations
- **JavaScript (ES6+)** - Logic ứng dụng
- **[Nostalgist.js](https://github.com/arianrhodsandlot/nostalgist)** - NES emulator engine
- **IndexedDB** - Lưu trữ ROM games offline
- **localStorage** - Lưu cấu hình phím và preferences
- **File System Access API** - Chọn file ROM

## 📝 Lưu ý

### Trình duyệt hỗ trợ
- ✅ **Chrome** (phiên bản 86+)
- ✅ **Edge** (phiên bản 86+)
- ❌ **Firefox** (chưa hỗ trợ File System Access API)
- ❌ **Safari** (chưa hỗ trợ đầy đủ)

### Vấn đề bản quyền
- Project này chỉ là emulator, **không bao gồm ROM games**
- Người dùng tự chịu trách nhiệm về các ROM game sử dụng
- Chỉ sử dụng ROM từ các game bạn sở hữu hợp pháp

### Giới hạn lưu trữ
- IndexedDB có giới hạn dung lượng tùy trình duyệt (thường 50-100MB)
- File ROM NES thường chỉ vài trăm KB, có thể lưu hàng trăm game
- Nếu hết dung lượng, xóa game cũ để thêm game mới

## 🐛 Xử lý lỗi thường gặp

### Không chọn được file
**Nguyên nhân:** Trình duyệt không hỗ trợ File System Access API  
**Giải pháp:** Dùng Chrome hoặc Edge phiên bản mới nhất

### Game không load
**Nguyên nhân:** File ROM bị lỗi hoặc không đúng định dạng  
**Giải pháp:** Kiểm tra file có đuôi `.nes` và không bị corrupt

### Phím không hoạt động
**Nguyên nhân:** Cấu hình phím bị xung đột  
**Giải pháp:** Nhấn "🔄 Reset về mặc định" trong menu tùy chỉnh phím

### Game bị lag
**Nguyên nhân:** Máy tính yếu hoặc quá nhiều tab đang mở  
**Giải pháp:** Đóng các tab khác, refresh lại trang

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request nếu bạn có ý tưởng cải thiện.

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và học tập.

## 🙏 Credits

- **Nostalgist.js** - NES emulator engine
- **Nintendo** - Console và game gốc
- Community đã tạo và bảo tồn các ROM games

---

**Chúc bạn chơi game vui vẻ! 🎮✨**

*Tạo với ❤️ bằng HTML, CSS, JavaScript*
