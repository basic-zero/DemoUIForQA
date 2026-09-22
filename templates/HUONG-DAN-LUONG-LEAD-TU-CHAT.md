# Hướng dẫn thao tác: Nhận lead từ Chat → Phụ huynh/Học sinh → Pipeline có validate từng bước

Áp dụng cho cả 3 template (`01-chuyen-nghiep/index.html`, `02-than-thien/index.html`, `03-toi-gian/index.html`) — thao tác giống hệt nhau, chỉ khác giao diện màu sắc.

> Mở file `index.html` bằng trình duyệt. Dữ liệu là dữ liệu mẫu trong bộ nhớ trình duyệt — F5 sẽ reset về trạng thái ban đầu.

---

## Tổng quan luồng

```
Chat (tin nhắn mới, chưa có trong CRM)
   → Trích xuất thông tin tự động
   → Tạo lead (Household + Student + Opportunity)
   → Lead xuất hiện ở Phụ huynh & Học sinh
   → Đẩy qua pipeline: Leads → Qualified → Appointment → Visit → Consideration → New Enrollment
      (mỗi bước đều có điều kiện/checklist bắt buộc, không đủ điều kiện sẽ bị chặn)
```

---

## Bước 1 — Vào Chat và tìm hội thoại chưa gắn lead

1. Menu trái, chọn **"Tin nhắn mạng xã hội"**.
2. Trong danh sách hội thoại bên trái, tìm thẻ có nhãn **"Chưa gắn lead"** (tên hiển thị "Khách mới (chưa có trong CRM)"). Có 4 hội thoại mẫu ở các kênh Facebook / Zalo OA / Zalo cá nhân / Website.
3. Bấm vào thẻ đó để mở hội thoại.

## Bước 2 — Xem thông tin tự nhận diện

Ở cột phải ("CRM Link"), hệ thống tự động đọc nội dung tin nhắn và nhận diện 4 trường:

| Trường | Nguồn nhận diện |
|---|---|
| Tên phụ huynh | Sau chữ "tên" trong tin nhắn |
| SĐT | Chuỗi số điện thoại 10 chữ số bắt đầu bằng 0 |
| Lớp / độ tuổi | Sau chữ "lớp" trong tin nhắn |
| BU quan tâm | Mã đơn vị CIS/SSV/CVK/MLC xuất hiện trong tin nhắn |

Nếu không nhận diện được trường nào, hệ thống hiện "Chưa nhận diện được" — cần kiểm tra/điền tay ở bước sau.

## Bước 3 — Trích xuất & Tạo lead

1. Bấm nút **"Trích xuất & Tạo lead"**.
2. Modal "Tạo lead mới" mở ra, đã tự điền sẵn: Tên phụ huynh, SĐT, Age/Grade, BU quan tâm, Source = "Trích xuất từ chat - <kênh>", Admissions Need = nguyên văn tin nhắn.
3. **Kiểm tra lại toàn bộ trường** trước khi lưu (đây là bước bắt buộc về nghiệp vụ — dữ liệu tự nhận diện có thể sai).
4. Bấm **"Tạo lead mới"** để xác nhận.

Nếu thiếu Tên phụ huynh, SĐT hoặc Tên học sinh, hệ thống sẽ chặn và báo toast — không tạo lead.

## Bước 4 — Lead 360 tự mở

Sau khi tạo, modal **Lead 360** tự động mở đúng hồ sơ vừa tạo, ở stage **Leads**. Đây là nơi thao tác chuyển stage ở các bước sau.

## Bước 5 — Xác nhận lead đã có ở Phụ huynh & Học sinh

1. Đóng Lead 360, vào menu **"Phụ huynh / Gia đình"** → household vừa tạo đã được chọn sẵn, hiện đúng tên/SĐT và con trong thẻ "Children".
2. Vào menu **"Học sinh"** → học sinh vừa tạo cũng đã được chọn sẵn, hiện đúng Age/Grade lấy từ tin nhắn.

---

## Bước 6 trở đi — Đẩy qua pipeline (mỗi bước có validate)

Trong Lead 360, dùng nút **"Cập nhật status pipeline"**: chọn Stage đích ở ô "Stage" rồi bấm lại nút này để mở đúng form/checklist của stage đó.

| Chuyển sang | Điều kiện bắt buộc | Nếu thiếu |
|---|---|---|
| **Qualified** | Tick tối thiểu 2/6 tiêu chí chấm điểm | Bị chặn: "Chưa đủ điều kiện vào stage mới: cần 2, hiện có X" |
| **Appointment** | Đủ Appointment type, ngày, giờ, hình thức, địa điểm, người tham dự | Bị chặn: "Cần đủ ngày giờ, hình thức, địa điểm/link và người tham dự." |
| **Visit** | Đủ Visit type, outcome, next due, ghi chú ý định phụ huynh | Bị chặn: "Cần nhập Visit type, outcome, next due và note ý định phụ huynh." |
| **Consideration** | Tick tối thiểu 1/7 tín hiệu sau Visit | Bị chặn: "Chưa đủ điều kiện vào stage mới: cần 1, hiện có X" |
| **New Enrollment** | Đủ Sub-stage, Amount, Payment date, Receipt, Finance note | Bị chặn: "Cần đủ sub-stage, amount, payment date, receipt và Finance note." |

**Quy tắc chung khi bị chặn:** stage giữ nguyên như cũ, modal không đóng, dữ liệu đã nhập không mất — chỉ cần bổ sung phần còn thiếu rồi bấm xác nhận lại.

**Sub-stage tự động tính theo điểm:**

- Qualified: 2 = Cold Leads, 3–4 = Warm Leads, 5–6 = Hot Leads.
- Consideration: 1–2 = Low Potential, 3–4 = Medium Potential, 5–7 = High Potential.

---

## Các nhánh khác (không bắt buộc trong luồng chính)

Ngoài luồng "thắng" (Leads → ... → New Enrollment) ở trên, pipeline còn các stage khác cũng có checklist riêng, dùng khi cần:

- **Unqualified / No Sign-up / Withdraw**: cần chọn reason code + ghi chú lý do (dùng khi lead không đi tiếp).
- **Waiting**: cần Waiting Reason, Dependency Owner, Expected Update Date, Next Review Date (dùng khi lead đang chờ điều kiện bên ngoài).

---

## Ví dụ đã kiểm thử

Lead "Trần Văn Long" (tạo từ hội thoại Zalo OA) đã được đẩy thành công qua đủ 5 chặng: `Leads → Qualified :: Cold Leads → Appointment :: Consultation → Visit :: School Tour → Consideration :: Medium Potential → New Enrollment :: Deposit`, với các phép thử chặn (bỏ trống field bắt buộc / không tick đủ điều kiện) đều bị từ chối đúng như bảng trên.
