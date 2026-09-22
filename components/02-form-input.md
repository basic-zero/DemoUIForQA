# Form & Input Field (Nhập liệu)

## 1. Mục đích & khi nào dùng

Form là nơi người dùng **tốn nhiều công sức và dễ mắc lỗi nhất** — nhập hồ sơ học sinh, học phí, điểm danh... Với người dùng không rành công nghệ, mỗi field phải **tự giải thích được nó là gì, cần nhập gì, và nhập sai thì sửa thế nào** mà không cần hỏi ai.

## 2. Cấu trúc (Anatomy) của 1 field

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Label | ✅ | Luôn hiển thị **phía trên** ô nhập, không dùng placeholder thay label |
| Dấu bắt buộc (*) | ✅ nếu field required | Đặt ngay sau label, màu đỏ nhạt |
| Input | ✅ | |
| Placeholder | Tuỳ chọn | Chỉ dùng làm ví dụ định dạng: "VD: 0912 345 678" — không lặp lại label |
| Helper text | Tuỳ chọn | Giải thích thêm dưới ô nhập khi field dễ gây nhầm lẫn |
| Error message | ✅ khi có lỗi | Hiện ngay dưới field, màu đỏ, nêu rõ cách sửa |

## 3. Bố cục Form

- **Một cột (single column)** — không chia 2-3 cột song song, người dùng dễ đọc nhảy hàng sai gây bỏ sót field.
- Nhóm các field liên quan bằng **section có tiêu đề**: "Thông tin học sinh", "Thông tin phụ huynh", "Thông tin lớp học".
- Form dài (>10 field) nên chia thành **các bước (stepper/wizard)** thay vì 1 trang cuộn dài: VD "Bước 1: Thông tin cơ bản → Bước 2: Thông tin liên hệ → Bước 3: Xác nhận".
- Nút Lưu/Hủy đặt cố định (sticky) ở cuối form hoặc cuối màn hình, luôn nhìn thấy được.

## 4. Kích thước & khoảng cách

- Chiều cao input tối thiểu: 40px (desktop), 44px (tablet).
- Khoảng cách giữa các field: tối thiểu 16-20px để không bị rối mắt.
- Độ rộng input tương ứng với dữ liệu cần nhập (số điện thoại không cần rộng full màn hình).
- Cỡ chữ trong input tối thiểu 14px, khuyến nghị 16px để tránh zoom tự động trên mobile.

## 5. Nội dung & ngôn ngữ (Microcopy)

- Label dùng từ ngữ nghiệp vụ quen thuộc: "Họ và tên học sinh" thay vì "Full Name", "Mã học sinh" thay vì "Student ID".
- Helper text giải thích **lý do** cần nhập nếu không hiển nhiên: VD field "Mã định danh BHYT" nên có helper "Dùng để đối chiếu bảo hiểm y tế, xem trên thẻ BHYT của học sinh".
- Error message phải **cụ thể và hướng dẫn cách sửa**, không chỉ báo lỗi:
  - ❌ "Giá trị không hợp lệ"
  - ✅ "Số điện thoại phải có 10 số, VD: 0912345678"

## 6. Validation & phản hồi

- **Inline validation**: kiểm tra ngay khi người dùng rời khỏi field (on blur), không đợi đến khi bấm Lưu mới báo hết lỗi cùng lúc.
- Field sai hiển thị viền đỏ + icon cảnh báo + message rõ ràng ngay dưới field.
- Field đúng có thể hiện dấu tích xanh nhẹ (tuỳ chọn, không bắt buộc) để trấn an người dùng.
- Khi bấm Lưu mà còn lỗi: **tự động cuộn đến field lỗi đầu tiên** và focus vào đó — không để người dùng tự tìm.
- Auto-save / cảnh báo "bạn có thay đổi chưa lưu" khi người dùng rời trang giữa chừng (tránh mất công nhập lại).

## 7. Các loại input đặc biệt

| Loại | Rule riêng |
|---|---|
| Số điện thoại | Tự động format khi gõ (VD: 0912 345 678), validate đúng 10 số |
| Ngày tháng | Dùng Date Picker (xem [13-date-picker.md](13-date-picker.md)), không bắt gõ tay theo định dạng cứng |
| Số tiền (học phí) | Tự động thêm dấu phân cách hàng nghìn khi gõ, hiển thị đơn vị "đ"/"VNĐ" rõ ràng |
| Dropdown chọn lớp/khối | Dùng [14-dropdown-select.md](14-dropdown-select.md), có ô tìm kiếm nếu danh sách dài |
| Upload file/ảnh (hồ sơ, giấy tờ) | Hiện rõ định dạng & dung lượng cho phép, preview ảnh sau khi tải lên |

## 8. Accessibility

- Mỗi input phải có `<label>` gắn đúng với `for`/`id`, không chỉ dựa vào placeholder.
- Thứ tự `Tab` đi đúng theo thứ tự đọc từ trên xuống.
- Thông báo lỗi phải được đọc bởi screen reader (`aria-describedby` trỏ đến error message).
- Không dùng màu sắc là **cách duy nhất** để báo lỗi — luôn kèm icon + text.

## 9. Áp dụng trong CRM trường học

- **Form thêm học sinh**: chia 3 bước — Thông tin cá nhân → Thông tin phụ huynh → Thông tin lớp/khối, có thanh tiến trình ở trên.
- **Form thu học phí**: hiện rõ số tiền còn nợ trước khi nhập số tiền thu, tự tính lại số dư ngay khi gõ.
- **Form điểm danh**: ưu tiên dùng toggle/checkbox thay vì dropdown để thao tác nhanh cho cả lớp.

## 10. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Label cố định phía trên field | Dùng placeholder thay label (biến mất khi gõ, gây quên) |
| Validate ngay khi rời field | Chỉ báo lỗi khi bấm Lưu, dồn hết lỗi 1 lúc |
| Form 1 cột, chia section rõ ràng | Form nhiều cột, nhồi nhét quá nhiều field 1 màn hình |
| Error message hướng dẫn cách sửa | Error message chung chung "Không hợp lệ" |
| Format tự động (số điện thoại, tiền tệ) | Bắt người dùng tự format đúng theo quy tắc cứng |
