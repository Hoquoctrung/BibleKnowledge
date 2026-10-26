# Bible Game — Weekly Workflow

## Mục tiêu

Duy trì trò chơi BibleKnowledge theo từng tuần, dựa trên nội dung Kinh Thánh mà người dùng gửi từ YouVersion (ảnh hoặc link).

## Quy trình bắt buộc mỗi tuần

### 1. Người dùng gửi nội dung tuần mới

Người dùng chỉ cần gửi ảnh chụp nội dung đọc Kinh Thánh của tuần đó hoặc link YouVersion.

Từ nội dung nhận được, xác định:
- Số tuần hiện tại (`WEEK XX`).
- Khoảng ngày đọc (`Day XX → XX`).
- Các phân đoạn Kinh Thánh của từng ngày.
- Tổng số câu hỏi của tuần (mặc định theo cấu trúc hiện tại là 15 câu).

Không tự suy đoán nội dung không có trong nguồn. Nếu ảnh/link chưa đủ thông tin để xác định chính xác, phải báo người dùng.

### 2. Tạo bộ câu hỏi

Tạo file dữ liệu cho tuần mới theo đúng cấu trúc các file `data/week-XX.js` hiện có.

Câu hỏi phải bám sát các phân đoạn Kinh Thánh của tuần, có:
- Nội dung câu hỏi rõ ràng.
- Các đáp án lựa chọn theo đúng cấu trúc project.
- Đáp án đúng chính xác.
- Câu tham chiếu Kinh Thánh.
- Giải thích ngắn gọn, dựa trên nội dung Kinh Thánh.

Sau khi tạo xong, phải tự kiểm tra lại từng câu, đặc biệt là đáp án đúng và reference.

### 3. Cập nhật đúng 3 file của project

Mỗi tuần **bắt buộc cập nhật đủ 3 file**:

1. `data/week-XX.js` — dữ liệu câu hỏi của tuần mới.
2. `data/weeks.js` — cập nhật danh sách tuần, trạng thái tuần hiện tại và tuần sắp mở.
3. `app/quiz/page.js` — chuyển quiz sang import và sử dụng `weekXX` mới.

Không được bỏ sót bất kỳ file nào trong 3 file trên.

### 4. Kiểm tra trước khi commit/push

Đây là bước bắt buộc:

- Người dùng phải được xem và kiểm tra bộ câu hỏi trước.
- Nếu người dùng yêu cầu sửa câu nào, sửa trước khi commit.
- Không được tự ý push lên `main` khi người dùng chưa xác nhận bộ câu hỏi đã OK.
- Sau khi cập nhật code, phải báo rõ các file đã thay đổi để người dùng kiểm tra.

### 5. Commit

Chỉ sau khi người dùng xác nhận nội dung đã OK mới thực hiện commit.

Commit nên có message rõ ràng, ví dụ:

`feat: switch quiz to week 10`

Nếu người dùng yêu cầu "làm tới bước commit" nhưng chưa cho phép push lên `main`, có thể tạo branch riêng và commit ở branch đó để người dùng kiểm tra.

### 6. Push / deploy

**Push lên `main` chỉ khi người dùng nói rõ đã OK và muốn push.**

Không tự động push chỉ vì đã tạo xong code hoặc commit.

## Quy tắc quan trọng

- Người dùng gửi ảnh → tự động bắt đầu quy trình tuần mới.
- Không cần người dùng nhắc lại cấu trúc project mỗi tuần.
- Luôn giữ nguyên cấu trúc code đang có, chỉ thay đổi phần cần thiết cho tuần mới.
- Không làm mất dữ liệu các tuần cũ.
- Trước khi commit phải cho người dùng cơ hội kiểm tra câu hỏi.
- Sau khi người dùng nói OK, mới commit; khi người dùng yêu cầu push, mới push lên `main`.

## Checklist nhanh

- [ ] Đọc đủ ảnh/link YouVersion.
- [ ] Xác định đúng `WEEK XX` và `Day XX → XX`.
- [ ] Tạo `data/week-XX.js`.
- [ ] Cập nhật `data/weeks.js`.
- [ ] Cập nhật `app/quiz/page.js`.
- [ ] Kiểm tra đáp án và reference từng câu.
- [ ] Cho người dùng kiểm tra.
- [ ] Chỉ commit sau khi người dùng xác nhận OK.
- [ ] Chỉ push `main` khi người dùng yêu cầu.
