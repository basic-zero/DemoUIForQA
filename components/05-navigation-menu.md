# Navigation / Sidebar / Menu

## 1. Mục đích & khi nào dùng

Navigation là "bản đồ" giúp người dùng biết **đang ở đâu** và **có thể đi đâu**. Với người dùng không rành công nghệ, menu càng đơn giản, càng theo đúng cách họ nghĩ về công việc (theo nghiệp vụ, không theo cấu trúc kỹ thuật) thì càng dễ dùng.

## 2. Cấu trúc (Anatomy)

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Logo/Tên trường | ✅ | Góc trên trái, click về Dashboard |
| Menu chính (sidebar) | ✅ | Nhóm theo nghiệp vụ: Học sinh, Lớp học, Học phí, Báo cáo... |
| Icon + label cho mỗi mục | ✅ | Không dùng icon đơn độc |
| Mục đang active | ✅ | Highlight rõ ràng (nền màu, viền trái đậm) |
| User menu (góc phải) | ✅ | Tên người dùng, vai trò, nút đăng xuất |
| Breadcrumb | Tuỳ chọn | Xem [11-tabs-breadcrumb.md](11-tabs-breadcrumb.md) |

## 3. Nguyên tắc tổ chức Menu

- **Tối đa 7±2 mục menu cấp 1** — quá nhiều mục khiến người dùng "đóng băng" không biết chọn đâu.
- Đặt tên nhóm menu theo **ngôn ngữ nghiệp vụ** người dùng quen dùng hàng ngày, không theo tên bảng trong database:
  - ✅ "Học sinh", "Học phí", "Điểm danh"
  - ❌ "Student Management", "Fee Module", "Attendance Entity"
- Menu con (submenu) tối đa 2 cấp — sâu hơn 2 cấp khiến người dùng lạc lối.
- Mục dùng nhiều nhất (Dashboard, Học sinh, Điểm danh) đặt ở **đầu danh sách**, không xếp theo alphabet.
- Nhóm các chức năng quản trị/cấu hình hệ thống (ít dùng) xuống cuối hoặc tách riêng khỏi menu nghiệp vụ chính.

## 4. Kích thước & khoảng cách

- Chiều rộng sidebar: 220-280px (desktop), có thể thu gọn thành icon-only khi cần tiết kiệm không gian (nhưng luôn có tooltip label khi thu gọn).
- Chiều cao mỗi mục menu: tối thiểu 44px — đủ vùng bấm, đặc biệt quan trọng cho người dùng lớn tuổi.
- Khoảng cách giữa các nhóm menu: 16-24px để phân tách rõ các nhóm nghiệp vụ.

## 5. Trạng thái active/hover

- Mục đang active: nền màu chủ đạo nhạt + viền trái đậm màu + label đậm hơn — người dùng phải biết ngay "mình đang ở trang nào".
- Hover: đổi nền nhẹ, con trỏ pointer.
- Menu cha có submenu đang active: hiển thị mở sẵn submenu, không cần người dùng tự bấm mở lại mỗi lần load trang.

## 6. Điều hướng phụ trợ

- **Breadcrumb** cho các trang sâu (VD: Học sinh > Lớp 5A > Nguyễn Văn A) giúp người dùng biết đường quay lại.
- **Nút "Quay lại"** rõ ràng trên các trang chi tiết/form, không chỉ dựa vào nút back của trình duyệt.
- Trang 404/không có quyền truy cập: luôn có nút điều hướng về Dashboard, không để người dùng "mắc kẹt".

## 7. Responsive

- Desktop: sidebar cố định bên trái, luôn hiển thị.
- Tablet: sidebar có thể thu gọn (collapse) thành icon, mở rộng khi cần bằng nút toggle.
- Mobile (nếu hỗ trợ): chuyển thành menu dạng hamburger + drawer trượt từ trái, hoặc bottom navigation cho 4-5 mục quan trọng nhất.

## 8. Accessibility

- Dùng `<nav>` + danh sách `<ul><li>` đúng ngữ nghĩa HTML.
- Mục active đánh dấu `aria-current="page"`.
- Có thể điều hướng toàn bộ menu bằng bàn phím (Tab, Enter).
- Đảm bảo tương phản đủ rõ giữa mục active/inactive (không chỉ khác biệt bằng màu sắc nhạt).

## 9. Áp dụng trong CRM trường học

Gợi ý cấu trúc menu chính (theo vai trò):

| Vai trò | Menu chính gợi ý |
|---|---|
| Hiệu trưởng/Phó hiệu trưởng | Dashboard, Học sinh, Giáo viên, Lớp học, Báo cáo tổng hợp, Cài đặt |
| Giáo vụ | Dashboard, Học sinh, Lớp học, Điểm danh, Thời khoá biểu |
| Kế toán | Dashboard, Học phí, Thu chi, Báo cáo tài chính |
| Giáo viên | Lớp của tôi, Điểm danh, Điểm số |

> Lưu ý: mỗi vai trò chỉ nên thấy menu liên quan đến công việc của họ — **ẩn hẳn** (không chỉ disable) các mục không có quyền truy cập để tránh gây rối/nhầm lẫn.

## 10. Checklist Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Đặt tên menu theo ngôn ngữ nghiệp vụ | Dùng tên bảng/thuật ngữ kỹ thuật |
| Tối đa 7±2 mục cấp 1 | Nhồi 15-20 mục menu ngang hàng |
| Mục đang active highlight rõ ràng | Không có dấu hiệu cho biết đang ở trang nào |
| Ẩn menu không có quyền truy cập theo vai trò | Hiện tất cả menu rồi disable, gây rối mắt |
| Mục dùng nhiều nhất đặt đầu danh sách | Sắp xếp menu theo alphabet không theo tần suất dùng |
