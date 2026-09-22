# Dropdown / Select

## 1. Mục đích & khi nào dùng

Dropdown dùng khi người dùng cần chọn 1 (hoặc nhiều) giá trị từ danh sách cố định: chọn lớp, chọn khối, chọn trạng thái, chọn vai trò. Giúp tránh lỗi nhập liệu tự do và giới hạn đúng phạm vi giá trị hợp lệ.

## 2. Khi nào dùng Dropdown — khi nào dùng lựa chọn khác

| Số lượng lựa chọn | Nên dùng |
|---|---|
| 2 lựa chọn loại trừ nhau | Toggle switch hoặc 2 radio button hiện sẵn |
| 3-5 lựa chọn | Radio button hiện sẵn (thấy hết lựa chọn ngay, không cần click mở) |
| 6 lựa chọn trở lên | Dropdown/Select |
| Danh sách rất dài (VD danh sách lớp toàn trường) | Dropdown có ô tìm kiếm (searchable select) |
| Chọn nhiều giá trị cùng lúc | Multi-select có chip hiển thị các giá trị đã chọn |

## 3. Cấu trúc (Anatomy)

- Label phía trên (giống input thường — xem [02-form-input.md](02-form-input.md)).
- Ô hiển thị giá trị đã chọn + icon mũi tên chỉ xuống.
- Danh sách lựa chọn hiện khi click, có highlight khi hover/focus từng dòng.
- Placeholder rõ ràng khi chưa chọn: "Chọn lớp học" thay vì để trống không gợi ý.

## 4. Nguyên tắc thiết kế

- Danh sách dài (>10 mục): thêm **ô tìm kiếm** ngay trong dropdown để lọc nhanh (VD chọn học sinh trong trường 1000+ em).
- Nhóm các lựa chọn liên quan bằng tiêu đề nhóm nếu danh sách phức tạp (VD Dropdown chọn Lớp: nhóm theo Khối 1, Khối 2...).
- Giá trị đang chọn phải hiển thị rõ ràng trong ô, không chỉ trong danh sách mở ra.
- Multi-select: giá trị đã chọn hiện dạng chip có nút "x" để gỡ từng cái, kèm tổng số đã chọn nếu quá nhiều ("Đã chọn 12 lớp").

## 5. Kích thước & khoảng cách

- Chiều cao ô select: đồng bộ input khác (40-44px).
- Mỗi dòng lựa chọn trong danh sách: tối thiểu 36-40px chiều cao (đủ vùng bấm tablet).
- Danh sách dài giới hạn chiều cao hiển thị (~6-8 dòng) + cuộn, tránh tràn hết màn hình.

## 6. Tương tác

- Click ngoài dropdown hoặc phím `Esc` = đóng danh sách, không mất giá trị đã chọn trước đó.
- Phím mũi tên lên/xuống di chuyển giữa các lựa chọn, Enter để chọn — hỗ trợ gõ nhanh nhảy đến mục theo chữ cái đầu.

## 7. Accessibility

- Dùng đúng `<select>` gốc khi có thể (hỗ trợ tốt sẵn cho screen reader/mobile), hoặc nếu custom UI thì đảm bảo `role="listbox"`/`role="option"` đầy đủ `aria-selected`.
- Label gắn đúng `for`/`id` như input thường.

## 8. Áp dụng trong CRM trường học

| Trường hợp | Loại |
|---|---|
| Chọn Khối (1-5) | Radio button hoặc dropdown ngắn |
| Chọn Lớp trong trường | Dropdown có tìm kiếm, nhóm theo khối |
| Chọn học sinh nhận thông báo | Multi-select có chip + tìm kiếm |
| Chọn trạng thái học phí (lọc) | Dropdown 4-5 lựa chọn cố định |

## 9. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Danh sách dài có ô tìm kiếm trong dropdown | Bắt cuộn tay qua hàng trăm lựa chọn không tìm kiếm được |
| Placeholder gợi ý rõ khi chưa chọn | Ô trống không gợi ý phải chọn gì |
| Multi-select hiện chip từng giá trị đã chọn | Chỉ hiện số lượng "3 đã chọn" mà không rõ là gì |
| Dùng radio button khi ≤5 lựa chọn | Dùng dropdown cho 2-3 lựa chọn đơn giản, bắt thêm 1 click không cần thiết |
