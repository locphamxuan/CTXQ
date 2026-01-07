// Service to automatically generate news articles about different topics

const newsTemplates = {
  'sam-han-quoc': [
    {
      title: 'Nhân sâm Hàn Quốc 6 năm tuổi: Bí quyết chọn mua và sử dụng đúng cách',
      summary: 'Hướng dẫn chi tiết cách phân biệt nhân sâm thật giả, cách bảo quản và sử dụng nhân sâm để đạt hiệu quả tốt nhất cho sức khỏe.',
      category: 'sam-han-quoc'
    },
    {
      title: 'Công dụng của cao hồng sâm đối với sức khỏe người cao tuổi',
      summary: 'Nghiên cứu khoa học về tác dụng của cao hồng sâm trong việc tăng cường miễn dịch, cải thiện trí nhớ và hỗ trợ tim mạch.',
      category: 'sam-han-quoc'
    },
    {
      title: 'Xu hướng sử dụng nhân sâm trong chăm sóc sức khỏe hiện đại',
      summary: 'Các sản phẩm nhân sâm mới nhất trên thị trường và cách kết hợp với chế độ dinh dưỡng để tối ưu hóa lợi ích sức khỏe.',
      category: 'sam-han-quoc'
    },
    {
      title: 'So sánh nhân sâm tươi và nhân sâm chế biến: Loại nào phù hợp với bạn?',
      summary: 'Phân tích chi tiết về ưu nhược điểm của từng loại nhân sâm và gợi ý cách sử dụng phù hợp với từng đối tượng.',
      category: 'sam-han-quoc'
    },
    {
      title: 'Nhân sâm Hàn Quốc - Quà tặng sức khỏe ý nghĩa cho người thân',
      summary: 'Gợi ý các sản phẩm nhân sâm phù hợp làm quà tặng và cách chọn mua sản phẩm chất lượng, chính hãng.',
      category: 'sam-han-quoc'
    }
  ],
  'my-pham': [
    {
      title: 'K-Beauty: Xu hướng làm đẹp từ Hàn Quốc đang thống trị thị trường',
      summary: 'Khám phá các bước skincare chuẩn Hàn Quốc và những sản phẩm mỹ phẩm K-Beauty đang được yêu thích nhất hiện nay.',
      category: 'my-pham'
    },
    {
      title: 'Serum chứa nhân sâm: Bí quyết làm đẹp da từ thiên nhiên',
      summary: 'Tác dụng của nhân sâm trong mỹ phẩm và cách sử dụng serum nhân sâm để có làn da khỏe mạnh, tươi trẻ.',
      category: 'my-pham'
    },
    {
      title: 'Routine chăm sóc da buổi tối với mỹ phẩm K-Beauty',
      summary: 'Hướng dẫn chi tiết quy trình chăm sóc da ban đêm với các sản phẩm mỹ phẩm Hàn Quốc để phục hồi và tái tạo da.',
      category: 'my-pham'
    },
    {
      title: 'Các thành phần "hot" trong mỹ phẩm Hàn Quốc năm 2025',
      summary: 'Tổng hợp những thành phần làm đẹp đang được ưa chuộng trong các sản phẩm mỹ phẩm K-Beauty và lợi ích của chúng.',
      category: 'my-pham'
    },
    {
      title: 'Cách chọn mỹ phẩm phù hợp với từng loại da',
      summary: 'Hướng dẫn chọn lựa sản phẩm mỹ phẩm phù hợp với da dầu, da khô, da nhạy cảm và da hỗn hợp.',
      category: 'my-pham'
    }
  ],
  'thoi-trang': [
    {
      title: 'Thiết kế thời trang theo yêu cầu: Xu hướng cá nhân hóa trong may mặc',
      summary: 'Dịch vụ thiết kế và may đo thời trang theo nhu cầu riêng đang trở thành xu hướng, giúp khách hàng có những bộ trang phục độc đáo, phù hợp với phong cách cá nhân.',
      category: 'thoi-trang'
    },
    {
      title: 'Đồng phục công ty: Thiết kế chuyên nghiệp tạo dấu ấn thương hiệu',
      summary: 'Tầm quan trọng của đồng phục công ty trong việc xây dựng hình ảnh thương hiệu và các yếu tố cần lưu ý khi thiết kế đồng phục.',
      category: 'thoi-trang'
    },
    {
      title: 'Xu hướng thời trang công sở 2025: Thanh lịch và chuyên nghiệp',
      summary: 'Những xu hướng thời trang công sở mới nhất và cách mix & match để tạo phong cách chuyên nghiệp nhưng vẫn thời thượng.',
      category: 'thoi-trang'
    },
    {
      title: 'Chất liệu vải cao cấp trong thiết kế thời trang may đo',
      summary: 'Giới thiệu các loại vải cao cấp phù hợp cho may đo thời trang và cách chọn chất liệu phù hợp với từng loại trang phục.',
      category: 'thoi-trang'
    },
    {
      title: 'Quy trình thiết kế và may đo thời trang chuyên nghiệp',
      summary: 'Từ ý tưởng đến sản phẩm cuối cùng: Quy trình chi tiết của dịch vụ thiết kế và may đo thời trang theo yêu cầu.',
      category: 'thoi-trang'
    }
  ],
  'tu-van-thuong-mai': [
    {
      title: 'Tư vấn thương mại quốc tế: Cơ hội mở rộng thị trường cho doanh nghiệp Việt',
      summary: 'Vai trò của dịch vụ tư vấn thương mại quốc tế trong việc hỗ trợ doanh nghiệp Việt Nam mở rộng ra thị trường quốc tế.',
      category: 'tu-van-thuong-mai'
    },
    {
      title: 'Xuất nhập khẩu: Những thủ tục cần biết khi giao dịch quốc tế',
      summary: 'Hướng dẫn chi tiết về các thủ tục xuất nhập khẩu, giấy tờ cần thiết và cách xử lý các vấn đề thường gặp.',
      category: 'tu-van-thuong-mai'
    },
    {
      title: 'Kết nối đối tác kinh doanh quốc tế: Chiến lược hiệu quả',
      summary: 'Các phương pháp và công cụ hiệu quả để tìm kiếm và kết nối với đối tác kinh doanh trên thị trường quốc tế.',
      category: 'tu-van-thuong-mai'
    },
    {
      title: 'Đàm phán hợp đồng thương mại quốc tế: Những điểm cần lưu ý',
      summary: 'Kinh nghiệm và kỹ năng cần thiết khi đàm phán hợp đồng thương mại quốc tế để đảm bảo lợi ích cho doanh nghiệp.',
      category: 'tu-van-thuong-mai'
    },
    {
      title: 'Quản lý rủi ro trong thương mại quốc tế: Giải pháp toàn diện',
      summary: 'Các loại rủi ro trong giao dịch thương mại quốc tế và cách quản lý, giảm thiểu rủi ro hiệu quả.',
      category: 'tu-van-thuong-mai'
    }
  ]
};

