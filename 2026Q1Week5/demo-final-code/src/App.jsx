import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';

function App() {
  // Our data array - this could come from an API!
  const teamMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer specializing in React",
      image: "https://picsum.photos/seed/alice/300/200"
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Developer who loves Node.js",
      image: "https://picsum.photos/seed/bob/300/200"
    },
    {
      id: 3,
      name: "Carol White",
      role: "Full Stack Developer and team lead",
      image: "https://picsum.photos/seed/carol/300/200"
    },
    {
      id: 4,
      name: "David Lee",
      role: "UX Designer with a passion for accessibility",
      image: "https://picsum.photos/seed/david/300/200"
    }
  ];

  return (
    <div>
      <Header />

      <main style={{ padding: '2rem' }}>
        <h2>Our Team ({teamMembers.length} members)</h2>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              title={member.name}
              description={member.role}
              image={member.image}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
