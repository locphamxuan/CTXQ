import type {
  AboutContent,
  BlogPost,
  BusinessDomain,
  ContactInfo,
  HeroContent,
  MissionContent,
  NewsItem,
  SpecialtyPageContent
} from '../types/content';

export const heroContent: HeroContent = {
  headline: 'Kết nối giá trị Á Đông – Nâng tầm trải nghiệm sống',
  subheadline:
    'Tập đoàn đa ngành dẫn đầu 3 lĩnh vực: Sâm & Mỹ phẩm, May mặc, Tư vấn tài chính – thương mại.',
  ctaPrimary: { label: 'Khám phá lĩnh vực', href: '/linh-vuc' },
  ctaSecondary: { label: 'Nhận tư vấn', href: '/lien-he' },
  stats: [
    { id: 'years', value: '12+', label: 'Năm phát triển' },
    { id: 'clients', value: '3.500+', label: 'Khách hàng doanh nghiệp' },
    { id: 'partners', value: '18', label: 'Đối tác quốc tế' }
  ]
};

export const missionContent: MissionContent = {
  mission:
    'Lan tỏa sức khỏe, phong cách và tri thức tài chính Á Đông bằng hệ sinh thái giải pháp toàn diện.',
  values: [
    {
      id: 'authenticity',
      title: 'Chất lượng chuẩn gốc',
      detail: '100% sản phẩm và dịch vụ được kiểm định nghiêm ngặt.'
    },
    {
      id: 'innovation',
      title: 'Đổi mới có chọn lọc',
      detail: 'Ứng dụng công nghệ số trong quản lý và chăm sóc khách hàng.'
    },
    {
      id: 'partnership',
      title: 'Đồng hành bền vững',
      detail: 'Xây dựng mối quan hệ lâu dài với khách hàng và đối tác.'
    }
  ],
  differentiators: [
    'Chuỗi cung ứng khép kín từ Hàn Quốc đến Việt Nam',
    'Đội ngũ chuyên gia đa ngôn ngữ tại 3 quốc gia',
    'Dịch vụ tư vấn cá nhân hóa theo ngành'
  ]
};

export const newsHighlights: NewsItem[] = [
  {
    id: 'promo-1',
    title: 'Tuần lễ vàng nhân sâm: ưu đãi đến 25%',
    category: 'Ưu đãi đặc biệt',
    publishedAt: '2025-11-15'
  },
  {
    id: 'blog-1',
    title: 'Xu hướng chất liệu bền vững 2025',
    category: 'Tin tức',
    publishedAt: '2025-10-30'
  },
  {
    id: 'blog-2',
    title: 'Checklist quản trị tài chính cuối năm',
    category: 'Chuyên sâu',
    publishedAt: '2025-10-12'
  }
];

export const aboutContent: AboutContent = {
  story:
    'Bắt đầu từ showroom nhỏ tại Seoul năm 2013, chúng tôi mở rộng sang Việt Nam với khát vọng mang lại giải pháp toàn diện cho sức khỏe, phong cách và tài chính.',
  timeline: [
    { year: 2013, event: 'Ra mắt thương hiệu Sâm & Mỹ phẩm tại Seoul' },
    { year: 2017, event: 'Thành lập xưởng may riêng tại TP.HCM' },
    { year: 2021, event: 'Mở rộng sang tư vấn tài chính & thương mại' }
  ],
  vision:
    'Trở thành biểu tượng của lối sống Á Đông hiện đại thông qua hệ sinh thái đa ngành liền mạch.',
  mission: missionContent.mission,
  values: missionContent.values,
  founders: [
    {
      id: 'founder-1',
      name: 'Nguyễn Lâm Anh',
      role: 'CEO & Founder',
      expertise: '15 năm FMCG & Luxury retail'
    },
    {
      id: 'founder-2',
      name: 'Park Ji-hoon',
      role: 'Co-founder, Phụ trách chuỗi cung ứng',
      expertise: 'Quan hệ đối tác Hàn Quốc – Việt Nam'
    }
  ]
};

