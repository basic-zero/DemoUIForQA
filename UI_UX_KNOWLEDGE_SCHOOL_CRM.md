# Knowledge Base: Thiết kế UI/UX cho CRM Trường học

> Tài liệu này tổng hợp các nguyên tắc, quy chuẩn (rules) và yếu tố cần thiết để thiết kế bộ UI cho web app CRM dành cho đơn vị trường học, với mục tiêu **dễ dùng - dễ hiểu** cho đối tượng người dùng chính là **cán bộ quản lý trường học** (hiệu trưởng, phó hiệu trưởng, giáo vụ, nhân viên tuyển sinh, kế toán học phí...) — nhóm người dùng thường **không rành công nghệ**, độ tuổi trải rộng, ưu tiên sự rõ ràng và an toàn thao tác hơn là tính năng nâng cao.

---

## 0. Top Priority Keys — Các yếu tố ưu tiên hàng đầu

Nếu nguồn lực/thời gian có hạn, đây là **8 key quan trọng nhất** quyết định độ thân thiện của giao diện, xếp theo mức độ ảnh hưởng thực tế đến nhóm người dùng quản lý trường học. Dùng danh sách này làm tiêu chí review nhanh khi làm việc với team thiết kế.

| # | Key | Vì sao quan trọng | Áp dụng ở đâu |
|---|---|---|---|
| 1 | **Ngôn ngữ nghiệp vụ, không thuật ngữ kỹ thuật** | Người dùng phải hiểu ngay không cần suy nghĩ. Ảnh hưởng đến *mọi* màn hình | Toàn hệ thống (menu, nút, thông báo, lỗi) |
| 2 | **Nhất quán tuyệt đối** (vị trí, màu sắc, cách gọi tên) | Học 1 lần dùng được mọi nơi, giảm gánh nặng ghi nhớ | Toàn hệ thống |
| 3 | **Xác nhận trước hành động nguy hiểm + có thể hoàn tác** | Giảm tâm lý "sợ sai" — rào cản lớn nhất của nhóm người dùng này | Xóa/sửa dữ liệu học sinh, học phí |
| 4 | **Form đơn giản, 1 cột, label rõ ràng** (không dùng placeholder làm label) | Nơi tương tác nhiều nhất và dễ gây lỗi/nản lòng nhất | Nhập hồ sơ, học phí, điểm danh |
| 5 | **Phản hồi tức thì sau mỗi thao tác** (toast/thông báo) | Người dùng cần biết ngay hệ thống đã ghi nhận thao tác | Sau mọi lưu/xóa/gửi |
| 6 | **Cỡ chữ đủ lớn (14-16px+) & tương phản cao** | Ảnh hưởng trực tiếp vì độ tuổi người dùng trải rộng | Toàn hệ thống |
| 7 | **Icon luôn đi kèm chữ** (không icon mồ côi) | Icon một mình rất dễ bị đoán sai | Menu, nút hành động, bảng dữ liệu |
| 8 | **Thanh tìm kiếm nhanh, dễ thấy** | Hành vi phổ biến nhất: tìm 1 học sinh/phụ huynh cụ thể, không phải duyệt menu | Header, cố định mọi màn hình |

**Nếu chỉ chọn 3 điều làm trước tiên**: ưu tiên theo thứ tự **(1) Ngôn ngữ dễ hiểu → (2) Nhất quán → (3) An toàn thao tác (confirm + undo)**. Ba key này ảnh hưởng đến *mọi* màn hình trong hệ thống, trong khi các key còn lại chỉ ảnh hưởng cục bộ từng loại màn hình.

---

## 1. Chân dung người dùng (User Persona) & Nguyên tắc nền tảng

### 1.1 Đặc điểm người dùng mục tiêu
- **Độ tuổi đa dạng**: từ giáo viên trẻ 25 tuổi đến ban giám hiệu 50-60 tuổi.
- **Trình độ công nghệ không đồng đều**: nhiều người quen thao tác trên Excel/giấy tờ hơn phần mềm quản lý.
- **Thời gian sử dụng ngắn, xen kẽ công việc khác**: cần vào nhanh - làm việc nhanh - ra khỏi hệ thống, không có thời gian "học" giao diện.
- **Tâm lý sợ sai**: lo lắng khi thao tác nhầm sẽ ảnh hưởng dữ liệu học sinh/phụ huynh/học phí.
- **Thiết bị đa dạng**: dùng cả desktop (phòng hành chính) lẫn tablet/điện thoại (di chuyển giữa các phòng ban, họp phụ huynh).

