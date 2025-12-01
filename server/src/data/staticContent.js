const businessDomains = [
  {
    id: 'ginseng-beauty',
    title: 'Sâm & Mỹ phẩm Hàn Quốc',
    summary:
      'Phân phối sâm chính hãng, thực phẩm chức năng và mỹ phẩm cao cấp trực tiếp từ Hàn Quốc.',
    quickLinks: ['Sâm cao cấp', 'Thực phẩm chức năng', 'Skincare', 'Makeup'],
    products: [
      {
        id: 'red-ginseng-premium',
        name: 'Hồng sâm 6 năm tuổi',
        category: 'Sâm',
        price: 3200000,
        rating: 4.9,
        badge: 'Bestseller',
        description:
          'Tinh chất cô đặc 6 năm tuổi giúp phục hồi năng lượng và tăng cường miễn dịch.',
        image:
          'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'k-beauty-serum',
        name: 'Serum tái tạo da K-Beauty',
        category: 'Chăm sóc da',
        price: 890000,
        rating: 4.8,
        badge: 'Ưu đãi mới',
        description:
          'Phức hợp peptide và nhân sâm đen hỗ trợ tái tạo và làm sáng da.',
        image:
          'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=800&q=80'
      }
    ],
    blog: [
      {
        id: 'beauty-blog-1',
        title: '5 bước chăm da với mỹ phẩm nhân sâm',
        readingTime: '8 phút',
        image:
          'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'health-blog-1',
        title: 'Nhân sâm giúp tái tạo năng lượng ra sao?',
        readingTime: '6 phút',
        image:
          'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
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

const heroContent = {
  headline: 'Kết nối giá trị Á Đông – Nâng tầm trải nghiệm sống',
  subheadline:
    'Tập đoàn đa ngành dẫn đầu trong 3 lĩnh vực: Sâm & Mỹ phẩm, May mặc, Tư vấn tài chính – thương mại.',
  ctaPrimary: { label: 'Khám phá ngay', href: '/linh-vuc' },
  ctaSecondary: { label: 'Liên hệ tư vấn', href: '/lien-he' },
  stats: [
    { id: 'years', value: '12+', label: 'Năm phát triển' },
    { id: 'clients', value: '3.500+', label: 'Khách hàng doanh nghiệp' },
    { id: 'partners', value: '18', label: 'Đối tác quốc tế' }
  ]
};

const missionContent = {
  mission:
    'Lan tỏa sức khỏe, phong cách và tri thức tài chính Á Đông bằng hệ sinh thái giải pháp toàn diện.',
  values: [
    { id: 'authenticity', title: 'Chất lượng chuẩn gốc', detail: '100% sản phẩm và dịch vụ được kiểm định nghiêm ngặt.' },
    { id: 'innovation', title: 'Đổi mới có chọn lọc', detail: 'Ứng dụng công nghệ số trong quản lý và chăm sóc khách hàng.' },
    { id: 'partnership', title: 'Đồng hành bền vững', detail: 'Xây dựng mối quan hệ lâu dài với khách hàng và đối tác.' }
  ],
  differentiators: [
    'Chuỗi cung ứng khép kín từ Hàn Quốc đến Việt Nam',
    'Đội ngũ chuyên gia đa ngôn ngữ tại 3 quốc gia',
    'Dịch vụ tư vấn cá nhân hóa theo ngành'
  ]
};

const newsHighlights = [
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

const aboutContent = {
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

const blogCategories = ['ginseng-beauty', 'garment', 'finance-consulting'];

module.exports = {
  heroContent,
  missionContent,
  newsHighlights,
  aboutContent,
  businessDomains,
  blogCategories
};

