# Tabs & Breadcrumb

## Phần A — Tabs

### 1. Mục đích & khi nào dùng
Tabs chia nội dung của **cùng một đối tượng** thành các nhóm để xem lần lượt mà không cần chuyển trang — VD hồ sơ học sinh có tab "Thông tin cá nhân / Học phí / Điểm danh / Ghi chú".

### 2. Nguyên tắc thiết kế
- Tối đa **5-6 tab** trên 1 hàng ngang — nhiều hơn nên gộp nhóm hoặc chuyển sang dropdown.
- Tên tab ngắn gọn, rõ nghĩa nghiệp vụ: "Học phí", "Điểm danh" — không dùng tên kỹ thuật.
- Tab đang active phải nổi bật rõ: viền dưới đậm màu + chữ đậm hơn, khác biệt rõ với tab không active.
- Giữ trạng thái tab đã chọn khi người dùng quay lại trang (không luôn reset về tab đầu tiên).

### 3. Kích thước & khoảng cách
- Chiều cao tab: tối thiểu 40-44px (đủ vùng bấm).
- Khoảng cách giữa các tab: 24-32px hoặc chia đều theo chiều rộng khi ít tab.

### 4. Accessibility
- Dùng `role="tablist"`, mỗi tab `role="tab"` + `aria-selected`, nội dung tương ứng `role="tabpanel"`.
- Điều hướng bằng phím mũi tên trái/phải giữa các tab.

### 5. Áp dụng trong CRM trường học
- Hồ sơ học sinh: Thông tin cá nhân | Học phí | Điểm danh | Kết quả học tập | Ghi chú.
- Trang lớp học: Danh sách học sinh | Thời khoá biểu | Giáo viên phụ trách.

---

## Phần B — Breadcrumb

### 1. Mục đích & khi nào dùng
Breadcrumb cho biết **vị trí hiện tại trong cây điều hướng**, giúp người dùng quay lại nhanh mà không cần bấm nút Back nhiều lần — quan trọng với trang sâu 2-3 cấp.

### 2. Nguyên tắc thiết kế
- Định dạng: `Trang chủ > Học sinh > Lớp 5A > Nguyễn Văn A`, dùng dấu `>` hoặc `/` nhất quán.
- Mỗi mục (trừ mục cuối/hiện tại) là link có thể click để quay lại đúng cấp đó.
- Mục hiện tại (cuối cùng) hiển thị dạng text thường, không phải link (vì đang đứng ở đó rồi).
- Chỉ dùng breadcrumb cho trang có **từ 2 cấp điều hướng trở lên**; trang cấp 1 (Dashboard, Danh sách học sinh) không cần.

### 3. Kích thước & khoảng cách
- Cỡ chữ nhỏ hơn nội dung chính (13-14px), đặt ngay dưới header trang, trên tiêu đề trang.
- Khoảng cách giữa các mục: 8px, dấu phân cách canh giữa.

### 4. Accessibility
- Dùng `<nav aria-label="breadcrumb">` bọc danh sách, mục hiện tại đánh dấu `aria-current="page"`.

### 5. Áp dụng trong CRM trường học
- `Học sinh > Lớp 5A > Nguyễn Văn A > Học phí` — giúp giáo vụ/kế toán biết đang xem học phí của học sinh nào, thuộc lớp nào.

---

## Checklist Do / Don't (chung cho cả 2)

| ✅ Do | ❌ Don't |
|---|---|
| Tab/breadcrumb dùng ngôn ngữ nghiệp vụ rõ ràng | Tên tab mơ hồ, viết tắt khó hiểu |
| Tab active nổi bật rõ ràng | Không phân biệt được tab nào đang chọn |
| Breadcrumb chỉ dùng khi có ≥2 cấp | Breadcrumb dư thừa "Trang chủ > Trang chủ" |
| Giữ trạng thái tab khi quay lại trang | Luôn reset về tab đầu tiên gây mất ngữ cảnh |
