# Pagination (Phân trang)

## 1. Mục đích & khi nào dùng

Phân trang giúp chia nhỏ danh sách dữ liệu dài (học sinh, học phí...) thành từng trang để tải nhanh và dễ quét mắt. Dùng khi danh sách vượt quá ~20-30 dòng.

## 2. Cấu trúc (Anatomy)

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Số trang | ✅ | Hiện số trang hiện tại + vài trang lân cận, không liệt kê hết nếu quá nhiều |
| Nút Trước/Sau | ✅ | Label rõ ràng hoặc icon mũi tên kèm tooltip |
| Chọn số dòng/trang | ✅ | VD "Hiển thị: 10 / 20 / 50 dòng" |
| Tổng số kết quả | ✅ | "Hiển thị 1-20 trong tổng số 150 học sinh" |

## 3. Nguyên tắc hiển thị

- Luôn hiện **tổng số kết quả và vị trí hiện tại** — người dùng cần biết "còn bao nhiêu nữa" để ước lượng công việc.
- Số trang hiển thị dạng rút gọn khi nhiều: `1 2 3 ... 8 9 10`, không liệt kê hết 50 trang.
- Nút Trước/Sau disable rõ ràng (mờ đi) khi đang ở trang đầu/cuối.
- Mặc định số dòng/trang phù hợp với màn hình đọc (20-25 dòng), cho phép người dùng tự chọn tăng lên nếu cần xem nhiều hơn.

## 4. Vị trí & kích thước

- Đặt cố định cuối bảng dữ liệu, căn giữa hoặc căn phải.
- Vùng bấm mỗi số trang tối thiểu 36x36px.
- Với bảng dài, cân nhắc thêm thanh pagination rút gọn ở đầu bảng để không phải cuộn xuống cuối mới chuyển trang.

## 5. Thay thế: Infinite scroll / "Xem thêm"

- Với danh sách dạng duyệt tự do (không cần tra cứu số thứ tự), có thể dùng nút "Xem thêm" hoặc infinite scroll thay vì số trang — nhưng **không khuyến nghị cho bảng dữ liệu nghiệp vụ** (học sinh, học phí) vì người dùng cần biết vị trí/tổng số rõ ràng để đối chiếu, báo cáo.

## 6. Accessibility

- Nút điều hướng có `aria-label` rõ ràng ("Trang trước", "Trang sau", "Đến trang 3").
- Trang hiện tại đánh dấu `aria-current="page"`.
- Điều hướng được bằng bàn phím.

## 7. Áp dụng trong CRM trường học

- Danh sách học sinh/học phí: mặc định 20 dòng/trang, có lựa chọn 10/20/50.
- Báo cáo dài (VD lịch sử điểm danh cả năm): mặc định số dòng/trang thấp hơn (10-15) vì mỗi dòng chứa nhiều thông tin hơn.

## 8. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Luôn hiện tổng số kết quả | Chỉ hiện số trang, không biết tổng bao nhiêu |
| Cho phép tùy chỉnh số dòng/trang | Cố định cứng số dòng, không tùy biến được |
| Disable rõ ràng nút Trước/Sau ở biên | Nút vẫn bấm được nhưng không có tác dụng, gây khó hiểu |
| Vùng bấm đủ lớn (36px+) | Số trang nhỏ li ti khó bấm trúng |
