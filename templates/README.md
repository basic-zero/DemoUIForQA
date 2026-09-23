# Template 04 — CISS CRM V4

Mở `index.html` trực tiếp bằng Chrome hoặc Edge. Giữ `index.html`, `rules.css` và `rules.js` cùng thư mục. Không cần cài thư viện hoặc máy chủ.

Nguồn tham khảo: https://cis.sedbergh.edu.vn/review/template-CRMdemo_V4.html (tải ngày 23/09/2026). Tên file nguồn là V4; tiêu đề bên trong là CRM OS V10 và mã nguồn chứa các bản mở rộng V11/V13. Template giữ dữ liệu mẫu, nội dung, bộ dịch Việt/Anh, bố cục và JavaScript nghiệp vụ của nguồn; các điều chỉnh quy tắc nằm trong hai file `rules.*`.

## Chức năng

13 màn hình: Tổng quan, Chiến dịch, Tuyển sinh (danh sách / Kanban / trùng lặp), Công việc, Hộp thư, Báo cáo, Vận hành, Tin nhắn đa kênh, Biểu mẫu đăng ký, Chăm sóc hàng loạt, Đội ngũ tuyển sinh, Phụ huynh giới thiệu và Chỉ tiêu tuyển sinh.

Hồ sơ chi tiết giữ ba lớp Gia đình → Học sinh → Cơ hội. Tạo hồ sơ, cập nhật giai đoạn, kiểm tra điều kiện bắt buộc, phân quyền tài chính, kiểm tra trùng, kéo thả Kanban, tạo công việc, chiến dịch, biểu đồ tương tác, xuất CSV và sao lưu/nhập JSON kế thừa từ nguồn.

Dữ liệu được lưu trong trình duyệt bằng khóa riêng `school_crm_template_04_v4`. Tải lại trang không xóa dữ liệu. Dữ liệu khác nhau giữa các trình duyệt; chuyển đường dẫn file có thể tạo vùng lưu riêng. Dùng xuất JSON để sao lưu.

Tin nhắn đa kênh, biểu mẫu và gửi hàng loạt là mô phỏng, chưa kết nối Facebook, Zalo, SMS, email hoặc hệ thống trường. Không nên dùng dữ liệu học sinh thật trong bản demo. Nút gọi điện/email có thể mở ứng dụng tương ứng của máy.

## Áp dụng các tài liệu Markdown

Đã đọc knowledge base, 14 component rule, README của thư mục component/template, báo cáo cải tiến UX và hướng dẫn luồng chat. Khi khác với hướng dẫn ba template cũ, giữ quy trình nghiệp vụ V4: ví dụ MQL cần Q1/Q2, nhập học cần xác nhận tài chính và lựa chọn Deposit/Full fee. Không thay bằng điều kiện chấm điểm của bản cũ.

| Tài liệu | Điều chỉnh / hành vi |
| --- | --- |
| Knowledge base | Mặc định tiếng Việt, chữ nội dung ít nhất 14px, ô nhập 16px, tìm kiếm rõ ràng, bố cục desktop/tablet/mobile, giữ nhật ký nghiệp vụ |
| 01 Button | Vùng bấm 44px, focus rõ, phân cấp nút chính/phụ, giải thích nút vô hiệu hóa |
| 02 Form | Form một cột, nhóm phụ huynh/học sinh/tuyển sinh, đánh dấu bắt buộc, lỗi ngay dưới ô nhập, kiểm tra điện thoại/email và cảnh báo chưa lưu |
| 03 Table | Header cố định, dòng xen kẽ, sắp xếp theo cột, thao tác mở hồ sơ bằng bàn phím; mobile dạng thẻ |
| 04 Modal | Nhãn dialog, giữ focus, trả focus khi đóng, Escape, cảnh báo bản nháp, ẩn hồ sơ phía sau khi mở form chuyển giai đoạn |
| 05 Navigation | Nhãn chữ ở menu desktop, aria-current, giữ điều hướng/thu gọn của nguồn; mobile năm mục và menu đầy đủ |
| 06 Search | Tìm không dấu trong hồ sơ và pipeline, debounce 300ms, xóa từ khóa, bộ lọc đơn vị/người phụ trách/hạn xử lý/nguồn/chiến dịch và số kết quả |
| 07 Toast | Vai trò status/alert, đóng thủ công, lỗi không tự ẩn, tạm dừng thời gian khi rê chuột; hoàn tác chuyển giai đoạn |
| 08 Pagination | 10/20/50 dòng, vị trí và tổng số, nút trước/sau vô hiệu tại biên |
| 09 Card | Tăng khoảng đệm/khoảng cách, hỗ trợ bàn phím cho thẻ cơ hội, giữ biểu đồ và số liệu từ nguồn |
| 10 Badge | Giữ ý nghĩa xanh/cam/đỏ/xám, chữ trạng thái kèm màu; đậm hơn các token màu chữ |
| 11 Tabs | role tablist/tab, aria-selected, mũi tên/Home/End; giữ breadcrumb và trạng thái tab nguồn |
| 12 Empty/loading | Hướng dẫn khi bảng không có kết quả; dữ liệu xử lý cục bộ tức thời, không thêm loading giả |
| 13 Date | Giữ ô lịch date/datetime-local của nguồn; trình duyệt quyết định cách hiển thị ngày trong ô |
| 14 Select | Giữ select gốc có bàn phím; danh sách dài hơn 10 mục có ô tìm lựa chọn |
| Báo cáo UX / hướng dẫn chat | Giữ tìm kiếm, kiểm tra trùng, liên kết gia đình/học sinh và stage gate tương ứng V4; không giả định luồng chat của ba template cũ giống V4 |

Hai phạm vi lọc được ghi rõ: bộ lọc chung lọc danh sách tuyển sinh và Kanban; bộ lọc báo cáo trong Tổng quan/Báo cáo điều khiển biểu đồ. Các mục của nguồn có tên tiếng Anh hoặc mã nghiệp vụ vẫn được giữ khi chưa có bản dịch tương ứng. Các ví dụ học phí, điểm danh, xóa học sinh, video hướng dẫn trong knowledge base không phải module của CRM nguồn. Kiểm tra độ tương phản đã cải thiện token màu; chưa có chứng nhận WCAG hay kiểm toán accessibility toàn diện.

## Sửa lỗi tích hợp của nguồn

Khối JavaScript chính của nguồn nằm trong closure, trong khi các khối mở rộng phía sau gọi trực tiếp hàm và trạng thái của nó. Bản mới đưa khối chính về phạm vi script chung để các chức năng chỉ tiêu, ngôn ngữ và báo cáo mở rộng truy cập được. Logo nhúng không hiển thị được đã thay bằng nhãn CIS, giữ nút về Tổng quan.

## Kiểm thử

Kiểm thử Chrome với dữ liệu mẫu trong phiên độc lập: tải trang; mở đủ 13 màn hình; phân trang; tìm kiếm không có kết quả; lọc CIS; chặn form thiếu dữ liệu; tạo phụ huynh/học sinh/cơ hội; chặn chuyển giai đoạn khi thiếu điều kiện; tải lại vẫn còn dữ liệu. Không ghi nhận lỗi JavaScript trong các bước này. Kiểm tra ảnh desktop 1440px và mobile 390px. Đây là kiểm thử các luồng chính, không phải xác nhận mọi nhánh của nguồn đều đã kiểm thử.
