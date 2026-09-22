# Date Picker

## 1. Mục đích & khi nào dùng

Chọn ngày/tháng/năm là thao tác thường xuyên trong CRM trường học (ngày sinh, ngày nhập học, kỳ học phí, ngày điểm danh). Người dùng không rành công nghệ **rất dễ nhập sai định dạng ngày tháng nếu phải gõ tay** — vì vậy luôn ưu tiên chọn bằng lịch trực quan.

## 2. Nguyên tắc thiết kế

- Luôn có **icon lịch** bên trong/cạnh ô input để người dùng biết đây là field chọn ngày.
- Click vào ô mở popup lịch trực quan (calendar picker), không bắt gõ tay theo định dạng cứng (dd/mm/yyyy).
- Vẫn cho phép gõ tay nếu người dùng muốn nhanh, nhưng **tự động nhận diện & format lại** theo chuẩn hiển thị của hệ thống, báo lỗi rõ ràng nếu không nhận diện được.
- Định dạng hiển thị ngày thống nhất toàn hệ thống: **dd/mm/yyyy** (chuẩn Việt Nam) — không trộn lẫn mm/dd/yyyy gây hiểu nhầm ngày/tháng.

## 3. Cấu trúc popup lịch

- Hiện tháng/năm hiện tại, có nút điều hướng tháng trước/sau rõ ràng.
- Cho phép **bấm nhanh vào tên tháng/năm** để nhảy nhanh (VD chọn ngày sinh học sinh cách đây nhiều năm) — tránh bắt bấm mũi tên hàng chục lần.
- Ngày hôm nay được đánh dấu (viền/nền khác biệt) để định hướng.
- Ngày đã chọn highlight rõ ràng bằng màu chủ đạo.
- Ngày không hợp lệ (VD ngày tương lai cho "ngày sinh") hiển thị mờ, không bấm được.

## 4. Chọn khoảng ngày (Date range)

- Dùng cho báo cáo theo kỳ, lọc dữ liệu theo khoảng thời gian.
- Có sẵn các lựa chọn nhanh phổ biến: "Hôm nay", "Tuần này", "Tháng này", "Học kỳ 1", "Học kỳ 2" — giảm số click cho các trường hợp thường dùng, tránh bắt người dùng luôn phải tự chọn 2 mốc ngày.

## 5. Kích thước & khoảng cách

- Ô input date: chiều cao đồng bộ với input form khác (40-44px).
- Popup lịch: mỗi ô ngày tối thiểu 36x36px để dễ bấm trên tablet.

## 6. Accessibility

- Điều hướng lịch được bằng bàn phím (mũi tên di chuyển ngày, Enter để chọn).
- `aria-label` cho từng ngày nêu rõ ngày/tháng/năm đầy đủ, không chỉ số.

## 7. Áp dụng trong CRM trường học

| Trường hợp | Gợi ý |
|---|---|
| Ngày sinh học sinh | Mở sẵn picker ở năm gần hiện tại - phù hợp độ tuổi, cho phép nhảy nhanh năm |
| Ngày nhập học | Mặc định gợi ý ngày hiện tại |
| Lọc báo cáo học phí theo kỳ | Có sẵn nút nhanh "Học kỳ 1/2", "Năm học hiện tại" |
| Điểm danh theo ngày | Mặc định chọn ngày hôm nay, dễ dàng lùi/tiến 1 ngày bằng nút mũi tên |

## 8. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Định dạng ngày dd/mm/yyyy nhất quán toàn hệ thống | Trộn lẫn nhiều định dạng ngày khác nhau giữa các màn hình |
| Cho phép nhảy nhanh tháng/năm trong picker | Bắt bấm mũi tên từng tháng để lùi về nhiều năm trước |
| Có sẵn lựa chọn nhanh cho khoảng ngày phổ biến | Luôn bắt chọn thủ công 2 mốc ngày từ đầu |
| Đánh dấu rõ ngày hôm nay và ngày đã chọn | Lịch không có điểm neo, khó định hướng đang ở đâu |
