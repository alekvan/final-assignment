const NotFound = () => (
  <div
    style={{
      position: 'absolute',
      left: '0',
      top: '0',
      right: '0',
      bottom: '4rem',
      marginTop: 'auto',
      background: 'white',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: '10000',
    }}
  >
    <div
      style={{
        fontSize: '12rem',
        fontFamily: 'Roboto Slab',
        fontWeight: 'bold',
      }}
    >
      <span style={{ color: '#A5A5A5' }}>4</span>
      <span style={{ color: '#F0972A' }}>0</span>
      <span style={{ color: '#A5A5A5' }}>4</span>
    </div>
    <div style={{ fontSize: '3.5rem', color: '#96BB36', fontWeight: '700' }}>
      Not Found
    </div>
    <div>{`(Something is cooking, but not here :))`}</div>
  </div>
);
export default NotFound;
