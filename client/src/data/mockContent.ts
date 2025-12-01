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
    title: 'Xưởng may Mayur Atelier',
    description:
      'Giải pháp lookbook, đồng phục và thiết kế riêng đồng bộ nhận diện thương hiệu.',
    stats: [
      { id: 'atelier', value: '2', label: 'Xưởng chuẩn LEAN' },
      { id: 'clients', value: '120+', label: 'Doanh nghiệp đồng hành' }
    ]
  },
  highlights: [
    'Đội ngũ thiết kế từng làm việc tại Seoul Fashion Week',
    'Quy trình đo may tận nơi cho tập thể trên 50 người',
    'Chủ động nguyên liệu: bamboo cotton, recycled polyester'
  ],
  products: [
    {
      id: 'lookbook-ss25',
      name: 'Lookbook SS25 - Modern Heritage',
      category: 'Bộ sưu tập',
      description:
        'Phong cách heritage phối kỹ thuật cắt 3D giúp tạo hình khối chuẩn chỉnh trong mọi chuyển động.',
      image:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      benefits: ['Tư vấn styling', 'Độc quyền mẫu rập']
    },
    {
      id: 'uniform-suite',
      name: 'Đồng phục doanh nghiệp Premium',
      category: 'Dịch vụ đặt may',
      description:
        'Gói tư vấn từ moodboard, phát triển chất liệu đến giao hàng với SLA 30 ngày cho đơn hàng 1.000 bộ.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      benefits: ['Quản lý size chart online', 'Tùy chọn kháng khuẩn']
    }
  ],
  rituals: [
    {
      title: 'Quy trình đặt may doanh nghiệp',
      steps: [
        'Workshop khám phá văn hóa thương hiệu',
        'Phát triển moodboard & phê duyệt mẫu thử',
        'Đo tại chỗ và nhập số đo qua portal',
        'Sản xuất – QC – bàn giao đồng phục'
      ]
    }
  ],
  articles: [
    {
      id: 'garment-insight-1',
      title: 'Xu hướng chất liệu bền vững 2025',
      summary: 'Các dòng vải recycle đi kèm chứng nhận.',
      category: 'garment',
      image:
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
      publishedAt: '2025-10-02'
    },
    {
      id: 'garment-insight-2',
      title: '5 tips xây dựng đồng phục truyền cảm hứng',
      summary: 'Tư duy màu sắc, form dáng và vật liệu.',
      category: 'garment',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      publishedAt: '2025-08-30'
    }
  ]
};

export const consultingPageContent: SpecialtyPageContent = {
  hero: {
    eyebrow: 'Tư vấn thương mại quốc tế',
    title: 'Trung tâm giải pháp tài chính – trading hub',
    description:
      'Đồng hành cùng doanh nghiệp Việt mở rộng ra thị trường châu Á thông qua tư vấn vốn, quản trị rủi ro và logistics.',
    stats: [
      { id: 'experts', value: '15', label: 'Chuyên gia đa ngành' },
      { id: 'markets', value: '7', label: 'Quốc gia đối tác' }
    ]
  },
  highlights: [
    'Phân tích định lượng bằng dữ liệu thị trường cập nhật hằng tuần',
    'Kết nối hệ sinh thái ngân hàng – bảo hiểm – logistics',
    'Chương trình cố vấn 1:1 cho lãnh đạo SMEs'
  ],
  products: [
    {
      id: 'investment-advisory',
      name: 'Tư vấn đầu tư',
      category: 'Dịch vụ',
      description:
        'Thiết kế danh mục vốn, tối ưu chi phí sử dụng vốn lưu động và kênh huy động quốc tế.',
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
      benefits: ['Phân tích scenario', 'Dashboard KPI realtime']
    },
    {
      id: 'treasury',
      name: 'Quản lý tài chính doanh nghiệp',
      category: 'Dịch vụ',
      description:
        'Xây dựng cấu trúc dòng tiền, policy kiểm soát FX và kế hoạch bảo hiểm rủi ro thương mại.',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
      benefits: ['Cố vấn onsite', 'Tài liệu chuẩn IFRS']
    }
  ],
  articles: [
    {
      id: 'finance-insight-1',
      title: 'Xu hướng huy động vốn 2025',
      summary: 'Những kênh vốn thay thế doanh nghiệp nên cân nhắc.',
      category: 'finance-consulting',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
      publishedAt: '2025-09-14'
    },
    {
      id: 'finance-insight-2',
      title: 'Checklist quản trị dòng tiền SME',
      summary: 'Bộ tiêu chí giúp doanh nghiệp giữ thanh khoản ổn định.',
      category: 'finance-consulting',
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
    id: 'finance-playbook-1',
    title: 'Checklist quản trị dòng tiền cho SME cuối năm',
    summary: '3 kênh tín dụng cần chuẩn bị trước mùa cao điểm thương mại.',
    category: 'finance-consulting',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2025-10-25'
  }
];

export const contactInfo: ContactInfo = {
  address: 'Tầng 12, Saigon Centre, Quận 1, TP.HCM',
  phone: '028 1234 5678',
  email: 'hello@multisector.vn',
  mapSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4937619041704!2d106.70042351185303!3d10.773374889352746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f20c49ac3%3A0x9f15e4cd529d5900!2zU2FpZ29uIENlbnRyZSwgMTMxIMSQLiBUaOG7pyBUaOG7qSwgUGjGsOG7nW5nIDEsIFRow6BuaCBwaOG7kSBI4buTIENo4buvLCBWaWV0bmFt!5e0!3m2!1svi!2s!4v1701450000000!5m2!1svi!2s'
};

