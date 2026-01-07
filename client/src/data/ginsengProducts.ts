// Ginseng products data with images and descriptions

export interface GinsengProduct {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  image: string;
  category: string;
  price?: number;
}

export const ginsengProducts: GinsengProduct[] = [
  {
    id: 'nam-linh-chi-sung-huou-dau-mua',
    name: 'Nấm linh chi Sừng hươu đầu mùa',
    description: 'Nấm linh chi kết hợp sừng hươu đầu mùa, tăng cường sức khỏe và sức đề kháng.',
    detailedDescription: `Nấm linh chi Sừng hươu đầu mùa là sản phẩm cao cấp kết hợp giữa nấm linh chi quý hiếm và sừng hươu đầu mùa, mang lại nhiều lợi ích cho sức khỏe.

**Thành phần chính:**
- Nấm linh chi (Ganoderma lucidum): Chứa nhiều hoạt chất quý như triterpenoids, polysaccharides
- Sừng hươu đầu mùa: Giàu collagen, amino acids, khoáng chất
- Các thành phần bổ sung khác

**Công dụng:**
- Tăng cường hệ miễn dịch, nâng cao sức đề kháng
- Bổ sung năng lượng, giảm mệt mỏi
- Hỗ trợ sức khỏe tim mạch
- Cải thiện chất lượng giấc ngủ
- Chống oxy hóa, làm chậm quá trình lão hóa
- Hỗ trợ sức khỏe xương khớp

**Đối tượng sử dụng:**
- Người có sức đề kháng kém, hay ốm vặt
- Người mệt mỏi, suy nhược cơ thể
- Người cao tuổi cần bồi bổ sức khỏe
- Người làm việc căng thẳng, áp lực cao

**Cách sử dụng:**
- Uống theo hướng dẫn trên bao bì
- Nên uống vào buổi sáng hoặc trước bữa ăn
- Kiên trì sử dụng để đạt hiệu quả tốt nhất

**Xuất xứ:** Hàn Quốc`,
    image: '',
    category: 'Thực phẩm chức năng'
  },
  {
    id: 'tinh-dau-thong-do-han-quoc-kwangdong',
    name: 'Tinh dầu thông đỏ Hàn Quốc KwangDong',
    description: 'Tinh dầu thông đỏ nguyên chất từ Hàn Quốc, hỗ trợ tuần hoàn máu và sức khỏe tim mạch.',
    detailedDescription: `Tinh dầu thông đỏ Hàn Quốc KwangDong là sản phẩm cao cấp được chiết xuất từ cây thông đỏ quý hiếm của Hàn Quốc, nổi tiếng với nhiều công dụng tốt cho sức khỏe.

**Thành phần:**
- Tinh dầu thông đỏ nguyên chất 100%
- Chứa các hợp chất tự nhiên như pinene, limonene
- Không chứa chất bảo quản, phụ gia

**Công dụng:**
- Hỗ trợ tuần hoàn máu, cải thiện lưu thông máu
- Tăng cường sức khỏe tim mạch
- Giảm mệt mỏi, tăng cường năng lượng
- Hỗ trợ hô hấp, giảm ho, long đờm
- Chống viêm, giảm đau nhức
- Cải thiện chất lượng giấc ngủ

**Cách sử dụng:**
- Có thể uống trực tiếp hoặc pha với nước ấm
- Massage ngoài da để giảm đau nhức
- Xông hơi để hỗ trợ hô hấp
- Sử dụng theo hướng dẫn trên bao bì

**Lưu ý:**
- Không dùng cho phụ nữ có thai và đang cho con bú
- Tham khảo ý kiến bác sĩ trước khi sử dụng nếu đang điều trị bệnh

**Xuất xứ:** Hàn Quốc`,
    image: '',
    category: 'Tinh dầu'
  },
  {
    id: 'chiet-suat-dong-trung-ha-thao-hop-60-goi',
    name: 'Chiết xuất đông trùng hạ thảo hộp 60 gói cao cấp',
    description: 'Chiết xuất đông trùng hạ thảo dạng gói tiện lợi, bồi bổ sức khỏe toàn diện.',
    detailedDescription: `Chiết xuất đông trùng hạ thảo hộp 60 gói là sản phẩm cao cấp được chiết xuất từ đông trùng hạ thảo tự nhiên, đóng gói dạng gói tiện lợi, dễ sử dụng.

**Thành phần:**
- Chiết xuất đông trùng hạ thảo (Cordyceps sinensis)
- Các vitamin và khoáng chất thiết yếu
- Không chứa chất bảo quản

**Công dụng:**
- Tăng cường sức đề kháng, nâng cao hệ miễn dịch
- Bổ thận, tráng dương, tăng cường sinh lực
- Cải thiện chức năng hô hấp
- Tăng cường sức bền, giảm mệt mỏi
- Hỗ trợ sức khỏe tim mạch
- Chống lão hóa, làm đẹp da

**Đối tượng sử dụng:**
- Người suy nhược cơ thể, mệt mỏi
- Người có vấn đề về hô hấp
- Người cần tăng cường sinh lực
- Vận động viên, người tập thể thao

**Cách sử dụng:**
- Uống 1-2 gói mỗi ngày
- Uống trước bữa ăn 30 phút hoặc sau bữa ăn 1 giờ
- Có thể uống trực tiếp hoặc pha với nước ấm

**Xuất xứ:** Hàn Quốc
**Quy cách:** Hộp 60 gói`,
    image: '',
    category: 'Đông trùng hạ thảo'
  },
  {
    id: 'tinh-chat-hong-sam-mat-ong-pha-san-kgc-honey-paste',
    name: 'Tinh Chất Hồng Sâm Mật Ong Pha Sẵn KGC Honey Paste (Hộp 30 gói)',
    description: 'Tinh chất hồng sâm kết hợp mật ong, pha sẵn tiện lợi, vị ngọt tự nhiên dễ uống.',
    detailedDescription: `Tinh Chất Hồng Sâm Mật Ong Pha Sẵn KGC Honey Paste là sản phẩm cao cấp từ thương hiệu KGC (Korea Ginseng Corporation), kết hợp tinh chất hồng sâm 6 năm tuổi với mật ong tự nhiên.

**Thành phần:**
- Tinh chất hồng sâm 6 năm tuổi
- Mật ong tự nhiên
- Các thành phần bổ sung khác

**Công dụng:**
- Tăng cường sức khỏe, bồi bổ cơ thể
- Giảm mệt mỏi, tăng cường năng lượng
- Hỗ trợ tiêu hóa, cải thiện cảm giác ngon miệng
- Tăng cường hệ miễn dịch
- Cải thiện trí nhớ và khả năng tập trung
- Chống lão hóa, làm đẹp da

**Đặc điểm:**
- Vị ngọt tự nhiên từ mật ong, dễ uống
- Đóng gói dạng gói tiện lợi, dễ mang theo
- Pha sẵn, chỉ cần uống trực tiếp
- Phù hợp cho mọi lứa tuổi

**Cách sử dụng:**
- Uống 1-2 gói mỗi ngày
- Uống trực tiếp hoặc pha với nước ấm
- Nên uống vào buổi sáng hoặc khi mệt mỏi

**Xuất xứ:** Hàn Quốc
**Thương hiệu:** KGC (Korea Ginseng Corporation)
**Quy cách:** Hộp 30 gói`,
    image: '',
    category: 'Hồng sâm'
  },
  {
    id: 'kgc-hong-sam-tonic-mild',
    name: 'KGC - Hồng sâm Tonic mild date 11-2028',
    description: 'Hồng sâm Tonic mild từ KGC, bổ sung năng lượng và tăng cường sức khỏe.',
    detailedDescription: `KGC Hồng sâm Tonic mild là sản phẩm cao cấp từ thương hiệu KGC nổi tiếng của Hàn Quốc, được chế biến từ hồng sâm 6 năm tuổi chất lượng cao.

**Thành phần:**
- Hồng sâm 6 năm tuổi
- Các thành phần bổ sung tự nhiên
- Không chứa chất bảo quản

**Công dụng:**
- Tăng cường sức khỏe toàn diện
- Bổ sung năng lượng, giảm mệt mỏi
- Tăng cường hệ miễn dịch
- Hỗ trợ tiêu hóa
- Cải thiện trí nhớ và khả năng tập trung
- Chống lão hóa

**Đối tượng sử dụng:**
- Người mệt mỏi, suy nhược
- Người làm việc căng thẳng
- Người cao tuổi cần bồi bổ
- Người có sức đề kháng kém

**Cách sử dụng:**
- Uống theo hướng dẫn trên bao bì
- Nên uống vào buổi sáng
- Kiên trì sử dụng để đạt hiệu quả tốt nhất

**Hạn sử dụng:** 11-2028
**Xuất xứ:** Hàn Quốc
**Thương hiệu:** KGC`,
    image: '',
    category: 'Hồng sâm'
  },
  {
    id: 'dong-trung-ha-thao-nuoc-go-vang-60-goi',
    name: 'ĐÔNG TRÙNG HẠ THẢO NƯỚC GỖ VÀNG 60 GÓI',
    description: 'Đông trùng hạ thảo dạng nước đóng gói, tiện lợi, dễ hấp thu, bồi bổ sức khỏe.',
    detailedDescription: `Đông trùng hạ thảo nước gỗ vàng 60 gói là sản phẩm cao cấp được chiết xuất từ đông trùng hạ thảo tự nhiên, đóng gói dạng nước tiện lợi, dễ hấp thu.

**Thành phần:**
- Chiết xuất đông trùng hạ thảo
- Các vitamin và khoáng chất
- Nước tinh khiết

**Công dụng:**
- Tăng cường sức đề kháng
- Bổ thận, tráng dương
- Cải thiện chức năng hô hấp
- Tăng cường sức bền
- Hỗ trợ sức khỏe tim mạch
- Chống lão hóa

**Đặc điểm:**
- Dạng nước, dễ hấp thu
- Đóng gói tiện lợi, dễ mang theo
- Vị ngọt tự nhiên, dễ uống
- Phù hợp mọi lứa tuổi

**Cách sử dụng:**
- Uống 1-2 gói mỗi ngày
- Uống trực tiếp hoặc pha với nước
- Nên uống vào buổi sáng

**Xuất xứ:** Hàn Quốc
**Quy cách:** Hộp 60 gói`,
    image: '',
    category: 'Đông trùng hạ thảo'
  },
  {
    id: 'an-cung-nguu-hoang-hoan-dong-nhan-duong',
    name: 'An Cung Ngưu Hoàng Hoàn Đồng Nhân Đường',
    description: 'An cung ngưu hoàng hoàn từ Đồng Nhân Đường, hỗ trợ sức khỏe tim mạch và não bộ.',
    detailedDescription: `An Cung Ngưu Hoàng Hoàn Đồng Nhân Đường là sản phẩm cao cấp từ thương hiệu Đồng Nhân Đường nổi tiếng, được bào chế theo công thức cổ truyền.

**Thành phần:**
- Ngưu hoàng (bezoar)
- Nhân sâm
- Xạ hương
- Hổ phách
- Và các dược liệu quý khác

**Công dụng:**
- Hỗ trợ sức khỏe tim mạch
- Cải thiện tuần hoàn máu não
- Hỗ trợ trong các trường hợp cấp cứu
- Tăng cường sức khỏe não bộ
- Giảm căng thẳng, lo âu

**Lưu ý:**
- Sản phẩm dùng trong các trường hợp cấp cứu
- Cần tham khảo ý kiến bác sĩ trước khi sử dụng
- Không tự ý sử dụng cho trẻ em

**Cách sử dụng:**
- Sử dụng theo chỉ định của bác sĩ
- Đọc kỹ hướng dẫn trước khi dùng

**Xuất xứ:** Hàn Quốc / Trung Quốc
**Thương hiệu:** Đồng Nhân Đường`,
    image: '',
    category: 'Dược phẩm'
  },
  {
    id: 'tinh-chat-dong-trung-sam-nui-cao-cap-han-quoc',
    name: 'TINH CHẤT ĐÔNG TRÙNG – SÂM NÚI CAO CẤP HÀN QUỐC',
    description: 'Tinh chất đông trùng hạ thảo kết hợp sâm núi, sản phẩm cao cấp bồi bổ sức khỏe.',
    detailedDescription: `Tinh Chất Đông Trùng – Sâm Núi Cao Cấp Hàn Quốc là sản phẩm cao cấp kết hợp giữa đông trùng hạ thảo và sâm núi quý hiếm, mang lại nhiều lợi ích cho sức khỏe.

**Thành phần:**
- Chiết xuất đông trùng hạ thảo
- Sâm núi (mountain ginseng)
- Các thành phần bổ sung khác

**Công dụng:**
- Tăng cường sức đề kháng
- Bổ thận, tráng dương
- Tăng cường sức bền, giảm mệt mỏi
- Hỗ trợ sức khỏe tim mạch
- Cải thiện chức năng hô hấp
- Chống lão hóa, làm đẹp da

**Đối tượng sử dụng:**
- Người suy nhược, mệt mỏi
- Người cần tăng cường sinh lực
- Người có vấn đề về hô hấp
- Vận động viên

**Cách sử dụng:**
- Uống theo hướng dẫn trên bao bì
- Nên uống vào buổi sáng
- Kiên trì sử dụng để đạt hiệu quả

**Xuất xứ:** Hàn Quốc`,
    image: '',
    category: 'Thực phẩm chức năng'
  },
  {
    id: 'cao-sam-hoang-hau-han-quoc',
    name: 'CAO SÂM HOÀNG HẬU HÀN QUỐC',
    description: 'Cao sâm hoàng hậu cao cấp từ Hàn Quốc, bồi bổ sức khỏe và làm đẹp da.',
    detailedDescription: `Cao Sâm Hoàng Hậu Hàn Quốc là sản phẩm cao cấp được chế biến từ hồng sâm 6 năm tuổi, đặc biệt phù hợp cho phụ nữ.

**Thành phần:**
- Hồng sâm 6 năm tuổi
- Các thành phần bổ sung tự nhiên
- Không chứa chất bảo quản

**Công dụng:**
- Bồi bổ sức khỏe, tăng cường năng lượng
- Làm đẹp da, chống lão hóa
- Tăng cường hệ miễn dịch
- Cải thiện tuần hoàn máu
- Giảm mệt mỏi, căng thẳng
- Hỗ trợ sức khỏe phụ nữ

**Đặc điểm:**
- Đặc biệt phù hợp cho phụ nữ
- Công thức được nghiên cứu kỹ lưỡng
- An toàn, hiệu quả

**Cách sử dụng:**
- Uống theo hướng dẫn trên bao bì
- Nên uống vào buổi sáng
- Kiên trì sử dụng để đạt hiệu quả tốt nhất

**Xuất xứ:** Hàn Quốc`,
    image: '',
    category: 'Hồng sâm'
  },
  {
    id: 'bo-nao-tram-huong-samsung-jangsoo-hwam',
    name: 'Bổ não trầm hương samsung jangsoo hwam',
    description: 'Viên uống bổ não từ trầm hương, hỗ trợ trí nhớ và sức khỏe não bộ.',
    detailedDescription: `Bổ não trầm hương Samsung Jangsoo Hwam là sản phẩm cao cấp được bào chế từ trầm hương quý hiếm, hỗ trợ sức khỏe não bộ và cải thiện trí nhớ.

**Thành phần:**
- Trầm hương (agarwood)
- Các thành phần bổ não khác
- Vitamin và khoáng chất

**Công dụng:**
- Cải thiện trí nhớ và khả năng tập trung
- Tăng cường tuần hoàn máu não
- Hỗ trợ sức khỏe não bộ
- Giảm căng thẳng, lo âu
- Cải thiện chất lượng giấc ngủ
- Tăng cường sức khỏe tổng thể

**Đối tượng sử dụng:**
- Người hay quên, suy giảm trí nhớ
- Học sinh, sinh viên cần tăng cường trí nhớ
- Người làm việc trí óc căng thẳng
- Người cao tuổi

**Cách sử dụng:**
- Uống theo hướng dẫn trên bao bì
- Nên uống vào buổi sáng hoặc trước khi học/làm việc
- Kiên trì sử dụng để đạt hiệu quả

**Xuất xứ:** Hàn Quốc
**Thương hiệu:** Samsung Jangsoo Hwam`,
    image: '',
    category: 'Thực phẩm chức năng'
  },
  {
    id: 'an-cung-rong-vang-daehan-jinbodan',
    name: 'AN CUNG RỒNG VÀNG DAEHAN JINBODAN',
    description: 'An cung rồng vàng từ Daehan, hỗ trợ sức khỏe tim mạch và não bộ.',
    detailedDescription: `AN CUNG RỒNG VÀNG DAEHAN JINBODAN là sản phẩm cao cấp từ thương hiệu Daehan, được bào chế theo công thức cổ truyền, hỗ trợ sức khỏe tim mạch và não bộ.

**Thành phần:**
- Ngưu hoàng
- Nhân sâm
- Xạ hương
- Và các dược liệu quý khác

**Công dụng:**
- Hỗ trợ sức khỏe tim mạch
- Cải thiện tuần hoàn máu não
- Hỗ trợ trong các trường hợp cấp cứu
- Tăng cường sức khỏe não bộ
- Giảm căng thẳng

**Lưu ý:**
- Sản phẩm dùng trong các trường hợp cấp cứu
- Cần tham khảo ý kiến bác sĩ trước khi sử dụng
- Không tự ý sử dụng cho trẻ em

**Cách sử dụng:**
- Sử dụng theo chỉ định của bác sĩ
- Đọc kỹ hướng dẫn trước khi dùng

**Xuất xứ:** Hàn Quốc
**Thương hiệu:** Daehan Jinbodan`,
    image: '',
    category: 'Dược phẩm'
  },
  {
    id: 'vien-uong-duong-nao-ong-quan',
    name: 'Viên uống dưỡng não ông quan',
    description: 'Viên uống dưỡng não từ thương hiệu Ông Quan, hỗ trợ trí nhớ và sức khỏe não bộ.',
    detailedDescription: `Viên uống dưỡng não Ông Quan là sản phẩm cao cấp được bào chế từ các dược liệu quý, hỗ trợ sức khỏe não bộ và cải thiện trí nhớ.

**Thành phần:**
- Các dược liệu bổ não
- Vitamin và khoáng chất
- Thành phần tự nhiên

**Công dụng:**
- Cải thiện trí nhớ và khả năng tập trung
- Tăng cường tuần hoàn máu não
- Hỗ trợ sức khỏe não bộ
- Giảm căng thẳng, mệt mỏi
- Cải thiện chất lượng giấc ngủ
- Tăng cường sức khỏe tổng thể

**Đối tượng sử dụng:**
- Người hay quên, suy giảm trí nhớ
- Học sinh, sinh viên
- Người làm việc trí óc căng thẳng
- Người cao tuổi

**Cách sử dụng:**
- Uống theo hướng dẫn trên bao bì
- Nên uống vào buổi sáng
- Kiên trì sử dụng để đạt hiệu quả

**Xuất xứ:** Hàn Quốc
**Thương hiệu:** Ông Quan`,
    image: '',
    category: 'Thực phẩm chức năng'
  }
];

