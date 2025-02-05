import { useEffect, useState } from 'react'
import { loadCsvData } from './utils'
import { Map } from './components/Map'
import './App.css'
import { SiteRaw, Site } from './modals/CustomTypes';

function App() {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: SiteRaw[] = await loadCsvData('./src/assets/data.csv');
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
    <input type="range" min="0" max="100" value="50" className="slider" id="myRange"></input>
      <Map sites={sites} onHover={()=>{}}></Map>
    </>
  )
}

export default App