export const businessDomains: BusinessDomain[] = [
  {
    id: 'garment',
    title: 'May mặc',
    summary:
      'Xưởng may với đội ngũ thiết kế riêng, chuyên về thời trang doanh nghiệp và bộ sưu tập cao cấp.',
    quickLinks: [
      'Thời trang nam',
      'Thời trang nữ',
      'Đồng phục',
      'Thiết kế riêng'
    ],
    collections: [
      {
        id: 'lookbook-ss25',
        title: 'Lookbook SS25 - Modern Heritage',
        description:
          'Tone màu đất phối kỹ thuật cắt may 3D tạo hình khối tinh tế.',
        image:
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'uniform-collection',
        title: 'Giải pháp đồng phục doanh nghiệp',
        description:
          'Thiết kế theo nhận diện thương hiệu, tối ưu chất liệu cho môi trường làm việc.',
        image:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80'
      }
    ],
    services: {
      highlights: [
        'Tư vấn thiết kế độc quyền',
        'Quy trình đo may tại văn phòng khách hàng',
        'Cam kết giao hàng đúng hẹn cho đơn lớn'
      ],
      formFields: [
        { id: 'company', label: 'Tên doanh nghiệp', type: 'text' },
        { id: 'contactName', label: 'Người liên hệ', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'requirements', label: 'Nhu cầu thiết kế', type: 'textarea' }
      ]
    }
  },
  {
    id: 'finance-consulting',
    title: 'Tư vấn tài chính – thương mại',
    summary:
      'Đồng hành cùng doanh nghiệp trong chiến lược đầu tư, quản trị vốn và mở rộng thương mại quốc tế.',
    quickLinks: [
      'Tư vấn đầu tư',
      'Quản lý tài chính',
      'Xuất nhập khẩu',
      'Đào tạo doanh nghiệp'
    ],
    services: [
      {
        id: 'investment-advisory',
        title: 'Tư vấn đầu tư',
        description:
          'Xây dựng danh mục đa dạng với phân tích định lượng và dữ liệu thị trường cập nhật.'
      },
      {
        id: 'treasury',
        title: 'Quản lý tài chính doanh nghiệp',
        description:
          'Thiết kế cấu trúc vốn, dòng tiền và giải pháp quản trị rủi ro.'
      }
    ],
    experts: [
      {
        id: 'expert-1',
        name: 'Trần Minh Khôi',
        title: 'Chuyên gia tài chính cấp cao',
        experience: '15 năm tại Big4 & quỹ đầu tư',
        avatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'expert-2',
        name: 'Grace Han',
        title: 'Cố vấn thương mại quốc tế',
        experience: 'Mạng lưới đối tác tại 7 quốc gia',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80'
      }
    ],
    insights: [
      {
        id: 'finance-insight-1',
        title: 'Xu hướng huy động vốn 2025',
        tag: 'Phân tích thị trường',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'finance-insight-2',
        title: 'Checklist quản trị dòng tiền SME',
        tag: 'Mẹo tài chính',
        image:
          'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  }
];

export const ginsengPageContent: SpecialtyPageContent = {
  hero: {
    eyebrow: 'Thực phẩm chức năng',
    title: 'Nhân sâm Hàn Quốc chuẩn Ginseng Board',
    description:
      'Bộ sưu tập hồng sâm 6 năm tuổi, tinh chất và thực phẩm chức năng gia tăng đề kháng cho gia đình hiện đại.',
    stats: [
      { id: 'farms', value: '12', label: 'Nông trại liên kết' },
      { id: 'premium', value: '28+', label: 'SKU cao cấp' }
    ]
  },
  highlights: [
    'Quy trình hấp – sấy chuẩn GMP, giữ trọn saponin thiên nhiên',
    'Truy xuất nguồn gốc QR từ nông trại Geumsan',
    'Chuyên gia tư vấn phác đồ bồi bổ riêng cho từng độ tuổi'
  ],
  products: [
    {
      id: 'red-ginseng-premium',
      name: 'Hồng sâm 6 năm tuổi',
      category: 'Tinh chất cô đặc',
      price: 3200000,
      rating: 4.9,
      badge: 'Bestseller',
      description:
        'Tinh chất 30% saponin, hỗ trợ miễn dịch và phục hồi thể lực.',
      image:
        'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=800&q=80',
      benefits: ['Giảm mệt mỏi', 'Ổn định huyết áp', 'Tăng cường trí nhớ']
    },
    {
      id: 'ginseng-tea',
      name: 'Trà hồng sâm lát mật ong',
      category: 'Đồ uống chăm sóc sức khỏe',
      price: 690000,
      description:
        'Lát sâm tẩm mật ong hoa rừng, tiện lợi cho dân văn phòng.',
      image:
        'https://images.unsplash.com/photo-1430163393927-3dab9af7ea38?auto=format&fit=crop&w=800&q=80',
      benefits: ['Tăng tập trung', 'Giảm stress', 'Chống oxy hóa']
    }
  ],
  articles: [
    {
      id: 'health-blog-1',
      title: 'Nhân sâm giúp tái tạo năng lượng ra sao?',
      summary: 'Cơ chế saponin và ginsenoside đối với cơ thể.',
      category: 'ginseng-beauty',
      image:
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2025-08-06'
    },
    {
      id: 'health-blog-2',
      title: '3 bí quyết chọn sâm tươi đúng chuẩn',
      summary: 'Phân biệt theo năm tuổi, màu sắc và mùi hương.',
      category: 'ginseng-beauty',
      image:
        'https://images.unsplash.com/photo-1505576391880-b3f9d713dc02?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2025-07-18'
    }
  ]
};

export const cosmeticsPageContent: SpecialtyPageContent = {
  hero: {
    eyebrow: 'Mỹ phẩm',
    title: 'Skincare K-Beauty kết hợp nhân sâm đen',
    description:
      'Dòng sản phẩm chăm da, trang điểm tối giản nhưng giàu hoạt chất, phù hợp khí hậu nhiệt đới.',
    stats: [
      { id: 'labs', value: '4', label: 'Phòng lab đối tác' },
      { id: 'routine', value: '5 bước', label: 'Chu trình tiêu chuẩn' }
    ]
  },
  highlights: [
    'Công thức độc quyền kết hợp ginsenoside Rg3 và peptide',
    'Không hương liệu tổng hợp, đạt chứng nhận EWG Green',
    'Hỗ trợ build routine cá nhân qua ứng dụng SkinCoach'
  ],
  products: [
    {
      id: 'k-beauty-serum',
      name: 'Serum tái tạo da K-Beauty',
      category: 'Serum',
      price: 890000,
      badge: 'Ưu đãi mới',
      description: 'Phức hợp peptide và nhân sâm đen hỗ trợ tái tạo và làm sáng da.',
      image:
        'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=800&q=80',
      benefits: ['Làm sáng', 'Giảm nám', 'Phục hồi barrier']
    },
    {
      id: 'cushion-glow',
      name: 'Cushion Glow 24h',
      category: 'Trang điểm',
      price: 720000,
      description: 'Độ che phủ trung bình, finish tự nhiên kiềm dầu 8h.',
      image:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      benefits: ['Kiểm soát dầu', 'SPF 35', 'Không xuống tông']
    }
  ],
  rituals: [
    {
      title: 'Chu trình 5 bước buổi sáng',
      steps: ['Sữa rửa mặt pH 5.5', 'Toner cân bằng', 'Serum ginsenoside', 'Kem dưỡng khóa ẩm', 'Cushion + chống nắng']
    },
    {
      title: 'Chăm sóc chuyên sâu mỗi tuần',
      steps: ['Tẩy tế bào chết enzyme', 'Đắp mặt nạ nhân sâm đen', 'Massage nâng cơ bằng Gua Sha']
    }
  ],
  articles: [
    {
      id: 'beauty-blog-1',
      title: '5 bước chăm da với mỹ phẩm nhân sâm',
      summary: 'Quy trình sáng - tối cho da thiếu nước và xỉn màu.',
      category: 'ginseng-beauty',
      image:
        'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2025-09-01'
    },
    {
      id: 'beauty-blog-2',
      title: 'Layering serum thế nào để tránh kích ứng?',
      summary: 'Kết hợp peptide, B5 và retinol an toàn.',
      category: 'ginseng-beauty',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2025-08-20'
    }
  ]
};

export const fashionPageContent: SpecialtyPageContent = {
  hero: {
    eyebrow: 'Thời trang',
    title: 'Xưởng may Xuân Quỳnh',
    description:
      'Xưởng may chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực may mặc, đồng phục và thời trang. Cam kết chất lượng và dịch vụ tốt nhất cho khách hàng.',
    stats: [
      { id: 'experience', value: '10+', label: 'Năm kinh nghiệm' },
      { id: 'clients', value: '500+', label: 'Khách hàng tin tưởng' }
    ]
  },
  highlights: [
    'Đội ngũ thợ may lành nghề với nhiều năm kinh nghiệm',
    'Quy trình sản xuất chuyên nghiệp, đảm bảo chất lượng từng sản phẩm',
    'Nhận may theo yêu cầu, từ đồng phục đến thời trang cao cấp',
    'Giá cả hợp lý, giao hàng đúng hẹn'
  ],
  products: [
    {
      id: 'uniform-service',
      name: 'Dịch vụ may đồng phục',
      category: 'Dịch vụ',
      description:
        'Chuyên may đồng phục công ty, trường học, bệnh viện với chất lượng cao và giá cả hợp lý. Nhận may số lượng lớn, giao hàng nhanh chóng.',
      image:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      benefits: ['May theo mẫu', 'Tư vấn thiết kế']
    },
    {
      id: 'custom-tailoring',
      name: 'May đo theo yêu cầu',
      category: 'Dịch vụ',
      description:
        'Nhận may đo quần áo, váy đầm, áo sơ mi theo yêu cầu của khách hàng. Đảm bảo vừa vặn, đẹp mắt và chất lượng tốt nhất.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      benefits: ['May đo chính xác', 'Chất liệu đa dạng']
    }
  ],
  rituals: [
    {
      title: 'Quy trình đặt may tại xưởng',
      steps: [
        'Tư vấn và chọn mẫu, chất liệu phù hợp',
        'Đo kích thước và ghi nhận yêu cầu chi tiết',
        'Cắt may và hoàn thiện sản phẩm',
        'Kiểm tra chất lượng và giao hàng cho khách'
      ]
    }
  ],
  articles: [
    {
      id: 'sewing-tips-1',
      title: 'Cách chọn chất liệu vải phù hợp cho đồng phục',
      summary: 'Hướng dẫn chọn vải chất lượng tốt, bền đẹp và phù hợp với môi trường làm việc.',
      category: 'thoi-trang',
      image:
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
      publishedAt: '2025-10-02'
    },
    {
      id: 'sewing-tips-2',
      title: 'Bảo quản và giặt đồ may đúng cách',
      summary: 'Những lưu ý quan trọng để giữ quần áo may luôn bền đẹp và mới như ban đầu.',
      category: 'thoi-trang',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      publishedAt: '2025-08-30'
    }
  ]
};

export const consultingPageContent: SpecialtyPageContent = {
  hero: {
    eyebrow: 'Tư vấn đầu tư',
    title: 'Trung tâm tư vấn đầu tư chuyên nghiệp',
    description:
      'Đồng hành cùng nhà đầu tư và doanh nghiệp trong việc xây dựng danh mục đầu tư, phân tích thị trường và tối ưu hóa lợi nhuận.',
    stats: [
      { id: 'experts', value: '20+', label: 'Chuyên gia đầu tư' },
      { id: 'markets', value: '10+', label: 'Lĩnh vực đầu tư' }
    ]
  },
  highlights: [
    'Phân tích thị trường và đánh giá cơ hội đầu tư theo thời gian thực',
    'Tư vấn xây dựng danh mục đầu tư đa dạng và cân bằng rủi ro',
    'Hỗ trợ quản lý tài sản và tối ưu hóa lợi nhuận đầu tư'
  ],
  products: [
    {
      id: 'portfolio-management',
      name: 'Quản lý danh mục đầu tư',
      category: 'Dịch vụ',
      description:
        'Thiết kế và quản lý danh mục đầu tư đa dạng, phân bổ tài sản hợp lý và theo dõi hiệu quả đầu tư.',
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
      benefits: ['Phân tích rủi ro', 'Báo cáo hiệu quả đầu tư']
    },
    {
      id: 'market-analysis',
      name: 'Phân tích thị trường đầu tư',
      category: 'Dịch vụ',
      description:
        'Nghiên cứu và phân tích xu hướng thị trường, đánh giá tiềm năng đầu tư và đưa ra khuyến nghị chiến lược.',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
      benefits: ['Báo cáo thị trường', 'Dự báo xu hướng']
    }
  ],
  articles: [
    {
      id: 'investment-trends-2025',
      title: 'Xu hướng đầu tư năm 2025',
      summary: 'Những lĩnh vực đầu tư tiềm năng và cơ hội sinh lời trong năm tới.',
      category: 'tu-van-thuong-mai',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
      publishedAt: '2025-09-14'
    },
    {
      id: 'portfolio-optimization',
      title: 'Tối ưu hóa danh mục đầu tư',
      summary: 'Chiến lược phân bổ tài sản và quản lý rủi ro hiệu quả cho nhà đầu tư.',
      category: 'tu-van-thuong-mai',
      image:
        'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1000&q=80',
      publishedAt: '2025-08-22'
    }
  ]
};

export const blogPosts: BlogPost[] = [
  {
    id: 'beauty-guide-1',
    title: 'Routine chăm da 24h với nhân sâm đen',
    summary: 'Bí quyết kết hợp sâm và peptide để phục hồi da sau 5 ngày.',
    category: 'ginseng-beauty',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2025-09-12'
  },
  {
    id: 'garment-insight-1',
    title: 'Xu hướng chất liệu bền vững 2025',
    summary: 'Các dòng vải recycle và giải pháp quản lý vòng đời đồng phục.',
    category: 'garment',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2025-10-02'
  },
  {
    id: 'investment-guide-1',
    title: 'Hướng dẫn đầu tư cho người mới bắt đầu',
    summary: 'Những kiến thức cơ bản và chiến lược đầu tư hiệu quả cho người mới.',
    category: 'tu-van-thuong-mai',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2025-10-25'
  }
];

export const contactInfo: ContactInfo = {
  address: 'Lô D39 KDC Tân Tiến P.Tân Thới Hiệp Q12',
  phone: '0903066233 (Như Quỳnh)',
  email: 'phamxuanloc443@gmail.com',
  mapSrc:
'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d489.80288298347244!2d106.64486583888588!3d10.855391799723941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1764682579926!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
};

