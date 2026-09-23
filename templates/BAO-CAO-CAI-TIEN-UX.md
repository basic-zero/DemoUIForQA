# Báo cáo cải tiến UX — 3 Template CRM Tuyển sinh

2026-09-23 · Thực hiện trong phiên làm việc với Claude Code

## Bối cảnh & mục tiêu

Yêu cầu: cải tiến giao diện 3 template CRM tuyển sinh (`01-chuyen-nghiep`, `02-than-thien`, `03-toi-gian`) để **dễ dùng hơn** mà **không mất dữ liệu**. Cả 3 file dùng chung 100% logic JS, chỉ khác token CSS (màu, bo góc, khoảng cách) — nên mọi thay đổi hành vi phải áp dụng đồng nhất cả 3 nơi bằng cùng một đoạn code.

Cách tiếp cận: thay vì thiết kế lại, rà soát UI thực tế qua trình duyệt để tìm đúng những chỗ đang gây khó thao tác — ưu tiên sửa những gì **đã có sẵn cơ chế nhưng chưa lộ ra đúng chỗ**, giữ nguyên toàn bộ nguyên tắc bắt buộc trong `templates/README.md` (1 nút Primary/màn hình, hệ màu trạng thái cố định, filter luôn hiển thị, modal chuyển stage có validation, toast, accessibility).

## Cải tiến 1 — Ô tìm kiếm chung lọc luôn danh sách Phụ huynh / Học sinh

**Vấn đề:** ô tìm kiếm trên topbar có placeholder "Tìm phụ huynh, học sinh, deal, số điện thoại..." nhưng trước đây chỉ lọc các màn dựa trên opportunity (Dashboard, Pipeline, Deals, Tasks, Chat, Reports, OpsHub). Danh sách bên trái của màn **Phụ huynh** (75 hồ sơ) và **Học sinh** (75 hồ sơ) vẫn hiển thị đủ tất cả, không hề bị lọc — người dùng phải tự cuộn tay qua toàn bộ danh sách để tìm một hồ sơ.

**Giải pháp:** tái dùng hàm `buildSearchContext()` đã có sẵn (vốn đã tính sẵn tập `householdIds`/`studentIds` khớp với từ khóa) để lọc danh sách bên trái của `renderParents`/`renderStudents` khi ô tìm kiếm có nội dung; hiển đủ như cũ khi ô trống — không mất dữ liệu nào. Thêm dòng trạng thái "Tìm kiếm: X/75 phù hợp" và thông báo rỗng khi không khớp.

**Kết quả test trên trình duyệt:**

| Từ khóa | Template | Kết quả |
| --- | --- | --- |
| "Minh Anh" | 01-chuyen-nghiep | 5/75 phụ huynh |
| "Nam" | 02-than-thien | 68/75 học sinh |
| "Khang" | 03-toi-gian | 11/75 phụ huynh |

## Cải tiến 2 — Bỏ giới hạn 14 hồ sơ ở Profile 360 picker

**Vấn đề:** trong màn "360 · Pipeline · Trùng lặp" (opsHub), tab **B. Profile 360** có một picker để chọn hồ sơ xem theo 3 lớp Phụ huynh/Học sinh/Opportunity. Picker này trước đây giới hạn cứng `rows.slice(0,14)` — chỉ hiện 14 opportunity đầu tiên theo bộ lọc. Với bộ lọc mặc định ("Lead của tôi"), số kết quả thực tế là 15–17+ — nghĩa là một vài hồ sơ không thể chọn được dù vẫn nằm trong bộ lọc.

**Giải pháp:** bỏ giới hạn, hiển thị toàn bộ danh sách theo bộ lọc hiện tại — đúng cách mà màn Phụ huynh/Học sinh đã làm với 75 hồ sơ (trang tự cuộn, không giới hạn số lượng) — giữ nhất quán giữa các màn. Thêm trạng thái rỗng khi không có opportunity nào khớp bộ lọc.

**Kết quả test:** picker hiển đủ **17/17** hồ sơ (trước đây dừng ở 14) đã xác nhận trên cả 3 style.

## Cải tiến 3 — Nút "Xóa lọc" và chỉ báo số bộ lọc đang bật

**Vấn đề:** thanh filter có 5 ô chọn (Đơn vị/Phụ trách/SLA/Nguồn/Chiến dịch) cộng ô tìm kiếm, nhưng không có cách nào để biết đang bật bao nhiêu bộ lọc cùng lúc, và không có nút xoá nhanh — muốn về mặc định phải tự đặt lại từng ô một.

**Giải pháp:**