### 1.2 Nguyên tắc nền tảng (Design Principles)
1. **Rõ ràng hơn đẹp mắt** (Clarity over Cleverness) — không dùng thuật ngữ kỹ thuật, icon mơ hồ.
2. **Nhất quán tuyệt đối** — cùng một hành động phải luôn ở cùng vị trí, cùng màu sắc, cùng cách gọi tên xuyên suốt hệ thống.
3. **Không để người dùng đoán** — mọi trạng thái, mọi nút bấm phải tự giải thích được (self-explanatory).
4. **An toàn là ưu tiên số 1** — vì dữ liệu liên quan học sinh, phụ huynh, tài chính nên mọi thao tác xóa/sửa quan trọng đều phải có xác nhận và có thể hoàn tác.
5. **Thiết kế theo quy trình nghiệp vụ thật**, không theo cấu trúc database — menu và luồng thao tác phải theo cách người quản lý trường nghĩ (ví dụ: "Tuyển sinh → Nhập học → Xếp lớp"), không theo bảng dữ liệu kỹ thuật.

---

## 2. Kiến trúc thông tin & Điều hướng (Information Architecture)

### 2.1 Cấu trúc menu
- Menu chính tối đa **7±2 mục** (theo quy tắc Miller), nhóm theo nghiệp vụ:
  - Dashboard (Tổng quan)
  - Tuyển sinh / Hồ sơ học sinh
  - Lớp học / Giáo viên
  - Học phí / Tài chính
  - Thông báo / Liên lạc phụ huynh
  - Báo cáo / Thống kê
  - Cài đặt
- **Đặt tên menu bằng ngôn ngữ nghiệp vụ giáo dục**, tránh thuật ngữ IT: dùng "Học sinh" thay vì "Entity", "Hồ sơ" thay vì "Record".
- Sidebar cố định, có thể thu gọn (collapse) nhưng **luôn hiển thị icon + label** ở trạng thái mặc định — không ẩn label chỉ còn icon vì gây khó đoán với người lớn tuổi.
- Luôn có **breadcrumb** (VD: Trang chủ > Học sinh > Nguyễn Văn A > Học phí) để người dùng biết đang ở đâu và có thể quay lại nhanh.

### 2.2 Điều hướng
- Menu đang chọn phải có **trạng thái active rõ ràng** (đổi màu nền + đổi màu chữ, không chỉ đổi màu chữ).
- Có **thanh tìm kiếm toàn cục** (global search) ở vị trí cố định trên cùng, cho phép tìm nhanh theo tên học sinh/phụ huynh/mã lớp — vì đây là hành động phổ biến nhất của quản lý trường học.
- Tránh menu đa cấp quá 3 lớp (3-level deep) — người dùng dễ lạc.

---

## 3. Nguyên tắc thiết kế Dashboard (Trang tổng quan)

- Hiển thị **những con số quan trọng nhất trước tiên** theo thứ tự ưu tiên nghiệp vụ: Tổng số học sinh, Học sinh mới, Công nợ học phí, Thông báo cần xử lý.
- Dùng **card/widget** trực quan (số lớn + icon + nhãn ngắn), tránh bảng số liệu dày đặc ngay từ đầu.
- Mỗi widget nên có **link "Xem chi tiết"** dẫn thẳng tới màn hình liên quan.
- Cảnh báo/việc cần làm (to-do, học phí quá hạn, hồ sơ thiếu...) đặt ở vị trí **nổi bật, màu cảnh báo (vàng/đỏ)**, không lẫn với thông tin thông thường.
- Không nhồi nhét quá 6-8 widget trên 1 màn hình đầu tiên.

---

## 4. Quy tắc về Form nhập liệu (Forms)

Đây là khu vực quan trọng nhất vì quản lý trường học nhập liệu rất nhiều (hồ sơ học sinh, học phí, điểm danh...).

