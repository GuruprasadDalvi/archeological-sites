import { useEffect, useState } from 'react'
import { loadCsvData } from './utils'
import { Map } from './components/Map'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [sites, setSites] = useState([]);
  const [year, setYear] = useState(0);
  const [hoveredSite, setHoveredSite] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadCsvData('./src/assets/data.csv');
        // Convert year and coordinates to numbers for filtering and rendering
        const parsedData = data.map((site) => ({
          ...site,
          latitude: parseFloat(site.latitude),
          longitude: parseFloat(site.longitude),
          year: parseInt(site.year, 10),
          images: site.images ? site.images.split(',') : [],
        }));
        setSites(parsedData);
        console.log(parsedData)
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Map sites={sites}></Map>
    </>
  )
}

export default App
