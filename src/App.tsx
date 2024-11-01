// App.tsx
import { CardHero } from './components/screens/GridSucursales/CardGrid/CardGrid';
import { heroesData } from './data/heroes'; // Ajusta la ruta según tu estructura de carpetas

function App() {
  return (
    <div>
      {heroesData.map((hero) => (
        <CardHero key={hero.id} hero={hero} />
      ))}
    </div>
  );
}

export default App;