- Thêm nút **"Xóa lọc"** ở cuối thanh filter, tự khoá/mờ khi không có bộ lọc nào khác mặc định.
- Thêm **số đếm (badge)** cạnh nút, hiển thị số lượng bộ lọc đang bật (tính cả ô tìm kiếm).
- Ô chọn nào khác giá trị mặc định sẽ có **viền + nền màu thương hiệu** để dễ nhận biết bằng mắt thường đang lọc theo tiêu chí nào.

**Kết quả test:** chọn Đơn vị = CIS → đếm hiển "1", ô viền xanh; bấm Xóa lọc → về lại "Tất cả đơn vị" / "Lead của tôi", đếm biến mất, nút tự khoá lại — xác nhận trên cả 3 style.

## Cải tiến 4 — Header bảng dính (sticky) khi cuộn

**Vấn đề:** các bảng dữ liệu dài (Tasks/SLA Queue 14+ dòng, Deals 78 dòng, lịch sử opportunity của học sinh...) khi cuộn xuống sẽ mất tiêu đề cột, khó đối chiếu số liệu ở các dòng xa phía dưới.

**Giải pháp:** thêm `position: sticky; top: 0` cho `<th>` trong mọi bảng (`table-wrap thead th`) — tiêu đề cột dính lại đầu khu vực nội dung chính khi cuộn. Hoàn toàn là thay đổi CSS, không đổi dữ liệu hay hành vi nào khác, áp dụng chung cho mọi bảng ở cả 3 style.

## Cải tiến 5 — aria-label / title cho menu sidebar khi thu gọn

**Vấn đề:** ở màn hình ≤ 1280px, sidebar tự thu gọn chỉ còn icon (nhãn chữ bị `display:none`), nhưng cả 13 nút menu không hề có `aria-label`/`title` — vi phạm chính nguyên tắc accessibility mà `templates/README.md` đặt ra ("mọi nút icon đều có aria-label"), và khiến người dùng màn hẹp không đoán được icon nào là mục nào.

**Giải pháp:** thêm `aria-label` và `title` (tooltip khi hover) khớp đúng nhãn hiển thị cho cả 13 nút nav, ở cả 3 file — vừa sửa lỗi accessibility, vừa giúp người dùng sight thu gọn vẫn nhận ra từng mục qua tooltip.

## Phạm vi kiểm thử & những gì không đổi

Đã test trực tiếp qua trình duyệt trên cả 3 style (Chuyên nghiệp / Thân thiện / Tối giản): tải trang, đổi bộ lọc, gõ tìm kiếm, chuyển tab, bấm Xóa lọc, mở Profile 360 picker — **console 0 lỗi** ở mọi bước.

Không thay đổi:

- Dữ liệu mẫu (không thêm/bớt hồ sơ nào).
- Các nguyên tắc bắt buộc trong README: 1 nút Primary/màn hình, hệ màu trạng thái, form 3 khối, filter luôn hiển thị, modal chuyển stage có validation, toast, accessibility.

Áp dụng đồng nhất **8 điểm sửa** cho cả 3 file (`01-chuyen-nghiep`, `02-than-thien`, `03-toi-gian`) — cùng nội dung JS/HTML, chỉ khác token CSS theo từng phong cách.

## Cải tiến 6 — Trích xuất lead từ chat (Chat Omnichannel)

**Vấn đề:** màn "Tin nhắn mạng xã hội" (`#chat`) trước đây mọi hội thoại đều đã gắn sẵn 1 opportunity có thật trong CRM — không có kịch bản "tin nhắn mới, chưa có trong hệ thống", nên không có chỗ nào thực sự cần "trích xuất lead" (dữ liệu đã có sẵn).

**Giải pháp:**

- Thêm 4 hội thoại mẫu "chưa gắn lead" (Facebook, Zalo OA, Zalo cá nhân, Website), đánh dấu badge "Chưa gắn lead" trong danh sách thread.
- Hàm `extractLeadFromText()` tự nhận diện Tên phụ huynh, SĐT, Lớp/độ tuổi, BU quan tâm (CIS/SSV/CVK/MLC) từ nội dung tin nhắn bằng regex.
- Cột "CRM Link" bên phải hiển thị các trường nhận diện được (kèm ghi chú "kiểm tra lại trước khi tạo lead") + nút "Trích xuất & Tạo lead" mở đúng modal "Tạo lead mới" sẵn có, tự điền theo dữ liệu nhận diện — tái dùng nguyên luồng validate/tạo lead thật, không tạo cơ chế song song.
- Thread đã có opportunity giữ nguyên hành vi cũ (Mở Lead 360 / Cập nhật stage).

**Kết quả test:** trên cả 3 style — mở thread "chưa gắn lead" đúng hiện 4 trường nhận diện chính xác (VD "Bùi Thị Hạnh" / "0938222456" / "Lớp 3" / "SSV"); bấm Trích xuất & Tạo lead → modal điền đúng toàn bộ trường; tạo lead thành công và mở đúng trong Lead 360.

