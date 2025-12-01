import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';
import { contactInfo } from '../data/mockContent';

export default function ContactPage() {
  return (
    <div className="contact">
      <SectionHeading
        eyebrow="Liên hệ"
        title="Kết nối với chúng tôi"
        description="Đội ngũ chuyên gia sẵn sàng tư vấn giải pháp phù hợp trong vòng 24 giờ làm việc."
        align="center"
      />
      <div className="contact__info">
        <div>
          <h4>Thông tin</h4>
          <p>{contactInfo.address}</p>
          <p>Điện thoại: {contactInfo.phone}</p>
          <p>Email: {contactInfo.email}</p>
          <ContactForm />
        </div>
        <div className="contact__map">
          <iframe
            title="Bản đồ"
            src={contactInfo.mapSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

