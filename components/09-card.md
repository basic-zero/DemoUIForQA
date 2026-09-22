# Card

## 1. Mục đích & khi nào dùng

Card gói gọn một nhóm thông tin liên quan thành một khối trực quan, dễ quét mắt — thường dùng cho Dashboard (thẻ thống kê), hồ sơ tóm tắt (học sinh, lớp học), hoặc danh sách dạng lưới trên màn hình hẹp.

## 2. Cấu trúc (Anatomy)

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Tiêu đề/Icon | ✅ | Tên nhóm thông tin, icon minh họa |
| Nội dung chính | ✅ | Số liệu lớn (dashboard) hoặc thông tin tóm tắt |
| Mô tả phụ | Tuỳ chọn | Ghi chú thêm, xu hướng tăng/giảm |
| Hành động | Tuỳ chọn | Nút/link "Xem chi tiết" |

## 3. Nguyên tắc thiết kế

- Mỗi card chỉ truyền tải **một ý chính** — không nhồi nhét nhiều loại thông tin không liên quan vào 1 card.
- Card thống kê (Dashboard) ưu tiên: **số liệu lớn, dễ đọc** ở giữa/trên, label giải thích rõ bên dưới hoặc bên trên số liệu.
- Có bo góc nhẹ (8-12px) + shadow nhẹ hoặc viền mỏng để tách biệt với nền, không dùng shadow quá đậm gây rối mắt.
- Card có thể click (dẫn đến trang chi tiết) phải có `cursor: pointer` + hiệu ứng hover rõ ràng để người dùng biết là bấm được.

## 4. Kích thước & khoảng cách

- Padding trong card: tối thiểu 16-20px.
- Khoảng cách giữa các card trong lưới (grid gap): 16-24px.
- Card thống kê Dashboard: chiều cao đồng nhất trong cùng 1 hàng để tạo cảm giác trật tự.

## 5. Nội dung & ngôn ngữ

- Label số liệu dùng ngôn ngữ nghiệp vụ rõ ràng: "Tổng học sinh" thay vì "Total Count".
- Số liệu lớn định dạng dễ đọc (dấu phân cách hàng nghìn): "1.250" thay vì "1250".
- Xu hướng tăng/giảm (nếu có) dùng màu + icon mũi tên rõ ràng (xanh = tăng tích cực, đỏ = giảm/cảnh báo tuỳ ngữ cảnh nghiệp vụ).

## 6. Accessibility

- Card có thể click phải là phần tử tương tác thực sự (`<button>`/`<a>`), không chỉ `<div onclick>` — đảm bảo thao tác được bằng bàn phím.
- Tương phản chữ/nền đạt chuẩn AA.

## 7. Áp dụng trong CRM trường học

| Loại Card | Nội dung |
|---|---|
| Card thống kê Dashboard | "Tổng học sinh: 1.250", "Học phí đã thu: 85%", "Vắng hôm nay: 12 học sinh" |
| Card hồ sơ học sinh (tóm tắt) | Ảnh đại diện, tên, lớp, trạng thái, nút "Xem hồ sơ" |
| Card lớp học (dạng lưới) | Tên lớp, GVCN, sĩ số, nút "Vào lớp" |

## 8. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mỗi card 1 ý chính, rõ ràng | Nhồi nhét nhiều loại thông tin không liên quan |
| Số liệu lớn, dễ đọc, có dấu phân cách | Số liệu nhỏ li ti, khó đọc nhanh |
| Card click được có hover + cursor pointer | Card trông giống bấm được nhưng không phản hồi gì |
| Chiều cao đồng nhất trong cùng hàng | Card lệch cao thấp trong 1 lưới, mất trật tự |
