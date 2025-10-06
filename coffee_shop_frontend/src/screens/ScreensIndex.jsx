import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function ScreensIndex() {
  const screens = [
    { path: 'cafe-screen-1-6', name: 'Cafe Details', description: 'View detailed coffee shop information' },
    { path: 'home-screen-1-3', name: 'Home', description: 'Browse coffee shops near you' },
    { path: 'notes-delete-after-reading-8-3', name: 'Notes', description: 'Application notes and credits' },
    { path: 'mappin-207-42', name: 'Map Pin', description: 'Location marker component' }
  ];

  return (
    <div className="screens-index" style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>Available Screens</h1>
      <nav style={{
        display: 'grid',
        gap: '1rem'
      }}>
        {screens.map(screen => (
          <Link 
            key={screen.path}
            to={`/screens/${screen.path}`}
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              ':hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{screen.name}</h2>
            <p style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>{screen.description}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default ScreensIndex;
