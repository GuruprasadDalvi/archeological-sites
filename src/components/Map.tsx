import worldMap from "../assets/world_map.svg";
import { Site } from "../modals/CustomTypes";




interface MapProps {
  sites: Site[];
  onHover: (site: Site) => void;
}


export function Map({sites, onHover}: MapProps) {


    const pointSize = 5;
    const mapWidth = 1280;
    const mapHeigh = 720;

    //magic number
    const xMultiplier = 1.2;
    const yMultiplier = 1.08;

    const convertCoordinates = (latitude: number, longitude: number) => {
        // Simple conversion logic for latitude/longitude to x/y on your SVG map
        // Customize based on your SVG map dimensions
        const x = ((longitude + 180) / 360) * mapWidth * xMultiplier; // Example scaling factor
        const y = ((90 - latitude) / 180) * mapHeigh * yMultiplier;  // Example scaling factor
        return { x, y };
      };

  return (
    <>
      <img
        src={worldMap}
        alt="World Map"
        style={{ width: `${mapWidth}px`, color: "red", height:`${mapHeigh}px` }}
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
    </>
  );
}
