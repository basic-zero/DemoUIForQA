# 3 bộ Template UI mẫu — CRM Trường học

Thư mục này chứa **3 bộ giao diện demo hoàn chỉnh** (HTML/CSS/JS thuần, mở trực tiếp bằng trình duyệt, không cần server) cho cùng 1 sản phẩm — **CRM tuyển sinh trường học** — nhưng thể hiện bằng 3 phong cách thị giác khác nhau. Cả 3 đều tuân thủ đầy đủ nguyên tắc trong [`UI_UX_KNOWLEDGE_SCHOOL_CRM.md`](../UI_UX_KNOWLEDGE_SCHOOL_CRM.md) và các file rule trong [`components/`](../components/README.md) khi áp dụng được — khác nhau về **màu sắc, bo góc, khoảng cách, mật độ, giọng điệu chữ**, nhưng **dùng chung 100% một file logic JS** (cùng dữ liệu mẫu, cùng hành vi, cùng validation).

**Toàn bộ layout, menu, màn hình và hành vi** được dựng lại dựa trên tham khảo thực tế từ [CIS Admission CRM prototype](https://cis.sedbergh.edu.vn/review/template-CRMdemo.html) — một CRM tuyển sinh trường học đang vận hành — rồi áp 3 bộ token màu/bo góc/bóng đổ khác nhau lên cùng 1 phần khung HTML + JS. Đây là bản port đầy đủ (không chỉ 1 màn hình mẫu): **13 màn hình chuyển bằng menu trái** (single-page, không reload), toàn bộ modal, toàn bộ action đều hoạt động thật (không phải ảnh tĩnh).

| Màn hình (`data-view`) | Nội dung |
|---|---|
| **Việc hôm nay** (`#dashboard`) | Hero "Công việc hôm nay" + gợi ý AI, KPI vòng lặp tuyển sinh, danh sách "Cần chú ý", pipeline snapshot, task hôm nay |
| **Pipeline tuyển sinh** (`#pipeline`) | Kanban nhiều giai đoạn, kéo-thả thẻ giữa các cột, mỗi thẻ có badge SLA, % mức độ quan tâm, bước tiếp theo |
| **Phụ huynh / Gia đình** (`#parents`) | Record-list + hồ sơ phụ huynh, ma trận deal theo con/đơn vị |
| **Học sinh** (`#students`) | Record-list + hồ sơ học sinh (thông tin học vụ, liên hệ, danh sách opportunity liên quan) |
| **Cơ hội theo đơn vị** (`#deals`) | Danh sách opportunity nhóm theo BU/chương trình |
| **Công việc / SLA** (`#tasks`) | Danh sách task theo SLA (Overdue/Due Today/Safe) |
| **Tin nhắn mạng xã hội** (`#chat`) | Giao diện chat 3 cột: kênh, hội thoại, thông tin liên quan |
| **360 · Pipeline · Trùng lặp** (`#opsHub`) | Cụm màn hình riêng gồm 4 tab: (A) Chat Omnichannel Facebook/Zalo OA/Zalo cá nhân, (B) Profile 360 3 lớp Phụ huynh-Học sinh-Opportunity, (C1-C3) Pipeline chi tiết theo stage/sub-stage + stage gate + checklist Qualified (Hot/Warm/Cold)/In Consideration (Low/Medium/High), (C4) kiểm soát trùng số điện thoại/opportunity và xung đột CIS-SSV |
| **Nguồn & Chiến dịch** (`#sources`) | Bảng phân loại nguồn lead (taxonomy) |
| **Chiến dịch / Giới thiệu** (`#campaigns`) | Hiệu quả chiến dịch/giới thiệu theo thời gian |
| **Tuỳ chỉnh Dashboard** (`#dashboardBuilder`) | Kéo-thả widget báo cáo vào canvas 2 cột |
| **Báo cáo** (`#reports`) | KPI tổng + funnel theo BU, rủi ro SLA, doanh thu |
| **Quy tắc / Cài đặt** (`#rules`) | Danh sách rule vận hành bắt buộc (P0) của CRM |

Ngoài ra còn 2 modal dùng chung toàn hệ thống: **Tạo lead/opportunity mới** (3 lớp Phụ huynh → Học sinh → Opportunity) và **Chi tiết lead** (cập nhật stage có validation, checklist theo giai đoạn, lịch sử hoạt động).

## Danh sách 3 phong cách

| # | Thư mục | Phong cách | Phù hợp với | Đặc điểm thị giác |
|---|---|---|---|---|
| 1 | [`01-chuyen-nghiep/`](01-chuyen-nghiep/index.html) | **Chuyên nghiệp — Tin cậy** | Hiệu trưởng, Phó hiệu trưởng, Kế toán (người cần cảm giác trang trọng, số liệu chính xác) | Xanh dương đậm làm chủ đạo, bo góc nhỏ (10-14px), bóng đổ nhẹ, mật độ thông tin gọn |
| 2 | [`02-than-thien/`](02-than-thien/index.html) | **Thân thiện — Ấm áp** | Giáo viên, Giáo vụ, tư vấn viên tuyển sinh (thao tác nhiều hàng ngày, cần cảm giác dễ chịu) | Cam làm chủ đạo, bo góc lớn/pill (16-26px), nút bo tròn, khoảng cách rộng rãi, logo emoji |
| 3 | [`03-toi-gian/`](03-toi-gian/index.html) | **Tối giản — Hiện đại** | Người dùng quen công nghệ, màn hình cần hiển thị nhiều dữ liệu cùng lúc (báo cáo, pipeline) | Đen/trắng/xám làm chủ đạo, không bóng đổ, viền mảnh thay shadow, mật độ cao (font 13.5px) |

> Mở trực tiếp file `index.html` bằng trình duyệt (double-click hoặc kéo thả vào Chrome/Edge) — không cần server, không phụ thuộc thư viện ngoài. Toàn bộ dữ liệu là dữ liệu mẫu, sinh ra trong bộ nhớ trình duyệt (không lưu, F5 sẽ reset).

## Những gì giống nhau tuyệt đối giữa cả 3 bộ (không được phá vỡ khi tuỳ biến thêm)

Đây là các luật **bắt buộc toàn hệ thống** trong [Section 0 — Top Priority Keys](../UI_UX_KNOWLEDGE_SCHOOL_CRM.md) và các file component, được giữ nguyên xuyên suốt 3 phong cách:

1. **Chỉ 1 nút Primary/màn hình** — nút hành động chính (VD "Cập nhật status", "Mở Pipeline") là Primary; các nút còn lại là Secondary/Danger/Text/Icon. Xem [01-button.md](../components/01-button.md).
2. **Hệ màu trạng thái cố định**: Xanh lá = tích cực (Nhập học/Qualified), Vàng/Cam = cảnh báo (Due Today/Visit), Đỏ = tiêu cực (Overdue/Withdraw), Xám = trung lập (Leads mới). Đúng như [10-badge-status-tag.md](../components/10-badge-status-tag.md) — chỉ đổi sắc độ (tone) cho hợp phong cách, **không đổi ý nghĩa màu**.
3. **Form**: label luôn ở trên input, helper text hướng dẫn rõ, modal "Tạo lead" chia rõ 3 khối Phụ huynh/Học sinh/Opportunity. Xem [02-form-input.md](../components/02-form-input.md).
4. **Menu điều hướng dùng ngôn ngữ nghiệp vụ** ("Học sinh", "Pipeline tuyển sinh", "Công việc / SLA"...), không dùng thuật ngữ kỹ thuật thô. Xem [05-navigation-menu.md](../components/05-navigation-menu.md).
5. **Thanh tìm kiếm luôn hiển thị sẵn** trên topbar, bộ lọc 5 cấp (Đơn vị/Phụ trách/SLA/Nguồn/Chiến dịch) luôn hiển thị dưới topbar. Xem [06-search-filter.md](../components/06-search-filter.md).
6. **Modal chuyển giai đoạn (stage change)** luôn hiển thị trạng thái hiện tại, hướng dẫn tiếp theo, và validate trước khi cho lưu — tương đương vai trò "modal xác nhận" trong [04-modal-dialog.md](../components/04-modal-dialog.md), áp dụng cho luồng thay đổi trạng thái thay vì xoá dữ liệu (CRM này không xoá lead — lead "thua" sẽ chuyển stage No Sign-up/Withdraw kèm lý do).
7. **Toast thành công** không chặn thao tác, tự biến mất; nội dung nêu rõ hành động + kết quả. Xem [07-notification-toast.md](../components/07-notification-toast.md).
8. **Accessibility**: mọi nút icon đều có `aria-label`, input có `label for/id`, modal dùng `role="dialog"`/`aria-modal`, tương phản chữ/nền đạt chuẩn AA ở cả 3 phong cách.

> **Lưu ý:** bản port đầy đủ này theo đúng mô hình tương tác của CRM tham khảo — dùng **record-list + hồ sơ chi tiết** và **Kanban** thay vì `<table>`/phân trang, và không có luồng xoá cứng dữ liệu. Nếu cần minh hoạ riêng Data Table ([03-data-table.md](../components/03-data-table.md)), Pagination ([08-pagination.md](../components/08-pagination.md)) hoặc Modal xác nhận xoá ([04-modal-dialog.md](../components/04-modal-dialog.md)) — ví dụ cho màn hình Học phí/Điểm danh sau này — nên dựng thành màn hình riêng, copy đúng token màu/bo góc của phong cách đã chọn.

## Cách dùng

- **Chọn phong cách phù hợp đối tượng người dùng chính** của hệ thống trước khi bắt tay code thật (VD: trường ưu tiên tư vấn viên/giáo vụ thao tác nhiều → chọn phong cách Thân thiện).
- Dùng làm **tài liệu đối chiếu khi review UI** — nếu màn hình mới lệch khỏi các luật giống nhau ở mục trên, đó là lỗi cần sửa bất kể chọn phong cách nào.
- Có thể **trộn**: giữ layout/khoảng cách của 1 phong cách nhưng đổi bảng màu, miễn là không phá vỡ hệ màu trạng thái và các luật bắt buộc.
- Cả 3 file dùng chung cấu trúc `:root { --brand, --radius, --shadow, ... }` ở đầu `<style>` — đổi phong cách nhanh bằng cách chỉ sửa khối `:root` này, phần CSS/HTML/JS còn lại giữ nguyên.
- Xem [HUONG-DAN-LUONG-LEAD-TU-CHAT.md](HUONG-DAN-LUONG-LEAD-TU-CHAT.md) để thao tác thử luồng "nhận lead từ chat → Phụ huynh/Học sinh → pipeline có validate từng bước" (Leads → Qualified → Appointment → Visit → Consideration → New Enrollment).
