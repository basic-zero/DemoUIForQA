# Modal / Dialog / Confirmation

## 1. Mục đích & khi nào dùng

Modal dùng để **ngắt luồng làm việc** của người dùng nhằm: xác nhận hành động quan trọng, hiển thị form ngắn, hoặc thông báo cần chú ý. Vì nó chặn toàn bộ thao tác khác, chỉ dùng khi thực sự cần thiết.

## 2. Khi nào dùng Modal — khi nào KHÔNG

| Nên dùng Modal | Không nên dùng Modal |
|---|---|
| Xác nhận hành động nguy hiểm (xóa, hủy) | Form dài nhiều bước (>7 field) → nên dùng trang riêng/wizard |
| Form nhanh, ngắn (VD thêm nhanh 1 ghi chú) | Hiển thị nội dung dài cần cuộn nhiều (báo cáo, danh sách dài) |
| Thông báo quan trọng cần người dùng xác nhận đã đọc | Thông báo không khẩn — nên dùng Toast (xem [07-notification-toast.md](07-notification-toast.md)) |

## 3. Cấu trúc (Anatomy)

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Overlay (nền mờ phía sau) | ✅ | Làm nổi bật modal, ngăn thao tác nhầm ra ngoài |
| Tiêu đề | ✅ | Ngắn gọn, nêu rõ hành động: "Xác nhận xóa học sinh" |
| Nội dung | ✅ | Giải thích rõ hậu quả hành động |
| Nút hành động | ✅ | Tối đa 2 nút: 1 chính + 1 phụ (Hủy) |
| Nút đóng (X) | ✅ | Góc trên phải, luôn có để thoát nhanh |

## 4. Quy tắc bố cục & kích thước

- Modal căn giữa màn hình, kích thước tương ứng nội dung: nhỏ (400px) cho xác nhận, vừa (600px) cho form ngắn.
- Không lồng modal trong modal (modal chồng modal gây rối, khó thoát).
- Nút hành động đặt góc dưới phải; nút Hủy/phụ đặt bên trái nút chính, để nút chính luôn ở vị trí quen thuộc.

## 5. Confirmation cho hành động nguy hiểm (Rule quan trọng nhất)

Đây là pattern **bắt buộc** cho mọi hành động xóa/hủy không thể hoàn tác dễ dàng:

1. **Tiêu đề nêu rõ đối tượng**: "Xóa học sinh Nguyễn Văn A?" — không dùng tiêu đề chung chung "Bạn có chắc chắn?"
2. **Nội dung nêu rõ hậu quả**: "Toàn bộ hồ sơ, điểm danh và học phí liên quan sẽ bị xóa. Hành động này không thể hoàn tác."
3. **Nút hành động dùng đúng động từ**, không dùng "Có/Không" hay "OK/Cancel":
   - ✅ "Xóa học sinh" (đỏ) + "Hủy" (xám/trắng)
4. Với hành động **cực kỳ nguy hiểm** (xóa hàng loạt, xóa cả lớp): cân nhắc thêm bước xác nhận phụ — yêu cầu gõ lại tên đối tượng hoặc tick checkbox "Tôi hiểu hành động này không thể hoàn tác".
5. Ưu tiên **soft delete + undo** (xem lại [UI_UX_KNOWLEDGE_SCHOOL_CRM.md § 6](../UI_UX_KNOWLEDGE_SCHOOL_CRM.md)) thay vì xóa cứng ngay lập tức khi nghiệp vụ cho phép.

## 6. Tương tác

- Nhấn phím `Esc` hoặc click ra ngoài overlay = đóng modal (tương đương bấm Hủy), **trừ modal xác nhận hành động nguy hiểm** — nên yêu cầu bấm rõ nút để tránh đóng nhầm mất xác nhận.
- Focus tự động vào nút an toàn nhất khi mở modal (với modal xóa: focus vào nút "Hủy", không focus vào nút "Xóa" để tránh bấm nhầm bằng Enter).
- Loading state: khi bấm nút hành động, disable cả 2 nút + hiện spinner, tránh double-submit.

## 7. Accessibility

- Dùng `role="dialog"` + `aria-modal="true"`, focus trap trong modal (Tab không thoát ra ngoài).
- `aria-labelledby` trỏ đến tiêu đề modal.
- Trả focus về phần tử đã mở modal sau khi đóng.

## 8. Áp dụng trong CRM trường học

| Tình huống | Loại modal |
|---|---|
| Xóa học sinh/lớp học | Confirmation, nút Danger, focus mặc định vào "Hủy" |
| Thêm nhanh ghi chú cho học sinh | Form modal nhỏ |
| Gửi thông báo hàng loạt cho phụ huynh | Confirmation trước khi gửi, nêu rõ số lượng người nhận |
| Hết phiên đăng nhập | Modal thông báo + nút "Đăng nhập lại" |

## 9. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Tiêu đề + nội dung nêu rõ đối tượng và hậu quả | Tiêu đề chung chung "Bạn có chắc chắn?" |
| Tối đa 2 nút hành động | Nhồi 3-4 nút gây phân vân |
| Focus mặc định vào lựa chọn an toàn | Focus mặc định vào nút Xóa/Danger |
| Disable nút khi đang xử lý | Cho phép bấm nhiều lần khi đang loading |
| Luôn có nút đóng (X) hoặc Hủy | Modal không có đường thoát rõ ràng |
