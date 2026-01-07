import SectionHeading from '../components/SectionHeading';

export default function AboutPage() {
  return (
    <div className="about">
      <SectionHeading
        eyebrow="Về chúng tôi"
        title="Công ty Xuân Quỳnh"
        description="Đơn vị chuyên cung cấp các sản phẩm và dịch vụ chất lượng cao trong nhiều lĩnh vực"
        align="center"
      />

      <section className="about__intro">
        <div className="about__intro-content">
          <h2>Giới thiệu chung</h2>
          <p>
            Công ty Xuân Quỳnh là một doanh nghiệp đa ngành nghề, chuyên cung cấp các sản phẩm 
            và dịch vụ chất lượng cao phục vụ nhu cầu đa dạng của khách hàng. Với phương châm 
            "Chất lượng - Uy tín - Tận tâm", chúng tôi cam kết mang đến những giải pháp tốt nhất 
            cho khách hàng trong các lĩnh vực: thực phẩm chức năng, mỹ phẩm, thời trang và tư vấn 
            thương mại quốc tế.
          </p>
        </div>
      </section>

      <section className="about__domains">
        <SectionHeading
          eyebrow="Lĩnh vực hoạt động"
          title="4 trụ cột kinh doanh chính"
          description="Đa dạng sản phẩm và dịch vụ đáp ứng mọi nhu cầu của khách hàng"
          align="center"
        />

        <div className="about__domains-grid">
          <div className="about__domain-card">
            <div className="about__domain-icon">🌿</div>
            <h3>Bán sâm Hàn Quốc</h3>
            <p>
              Chuyên cung cấp các sản phẩm nhân sâm Hàn Quốc chính hãng, chất lượng cao. 
              Chúng tôi nhập khẩu trực tiếp từ các nhà sản xuất uy tín tại Hàn Quốc, đảm bảo 
              nguồn gốc xuất xứ rõ ràng và chất lượng sản phẩm tốt nhất. Sản phẩm của chúng tôi 
              bao gồm: cao hồng sâm, tinh chất hồng sâm, nhân sâm tươi, và các sản phẩm chế biến 
              từ nhân sâm khác.
            </p>
            <ul>
              <li>Nhân sâm 6 năm tuổi chính hãng</li>
              <li>Đầy đủ tem chống giả và giấy tờ nhập khẩu</li>
              <li>Tư vấn sử dụng miễn phí</li>
              <li>Giao hàng toàn quốc</li>
            </ul>
          </div>

          <div className="about__domain-card">
            <div className="about__domain-icon">💄</div>
            <h3>Mỹ phẩm K-Beauty</h3>
            <p>
              Cung cấp các sản phẩm mỹ phẩm K-Beauty chính hãng từ Hàn Quốc. Chúng tôi mang đến 
              những thương hiệu mỹ phẩm nổi tiếng, được yêu thích tại thị trường Hàn Quốc và 
              quốc tế. Tất cả sản phẩm đều được nhập khẩu chính ngạch, đảm bảo chất lượng và an toàn 
              cho người sử dụng.
            </p>
            <ul>
              <li>Mỹ phẩm chính hãng từ Hàn Quốc</li>
              <li>Đa dạng thương hiệu và sản phẩm</li>
              <li>Phù hợp với mọi loại da</li>
              <li>Giá cả cạnh tranh</li>
            </ul>
          </div>

          <div className="about__domain-card">
            <div className="about__domain-icon">👗</div>
            <h3>Thiết kế thời trang theo nhu cầu</h3>
            <p>
              Dịch vụ thiết kế và may đo thời trang theo yêu cầu riêng của từng khách hàng. 
              Chúng tôi chuyên thiết kế và sản xuất các sản phẩm thời trang như: áo sơ mi, 
              vest, đầm, quần áo công sở, đồng phục công ty, và các sản phẩm may đo khác. 
              Đội ngũ thiết kế giàu kinh nghiệm sẽ tư vấn và tạo ra những sản phẩm phù hợp 
              nhất với phong cách và nhu cầu của bạn.
            </p>
            <ul>
              <li>Thiết kế theo yêu cầu riêng</li>
              <li>May đo chính xác, vừa vặn</li>
              <li>Chất liệu cao cấp, đa dạng</li>
              <li>Thời gian giao hàng nhanh chóng</li>
            </ul>
          </div>

          <div className="about__domain-card">
            <div className="about__domain-icon">🌐</div>
            <h3>Tư vấn thương mại quốc tế</h3>
            <p>
              Cung cấp dịch vụ tư vấn và hỗ trợ các doanh nghiệp trong hoạt động thương mại quốc tế. 
              Chúng tôi hỗ trợ khách hàng trong việc: tìm kiếm đối tác kinh doanh, đàm phán hợp đồng, 
              xử lý thủ tục xuất nhập khẩu, và các dịch vụ liên quan đến thương mại quốc tế. 
              Với mạng lưới đối tác rộng khắp, chúng tôi có thể kết nối bạn với các cơ hội kinh doanh 
              trên toàn thế giới.
            </p>
            <ul>
              <li>Tư vấn chiến lược xuất nhập khẩu</li>
              <li>Kết nối đối tác kinh doanh</li>
              <li>Hỗ trợ thủ tục hải quan</li>
              <li>Dịch vụ đàm phán và ký kết hợp đồng</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about__values">
        <SectionHeading
          eyebrow="Giá trị cốt lõi"
          title="Cam kết của chúng tôi"
          align="center"
        />
        <div className="about__values-grid">
          <div className="about__value-item">
            <h4>Chất lượng</h4>
            <p>Chúng tôi cam kết chỉ cung cấp những sản phẩm và dịch vụ chất lượng cao nhất, đảm bảo sự hài lòng của khách hàng.</p>
          </div>
          <div className="about__value-item">
            <h4>Uy tín</h4>
            <p>Xây dựng niềm tin với khách hàng thông qua sự minh bạch, trung thực trong mọi giao dịch và cam kết.</p>
          </div>
          <div className="about__value-item">
            <h4>Tận tâm</h4>
            <p>Đặt khách hàng làm trung tâm, luôn lắng nghe và phục vụ với tinh thần tận tâm, chuyên nghiệp.</p>
          </div>
          <div className="about__value-item">
            <h4>Đổi mới</h4>
            <p>Không ngừng cải tiến và đổi mới để mang đến những giải pháp tốt nhất, phù hợp với xu hướng thị trường.</p>
          </div>
        </div>
      </section>

      <section className="about__contact-cta">
        <div className="about__contact-content">
          <h2>Liên hệ với chúng tôi</h2>
          <p>
            Bạn có nhu cầu về sản phẩm hoặc dịch vụ của chúng tôi? Hãy liên hệ ngay để được tư vấn 
            và hỗ trợ tốt nhất!
          </p>
          <a href="/lien-he" className="btn btn--primary">
            Liên hệ ngay
          </a>
        </div>
      </section>
    </div>
  );
}