1. **Một cột, xếp dọc (single column layout)** cho form dài — nghiên cứu UX cho thấy form 1 cột giúp hoàn thành nhanh và ít lỗi hơn form nhiều cột.
2. **Nhóm trường theo logic nghiệp vụ** có tiêu đề nhóm rõ ràng: "Thông tin học sinh", "Thông tin phụ huynh", "Thông tin liên hệ khẩn cấp"...
3. **Label luôn nằm phía trên ô nhập** (không dùng placeholder thay label — placeholder sẽ biến mất khi gõ, gây mất ngữ cảnh, đặc biệt khó với người lớn tuổi).
4. **Đánh dấu rõ trường bắt buộc** bằng dấu `*` đỏ + ghi chú "Bắt buộc" nếu cần.
5. **Validate ngay tại chỗ (inline validation)**: báo lỗi ngay dưới ô nhập bằng câu chữ dễ hiểu, không dùng mã lỗi kỹ thuật.
   - Sai: "Error 422: Invalid format"
   - Đúng: "Số điện thoại phải có 10 chữ số. Vui lòng kiểm tra lại."
6. **Định dạng sẵn cho dữ liệu đặc thù**: ngày sinh dùng date picker (không bắt gõ tay), số điện thoại/CCCD có mask định dạng, dropdown cho danh sách cố định (khối lớp, giới tính, tỉnh/thành).
7. **Auto-save hoặc cảnh báo khi rời trang chưa lưu** — tránh mất dữ liệu đã nhập nếu người dùng vô tình bấm back.
8. **Nút hành động rõ ràng**: "Lưu" (primary, màu nổi bật) luôn bên trái hoặc phải nhất quán toàn hệ thống, "Hủy"/"Quay lại" (secondary, màu trung tính) đặt cạnh nhưng không gây nhầm lẫn để tránh bấm nhầm.
9. Với form dài (hồ sơ nhập học), nên chia thành **các bước (wizard/stepper)** có thanh tiến trình (VD: Bước 1/4: Thông tin cơ bản) thay vì 1 form khổng lồ.

---

## 5. Bảng dữ liệu (Data Tables) — danh sách học sinh, lớp, học phí...

- **Ẩn bớt cột không thiết yếu** theo mặc định, cho phép người dùng tùy chỉnh cột hiển thị (tùy chọn, không bắt buộc).
- Luôn có **tìm kiếm + bộ lọc (filter) đơn giản** phía trên bảng: theo khối lớp, theo trạng thái, theo năm học.
- **Phân trang rõ ràng**, hoặc cuộn vô hạn có chỉ báo đang tải — tránh load hàng nghìn dòng cùng lúc gây chậm.
- Hàng có thể **click để xem chi tiết**, có nút hành động nhanh (xem/sửa/xóa) hiển thị icon + tooltip chữ khi hover.
- **Sắp xếp được theo cột** (click vào tiêu đề cột), có chỉ báo mũi tên tăng/giảm.
- Dùng **màu sắc trạng thái (status badge/tag)** nhất quán: xanh lá = đã hoàn thành/đã đóng học phí, vàng = đang chờ, đỏ = quá hạn/thiếu — kèm cả text, không chỉ dùng màu (đảm bảo accessibility cho người mù màu).
- Cho phép **xuất Excel/PDF** vì trường học vẫn quen làm báo cáo giấy/Excel để họp, nộp cấp trên.

---

## 6. Hành động nguy hiểm & Xác nhận (Confirmation & Safety)

Vì CRM trường học chứa dữ liệu nhạy cảm (học sinh, tài chính), cần rule chặt chẽ:

1. **Mọi hành động xóa** phải có hộp thoại xác nhận, nêu rõ hậu quả bằng ngôn ngữ đơn giản: "Bạn có chắc muốn xóa hồ sơ học sinh **Nguyễn Văn A**? Hành động này không thể hoàn tác."
2. Với dữ liệu quan trọng (học sinh, học phí), ưu tiên **xóa mềm (soft delete/lưu trữ - archive)** thay vì xóa vĩnh viễn, và có màn hình "Thùng rác" để khôi phục.
3. Nút xóa dùng **màu đỏ**, tách biệt vị trí với các nút thao tác thường để tránh bấm nhầm (không đặt cạnh nút "Lưu").
4. Sau mỗi hành động quan trọng (lưu, xóa, gửi thông báo), hiển thị **thông báo phản hồi tức thì (toast/snackbar)**: "Đã lưu thành công", "Đã gửi thông báo tới 32 phụ huynh".
5. Với thao tác hàng loạt (bulk action) như xóa nhiều học sinh, gửi thông báo hàng loạt — luôn hiển thị **số lượng đối tượng bị ảnh hưởng** trước khi xác nhận.

---

