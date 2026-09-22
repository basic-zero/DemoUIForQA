# Bộ quy tắc UI cho từng Component — CRM Trường học

> Thư mục này cụ thể hoá các nguyên tắc trong [`UI_UX_KNOWLEDGE_SCHOOL_CRM.md`](../UI_UX_KNOWLEDGE_SCHOOL_CRM.md) thành **rule chi tiết cho từng component UI**, để đội thiết kế (design) và đội lập trình (dev) có một bộ tiêu chuẩn chung khi xây dựng/ review giao diện.

Mỗi file component đều theo cùng 1 cấu trúc để dễ tra cứu:

1. Mục đích & khi nào dùng
2. Cấu trúc (Anatomy)
3. Các trạng thái (States)
4. Kích thước & khoảng cách (Sizing & Spacing)
5. Nội dung & ngôn ngữ (Microcopy)
6. Tương tác & phản hồi (Interaction & Feedback)
7. Accessibility
8. Áp dụng trong CRM trường học (ví dụ thực tế)
9. Checklist Do / Don't

## Danh sách component

| # | File | Component | Ưu tiên |
|---|---|---|---|
| 1 | [01-button.md](01-button.md) | Button (nút bấm) | 🔴 Cao |
| 2 | [02-form-input.md](02-form-input.md) | Form & Input field | 🔴 Cao |
| 3 | [03-data-table.md](03-data-table.md) | Data Table (bảng dữ liệu) | 🔴 Cao |
| 4 | [04-modal-dialog.md](04-modal-dialog.md) | Modal / Dialog / Confirmation | 🔴 Cao |
| 5 | [05-navigation-menu.md](05-navigation-menu.md) | Navigation / Sidebar / Menu | 🔴 Cao |
| 6 | [06-search-filter.md](06-search-filter.md) | Search bar & Filter | 🟠 Trung bình |
| 7 | [07-notification-toast.md](07-notification-toast.md) | Notification / Toast / Alert | 🟠 Trung bình |
| 8 | [08-pagination.md](08-pagination.md) | Pagination (phân trang) | 🟡 Thấp |
| 9 | [09-card.md](09-card.md) | Card | 🟡 Thấp |
| 10 | [10-badge-status-tag.md](10-badge-status-tag.md) | Badge / Status Tag | 🟠 Trung bình |
| 11 | [11-tabs-breadcrumb.md](11-tabs-breadcrumb.md) | Tabs & Breadcrumb | 🟡 Thấp |
| 12 | [12-empty-loading-state.md](12-empty-loading-state.md) | Empty state & Loading state | 🟠 Trung bình |
| 13 | [13-date-picker.md](13-date-picker.md) | Date Picker | 🟠 Trung bình |
| 14 | [14-dropdown-select.md](14-dropdown-select.md) | Dropdown / Select | 🟠 Trung bình |

## Cách dùng

- **Khi thiết kế màn hình mới**: mở file component tương ứng, đối chiếu checklist Do/Don't trước khi bàn giao.
- **Khi review UI**: dùng mục 9 (Checklist) của từng file làm tiêu chí chấp nhận (acceptance criteria).
- **Khi phát sinh component mới chưa có trong danh sách**: tạo file mới theo đúng template 9 mục ở trên, thêm vào bảng danh sách này.
