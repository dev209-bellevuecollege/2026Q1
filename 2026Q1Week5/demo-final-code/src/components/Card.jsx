function Card({ title, description, image }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img
        src={image}
        alt={title}
        style={{ width: '100%', borderRadius: '4px' }}
      />
      <h3 style={{ marginTop: '1rem' }}>{title}</h3>
      <p style={{ color: '#6b7280' }}>{description}</p>
    </div>
  );
}

export default Card;
