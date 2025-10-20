# 💖 Trang Web Chúc Mừng 20/10 - Tũn dành tặng em bé

Một trang web đặc biệt, tương tác và lãng mạn dành cho người yêu nhân dịp 20/10.

## 🎯 Tính năng

- **Trò chơi tương tác**: 3 câu hỏi dễ thương với hiệu ứng đặc biệt
- **Linh vật mũm mĩm**: Chú heo con Tũn với lời chào ngọt ngào
- **Hiệu ứng trái tim bay**: Trái tim bay khắp màn hình
- **Slideshow hình ảnh**: Hiển thị ảnh kỷ niệm với hiệu ứng mượt mà
- **Nhạc nền**: Bài hát lãng mạn từ YouTube
- **Responsive**: Tối ưu cho cả điện thoại và laptop
- **Giao diện hồng pastel**: Màu sắc nhẹ nhàng, lãng mạn

## 📁 Cấu trúc file

```
├── index.html          # File HTML chính
├── style.css           # File CSS với giao diện và hiệu ứng
├── script.js           # File JavaScript với logic trò chơi
├── images/             # Thư mục chứa hình ảnh
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   └── photo5.jpg
└── README.md           # Hướng dẫn này
```

## 🚀 Cách Deploy lên GitHub Pages

### Bước 1: Tạo repository trên GitHub
1. Đăng nhập vào [GitHub](https://github.com)
2. Click "New repository"
3. Đặt tên repository (ví dụ: `20-10-special`)
4. Chọn "Public" để có thể sử dụng GitHub Pages miễn phí
5. Click "Create repository"

### Bước 2: Upload code lên GitHub
1. Mở terminal/command prompt trong thư mục project
2. Chạy các lệnh sau:

```bash
# Khởi tạo git repository
git init

# Thêm tất cả file
git add .

# Commit lần đầu
git commit -m "Initial commit: Trang web 20/10"

# Kết nối với GitHub repository
git remote add origin https://github.com/TEN-USERNAME/TEN-REPOSITORY.git

# Push code lên GitHub
git push -u origin main
```

### Bước 3: Bật GitHub Pages
1. Vào repository trên GitHub
2. Click tab "Settings"
3. Cuộn xuống phần "Pages"
4. Trong "Source", chọn "Deploy from a branch"
5. Chọn branch "main" và folder "/ (root)"
6. Click "Save"
7. Đợi vài phút để GitHub build trang web
8. Truy cập link: `https://TEN-USERNAME.github.io/TEN-REPOSITORY`

## 🚀 Cách Deploy lên Vercel (Nhanh hơn)

### Bước 1: Chuẩn bị
1. Đăng ký tài khoản [Vercel](https://vercel.com)
2. Đảm bảo code đã được push lên GitHub

### Bước 2: Deploy
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import repository từ GitHub
4. Chọn repository chứa code
5. Click "Deploy"
6. Vercel sẽ tự động tạo link cho bạn

## 📱 Tạo Mã QR Code

### Cách 1: Sử dụng Google Charts API
1. Truy cập: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=YOUR-WEBSITE-URL`
2. Thay `YOUR-WEBSITE-URL` bằng link trang web của bạn
3. Tải ảnh QR code về
4. In ra giấy hoặc gửi qua tin nhắn

### Cách 2: Sử dụng QR Code Generator
1. Truy cập [QR Code Generator](https://www.qr-code-generator.com/)
2. Nhập URL trang web
3. Tải ảnh QR code
4. In hoặc chia sẻ

### Cách 3: Sử dụng ứng dụng điện thoại
- **Android**: QR Code Generator, QR Scanner
- **iOS**: QR Reader, QR Code Scanner

## 🎨 Tùy chỉnh trang web

### Thay đổi câu hỏi
Mở file `script.js`, tìm hàm `updateQuestion()`:

```javascript
// Ví dụ thay đổi câu hỏi 1
updateQuestion(1, "Câu hỏi mới của bạn?", [
    {text: "Đáp án A", correct: true},
    {text: "Đáp án B", correct: false},
    {text: "Đáp án C", correct: false}
]);
```

### Thay đổi hình ảnh
1. Thay thế các file ảnh trong thư mục `images/`
2. Hoặc chỉnh sửa mảng `images` trong `script.js`:

```javascript
const images = [
    'images/photo1.jpg',
    'images/photo2.jpg', 
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg'
];
```

### Thay đổi màu sắc
Mở file `style.css`, tìm các biến màu:

```css
/* Màu chủ đạo */
background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);

/* Màu nút bấm */
background: linear-gradient(45deg, #ff6b9d, #ff8fab);
```

### Thay đổi nhạc nền
Trong file `index.html`, thay đổi YouTube link:

```html
<iframe id="youtube-audio" src="https://www.youtube.com/embed/YOUR-NEW-VIDEO-ID?autoplay=1&loop=1&playlist=YOUR-NEW-VIDEO-ID"></iframe>
```

## 🎯 Cách sử dụng

1. **Mở trang web**: Truy cập link đã deploy
2. **Chơi trò chơi**: Trả lời 3 câu hỏi
3. **Xem lời chúc**: Sau khi hoàn thành, xem slideshow ảnh và lời chúc
4. **Chia sẻ**: Gửi link hoặc QR code cho người yêu

## 🔧 Troubleshooting

### Trang web không hiển thị đúng
- Kiểm tra console browser (F12) để xem lỗi
- Đảm bảo tất cả file đã được upload đúng

### Hình ảnh không hiển thị
- Kiểm tra đường dẫn file ảnh
- Đảm bảo file ảnh có định dạng đúng (.jpg, .png)
- Kiểm tra kích thước file (không quá 5MB)

### Nhạc nền không phát
- Một số trình duyệt chặn autoplay
- Người dùng cần tương tác với trang trước
- Kiểm tra kết nối internet

## 💝 Lời nhắn

Trang web này được tạo với tình yêu và sự quan tâm đặc biệt. Hy vọng nó sẽ mang lại niềm vui và hạnh phúc cho người yêu của bạn trong ngày 20/10!

**Chúc bạn thành công! 💖🐷**
