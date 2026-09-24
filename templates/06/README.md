# Template 06 — CISS Admissions Hub

Mở `index.html` bằng Chrome/Edge. Giữ các file `rules.css`, `rules.js`, `workspace.css`, `workspace.js`, `hub.css`, `hub.js` cùng thư mục. Không cần máy chủ hoặc cài thư viện cho template.

Tham khảo nghiệp vụ và JavaScript: https://cis.sedbergh.edu.vn/review/template-CRMdemo_V4.html. Đã tải lại ngày 24/09/2026; SHA-256 ghi trong `source.json`, trùng bản nguồn dùng để xây template 05. Bản 06 là template mới độc lập. Phong cách dashboard dựa trên ảnh người dùng cung cấp: sidebar indigo chuyển sắc, thẻ trắng, góc bo, thẻ thống kê gradient, biểu đồ vòng và danh sách phụ huynh. Không sao chép watermark hoặc dữ liệu giả trong ảnh.

## Trọng tâm giao diện

### Không gian làm việc

Bảy vùng thông tin: lối tắt cá nhân, tỷ lệ Qualified, cơ hội đang mở và xu hướng sáu tháng, ba kênh liên hệ, hồ sơ ưu tiên, phân bố giai đoạn, phụ huynh chưa đọc. Mỗi vùng dẫn đến màn làm việc tương ứng. Chỉ số tính từ hồ sơ thực tế trong phạm vi đang chọn, không đặt số liệu trang trí. Nhóm Qualified gồm các cơ hội hiện ở Qualified hoặc giai đoạn sau đến nhập học; đây là tỷ lệ trong tập hiện tại, không phải phân tích cohort.

Phạm vi chính là đơn vị + người phụ trách + tìm kiếm toàn cục. Trang tuyển sinh có thêm bộ lọc nâng cao nguồn/chiến dịch/hạn xử lý; báo cáo nguồn vẫn có bộ lọc báo cáo riêng. Người phụ trách mặc định theo tư vấn viên mẫu, không phải cơ chế đăng nhập/phân quyền tài khoản thật.

### Chat Omnichannel

- Facebook Page, Zalo OA, Zalo cá nhân; lọc kênh, chưa đọc và tìm không dấu trong tên/điện thoại/nội dung.
- Khóa hội thoại là Opportunity + kênh + tài khoản. Tin nhắn các kênh không bị gộp theo kênh cuối cùng như nguồn.
- Danh sách 12 hội thoại/trang; nội dung chat và ngữ cảnh gia đình/học sinh/cơ hội đặt cạnh nhau. Mobile chọn hội thoại rồi mở màn chat riêng, có nút quay lại.
- Bản nháp lưu riêng từng hội thoại. Gửi mô phỏng giữ đúng kênh/tài khoản, lưu nhật ký; đánh dấu đã đọc chỉ ảnh hưởng hội thoại đã chọn.
- Mở Profile 360, tạo công việc hoặc cập nhật giai đoạn ngay từ hội thoại.

**Giới hạn kết nối:** tin nhắn được mô phỏng và lưu cục bộ. Chưa kết nối API/webhook Facebook, Zalo OA hoặc Zalo cá nhân. Không có tin nhắn nào được gửi tới người thật trong quá trình tạo/kiểm thử template.

### Profile 360

Danh bạ gia đình nhóm theo Phụ huynh → Học sinh → Opportunity/BU quan tâm, chín gia đình/trang. Một gia đình có thể có nhiều con; mỗi con hiển thị các cơ hội thuộc phạm vi lọc. Chọn một cơ hội mở chi tiết ba lớp được đánh số, thêm tóm tắt hành động tiếp theo và lịch sử. Form chỉnh sửa chia ba bước, tạo hồ sơ chia bốn bước; dữ liệu giữ lại khi chuyển bước.

### CRM / Admissions Pipeline

Hiện tổng số của từng stage; chọn một stage rồi một sub-stage để làm việc với tối đa tám thẻ/trang. Giữ các stage/sub-stage của nguồn, gồm Hot/Warm/Cold, Low/Medium/High, loại Visit, lý do Waiting, Deposit/Full fee và các trạng thái đóng.

Chuyển stage mở form từng bước, kiểm tra cuối cùng trước khi ghi dữ liệu; không đổi stage trực tiếp để bỏ qua gate. Có thể hoàn tác thao tác chuyển stage đã lưu. Những màn danh sách, công việc, chiến dịch, báo cáo và chức năng bổ sung vẫn dùng JavaScript nguồn.

**Qualified Leads:** Q1 liên hệ hợp lệ và Q2 phù hợp bắt buộc. Điểm 5–6 → Hot, 3–4 → Warm, 0–2 → Cold; Cold vẫn phải đạt Q1/Q2. Bắt buộc thông tin kỳ nhập học, nhu cầu, người quyết định, lần liên hệ tiếp theo và ngày theo dõi.

**In Consideration:** High khi đạt ít nhất năm tiêu chí và thời gian quyết định dưới 30 ngày; Medium khi đạt ít nhất bốn tiêu chí và dưới 60 ngày; còn lại Low. High phải có ngày thanh toán dự kiến và dự báo học phí. Checklist hiện số tiêu chí đã xác nhận và giải thích cách xếp loại.

