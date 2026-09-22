# Button (Nút bấm)

## 1. Mục đích & khi nào dùng

Button là điểm chạm để người dùng **thực hiện một hành động** (lưu, gửi, xóa, thêm mới...). Với người dùng không rành công nghệ, button phải **nhìn là biết bấm vào đâu** và **bấm là biết chuyện gì sẽ xảy ra**.

## 2. Cấu trúc (Anatomy)

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Label (chữ trên nút) | ✅ | Luôn là **động từ hành động**: "Lưu", "Thêm học sinh", "Gửi thông báo" |
| Icon | Tuỳ chọn | Đặt bên trái label, không dùng icon một mình cho hành động chính |
| Trạng thái loading | ✅ (với hành động async) | Spinner thay icon, label giữ nguyên hoặc đổi thành "Đang lưu..." |

## 3. Phân cấp & các loại Button

| Loại | Khi dùng | Số lượng / màn hình |
|---|---|---|
| **Primary** (nền đặc, màu chủ đạo) | Hành động chính, quan trọng nhất | Chỉ **1 nút primary** trên mỗi màn hình/form |
| **Secondary** (viền, nền trắng) | Hành động phụ: Hủy, Quay lại, Xem thêm | Không giới hạn nhưng nên tối giản |
| **Danger** (màu đỏ) | Hành động phá huỷ: Xóa, Hủy học phần | Luôn đi kèm xác nhận |
| **Text/Link button** | Hành động ít quan trọng: "Bỏ qua", "Xem chi tiết" | Dùng khi không muốn tạo trọng lượng thị giác |
| **Disabled** | Hành động chưa khả dụng | Phải giải thích lý do (tooltip) tại sao bị mờ |

## 4. Kích thước & khoảng cách

- Chiều cao tối thiểu: **40px** (desktop), **44px** (tablet/touch) — đủ để bấm chính xác.
- Padding ngang tối thiểu: 16px, không để label sát viền nút.
- Khoảng cách giữa 2 button liền kề: tối thiểu **12px** để tránh bấm nhầm.
- Độ rộng nút: đủ chứa label, không cắt chữ, không bắt buộc full-width trừ trên mobile/form 1 cột.

## 5. Nội dung & ngôn ngữ (Microcopy)

- Label ngắn gọn (1-3 từ), bắt đầu bằng động từ: "Lưu", "Gửi", "Thêm học sinh mới" — không dùng "OK", "Submit", "Confirm" chung chung.
- Nút Danger phải nêu rõ đối tượng bị ảnh hưởng: "Xóa học sinh" thay vì chỉ "Xóa".
- Không viết hoa toàn bộ (KHÔNG DÙNG "LƯU"), trừ khi là quy ước thiết kế nhất quán toàn hệ thống.

## 6. Tương tác & phản hồi

- **Hover**: đổi màu nhẹ (đậm/nhạt hơn 10%), có `cursor: pointer`.
- **Click/Active**: phản hồi tức thì (đổi màu, hoặc hiệu ứng ripple) trong < 100ms.
- **Loading**: disable nút ngay khi bấm, hiện spinner, **chặn double-submit** (rất quan trọng — người dùng lớn tuổi hay bấm nhiều lần khi thấy chậm phản hồi).
- **Sau khi hoàn tất**: hiện toast xác nhận + nút trở lại trạng thái bình thường hoặc điều hướng sang màn hình kết quả.

## 7. Accessibility

- Tương phản chữ/nền tối thiểu **4.5:1** (WCAG AA).
- Vùng bấm (hit area) tối thiểu 44x44px kể cả khi nút hiển thị nhỏ hơn (dùng padding ảo).
- Có thể thao tác bằng bàn phím: `Tab` để focus, `Enter`/`Space` để kích hoạt, có viền focus rõ ràng.
- `disabled` phải có `aria-disabled` + tooltip giải thích, không im lặng chặn người dùng.

## 8. Áp dụng trong CRM trường học

| Tình huống | Nút Primary | Nút Secondary/Danger |
|---|---|---|
| Form thêm học sinh | "Lưu hồ sơ" | "Hủy" (secondary) |
| Xác nhận xóa lớp học | "Xóa lớp" (danger) | "Hủy" (secondary, đặt bên trái/mặc định focus) |
| Gửi thông báo phụ huynh | "Gửi thông báo" | "Lưu nháp" (secondary) |
| Bảng danh sách học phí | "Thu học phí" (primary trong hàng) | "Xem chi tiết" (text button) |

## 9. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mỗi màn hình chỉ có 1 nút Primary | Nhiều nút Primary cạnh nhau gây rối mắt |
| Label là động từ hành động rõ nghĩa | Label mơ hồ: "OK", "Xử lý", "Submit" |
| Nút Danger có xác nhận trước khi thực thi | Xóa ngay khi bấm, không cảnh báo |
| Disable nút khi đang xử lý (chặn double-click) | Cho phép bấm liên tục khi đang loading |
| Icon luôn kèm label | Icon đơn độc không có chữ giải thích cho hành động quan trọng |
