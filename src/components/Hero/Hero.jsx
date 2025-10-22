import './Hero.css';
import trustpilotSrc from '../../assets/icons/hero-trustpilot.svg';
import heroImageSrc from '../../assets/images/hero-food.png';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background-shape"></div>
      <div className="hero-container">
        
        <div className="hero-content">
          <h1 className="hero-title">
            Beautiful food & takeaway, <span className="hero-title-highlight">delivered</span> to your door.
          </h1>
          
          <p className="hero-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
          </p>
          
          <button className="hero-cta-button">
            Place an Order
          </button>
          
          <div className="hero-trustpilot">
            <div className="trustpilot-section">
              <img src={trustpilotSrc} alt="Trustpilot" className="trustpilot-logo" />
              <div className="trustpilot-rating">
                <p className="rating-text"><span className="rating-score">4.8 out of 5 </span>
              based on 2000+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImageSrc} alt="Delicious food and mobile ordering" className="hero-main-image" />
        </div>
        
      </div>
    </section>
  );
}

export default Hero;