function generateNewsArticles(category, count = 10) {
  const templates = newsTemplates[category] || [];
  const articles = [];
  
  // Generate articles with unique IDs based on template index
  for (let i = 0; i < count && i < templates.length; i++) {
    const template = templates[i];
    // Use consistent ID based on category and index for better tracking
    const baseId = `${category}-${i}`;
    const daysAgo = Math.floor(Math.random() * 30); // Random trong 30 ngày gần đây
    const publishedDate = new Date();
    publishedDate.setDate(publishedDate.getDate() - daysAgo);
    
    articles.push({
      id: baseId,
      title: template.title,
      summary: template.summary,
      category: template.category,
      image: null,
      publishedAt: publishedDate.toISOString().split('T')[0]
    });
  }
  
  return articles;
}

function getAllLatestNews() {
  const allNews = [];
  
  // Generate news for each category - generate all available templates
  Object.keys(newsTemplates).forEach(category => {
    const templates = newsTemplates[category] || [];
    const articles = generateNewsArticles(category, templates.length);
    allNews.push(...articles);
  });
  
  // Sort by published date (newest first)
  allNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  return allNews;
}

function getNewsByCategory(category) {
  if (!category || !newsTemplates[category]) {
    return getAllLatestNews();
  }
  
  return generateNewsArticles(category, newsTemplates[category].length);
}

module.exports = {
  generateNewsArticles,
  getAllLatestNews,
  getNewsByCategory,
  newsTemplates
};