## 7. Ngôn ngữ & Nội dung hiển thị (Content & Microcopy)

- Dùng **tiếng Việt thuần, gần gũi nghiệp vụ giáo dục**, tránh Anh hóa không cần thiết (hạn chế "Dashboard", ưu tiên "Trang tổng quan"; có thể giữ song song nếu người dùng đã quen).
- Câu lệnh nút bấm dùng **động từ hành động cụ thể**: "Thêm học sinh mới" thay vì "Thêm mới" chung chung, "Gửi thông báo cho phụ huynh" thay vì "Gửi".
- Tránh viết tắt gây khó hiểu (HS, PH, GVCN...) trừ khi đã chú thích rõ lần đầu hoặc có tooltip giải thích.
- Trạng thái rỗng (empty state) phải có hướng dẫn hành động tiếp theo: "Chưa có học sinh nào trong lớp này. [+ Thêm học sinh]" thay vì màn hình trắng.
- Thông báo lỗi hệ thống phải **thân thiện, không đổ lỗi người dùng, có hướng khắc phục**: "Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại, hoặc liên hệ IT nhà trường."

---

## 8. Thị giác (Visual Design)

### 8.1 Màu sắc
- Bảng màu tối giản: **1 màu chủ đạo (primary)**, 1-2 màu phụ, các màu trạng thái chuẩn (xanh lá = thành công, vàng = cảnh báo, đỏ = lỗi/nguy hiểm, xanh dương = thông tin).
- Đảm bảo **độ tương phản đạt chuẩn WCAG AA** (tối thiểu 4.5:1 cho chữ thường) vì nhiều người dùng lớn tuổi.
- Không dùng quá 3-4 màu chính trong 1 màn hình để tránh rối mắt.

### 8.2 Typography
- Cỡ chữ tối thiểu **14-16px** cho nội dung chính (lớn hơn mức thông thường của app tiêu chuẩn, do đối tượng người dùng lớn tuổi).
- Tối đa 2 font chữ trong toàn hệ thống (1 cho heading, 1 cho nội dung), ưu tiên font hỗ trợ tiếng Việt đầy đủ dấu, dễ đọc (VD: Inter, Roboto, Be Vietnam Pro).
- Độ cao dòng (line-height) tối thiểu 1.5 lần cỡ chữ để dễ đọc đoạn văn dài.

### 8.3 Icon & Hình ảnh
- Icon phải **đi kèm label chữ** ở các chức năng quan trọng, không dùng icon đơn độc (trừ các icon cực kỳ phổ biến như kính lúp tìm kiếm, chuông thông báo).
- Dùng bộ icon nhất quán 1 style (outline hoặc filled, không trộn lẫn).
- Ảnh đại diện học sinh/giáo viên dùng placeholder mặc định thân thiện (avatar chữ cái đầu tên) khi chưa có ảnh thật.

### 8.4 Khoảng trắng & Bố cục
- Ưu tiên **whitespace rộng rãi**, tránh nhồi nhét nội dung — giao diện "thở" giúp giảm cảm giác choáng ngợp với người không rành công nghệ.
- Bố cục lưới nhất quán (grid 12 cột hoặc tương đương), căn chỉnh đồng bộ giữa các màn hình.

---

## 9. Responsive & Đa thiết bị

- **Ưu tiên desktop-first** cho các tác vụ nhập liệu phức tạp (hồ sơ, học phí) vì quản lý trường thường dùng máy tính bàn/laptop tại văn phòng.
- Nhưng vẫn phải **responsive tốt trên tablet** cho các tác vụ tra cứu nhanh, điểm danh, xem thông báo khi di chuyển.
- Trên màn hình nhỏ: menu chuyển thành hamburger menu, bảng dữ liệu chuyển thành dạng **card list** thay vì bảng ngang khó cuộn.
- Nút bấm/vùng chạm tối thiểu **44x44px** để dễ thao tác trên cảm ứng.

---

## 10. Khả năng tiếp cận & Bao hàm (Accessibility)

- Hỗ trợ **zoom trình duyệt tới 200%** không vỡ giao diện.
- Mọi hình ảnh có `alt text`, mọi form field có `label` gắn đúng (hỗ trợ screen reader).
- Có thể điều hướng bằng **bàn phím** (Tab, Enter) cho các thao tác quan trọng.
- Không dùng màu sắc là phương tiện truyền tải thông tin duy nhất (luôn kèm icon/text).

---

