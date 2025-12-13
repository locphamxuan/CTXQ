# Hướng dẫn chạy dự án

Dự án này bao gồm 2 phần:
- **Client**: Frontend React + TypeScript + Vite
- **Server**: Backend Node.js + Express + SQL Server

## Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- SQL Server Database
- npm hoặc yarn

## Các bước chạy dự án

### 1. Cài đặt dependencies cho Server

```bash
cd server
npm install
```

### 2. Cấu hình môi trường cho Server

Tạo file `.env` trong thư mục `server/` với nội dung:

```env
PORT=4000
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_SERVER=your_database_server
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

**Lưu ý**: Thay thế các giá trị `your_*` bằng thông tin thực tế của bạn.

### 3. Cài đặt dependencies cho Client

Mở terminal mới và chạy:

```bash
cd client
npm install
```

### 4. Cấu hình môi trường cho Client

Tạo file `.env` trong thư mục `client/` với nội dung:

```env
VITE_API_URL=http://localhost:4000/api
```

### 5. Khởi tạo Database

Chạy file SQL schema để tạo database (nếu cần):

```bash
# Sử dụng SQL Server Management Studio hoặc sqlcmd để chạy file:
# server/database/schema.sql
```

### 6. Chạy Server

Trong thư mục `server/`:

```bash
# Chế độ development (tự động restart khi có thay đổi)
npm run dev

# Hoặc chế độ production
npm start
```

Server sẽ chạy tại: `http://localhost:4000`

### 7. Chạy Client

Mở terminal mới, trong thư mục `client/`:

```bash
npm run dev
```

Client sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu 5173 đã được sử dụng)

## Lệnh hữu ích

### Client
- `npm run dev` - Chạy development server
- `npm run build` - Build project để production
- `npm run preview` - Preview build production

### Server
- `npm start` - Chạy server (production)
- `npm run dev` - Chạy server với nodemon (development)

## Cấu trúc dự án

```
CTXQ/
├── client/          # Frontend React + TypeScript
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Backend Node.js + Express
│   ├── src/
│   ├── database/
│   └── package.json
└── README.md
```

## Xử lý lỗi thường gặp

1. **Lỗi kết nối database**: Kiểm tra lại thông tin trong file `.env` của server
2. **Lỗi port đã được sử dụng**: Thay đổi PORT trong file `.env` hoặc đóng ứng dụng đang sử dụng port đó
3. **Lỗi module không tìm thấy**: Chạy lại `npm install` trong thư mục tương ứng

## Lưu ý

- Đảm bảo SQL Server đang chạy trước khi start server
- Cần chạy cả server và client cùng lúc để ứng dụng hoạt động đầy đủ
- File `.env` không nên commit lên git (thêm vào `.gitignore`)

