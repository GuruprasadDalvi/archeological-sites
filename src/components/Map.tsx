import worldMap from "../assets/world_map_1.svg";
import { Site } from "../modals/CustomTypes";




interface MapProps {
  sites: Site[];
  onHover: (site: Site) => void;
}


export function Map({sites, onHover}: MapProps) {


    const pointSize = 5;
    const mapWidth = 1280;
    const mapHeight = 720;
    
    const convertCoordinates = (latitude: number, longitude: number) => {
          // Convert longitude to x directly:
          const x = ((longitude + 180) / 360) * mapWidth;

          // For latitude, we first convert degrees to radians.
          const latRad = (latitude * Math.PI) / 180;

          // Mercator projection formula for y.
          const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
          // Scale the mercator coordinate to the map's height.
          const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));

          return { x, y };
            };

  return (
    <div style={{ position: 'relative', width: `${mapWidth}px`, height: `${mapHeight}px`, border:"solid black" }}>
      <img
        src={worldMap}
        alt="World Map"
        style={{ width: `${mapWidth}px`, color: "red", height:`${mapHeight}px`, bottom:"0px"}}
      ></img>
      {sites.map((site: Site) => {
        const { x, y } = convertCoordinates(site.latitude, site.longitude);
        return (
          <div
            key={site.name}
            title={site.name}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              width: `${pointSize}px`,
              height: `${pointSize}px`,
              backgroundColor: 'red',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onMouseEnter={() => onHover(site)}
          ></div>
        );
      })}
    </div>
  );
}
