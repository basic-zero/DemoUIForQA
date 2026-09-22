# Data Table (Bảng dữ liệu)

## 1. Mục đích & khi nào dùng

Bảng dữ liệu là nơi hiển thị danh sách học sinh, lớp học, học phí, điểm danh... Đây là màn hình người dùng **nhìn vào nhiều nhất mỗi ngày**, nên phải dễ quét mắt (scannable), dễ tìm đúng dòng cần xử lý.

## 2. Cấu trúc (Anatomy)

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Thanh công cụ trên bảng | ✅ | Gồm: ô tìm kiếm, filter, nút hành động chính (VD "Thêm học sinh") |
| Header cột | ✅ | Tên cột rõ nghĩa, có thể sắp xếp (sort) nếu cần |
| Dòng dữ liệu | ✅ | Hàng chẵn/lẻ có màu nền xen kẽ nhẹ để dễ đọc ngang |
| Cột hành động | ✅ | Icon/button thao tác nhanh (Sửa, Xóa, Xem) ở cuối mỗi dòng |
| Phân trang | ✅ nếu >20 dòng | Xem [08-pagination.md](08-pagination.md) |
| Trạng thái rỗng/loading | ✅ | Xem [12-empty-loading-state.md](12-empty-loading-state.md) |

## 3. Nguyên tắc hiển thị dữ liệu

- Chỉ hiển thị **cột quan trọng nhất theo mặc định** (5-7 cột), các cột phụ để trong "Xem chi tiết" hoặc cho phép tùy chỉnh ẩn/hiện cột.
- Cột đầu tiên luôn là thông tin định danh chính (Họ tên học sinh, Tên lớp...), giúp người dùng biết ngay đang xem dòng của ai.
- Dữ liệu dạng trạng thái (đã đóng học phí / chưa đóng / quá hạn) hiển thị bằng **Badge màu** (xem [10-badge-status-tag.md](10-badge-status-tag.md)), không chỉ chữ thường.
- Số liệu (tiền, số lượng) căn phải; chữ (tên, mô tả) căn trái — giúp mắt quét cột số nhanh hơn.
- Dòng quan trọng cần chú ý (quá hạn, sắp hết hạn) có thể highlight nhẹ nền (VD vàng nhạt/đỏ nhạt).

## 4. Kích thước & khoảng cách

- Chiều cao mỗi dòng tối thiểu 44px (đủ vùng bấm cho action icon).
- Padding trong ô (cell): tối thiểu 12px ngang, 10px dọc.
- Header cột: chữ đậm (semi-bold), tương phản rõ với nền, sticky khi cuộn dọc (luôn nhìn thấy tên cột).

## 5. Tìm kiếm, lọc & sắp xếp

- Ô tìm kiếm đặt **ngay phía trên bảng**, luôn hiển thị (không ẩn trong menu) — đây là hành vi phổ biến nhất của người dùng.
- Filter theo các tiêu chí nghiệp vụ quen thuộc: Khối/Lớp, Trạng thái, Khoảng thời gian — dùng label tiếng Việt rõ nghĩa.
- Sort: click vào header cột để sắp xếp, có icon mũi tên chỉ chiều sort hiện tại.
- Hiển thị rõ **số kết quả đang lọc** ("Đang hiển thị 24/150 học sinh") để người dùng biết filter đang áp dụng.

## 6. Hành động trên dòng dữ liệu (Row actions)

- Các hành động thường dùng (Xem, Sửa) hiện dạng icon + tooltip ngay trên dòng.
- Hành động nguy hiểm (Xóa) tách riêng, có thể ẩn trong menu "..." để tránh bấm nhầm, và luôn có xác nhận (xem [06-modal-dialog... ](04-modal-dialog.md)).
- **Bulk action**: cho phép chọn nhiều dòng (checkbox đầu dòng) để thao tác hàng loạt (VD gửi thông báo cho nhiều phụ huynh cùng lúc), hiện thanh hành động nổi khi có dòng được chọn.

## 7. Responsive

- Trên tablet/màn hình hẹp: ưu tiên ẩn bớt cột phụ, giữ cột định danh + trạng thái + 1 hành động chính.
- Trường hợp quá hẹp (mobile): cân nhắc chuyển bảng thành dạng **danh sách card** (mỗi dòng = 1 card thông tin) thay vì bảng cuộn ngang.

## 8. Accessibility

- Header cột dùng đúng thẻ `<th scope="col">` để screen reader đọc đúng ngữ cảnh.
- Action icon phải có `aria-label` mô tả rõ hành động + đối tượng (VD "Xóa học sinh Nguyễn Văn A").
- Có thể điều hướng bằng bàn phím giữa các dòng/action.

## 9. Áp dụng trong CRM trường học

| Bảng | Cột mặc định | Filter phổ biến |
|---|---|---|
| Danh sách học sinh | Họ tên, Lớp, Trạng thái, SĐT phụ huynh, Hành động | Khối, Lớp, Trạng thái |
| Danh sách học phí | Họ tên, Lớp, Số tiền, Trạng thái đóng, Hành động | Trạng thái, Tháng/Kỳ học |
| Điểm danh | Họ tên, Có mặt/Vắng, Ghi chú | Lớp, Ngày |

## 10. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Ô tìm kiếm luôn hiển thị, không ẩn | Giấu tìm kiếm trong menu phụ |
| Trạng thái hiển thị bằng badge màu | Chỉ hiển thị chữ thường khó phân biệt nhanh |
| Header sticky khi cuộn | Header biến mất khi cuộn, mất ngữ cảnh cột |
| Hành động Xóa có xác nhận | Xóa ngay khi bấm icon |
| Hiện rõ số kết quả đang lọc | Người dùng không biết filter có đang áp dụng hay không |