## Cải tiến 7 — Parent Profile: danh sách con & chi tiết học sinh inline

**Vấn đề:** thẻ "Children" trong Parent Profile chỉ liệt kê tên con, bấm vào sẽ **rời khỏi màn Phụ huynh** để nhảy sang màn Học sinh — mất ngữ cảnh đang xem, và không thể xem nhanh chi tiết một người con ngay trong hồ sơ phụ huynh.

**Giải pháp:**

- Thẻ Children giờ hiển thị đủ số con (`Children (N)`), bấm chọn **không rời màn hình**.
- Thêm thẻ mới "Chi tiết học sinh" ngay trong Parent Profile: DOB, Age/Grade, trường, curriculum, quốc tịch, anh/chị em, nhu cầu tuyển sinh + danh sách opportunity của con đó (có trạng thái rỗng "Chưa có opportunity" khi con chưa có deal nào).
- Giữ nút phụ "Xem trong Học sinh" để nhảy sang màn Học sinh đầy đủ khi cần xem lịch sử/tương tác nhiều hơn.
- Bổ sung 1 người con thứ hai cho 2 household mẫu (HH-001, HH-002) vì toàn bộ 75 household gốc vốn chỉ có đúng 1 con/hộ — cần dữ liệu thật để kiểm chứng việc chuyển đổi giữa nhiều con.

**Kết quả test:** household có 2 con hiển thị đúng cả 2 trong danh sách; bấm chọn con thứ 2 → thẻ chi tiết cập nhật đúng tên/thông tin, class `active` chuyển đúng, vẫn ở màn Phụ huynh; nút "Xem trong Học sinh" vẫn điều hướng đúng sang màn Học sinh khi cần.

## Kiểm chứng: luồng đầy đủ từ chat đến New Enrollment

Yêu cầu: kiểm tra có đúng một luồng đầy đủ "nhận lead từ chat → chuyển thành Phụ huynh/Học sinh → validate từng bước" hay chưa. Đã test bằng thao tác thật trên trình duyệt (không chỉ đọc code) với 1 lead tạo từ chat ("Trần Văn Long", D-9079). **Kết luận: luồng này đã đầy đủ và hoạt động đúng**, vì tính năng trích xuất tái dùng nguyên hàm `createOpportunityFromForm()` và hệ thống stage-gate đã có sẵn từ bản port gốc, không phải xây mới.

| Bước | Thao tác | Kết quả |
| --- | --- | --- |
| 1. Chat → tạo lead | Chọn thread "Chưa gắn lead" (Zalo OA) → Trích xuất & Tạo lead → Tạo lead mới | Lead 360 tự mở đúng hồ sơ vừa tạo, stage `Leads` |
| 2. Xuất hiện ở Phụ huynh/Học sinh | Mở `#parents` và `#students` | Household và Student mới hiển đúng tên/SĐT/lớp, được chọn sẵn |
| 3. Leads → Qualified | Bấm xác nhận khi chưa tick check nào | Bị chặn: toast "Chưa đủ điều kiện...: cần 2, hiện có 0" |
| 3b. Leads → Qualified | Tick đủ 2/6 tiêu chí rồi xác nhận | Chuyển thành công: `Qualified :: Cold Leads` (tự tính theo điểm) |
| 4. Qualified → Appointment | Điền form lịch hẹn (type/ngày/giờ/địa điểm/người tham dự) | Chuyển thành công: `Appointment :: Consultation` |
| 5. Appointment → Visit | Xoá trống field "ý định phụ huynh" rồi lưu | Bị chặn: toast "Cần nhập Visit type, outcome, next due và note ý định phụ huynh" |
| 5b. Appointment → Visit | Điền lại đủ field rồi lưu | Chuyển thành công: `Visit :: School Tour` |
| 6. Visit → Consideration | Xác nhận khi 0/1 tiêu chí | Bị chặn: toast "cần 1, hiện có 0" |
| 6b. Visit → Consideration | Tick 4 tiêu chí rồi xác nhận | Chuyển thành công: `Consideration :: Medium Potential` |
| 7. Consideration → New Enrollment | Xoá trống field Receipt rồi lưu | Bị chặn: toast "Cần đủ sub-stage, amount, payment date, receipt và Finance note" |
| 7b. Consideration → New Enrollment | Điền lại Receipt rồi lưu | Chuyển thành công: `NewEnrollment :: Deposit` |

Mỗi bước chặn đều giữ nguyên stage cũ và giữ modal mở (không mất dữ liệu đã nhập), mỗi bước qua đều tự tính đúng sub-stage theo công thức điểm/điều kiện có sẵn. Console 0 lỗi trong suốt bài test 7 bước trên.
