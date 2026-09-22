# Search bar & Filter

## 1. Mục đích & khi nào dùng

Tìm kiếm là **hành vi phổ biến nhất** của người dùng CRM trường học: tìm 1 học sinh, 1 phụ huynh, 1 lớp cụ thể — thay vì duyệt qua menu. Filter giúp thu hẹp danh sách dài theo tiêu chí nghiệp vụ (lớp, trạng thái, thời gian).

## 2. Search bar

### Cấu trúc & vị trí
- Đặt **cố định, dễ thấy** ngay đầu trang/bảng dữ liệu, không ẩn sau icon phải bấm mới hiện.
- Icon kính lúp bên trái, placeholder gợi ý rõ tìm được gì: "Tìm theo tên, mã học sinh, SĐT phụ huynh..."
- Có nút "x" xóa nhanh nội dung đã gõ.

### Hành vi
- Tìm kiếm theo thời gian thực (debounce ~300-500ms) hoặc có nút "Tìm" rõ ràng — chọn 1 trong 2, không làm nửa vời gây khó hiểu.
- Hỗ trợ tìm không dấu (VD gõ "nguyen van a" vẫn ra "Nguyễn Văn A") — rất quan trọng vì người dùng gõ nhanh hay bỏ dấu.
- Kết quả tìm kiếm nêu rõ số lượng: "Tìm thấy 3 kết quả cho 'Văn A'".
- Không có kết quả: hiện thông báo thân thiện + gợi ý ("Không tìm thấy học sinh nào. Kiểm tra lại chính tả hoặc thử từ khóa khác.") — xem thêm [12-empty-loading-state.md](12-empty-loading-state.md).

## 3. Filter

### Nguyên tắc
- Dùng tiêu chí lọc theo **nghiệp vụ quen thuộc**: Khối, Lớp, Trạng thái, Khoảng thời gian — không dùng tên trường dữ liệu kỹ thuật.
- Filter ít (≤3 tiêu chí phổ biến) → hiện trực tiếp dạng dropdown/chip ngay trên thanh công cụ.
- Filter nhiều (>3 tiêu chí) → gom vào panel "Bộ lọc nâng cao" mở ra khi cần, tránh chiếm hết không gian mặc định.
- Sau khi áp dụng filter, hiển thị **chip tóm tắt** các điều kiện đang lọc (VD: "Lớp 5A ✕", "Chưa đóng học phí ✕") để người dùng biết đang lọc gì và có thể gỡ từng điều kiện.
- Luôn có nút **"Xóa bộ lọc"** để về trạng thái mặc định nhanh chóng.

### Kích thước & khoảng cách
- Chiều cao ô search/filter: tối thiểu 40px, đồng bộ với input form.
- Khoảng cách giữa các filter chip: 8px.

## 4. Kết hợp Search + Filter

- Search và Filter hoạt động **đồng thời** (AND logic): tìm kiếm trong tập đã lọc, không phải reset filter khi search.
- Hiển thị tổng số kết quả sau khi áp dụng cả search + filter: "Đang hiển thị 12/150 học sinh".

## 5. Accessibility

- Ô search có `aria-label="Tìm kiếm học sinh"` rõ ràng dù placeholder đã có gợi ý.
- Filter dropdown điều hướng được bằng bàn phím (mũi tên lên/xuống, Enter để chọn).

## 6. Áp dụng trong CRM trường học

| Màn hình | Search theo | Filter phổ biến |
|---|---|---|
| Danh sách học sinh | Tên, mã HS, SĐT phụ huynh | Khối, Lớp, Trạng thái |
| Danh sách học phí | Tên học sinh, mã hóa đơn | Trạng thái đóng, Tháng/Kỳ |
| Danh sách giáo viên | Tên, môn dạy | Bộ môn, Trạng thái làm việc |

## 7. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Search bar luôn hiển thị, không ẩn | Giấu search trong icon phải bấm mới mở |
| Hỗ trợ tìm không dấu | Chỉ tìm khớp chính xác có dấu |
| Hiện chip tóm tắt filter đang áp dụng | Người dùng không biết filter nào đang bật |
| Nút "Xóa bộ lọc" rõ ràng | Phải bỏ từng filter thủ công, không có cách reset nhanh |
| Thông báo rõ khi không có kết quả | Màn hình trắng trơn không giải thích |
