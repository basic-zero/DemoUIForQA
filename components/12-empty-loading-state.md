# Empty State & Loading State

## 1. Mục đích & khi nào dùng

Đây là những màn hình "khoảng trống" dễ bị bỏ quên khi thiết kế, nhưng lại **quyết định cảm giác an tâm** của người dùng không rành công nghệ — họ cần biết "hệ thống đang làm gì" và "vì sao tôi không thấy dữ liệu".

## Phần A — Loading State

### Nguyên tắc
- **Không bao giờ để màn hình trắng trơn** khi đang tải dữ liệu — luôn có tín hiệu hệ thống đang hoạt động.
- Tải nhanh (<1s): có thể không cần hiện loading (tránh nháy màn hình).
- Tải trung bình (1-3s): dùng **Skeleton screen** (khung xám mờ phác hoạ bố cục sắp hiện) — cho cảm giác nhanh hơn spinner đơn thuần.
- Tải lâu (>3s): dùng Skeleton + có thể thêm dòng chữ trấn an: "Đang tải danh sách học sinh..." nếu quá 5-6s nên hiện thêm ước lượng hoặc lý do chậm.
- Hành động async (lưu, gửi): dùng spinner nhỏ ngay trong nút bấm (xem [01-button.md](01-button.md)), không che toàn màn hình trừ khi thực sự cần chặn thao tác khác.

### Accessibility
- Vùng loading có `aria-busy="true"` để screen reader biết đang tải.

## Phần B — Empty State

### Khi nào xuất hiện
| Tình huống | Nội dung Empty State |
|---|---|
| Chưa từng có dữ liệu (lần đầu dùng) | Hướng dẫn + nút hành động để bắt đầu |
| Đã lọc/tìm kiếm nhưng không có kết quả | Giải thích + gợi ý điều chỉnh |
| Lỗi tải dữ liệu | Giải thích lỗi + nút thử lại |
| Không có quyền xem | Giải thích rõ + hướng dẫn liên hệ |

### Cấu trúc (Anatomy)
- Icon/hình minh hoạ đơn giản, thân thiện (không dùng ảnh lỗi kỹ thuật đáng sợ).
- Tiêu đề ngắn gọn nêu rõ tình huống: "Chưa có học sinh nào trong lớp này".
- Mô tả phụ (1 câu) giải thích thêm hoặc hướng dẫn.
- Nút hành động rõ ràng nếu có thể xử lý ngay: "Thêm học sinh mới".

### Nội dung & ngôn ngữ
- Giọng văn thân thiện, không đổ lỗi người dùng: 
  - ✅ "Không tìm thấy học sinh nào phù hợp. Thử kiểm tra lại từ khóa hoặc bộ lọc."
  - ❌ "Không có dữ liệu" / "Error: No data found"
- Với lỗi hệ thống: tránh thuật ngữ kỹ thuật (mã lỗi, stack trace) — nếu cần, đặt chi tiết kỹ thuật ẩn dưới mục "Xem chi tiết lỗi" cho dev/support, còn người dùng chỉ thấy thông điệp dễ hiểu + nút "Thử lại".

## 2. Áp dụng trong CRM trường học

| Màn hình | Empty state mẫu |
|---|---|
| Lớp học chưa có học sinh | "Chưa có học sinh nào trong lớp 5A" + nút "Thêm học sinh" |
| Tìm kiếm không ra kết quả | "Không tìm thấy học sinh nào cho 'Văn X'. Kiểm tra lại chính tả." |
| Chưa có khoản học phí nào tạo | "Chưa có kỳ học phí nào được thiết lập" + nút "Tạo kỳ thu học phí" |
| Lỗi kết nối khi tải danh sách | "Không tải được dữ liệu. Vui lòng kiểm tra kết nối mạng." + nút "Thử lại" |

## 3. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Luôn có tín hiệu khi đang tải (skeleton/spinner) | Màn hình trắng trơn không phản hồi |
| Empty state có hướng dẫn hành động tiếp theo | Chỉ hiện "Không có dữ liệu" cụt lủn |
| Lỗi hiển thị bằng ngôn ngữ thân thiện, có nút thử lại | Hiện mã lỗi kỹ thuật (500, null, undefined) trực tiếp cho người dùng |
| Skeleton screen cho thời gian tải trung bình | Spinner xoay vô định kéo dài không rõ tiến độ |
