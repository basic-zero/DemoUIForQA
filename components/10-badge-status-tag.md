# Badge / Status Tag

## 1. Mục đích & khi nào dùng

Badge/Status Tag hiển thị **trạng thái** của một đối tượng (học sinh, học phí, hồ sơ...) bằng hình khối màu nhỏ, giúp người dùng quét mắt nhận biết ngay lập tức mà không cần đọc kỹ từng dòng chữ.

## 2. Cấu trúc (Anatomy)

- Nền màu nhạt (pastel) + chữ màu đậm cùng tông, bo góc tròn (pill shape) hoặc bo nhẹ (4-6px).
- Label ngắn gọn (1-3 từ): "Đã đóng", "Chưa đóng", "Quá hạn", "Đang học", "Đã nghỉ".
- Có thể kèm icon nhỏ (dấu tích, dấu chấm than) để tăng khả năng nhận diện không chỉ dựa vào màu.

## 3. Hệ màu trạng thái chuẩn (nhất quán toàn hệ thống)

| Trạng thái | Màu | Ví dụ áp dụng |
|---|---|---|
| Tích cực/Hoàn tất | Xanh lá | "Đã đóng học phí", "Đang học", "Có mặt" |
| Cảnh báo/Chờ xử lý | Vàng/Cam | "Sắp đến hạn", "Đang chờ duyệt", "Nghỉ phép" |
| Tiêu cực/Cần chú ý | Đỏ | "Quá hạn", "Vắng không phép", "Đã nghỉ học" |
| Trung lập/Thông tin | Xám/Xanh dương nhạt | "Nháp", "Chưa xếp lớp", "Mới tạo" |

> **Nguyên tắc bắt buộc**: 1 trạng thái luôn gắn với đúng 1 màu xuyên suốt toàn hệ thống — không dùng đỏ cho "quá hạn" ở màn hình này nhưng dùng đỏ cho "đã xóa" ở màn hình khác.

## 4. Kích thước & khoảng cách

- Chiều cao badge: 20-24px, đủ nhỏ để không phá vỡ dòng dữ liệu nhưng đủ lớn để đọc rõ.
- Padding ngang trong badge: 8-10px.
- Cỡ chữ: 12-13px, đậm vừa (medium/semi-bold).

## 5. Nội dung & ngôn ngữ

- Dùng đúng thuật ngữ nghiệp vụ nhà trường quen dùng, tránh thuật ngữ hệ thống: "Đang học" thay vì "Active", "Đã nghỉ" thay vì "Inactive".
- Không viết tắt gây khó hiểu ("QH" thay vì "Quá hạn") trừ khi đã giải thích rõ ràng và nhất quán.

## 6. Accessibility

- Không dùng màu sắc là cách **duy nhất** phân biệt — luôn kèm text label rõ ràng (không chỉ chấm màu tròn không chữ).
- Đảm bảo tương phản chữ/nền badge đạt tối thiểu AA (đặc biệt với nền pastel nhạt, chữ phải đủ đậm).

## 7. Áp dụng trong CRM trường học

| Đối tượng | Các trạng thái thường gặp |
|---|---|
| Học phí | Đã đóng (xanh), Chưa đóng (xám), Quá hạn (đỏ), Sắp đến hạn (vàng) |
| Học sinh | Đang học (xanh), Đã nghỉ học (đỏ), Bảo lưu (vàng) |
| Điểm danh | Có mặt (xanh), Vắng có phép (vàng), Vắng không phép (đỏ) |
| Thông báo gửi phụ huynh | Đã gửi (xanh), Đang gửi (vàng), Gửi thất bại (đỏ) |

## 8. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 1 trạng thái = 1 màu cố định toàn hệ thống | Cùng 1 trạng thái nhưng khác màu ở mỗi màn hình |
| Label rõ nghĩa bằng tiếng Việt nghiệp vụ | Viết tắt khó hiểu hoặc thuật ngữ tiếng Anh kỹ thuật |
| Luôn kèm text, không chỉ chấm màu | Chỉ hiện chấm tròn màu không có chữ giải thích |
| Tương phản đủ rõ trên nền pastel | Chữ nhạt trên nền nhạt, khó đọc |
