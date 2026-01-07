// Cosmetics products data with images and descriptions

export interface CosmeticsProduct {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  image: string;
  category: string;
  price?: number;
}

export const cosmeticsProducts: CosmeticsProduct[] = [
  {
    id: '3w-clinic-uv-sunblock',
    name: '3W Clinic Intensive UV Sunblock Cream SPF 50+ PA+++',
    description: 'Kem chống nắng chuyên sâu SPF 50+ PA+++ bảo vệ da khỏi tia UV, phù hợp mọi loại da.',
    detailedDescription: `Kem chống nắng 3W Clinic Intensive UV Sunblock Cream SPF 50+ PA+++ là sản phẩm chống nắng cao cấp từ Hàn Quốc, cung cấp khả năng bảo vệ tối đa khỏi tia UVA và UVB.

**Đặc điểm nổi bật:**
- Chỉ số chống nắng cao SPF 50+ PA+++ bảo vệ da toàn diện
- Kết cấu nhẹ, không gây bết dính, thấm nhanh vào da
- Không chứa dầu, phù hợp cho da dầu và da mụn
- Có thể dùng làm lớp nền trang điểm
- Chống nước và mồ hôi hiệu quả

**Công dụng:**
- Bảo vệ da khỏi tác hại của tia UV
- Ngăn ngừa lão hóa da do ánh nắng
- Giảm nguy cơ ung thư da
- Bảo vệ da khỏi tác hại của môi trường

**Cách sử dụng:**
- Thoa đều lên mặt và cổ trước khi ra nắng 15-20 phút
- Thoa lại sau mỗi 2-3 giờ hoặc sau khi bơi, đổ mồ hôi nhiều
- Sử dụng hàng ngày để bảo vệ da tốt nhất

**Xuất xứ:** Hàn Quốc
**Dung tích:** 50ml`,
    image: '',
    category: 'Chống nắng'
  },
  {
    id: 'antiphlamine-cooling-gel',
    name: 'Antiphlamine Cooling Gel Lotion (Dầu xoa bóp Hàn Quốc)',
    description: 'Gel làm mát giảm đau nhức, viêm khớp, phù hợp cho người vận động và người cao tuổi.',
    detailedDescription: `Antiphlamine Cooling Gel Lotion là sản phẩm dầu xoa bóp cao cấp từ Hàn Quốc, có tác dụng làm mát và giảm đau nhức hiệu quả.

**Thành phần chính:**
- Menthol: Làm mát, giảm đau tức thì
- Methyl salicylate: Giảm viêm, giảm đau
- Tinh dầu thảo dược: Thư giãn cơ bắp

**Công dụng:**
- Giảm đau nhức cơ bắp, xương khớp
- Làm mát, thư giãn vùng bị đau
- Giảm viêm, sưng tấy
- Hỗ trợ điều trị đau lưng, đau vai gáy
- Phù hợp cho người vận động, thể thao

**Cách sử dụng:**
- Thoa một lượng vừa đủ lên vùng bị đau
- Massage nhẹ nhàng cho đến khi thấm vào da
- Sử dụng 2-3 lần/ngày hoặc khi cần thiết
- Tránh tiếp xúc với mắt và vết thương hở

**Xuất xứ:** Hàn Quốc
**Dung tích:** 100ml`,
    image: '',
    category: 'Chăm sóc sức khỏe'
  },
  {
    id: 'banobagi-stem-cell-whitening-dark-spot',
    name: 'Banobagi Stem Cell Vitamin Mask – Whitening & Dark Spot Care',
    description: 'Mặt nạ dưỡng trắng và giảm thâm nám với công nghệ tế bào gốc, phục hồi da hiệu quả.',
    detailedDescription: `Banobagi Stem Cell Vitamin Mask là sản phẩm mặt nạ cao cấp từ Hàn Quốc, sử dụng công nghệ tế bào gốc để dưỡng trắng và chăm sóc vùng da bị thâm nám.

**Thành phần đặc biệt:**
- Tế bào gốc thực vật: Phục hồi và tái tạo da
- Vitamin C: Làm sáng da, giảm thâm nám
- Niacinamide: Cải thiện kết cấu da
- Hyaluronic Acid: Dưỡng ẩm sâu

**Công dụng:**
- Làm sáng da, giảm thâm nám, đốm nâu
- Phục hồi da bị tổn thương
- Cải thiện kết cấu da, làm mịn da
- Dưỡng ẩm và làm căng da
- Chống lão hóa, giảm nếp nhăn

**Cách sử dụng:**
- Làm sạch da mặt trước khi đắp
- Đắp mặt nạ lên mặt, điều chỉnh cho vừa vặn
- Để trong 15-20 phút
- Tháo mặt nạ và massage nhẹ phần tinh chất còn lại
- Sử dụng 2-3 lần/tuần

**Xuất xứ:** Hàn Quốc
**Quy cách:** 1 hộp/10 miếng`,
    image: '',
    category: 'Mặt nạ'
  },
  {
    id: 'banobagi-stem-cell-whitening-tone',
    name: 'BANOBAGI Stem Cell Vitamin Mask – Whitening & Tone Up',
    description: 'Mặt nạ dưỡng trắng và cải thiện tone da với vitamin và tế bào gốc, cho làn da sáng mịn.',
    detailedDescription: `BANOBAGI Stem Cell Vitamin Mask – Whitening & Tone Up là mặt nạ dưỡng trắng cao cấp, giúp cải thiện tone da và làm sáng da hiệu quả.

**Thành phần:**
- Tế bào gốc thực vật: Tái tạo và phục hồi da
- Vitamin C & E: Làm sáng da, chống oxy hóa
- Arbutin: Giảm sản xuất melanin
- Peptide: Tăng độ đàn hồi da

**Công dụng:**
- Làm sáng da, cải thiện tone da không đều
- Giảm thâm nám, đốm nâu
- Dưỡng ẩm và làm mịn da
- Tăng độ đàn hồi, giảm nếp nhăn
- Phục hồi da sau tổn thương

**Cách sử dụng:**
- Rửa mặt sạch và lau khô
- Đắp mặt nạ lên mặt, điều chỉnh cho vừa
- Để 15-20 phút
- Tháo mặt nạ, massage phần tinh chất còn lại
- Dùng 2-3 lần/tuần để đạt hiệu quả tốt nhất

**Xuất xứ:** Hàn Quốc
**Quy cách:** 1 hộp/10 miếng`,
    image: '',
    category: 'Mặt nạ'
  },
  {
    id: 'banobagi-super-collagen-acne',
    name: 'Banobagi Super Collagen Mask – Acne (Red Blemish)',
    description: 'Mặt nạ collagen chuyên trị mụn đỏ, giảm viêm và phục hồi da bị tổn thương do mụn.',
    detailedDescription: `Banobagi Super Collagen Mask – Acne là mặt nạ chuyên trị mụn đỏ, giúp giảm viêm và phục hồi da hiệu quả.

**Thành phần đặc biệt:**
- Collagen: Phục hồi và tái tạo da
- Centella Asiatica: Giảm viêm, làm dịu da
- Tea Tree Extract: Kháng khuẩn, trị mụn
- Allantoin: Làm lành vết thương

**Công dụng:**
- Giảm viêm, sưng đỏ do mụn
- Làm dịu da bị kích ứng
- Phục hồi da bị tổn thương do mụn
- Ngăn ngừa mụn mới phát sinh
- Cải thiện kết cấu da

**Cách sử dụng:**
- Làm sạch da mặt, đặc biệt vùng có mụn
- Đắp mặt nạ lên mặt, chú ý vùng có mụn
- Để 15-20 phút
- Tháo mặt nạ, massage nhẹ phần tinh chất
- Sử dụng 2-3 lần/tuần, tăng tần suất khi da có mụn

**Xuất xứ:** Hàn Quốc
**Quy cách:** 1 hộp/10 miếng`,
    image: '',
    category: 'Mặt nạ'
  },
  {
    id: 'foodaholic-collagen-mask',
    name: 'Foodaholic Collagen Natural Essence Mask',
    description: 'Mặt nạ collagen tự nhiên dưỡng ẩm và làm căng da, cho làn da tươi trẻ, mịn màng.',
    detailedDescription: `Foodaholic Collagen Natural Essence Mask là mặt nạ collagen tự nhiên, cung cấp độ ẩm và làm căng da hiệu quả.

**Thành phần:**
- Collagen tự nhiên: Tăng độ đàn hồi da
- Hyaluronic Acid: Dưỡng ẩm sâu
- Glycerin: Giữ ẩm lâu dài
- Chiết xuất thảo dược: Làm dịu da

**Công dụng:**
- Dưỡng ẩm sâu, làm mịn da
- Tăng độ đàn hồi, giảm nếp nhăn
- Làm căng da, cho da tươi trẻ
- Phục hồi da bị khô, thiếu ẩm
- Cải thiện kết cấu da

**Cách sử dụng:**
- Làm sạch da mặt
- Đắp mặt nạ lên mặt, điều chỉnh cho vừa
- Để 15-20 phút
- Tháo mặt nạ, massage phần tinh chất
- Sử dụng 2-3 lần/tuần

**Xuất xứ:** Hàn Quốc
**Quy cách:** 1 hộp/10 miếng`,
    image: '',
    category: 'Mặt nạ'
  },
  {
    id: 'hatomugi-cleansing-lotion',
    name: 'Hatomugi Cleansing Lotion (Cleansing & Pore Clear)',
    description: 'Nước tẩy trang và làm sạch lỗ chân lông với chiết xuất ý dĩ, phù hợp mọi loại da.',
    detailedDescription: `Hatomugi Cleansing Lotion là sản phẩm tẩy trang và làm sạch lỗ chân lông với chiết xuất ý dĩ (hatomugi) từ Nhật Bản.

**Thành phần chính:**
- Chiết xuất ý dĩ: Làm sạch và se khít lỗ chân lông
- Hyaluronic Acid: Dưỡng ẩm nhẹ
- Không chứa cồn, phù hợp da nhạy cảm

**Công dụng:**
- Tẩy trang hiệu quả, loại bỏ bụi bẩn
- Làm sạch sâu lỗ chân lông
- Se khít lỗ chân lông
- Cân bằng độ pH cho da
- Dưỡng ẩm nhẹ, không làm khô da

**Cách sử dụng:**
- Thấm bông tẩy trang với sản phẩm
- Lau nhẹ nhàng lên mặt để tẩy trang
- Có thể dùng sau khi rửa mặt để làm sạch sâu
- Sử dụng 2 lần/ngày (sáng và tối)

**Xuất xứ:** Nhật Bản
**Dung tích:** 500ml`,
    image: '',
    category: 'Làm sạch'
  },
  {
    id: 'himena-hong-sam-hanbang-red',
    name: 'HIMENA Hong Sam Hanbang (Gói màu đỏ – Nhân sâm đỏ)',
    description: 'Mặt nạ nhân sâm đỏ Hàn Quốc dưỡng trắng và chống lão hóa, phục hồi da hiệu quả.',
    detailedDescription: `HIMENA Hong Sam Hanbang là mặt nạ nhân sâm đỏ cao cấp từ Hàn Quốc, kết hợp công nghệ Hanbang truyền thống với công nghệ hiện đại.

**Thành phần đặc biệt:**
- Chiết xuất nhân sâm đỏ 6 năm tuổi: Dưỡng chất quý giá
- Collagen: Tăng độ đàn hồi da
- Hyaluronic Acid: Dưỡng ẩm sâu
- Vitamin E: Chống oxy hóa

**Công dụng:**
- Dưỡng trắng da, làm sáng da
- Chống lão hóa, giảm nếp nhăn
- Phục hồi da bị tổn thương
- Tăng cường độ đàn hồi da
- Cải thiện kết cấu da

**Cách sử dụng:**
- Làm sạch da mặt
- Đắp mặt nạ lên mặt, điều chỉnh cho vừa
- Để 15-20 phút
- Tháo mặt nạ, massage phần tinh chất
- Sử dụng 2-3 lần/tuần

**Xuất xứ:** Hàn Quốc
**Quy cách:** 1 hộp/10 miếng`,
    image: '',
    category: 'Mặt nạ'
  },
  {
    id: 'hong-sam-hanbang-yellow',
    name: 'Hong Sam Hanbang (Gói màu vàng – Nhân sâm)',
    description: 'Mặt nạ nhân sâm Hàn Quốc dưỡng ẩm và phục hồi da, cho làn da khỏe mạnh, tươi trẻ.',
    detailedDescription: `Hong Sam Hanbang là mặt nạ nhân sâm cao cấp từ Hàn Quốc, sử dụng công nghệ Hanbang truyền thống.

**Thành phần:**
- Chiết xuất nhân sâm Hàn Quốc: Dưỡng chất tự nhiên
- Collagen: Phục hồi da
- Hyaluronic Acid: Dưỡng ẩm
- Chiết xuất thảo dược: Làm dịu da

**Công dụng:**
- Dưỡng ẩm sâu, làm mịn da
- Phục hồi da bị tổn thương
- Tăng cường sức khỏe da
- Cải thiện kết cấu da
- Làm sáng da nhẹ

**Cách sử dụng:**
- Làm sạch da mặt
- Đắp mặt nạ lên mặt
- Để 15-20 phút
- Tháo mặt nạ, massage phần tinh chất
- Sử dụng 2-3 lần/tuần

**Xuất xứ:** Hàn Quốc
**Quy cách:** 1 hộp/10 miếng`,
    image: '',
    category: 'Mặt nạ'
  },
  {
    id: 'my-gold-korea-red-ginseng-cleansing',
    name: 'My Gold Korea Red Ginseng Foam Cleansing',
    description: 'Sữa rửa mặt nhân sâm đỏ Hàn Quốc làm sạch sâu và dưỡng da, phù hợp mọi loại da.',
    detailedDescription: `My Gold Korea Red Ginseng Foam Cleansing là sữa rửa mặt cao cấp với chiết xuất nhân sâm đỏ Hàn Quốc.

**Thành phần:**
- Chiết xuất nhân sâm đỏ: Dưỡng chất quý giá
- Glycerin: Dưỡng ẩm
- Chiết xuất thảo dược: Làm dịu da
- Không chứa paraben, phù hợp da nhạy cảm

**Công dụng:**
- Làm sạch sâu, loại bỏ bụi bẩn và dầu thừa
- Dưỡng ẩm nhẹ, không làm khô da
- Làm sáng da, cải thiện tone da
- Phù hợp mọi loại da, kể cả da nhạy cảm

**Cách sử dụng:**
- Làm ướt mặt với nước ấm
- Lấy một lượng vừa đủ, tạo bọt
- Massage nhẹ nhàng lên mặt
- Rửa sạch với nước
- Sử dụng 2 lần/ngày (sáng và tối)

**Xuất xứ:** Hàn Quốc
**Dung tích:** 150ml`,
    image: '',
    category: 'Làm sạch'
  },
  {
    id: 'slimming-hot-body-gel',
    name: 'Slimming Hot Body Gel-Ecosy',
    description: 'Gel giảm mỡ làm nóng cơ thể, hỗ trợ giảm cân và làm săn chắc da, an toàn hiệu quả.',
    detailedDescription: `Slimming Hot Body Gel-Ecosy là sản phẩm gel giảm mỡ làm nóng từ Hàn Quốc, hỗ trợ giảm cân và làm săn chắc da.

**Thành phần:**
- Capsaicin: Tạo hiệu ứng làm nóng
- Caffeine: Giảm mỡ thừa
- Menthol: Làm mát sau khi nóng
- Chiết xuất thảo dược: An toàn cho da

**Công dụng:**
- Tạo hiệu ứng làm nóng, đốt cháy mỡ thừa
- Hỗ trợ giảm cân, giảm mỡ bụng
- Làm săn chắc da, giảm cellulite
- Cải thiện tuần hoàn máu
- Thư giãn cơ bắp

**Cách sử dụng:**
- Làm sạch vùng da cần điều trị
- Thoa một lớp mỏng gel lên vùng da
- Massage nhẹ nhàng cho đến khi cảm thấy nóng
- Để trong 15-30 phút
- Rửa sạch với nước
- Sử dụng 1-2 lần/ngày, kết hợp với tập thể dục

**Lưu ý:** Tránh tiếp xúc với mắt, không dùng trên da bị tổn thương

**Xuất xứ:** Hàn Quốc
**Dung tích:** 200ml`,
    image: '',
    category: 'Giảm cân'
  },
  {
    id: 'vaseline-healthy-bright-lotion',
    name: 'Vaseline Healthy Bright Daily Brightening Lotion',
    description: 'Kem dưỡng thể làm sáng da hàng ngày với vitamin B3, cho làn da sáng mịn, đều màu.',
    detailedDescription: `Vaseline Healthy Bright Daily Brightening Lotion là kem dưỡng thể làm sáng da với công thức chứa vitamin B3.

**Thành phần:**
- Vitamin B3 (Niacinamide): Làm sáng da, giảm thâm
- Glycerin: Dưỡng ẩm
- Chiết xuất cam thảo: Làm dịu da
- Không chứa paraben

**Công dụng:**
- Làm sáng da, cải thiện tone da
- Giảm thâm, đốm nâu
- Dưỡng ẩm, làm mịn da
- Phù hợp sử dụng hàng ngày
- An toàn cho mọi loại da

**Cách sử dụng:**
- Thoa đều lên toàn thân sau khi tắm
- Massage nhẹ nhàng cho đến khi thấm vào da
- Sử dụng hàng ngày để đạt hiệu quả tốt nhất
- Kết hợp với kem chống nắng khi ra ngoài

**Xuất xứ:** Quốc tế
**Dung tích:** 400ml`,
    image: '',
    category: 'Dưỡng thể'
  },
  {
    id: 'vaseline-total-moisture-body-wash',
    name: 'Vaseline Total Moisture Body Wash',
    description: 'Sữa tắm dưỡng ẩm toàn thân với micro-droplets, cho làn da mềm mịn, không khô ráp.',
    detailedDescription: `Vaseline Total Moisture Body Wash là sữa tắm dưỡng ẩm cao cấp với công nghệ micro-droplets.

**Thành phần:**
- Micro-droplets dưỡng ẩm: Thấm sâu vào da
- Glycerin: Giữ ẩm lâu dài
- Chiết xuất lô hội: Làm dịu da
- Không chứa xà phòng, phù hợp da nhạy cảm

**Công dụng:**
- Làm sạch da hiệu quả
- Dưỡng ẩm sâu, giữ ẩm lâu dài
- Làm mềm da, không gây khô ráp
- Phù hợp da khô, da nhạy cảm
- Mùi hương dễ chịu

**Cách sử dụng:**
- Làm ướt người với nước
- Lấy một lượng vừa đủ, tạo bọt
- Massage lên toàn thân
- Rửa sạch với nước
- Sử dụng hàng ngày khi tắm

**Xuất xứ:** Quốc tế
**Dung tích:** 400ml`,
    image: '',
    category: 'Làm sạch'
  },
  {
    id: 'minami-healthy-foods-weight-loss',
    name: 'Viên uống giảm cân Minami Healthy Foods',
    description: 'Viên uống giảm cân an toàn với thành phần tự nhiên, hỗ trợ quá trình giảm cân hiệu quả.',
    detailedDescription: `Viên uống giảm cân Minami Healthy Foods là sản phẩm hỗ trợ giảm cân an toàn với thành phần tự nhiên.

**Thành phần:**
- Chiết xuất trà xanh: Tăng cường trao đổi chất
- L-Carnitine: Đốt cháy mỡ thừa
- Chiết xuất cà phê xanh: Giảm hấp thu chất béo
- Vitamin và khoáng chất: Bổ sung dinh dưỡng

**Công dụng:**
- Hỗ trợ giảm cân an toàn
- Tăng cường trao đổi chất
- Đốt cháy mỡ thừa
- Giảm cảm giác thèm ăn
- Cung cấp năng lượng

**Cách sử dụng:**
- Uống 1-2 viên trước bữa ăn 30 phút
- Uống với nhiều nước
- Kết hợp với chế độ ăn uống lành mạnh và tập thể dục
- Không dùng quá liều khuyến nghị

**Lưu ý:** Phụ nữ mang thai và cho con bú nên tham khảo ý kiến bác sĩ

**Xuất xứ:** Nhật Bản
**Quy cách:** 1 hộp/60 viên`,
    image: '',
    category: 'Giảm cân'
  }
];

