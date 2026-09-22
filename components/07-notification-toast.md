# Notification / Toast / Alert

## 1. Mục đích & khi nào dùng

Thông báo cho người dùng biết **kết quả của hành động vừa thực hiện** (lưu thành công, xóa thất bại...) hoặc **cảnh báo tình trạng hệ thống**. Với người dùng không rành công nghệ, đây là nguồn xác nhận duy nhất rằng "hệ thống đã hiểu và xử lý đúng ý tôi".

## 2. Phân loại

| Loại | Khi dùng | Màu sắc | Thời gian hiển thị |
|---|---|---|---|
| **Success** (thành công) | Sau khi lưu/gửi/xóa thành công | Xanh lá | Tự ẩn sau 3-4s |
| **Error** (lỗi) | Hành động thất bại (mất mạng, lỗi server) | Đỏ | Không tự ẩn, cần người dùng đóng |
| **Warning** (cảnh báo) | Cảnh báo cần chú ý nhưng chưa phải lỗi | Vàng/cam | Tự ẩn sau 5-6s hoặc cần đóng |
| **Info** (thông tin) | Thông tin trung lập | Xanh dương | Tự ẩn sau 4-5s |

## 3. Toast (thông báo nổi, không chặn thao tác)

### Cấu trúc
- Icon tương ứng loại thông báo + nội dung ngắn gọn (1 câu) + nút đóng (x).
- Vị trí: góc trên phải hoặc dưới cùng màn hình, nhất quán xuyên suốt hệ thống.
- Nhiều toast cùng lúc: xếp chồng theo thứ tự thời gian, tối đa hiển thị 3, các toast cũ tự ẩn bớt.

### Nội dung
- Nêu rõ **hành động + đối tượng + kết quả**:
  - ✅ "Đã lưu hồ sơ học sinh Nguyễn Văn A"
  - ❌ "Thành công" (không rõ thành công cái gì)
- Với lỗi, giải thích **nguyên nhân và cách khắc phục** nếu có thể:
  - ✅ "Không thể lưu: mất kết nối mạng. Vui lòng thử lại."
  - ❌ "Error 500"

## 4. Alert / Banner (thông báo cố định trong trang)

- Dùng cho cảnh báo quan trọng, cần người dùng chú ý liên tục khi ở trên trang đó (VD: "Trường bạn còn 3 ngày để hoàn tất khai báo học phí kỳ mới").
- Đặt ở đầu trang/section liên quan, có thể đóng (dismiss) nếu không phải cảnh báo bắt buộc.
- Không lạm dụng — quá nhiều banner cùng lúc gây "mù banner" (banner blindness), người dùng lờ đi không đọc nữa.

## 5. Tương tác

- Toast không chặn thao tác khác (non-blocking) — người dùng vẫn làm việc bình thường trong lúc toast hiển thị.
- Hover vào toast: tạm dừng đếm giờ tự ẩn, để người dùng kịp đọc.
- Lỗi quan trọng (mất dữ liệu, hết phiên đăng nhập): dùng Modal thay vì Toast vì cần người dùng xác nhận đã đọc (xem [04-modal-dialog.md](04-modal-dialog.md)).

## 6. Accessibility

- Toast dùng `role="status"` (success/info) hoặc `role="alert"` (error/warning) để screen reader tự đọc khi xuất hiện.
- Không chỉ dựa vào màu sắc — luôn kèm icon khác nhau cho từng loại (dấu tích, dấu than, dấu X) để người mù màu vẫn phân biệt được.

## 7. Áp dụng trong CRM trường học

| Tình huống | Loại | Nội dung mẫu |
|---|---|---|
| Lưu hồ sơ học sinh thành công | Success | "Đã lưu hồ sơ học sinh Nguyễn Văn A" |
| Gửi thông báo phụ huynh thất bại | Error | "Không gửi được thông báo đến 2/50 phụ huynh do sai số điện thoại. Xem chi tiết" |
| Sắp đến hạn nộp báo cáo | Warning (banner) | "Còn 3 ngày để hoàn tất báo cáo học kỳ 1" |
| Hệ thống đang bảo trì | Info (banner) | "Hệ thống sẽ bảo trì lúc 22h hôm nay, dự kiến 30 phút" |

## 8. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Nội dung nêu rõ hành động + đối tượng + kết quả | Thông báo chung chung "Thành công"/"Thất bại" |
| Error toast không tự ẩn, cần đóng thủ công | Lỗi quan trọng tự biến mất sau vài giây |
| Icon khác nhau cho từng loại thông báo | Chỉ phân biệt bằng màu sắc |
| Tối đa 3 toast hiển thị cùng lúc | Toast chồng chất không kiểm soát |
| Banner quan trọng mới dùng, không lạm dụng | Spam banner khiến người dùng lờ đi mọi cảnh báo |
