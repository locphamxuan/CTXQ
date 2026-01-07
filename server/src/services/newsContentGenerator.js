// Service to generate detailed content for news articles

const detailedContentTemplates = {
  'sam-han-quoc': {
    'bí quyết chọn mua': `Nhân sâm Hàn Quốc 6 năm tuổi là một trong những sản phẩm quý giá nhất trong y học cổ truyền Hàn Quốc. Để chọn mua được sản phẩm chất lượng, bạn cần lưu ý những điểm sau:

## 1. Phân biệt nhân sâm thật và giả

Nhân sâm thật có những đặc điểm đặc trưng:
- **Mùi vị**: Nhân sâm thật có mùi thơm đặc trưng, vị đắng nhẹ, sau đó có vị ngọt thanh
- **Hình dáng**: Rễ sâm có nhiều vân ngang rõ ràng, màu vàng nhạt đến vàng nâu
- **Thịt sâm**: Khi cắt ngang, thịt sâm có màu trắng ngà, không bị đen hoặc nâu sẫm
- **Tem chống giả**: Sản phẩm chính hãng luôn có tem chống giả và mã QR để kiểm tra

## 2. Cách bảo quản nhân sâm

Bảo quản đúng cách giúp giữ được dưỡng chất:
- **Nơi khô ráo**: Bảo quản nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp
- **Bọc kín**: Có thể bọc trong giấy báo hoặc để trong hộp kín
- **Tránh tủ lạnh**: Không nên để trong tủ lạnh vì độ ẩm cao có thể làm sâm bị mốc
- **Nhiệt độ**: Nhiệt độ lý tưởng là 15-20 độ C

## 3. Cách sử dụng nhân sâm hiệu quả

Có nhiều cách sử dụng nhân sâm để đạt hiệu quả tốt nhất:

### Ngâm với mật ong
- Cắt lát mỏng nhân sâm
- Ngâm với mật ong nguyên chất trong 2-3 tuần
- Uống 1-2 thìa mỗi ngày vào buổi sáng

### Hầm với gà
- Dùng 1-2 củ sâm hầm với gà ác
- Ăn 2-3 lần/tuần để bồi bổ sức khỏe
- Thích hợp cho người mới ốm dậy, người cao tuổi

### Pha trà
- Thái lát mỏng nhân sâm
- Hãm với nước sôi 80-90 độ C
- Uống vào buổi sáng, trước bữa ăn

## 4. Lưu ý khi sử dụng

- **Liều lượng**: Không dùng quá 3-5g/ngày
- **Thời điểm**: Tránh dùng khi bị sốt, cảm cúm
- **Đối tượng đặc biệt**: Phụ nữ mang thai và trẻ em dưới 12 tuổi nên tham khảo ý kiến bác sĩ
- **Tương tác thuốc**: Nếu đang dùng thuốc, nên hỏi ý kiến bác sĩ trước khi sử dụng

Nhân sâm Hàn Quốc chính hãng từ Công ty Xuân Quỳnh đảm bảo chất lượng, có đầy đủ giấy tờ nhập khẩu và tem chống giả. Liên hệ với chúng tôi để được tư vấn chi tiết về sản phẩm phù hợp với nhu cầu của bạn.`,

    'công dụng': `Cao hồng sâm là sản phẩm được chế biến từ nhân sâm 6 năm tuổi, có hàm lượng saponin cao và dễ hấp thu. Nghiên cứu khoa học đã chứng minh nhiều công dụng tuyệt vời của cao hồng sâm đối với sức khỏe, đặc biệt là người cao tuổi.

## Tăng cường hệ miễn dịch

Cao hồng sâm chứa các hợp chất saponin (ginsenosides) giúp:
- Kích thích sản xuất tế bào miễn dịch
- Tăng cường khả năng chống lại virus và vi khuẩn
- Giảm nguy cơ mắc các bệnh nhiễm trùng

## Cải thiện trí nhớ và nhận thức

Nghiên cứu cho thấy cao hồng sâm có tác dụng:
- Tăng cường lưu thông máu lên não
- Cải thiện khả năng tập trung và ghi nhớ
- Hỗ trợ điều trị chứng suy giảm trí nhớ ở người cao tuổi
- Giảm nguy cơ mắc bệnh Alzheimer

## Hỗ trợ tim mạch

Cao hồng sâm giúp:
- Điều hòa huyết áp
- Cải thiện tuần hoàn máu
- Giảm cholesterol xấu (LDL)
- Tăng cường sức khỏe tim mạch

## Tăng cường sinh lực

- Giảm mệt mỏi, căng thẳng
- Tăng cường năng lượng tự nhiên
- Cải thiện chất lượng giấc ngủ
- Hỗ trợ phục hồi sau bệnh

## Cách sử dụng cho người cao tuổi

- **Liều lượng**: 1-2g/ngày, chia làm 2 lần
- **Thời điểm**: Uống vào buổi sáng và trưa, trước bữa ăn
- **Thời gian**: Sử dụng liên tục 2-3 tháng để thấy rõ hiệu quả
- **Lưu ý**: Nên tham khảo ý kiến bác sĩ nếu đang dùng thuốc điều trị bệnh mãn tính

Công ty Xuân Quỳnh cung cấp cao hồng sâm Hàn Quốc chính hãng, được sản xuất theo tiêu chuẩn GMP, đảm bảo chất lượng và an toàn cho người sử dụng.`,

    'default': `Nhân sâm Hàn Quốc là sản phẩm cao cấp được nhập khẩu trực tiếp từ Hàn Quốc, đảm bảo chất lượng và độ an toàn. Sản phẩm được sản xuất theo tiêu chuẩn GMP và đã được kiểm định chất lượng.

## Vì sao chọn nhân sâm Hàn Quốc?

Hàn Quốc là quê hương của nhân sâm với hơn 1,500 năm lịch sử trồng và sử dụng. Nhân sâm Hàn Quốc được trồng tại các vùng đất đỏ bazan đặc biệt, với khí hậu và thổ nhưỡng lý tưởng.

## Các sản phẩm phổ biến

Công ty Xuân Quỳnh chuyên cung cấp các sản phẩm nhân sâm Hàn Quốc chính hãng:
- **Cao hồng sâm 6 năm tuổi**: Tinh chất cô đặc, hàm lượng saponin cao
- **Tinh chất hồng sâm**: Dạng lỏng, dễ hấp thu
- **Nhân sâm tươi**: Nguyên củ, giữ nguyên dưỡng chất
- **Viên nang nhân sâm**: Tiện lợi, dễ sử dụng

## Cam kết chất lượng

- Sản phẩm chính hãng, có tem chống giả
- Đầy đủ giấy tờ nhập khẩu
- Tư vấn sử dụng miễn phí
- Giao hàng toàn quốc

Liên hệ với chúng tôi để được tư vấn và đặt hàng.`
  },
  'my-pham': {
    'default': `Mỹ phẩm K-Beauty từ Hàn Quốc đang là xu hướng làm đẹp được yêu thích trên toàn thế giới. Các sản phẩm được nghiên cứu kỹ lưỡng với công nghệ tiên tiến, phù hợp với mọi loại da.

## Ưu điểm của mỹ phẩm K-Beauty

### Thành phần tự nhiên
- Chiết xuất từ các loại thảo dược quý
- Không chứa hóa chất độc hại
- An toàn cho da nhạy cảm

### Công thức độc đáo
- Nghiên cứu bởi các chuyên gia hàng đầu
- Công nghệ tiên tiến từ Hàn Quốc
- Hiệu quả cao, phù hợp với người châu Á

### Giá cả hợp lý
- Chất lượng cao nhưng giá cả phải chăng
- Phù hợp với người Việt Nam

## Các sản phẩm phổ biến

### Serum chứa nhân sâm
- Tái tạo và làm sáng da
- Giảm nếp nhăn
- Cải thiện độ đàn hồi

### Kem dưỡng ẩm
- Cung cấp độ ẩm sâu
- Bảo vệ da khỏi tác hại môi trường
- Phù hợp mọi loại da

### Mặt nạ giấy
- Tiện lợi, dễ sử dụng
- Nhiều loại cho từng nhu cầu
- Hiệu quả nhanh chóng

### Tẩy trang và làm sạch
- Làm sạch sâu lỗ chân lông
- Không gây kích ứng
- Dưỡng ẩm nhẹ nhàng

## Routine chăm sóc da chuẩn K-Beauty

1. **Làm sạch**: Dùng sữa rửa mặt và tẩy trang
2. **Toner**: Cân bằng độ pH cho da
3. **Essence**: Cung cấp dưỡng chất
4. **Serum**: Điều trị các vấn đề cụ thể
5. **Kem dưỡng**: Khóa ẩm và bảo vệ da
6. **Kem chống nắng**: Bảo vệ da khỏi tia UV

Công ty Xuân Quỳnh cung cấp đa dạng các sản phẩm mỹ phẩm K-Beauty chính hãng, được nhập khẩu trực tiếp từ Hàn Quốc. Liên hệ để được tư vấn về sản phẩm phù hợp với loại da của bạn.`
  },
  'thoi-trang': {
    'default': `Dịch vụ thiết kế và may đo thời trang theo yêu cầu của Công ty Xuân Quỳnh mang đến cho khách hàng những bộ trang phục độc đáo, phù hợp với phong cách cá nhân.

## Quy trình thiết kế và may đo

### 1. Tư vấn và đo kích thước
- Tư vấn về phong cách và nhu cầu
- Đo kích thước chính xác
- Chọn mẫu và thiết kế

### 2. Thiết kế mẫu theo yêu cầu
- Phác thảo thiết kế
- Chọn chất liệu vải
- Xác nhận với khách hàng

### 3. Chọn chất liệu vải phù hợp
- Vải cao cấp, đa dạng
- Phù hợp với từng loại trang phục
- Tư vấn về tính năng vải

### 4. May đo và chỉnh sửa
- May đo chính xác
- Fitting và chỉnh sửa
- Đảm bảo vừa vặn hoàn hảo

### 5. Hoàn thiện và giao hàng
- Kiểm tra chất lượng
- Hoàn thiện chi tiết
- Giao hàng đúng hẹn

## Các dịch vụ chúng tôi cung cấp

- **Thiết kế thời trang cá nhân**: Áo sơ mi, vest, đầm, quần áo công sở
- **May đo đồng phục công ty**: Tạo dấu ấn thương hiệu
- **Thiết kế trang phục công sở**: Chuyên nghiệp, thanh lịch
- **Tư vấn phong cách thời trang**: Giúp bạn tìm phong cách phù hợp

## Chất liệu vải cao cấp

- **Cotton**: Thoáng mát, thấm hút tốt
- **Linen**: Mát mẻ, sang trọng
- **Wool**: Ấm áp, cao cấp
- **Silk**: Mềm mại, quý phái

Với đội ngũ thiết kế giàu kinh nghiệm và xưởng may hiện đại, chúng tôi cam kết mang đến những sản phẩm chất lượng cao, đúng thời hạn. Liên hệ để được tư vấn và báo giá.`
  },
  'tu-van-thuong-mai': {
    'default': `Dịch vụ tư vấn thương mại quốc tế của Công ty Xuân Quỳnh hỗ trợ các doanh nghiệp Việt Nam mở rộng ra thị trường quốc tế một cách hiệu quả.

## Các dịch vụ tư vấn

### Tư vấn chiến lược xuất nhập khẩu
- Phân tích thị trường quốc tế
- Xây dựng chiến lược xuất nhập khẩu
- Tư vấn về cơ hội kinh doanh

### Kết nối đối tác kinh doanh quốc tế
- Tìm kiếm đối tác phù hợp
- Giới thiệu doanh nghiệp với đối tác
- Hỗ trợ đàm phán ban đầu

### Hỗ trợ thủ tục hải quan và xuất nhập khẩu
- Tư vấn về thủ tục hải quan
- Hỗ trợ chuẩn bị giấy tờ
- Xử lý các vấn đề phát sinh

### Đàm phán và ký kết hợp đồng thương mại
- Soạn thảo hợp đồng
- Đàm phán điều khoản
- Tư vấn pháp lý

### Quản lý rủi ro trong giao dịch quốc tế
- Đánh giá rủi ro
- Đề xuất giải pháp bảo hiểm
- Hỗ trợ xử lý tranh chấp

## Lợi ích khi sử dụng dịch vụ

- **Tiết kiệm thời gian và chi phí**: Tránh sai sót tốn kém
- **Giảm thiểu rủi ro pháp lý**: Đảm bảo tuân thủ quy định
- **Tăng cơ hội thành công**: Kinh nghiệm và mạng lưới rộng
- **Hỗ trợ 24/7**: Luôn sẵn sàng hỗ trợ trong quá trình giao dịch

Với mạng lưới đối tác rộng khắp và đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang đến những giải pháp tối ưu cho doanh nghiệp của bạn. Liên hệ để được tư vấn miễn phí.`
  }
};

function getDetailedContent(post) {
  const category = post.category;
  const title = post.title.toLowerCase();
  const templates = detailedContentTemplates[category];
  
  if (!templates) {
    return post.summary + '\n\n' + 'Nội dung chi tiết đang được cập nhật...';
  }
  
  // Try to find matching template
  for (const [key, content] of Object.entries(templates)) {
    if (key !== 'default' && title.includes(key)) {
      return content;
    }
  }
  
  // Return default content for category
  return templates.default || post.summary;
}

module.exports = {
  getDetailedContent,
  detailedContentTemplates
};

