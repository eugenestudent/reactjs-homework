import './Button.css';

function Button({ children, variant = 'primary', active = false, onClick, className = '', ...props }) {
  const buttonClass = `button button-${variant} ${active ? 'button-active' : ''} ${className}`.trim();

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