## 11. Onboarding & Hỗ trợ người dùng

- Có **hướng dẫn nhanh (tooltip/tour)** khi người dùng lần đầu vào 1 màn hình mới, có thể tắt/bỏ qua.
- Nút **"Trợ giúp" (?)** luôn hiện diện, dẫn tới tài liệu hướng dẫn hoặc liên hệ hỗ trợ (hotline/Zalo/email) — đối tượng người dùng lớn tuổi thường cần hỗ trợ trực tiếp hơn là tự đọc doc.
- Cung cấp **video hướng dẫn ngắn (1-2 phút)** cho các nghiệp vụ chính: thêm học sinh, thu học phí, gửi thông báo.
- Thông báo **lịch sử thao tác gần đây** (activity log) để người dùng yên tâm kiểm tra lại việc mình vừa làm.

---

## 12. Checklist nhanh khi thiết kế màn hình mới

Trước khi hoàn thiện bất kỳ màn hình nào trong hệ thống, kiểm tra qua checklist sau:

- [ ] Người dùng biết mình đang ở đâu (breadcrumb/tiêu đề rõ ràng)?
- [ ] Hành động chính (primary action) có nổi bật, dễ tìm không?
- [ ] Ngôn ngữ sử dụng có phải tiếng Việt nghiệp vụ giáo dục, không thuật ngữ kỹ thuật?
- [ ] Các trường bắt buộc có được đánh dấu rõ?
- [ ] Có xác nhận trước hành động xóa/thay đổi quan trọng?
- [ ] Có phản hồi tức thì sau khi submit (thành công/lỗi)?
- [ ] Màn hình có hoạt động tốt trên tablet không?
- [ ] Độ tương phản màu & cỡ chữ có phù hợp người dùng lớn tuổi?
- [ ] Trạng thái rỗng (chưa có dữ liệu) có hướng dẫn hành động tiếp theo?
- [ ] Có nhất quán về vị trí nút, màu sắc, icon so với các màn hình khác trong hệ thống?

---

## 13. Các lỗi thường gặp cần tránh (Anti-patterns)

| Lỗi thường gặp | Vì sao có hại | Nên làm gì |
|---|---|---|
| Dùng thuật ngữ kỹ thuật ("Entity", "Record", "Payload") | Người quản lý trường không hiểu | Dùng ngôn ngữ nghiệp vụ: "Học sinh", "Hồ sơ" |
| Form nhiều cột, nhiều trường trên 1 màn hình | Gây rối, dễ bỏ sót/nhập nhầm | Chia nhỏ theo bước, xếp 1 cột |
| Xóa dữ liệu không xác nhận | Rủi ro mất dữ liệu quan trọng vĩnh viễn | Luôn confirm + soft delete |
| Icon không có label | Người dùng không đoán được chức năng | Icon + text hoặc tooltip |
| Thông báo lỗi bằng mã lỗi kỹ thuật | Gây hoang mang, không biết xử lý | Câu chữ rõ ràng, có hướng khắc phục |
| Đổi vị trí menu/nút giữa các phiên bản | Người dùng phải học lại | Giữ nhất quán layout lâu dài |
| Bảng dữ liệu quá nhiều cột mặc định | Rối mắt, khó đọc trên màn hình nhỏ | Ẩn cột phụ, cho tùy chỉnh |
| Chữ quá nhỏ, tương phản thấp | Khó đọc với người lớn tuổi | Tối thiểu 14-16px, tương phản đạt AA |

---

## 14. Tài liệu tham khảo & mở rộng (gợi ý bổ sung sau)

Các phần có thể bổ sung thêm khi dự án phát triển:
- Design system chi tiết (component library: button, input, modal, table...) với thông số cụ thể (spacing, radius, shadow).
- Quy tắc phân quyền UI theo vai trò (Hiệu trưởng / Giáo vụ / Kế toán / Giáo viên) — mỗi vai trò thấy menu và hành động khác nhau.
- Quy tắc thiết kế màn hình báo cáo/thống kê (biểu đồ, xuất báo cáo cho cấp trên/Sở Giáo dục).
- Quy tắc thông báo đa kênh (in-app, SMS, Zalo, Email) gửi phụ huynh.

---

*Tài liệu này là knowledge base nền tảng, nên được cập nhật liên tục khi có phản hồi thực tế từ người dùng thử nghiệm (usability testing) với chính đối tượng quản lý trường học.*
