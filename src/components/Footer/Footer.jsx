import './Footer.css';
import logoSrc from '../../assets/icons/logo.svg';
import instagramSrc from '../../assets/icons/instagram.svg';
import twitterSrc from '../../assets/icons/twitter.svg';
import youtubeSrc from '../../assets/icons/youtube.svg';

const companyLinks = ['Home', 'Order', 'FAQ', 'Contact'];
const templateLinks = ['Style Guide', 'Changelog', 'Licence', 'Webflow University'];
const flowbaseLinks = ['More Cloneables'];
const socialMedia = [
  { name: 'Instagram', icon: instagramSrc, url: '#' },
  { name: 'Twitter', icon: twitterSrc, url: '#' },
  { name: 'YouTube', icon: youtubeSrc, url: '#' }
];

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-background"></div>
      <div className="footer-container">
        
        <div className="footer-content">
  
          <div className="footer-brand">
            <img src={logoSrc} alt="Logo" className="footer-logo" />
            <p className="footer-description">
              Takeaway & Delivery template for small - medium businesses.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">COMPANY</h4>
              <ul className="footer-link-list">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">TEMPLATE</h4>
              <ul className="footer-link-list">
                {templateLinks.map((link) => (
                  <li key={link}>
                    <a href="https://www.google.com/" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">FLOWBASE</h4>
              <ul className="footer-link-list">
                {flowbaseLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            Built by <span className="credit-highlight">Flowbase</span>. Powered by <span className="credit-highlight">Webflow</span>
          </p>
          
          <div className="footer-social">
            {socialMedia.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                className="social-link"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} className="social-icon" />
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;