Các gate khác kế thừa nguồn: xác minh lịch hẹn, bằng chứng tham quan thực tế, phụ thuộc và ngày review khi Waiting, chứng từ/xác nhận tài chính khi nhập học, lý do đóng hồ sơ.

### Bắt trùng CIS / SSV

Một học sinh chỉ có một cơ hội mở cho mỗi BU; CIS/SSV thuộc cùng nhóm K12 và không được mở đồng thời. Chặn khi tạo, đổi BU và mở lại/chuyển một cơ hội đóng sang stage mở. Không có nút bỏ qua ngầm.

Nhận diện gia đình bằng điện thoại chuẩn hóa hoặc email không rỗng, sau đó đối chiếu tên học sinh trong chính gia đình. Không đối chiếu bằng tên trên toàn hệ thống. Điện thoại trống không khớp với những gia đình cũng thiếu điện thoại. Cùng phụ huynh nhưng tên học sinh khác được liên kết anh/chị/em và kế thừa Family PIC của nguồn.

Màn Kiểm tra trùng hiển thị nhóm cơ hội xung đột trong phạm vi đã lọc; mở hồ sơ tương ứng để xử lý. Không tự gộp hoặc xóa hồ sơ. Nhận diện từ dữ liệu nhập là cơ chế demo, không thay thế định danh xác thực của hệ thống triển khai thật.

## Đối chiếu các quy tắc Markdown

| Tài liệu | Áp dụng |
| --- | --- |
| Knowledge base | Tiếng Việt nghiệp vụ, tìm kiếm trên thanh đầu, điều hướng có nhãn, nội dung quan trọng trước, 7 vùng dashboard, tiêu đề vị trí hiện tại, responsive |
| 01 Button | Nút chính rõ, nút còn lại trung tính, vùng bấm tối thiểu 44px, focus bàn phím |
| 02 Form | Label, một cột, chia bước, bắt buộc, lỗi dưới ô nhập, giữ giá trị và cảnh báo bản nháp |
| 03 Data table | Giữ phân trang/sắp xếp/ẩn cột phụ của lớp quy chuẩn; màn mới dùng thẻ ngắn có phân trang |
| 04 Modal | Dialog có nhãn, giữ/trả focus, Escape; chỉ form đang thao tác nhận tương tác khi có hồ sơ phía sau |
| 05 Navigation | Năm mục thường dùng + nhóm chức năng khác; menu mobile; Profile 360 ba lớp rõ ràng |
| 06 Search/filter | Không dấu, debounce, phạm vi được hiển thị, xóa bộ lọc, bộ lọc nâng cao mở khi cần |
| 07 Toast | Phản hồi khi lưu/gửi mô phỏng/chặn trùng; hoàn tác sửa hồ sơ và chuyển stage |
| 08 Pagination | Tổng kết quả, trước/sau và vô hiệu ở biên; ưu tiên 5, chat 12, gia đình 9, pipeline 8 mục/trang |
| 09 Card | Nhóm thông tin, thứ bậc tiêu đề, khoảng trắng, thao tác có nhãn |
| 10 Badge | Có chữ trạng thái, cảnh báo đỏ, hoàn thành xanh, không dùng màu làm thông tin duy nhất |
| 11 Tabs | Stage có tablist/aria-selected, tab chi tiết giữ bàn phím; nhãn CRM / màn hiện tại trên header |
| 12 Empty/loading | Thông báo rỗng kèm hướng xử lý; dữ liệu cục bộ không tạo loading giả |
| 13 Date | Date/datetime-local nguồn; thời gian hiển thị theo trình duyệt vi-VN |
| 14 Select | Select gốc, label, bàn phím; danh sách dài giữ tính năng tìm của rules.js |
| Báo cáo cải tiến UX | Chia giao diện phức tạp, nhóm dữ liệu theo nhu cầu thao tác, giảm lượng thông tin mỗi lần |
| Luồng lead từ chat | Chat liên kết hồ sơ ba lớp; tạo hồ sơ dùng wizard và kiểm tra trùng nguồn; không giả lập đồng bộ nền thật |

Nội dung thao tác chính 14–16px; chú thích và nhãn phụ 12–13px. Các khuyến nghị về học phí/điểm danh/video trong knowledge base không được thêm thành module ngoài phạm vi CRM nguồn. Bản 06 giữ gate nghiệp vụ V4 khi các ví dụ trong ba template cũ khác cách chấm điểm. Chưa thực hiện kiểm toán WCAG toàn diện hoặc xác minh tích hợp dịch vụ thật.

## Lưu trữ và kiểm thử

Khóa riêng `school_crm_template_06_hub`; không đọc/ghi dữ liệu template 05. Sao lưu/nhập JSON và xuất CSV có trong Tuyển sinh. Dữ liệu thuộc trình duyệt/đường dẫn hiện tại.

`verify.cjs` dùng Playwright + Chrome trong phiên riêng; chạy `node verify.cjs` hoặc đặt `PLAYWRIGHT_MODULE` nếu gói ở vị trí khác. Kết quả chạy thành công được ghi vào `verification.json`. Kiểm thử tập trung vào các màn chính và điều kiện nghiệp vụ đã thay đổi, không khẳng định mọi nhánh JavaScript nguồn đều đã được kiểm thử.
