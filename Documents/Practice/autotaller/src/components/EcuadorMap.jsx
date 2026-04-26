import { useState } from 'react'
import './EcuadorMap.css'

const provinces = [
  { name: 'Azuay', capital: 'Cuenca', poblacion: 881000, superficie: 7150, region: 'Sierra', d: 'M120,180 L140,170 L160,175 L165,195 L155,220 L140,230 L120,225 L110,205 L115,185 Z' },
  { name: 'Bolívar', capital: 'Guaranda', poblacion: 215000, superficie: 4150, region: 'Sierra', d: 'M165,145 L180,140 L195,150 L190,170 L175,180 L160,175 L165,155 Z' },
  { name: 'Cañar', capital: 'Azogues', poblacion: 250000, superficie: 3900, region: 'Sierra', d: 'M130,230 L155,220 L165,235 L160,255 L145,265 L125,255 L120,235 Z' },
  { name: 'Carchi', capital: 'Tulcán', poblacion: 185000, superficie: 3600, region: 'Sierra', d: 'M130,85 L155,80 L160,95 L155,110 L140,115 L125,105 L130,90 Z' },
  { name: 'Chimborazo', capital: 'Riobamba', poblacion: 510000, superficie: 6500, region: 'Sierra', d: 'M190,170 L210,165 L225,180 L220,200 L205,210 L190,200 L185,180 Z' },
  { name: 'Cotopaxi', capital: 'Latacunga', poblacion: 475000, superficie: 6100, region: 'Sierra', d: 'M175,130 L200,125 L215,140 L210,160 L190,165 L175,155 Z' },
  { name: 'El Oro', capital: 'Machala', poblacion: 715000, superficie: 5800, region: 'Costa', d: 'M80,260 L100,245 L115,260 L110,290 L90,310 L70,300 L75,275 Z' },
  { name: 'Esmeraldas', capital: 'Esmeraldas', poblacion: 595000, superficie: 15200, region: 'Costa', d: 'M80,60 L120,50 L150,55 L160,80 L155,110 L130,115 L100,105 L75,90 Z' },
  { name: 'Guayas', capital: 'Guayaquil', poblacion: 4050000, superficie: 15400, region: 'Costa', d: 'M60,200 L90,190 L110,205 L105,240 L85,265 L60,255 L50,225 Z' },
  { name: 'Imbabura', capital: 'Ibarra', poblacion: 450000, superficie: 4600, region: 'Sierra', d: 'M100,90 L130,85 L145,100 L140,120 L115,130 L95,115 L100,100 Z' },
  { name: 'Loja', capital: 'Loja', poblacion: 485000, superficie: 11400, region: 'Sierra', d: 'M75,275 L95,265 L105,295 L95,330 L70,340 L55,315 L60,285 Z' },
  { name: 'Los Ríos', capital: 'Babahoyo', poblacion: 850000, superficie: 7200, region: 'Costa', d: 'M110,160 L145,155 L160,175 L150,195 L125,200 L105,185 Z' },
  { name: 'Manabí', capital: 'Portoviejo', poblacion: 1450000, superficie: 19400, region: 'Costa', d: 'M35,135 L80,120 L110,145 L105,180 L85,200 L50,190 L25,165 Z' },
  { name: 'Morona Santiago', capital: 'Macas', poblacion: 200000, superficie: 24800, region: 'Amazonía', d: 'M175,220 L210,210 L250,230 L260,280 L240,320 L200,330 L170,290 L165,250 Z' },
  { name: 'Napo', capital: 'Tena', poblacion: 130000, superficie: 12500, region: 'Amazonía', d: 'M190,130 L230,125 L260,145 L255,180 L225,195 L190,180 L185,155 Z' },
  { name: 'Pastaza', capital: 'Puyo', poblacion: 115000, superficie: 29500, region: 'Amazonía', d: 'M225,195 L265,185 L295,220 L285,270 L250,290 L220,270 L210,225 Z' },
  { name: 'Pichincha', capital: 'Quito', poblacion: 2950000, superficie: 4200, region: 'Sierra', d: 'M145,115 L170,110 L180,130 L170,145 L150,145 L140,130 Z' },
  { name: 'Tungurahua', capital: 'Ambato', poblacion: 565000, superficie: 3300, region: 'Sierra', d: 'M195,155 L220,150 L230,170 L220,190 L200,190 L190,170 Z' },
  { name: 'Zamora Chinchipe', capital: 'Zamora', poblacion: 125000, superficie: 10500, region: 'Amazonía', d: 'M125,285 L160,275 L175,310 L160,350 L130,360 L105,330 L110,295 Z' },
  { name: 'Sucumbíos', capital: 'Lago Agrio', poblacion: 185000, superficie: 18400, region: 'Amazonía', d: 'M155,115 L185,110 L195,130 L185,155 L160,160 L150,135 Z' },
  { name: 'Orellana', capital: 'Francisco de Orellana', poblacion: 155000, superficie: 21800, region: 'Amazonía', d: 'M185,155 L225,150 L240,175 L225,200 L190,195 L180,175 Z' },
  { name: 'Santo Domingo', capital: 'Santo Domingo', poblacion: 470000, superficie: 3800, region: 'Sierra', d: 'M100,130 L135,125 L145,145 L135,160 L110,160 L95,145 Z' },
  { name: 'Santa Elena', capital: 'Santa Elena', poblacion: 395000, superficie: 3700, region: 'Costa', d: 'M25,195 L60,185 L75,210 L60,235 L35,230 L20,210 Z' },
  { name: 'Galápagos', capital: 'Puerto Baquerizo Moreno', poblacion: 25000, superficie: 8000, region: 'Insular', type: 'ellipse', cx: 420, cy: 300, rx: 35, ry: 25 },
]

const regionColors = {
  'Sierra': '#8e44ad',
  'Costa': '#27ae60',
  'Amazonía': '#e67e22',
  'Insular': '#3498db',
}

const descriptions = {
  'Azuay': 'Provincia andina conocida por su arquitectura colonial y textiles. Su capital Cuenca es Patrimonio de la Humanidad.',
  'Bolívar': 'Provincia montañosa de la Sierra. Conocida por la agricultura y producción láctea.',
  'Cañar': 'Provincia en los Andes australes. Famosa por el Camino del Inca a Ingapirca.',
  'Carchi': 'Provincia nororiental en la frontera con Colombia. Densely forested.',
  'Chimborazo': 'Provincia con el Volcán más alto de Ecuador (6263m). Rica en cultura indigenous.',
  'Cotopaxi': 'Hogar del icónico Volcán Cotopaxi, el volcán activo más alto del mundo.',
  'El Oro': 'Provincia costera del sur. Centro de producción bananera. Playas: Jambelí, Ballenita.',
  'Esmeraldas': 'Provincia costera del norte. Playas como Same, Tonsupa. Importante por el petróleo.',
  'Guayas': 'Provincia más poblada. Puerto de Guayaquil, la ciudad más grande. Economía diversa.',
  'Imbabura': 'Provincia de lagunas y montañas. Conocida por el Lago Cuicocha sagrado.',
  'Loja': 'Provincia austral. Producción de café y plátano. Ubicación estratégica.',
  'Los Ríos': 'Provincia agrícola del centro. Corazón arrocero del país.',
  'Manabí': 'Provincia costera grande. Famosa por el sombrero de paja toquilla.',
  'Morona Santiago': 'Provincia amazónica. Campos petroleros, biodiversidad. Remota y salvaje.',
  'Napo': 'Provincia amazónica. Parte de las selvas tropicales. Turismo de aventura.',
  'Pastaza': 'Provincia amazónica más grande. Petróleo, biodiversidad. Amazon lodges.',
  'Pichincha': 'Provincia capitalina. Quito, patrimonio. Centro financiero.',
  'Tungurahua': 'Provincia volcánica. Mercados famosos en Ambato. Artesanías andinas.',
  'Zamora Chinchipe': 'Provincia suroriental minera. Oro, cobre. Ecología.',
  'Sucumbíos': 'Provincia nororiental. Campos petroleros, reservas selváticas. Frontera con Colombia.',
  'Orellana': 'Provincia amazónica. Nombrada tras el explorador Orellana. Biodiversidad.',
  'Santo Domingo': 'Provincia recientemente creada. Zona de transición.',
  'Santa Elena': 'Provincia costera nueva. Playas, turismo. Salinas, Playas.',
  'Galápagos': 'Archipiélago insular. Patrimonio UNESCO. Tortugas gigantes.',
}

export default function EcuadorMap() {
  const [activeProvince, setActiveProvince] = useState(null)
  const [hoveredProvince, setHoveredProvince] = useState(null)

  const formatNumber = (n) => n.toLocaleString('es-EC')
  const formatPoblacion = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n / 1000).toFixed(0) + 'k'
    return n.toString()
  }

  const totalPoblacion = provinces.reduce((sum, p) => sum + p.poblacion, 0)
  const totalSuperficie = provinces.reduce((sum, p) => sum + p.superficie, 0)

  return (
    <div className="ecuador-map">
      <div className="map-header">
        <h1 className="map-title">🗺️ Mapa Interactivo del Ecuador</h1>
        <p className="map-subtitle">Explora las 24 provincias del Ecuador</p>
      </div>

      <div className="map-filters">
        { Object.entries(regionColors).map(([region, color]) => (
          <span key={region} className="region-tag" style={{ '--region-color': color }}>
            <span className="region-dot" style={{ background: color }}></span>
            {region}
          </span>
        ))}
      </div>

      <div className="map-content">
        <div className="map-container">
          <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a2a3a" />
                <stop offset="100%" stopColor="#0d1520" />
              </linearGradient>
            </defs>
            
            <rect x="0" y="0" width="500" height="400" fill="url(#mapBg)" rx="12"/>
            
            { provinces.map((province) => {
              const isActive = activeProvince === province.name
              const isHovered = hoveredProvince === province.name
              const color = regionColors[province.region] || '#3498db'
              
              return province.type === 'ellipse' ? (
                <ellipse
                  key={province.name}
                  className={`province ${isActive ? 'active' : ''}`}
                  cx={province.cx}
                  cy={province.cy}
                  rx={province.rx}
                  ry={province.ry}
                  fill={isActive ? '#f5a623' : isHovered ? color : color + '99'}
                  stroke={isActive ? '#f5a623' : isHovered ? '#fff' : color}
                  strokeWidth={isActive ? 2 : 1}
                  filter={isActive ? 'url(#glow)' : ''}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: activeProvince && !isActive ? 0.4 : 1
                  }}
                  onClick={() => setActiveProvince(isActive ? null : province.name)}
                  onMouseEnter={() => setHoveredProvince(province.name)}
                  onMouseLeave={() => setHoveredProvince(null)}
                />
              ) : (
                <path
                  key={province.name}
                  className={`province ${isActive ? 'active' : ''}`}
                  d={province.d}
                  fill={isActive ? '#f5a623' : isHovered ? color : color + '99'}
                  stroke={isActive ? '#f5a623' : isHovered ? '#fff' : color}
                  strokeWidth={isActive ? 2 : 1}
                  filter={isActive ? 'url(#glow)' : ''}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: activeProvince && !isActive ? 0.4 : 1
                  }}
                  onClick={() => setActiveProvince(isActive ? null : province.name)}
                  onMouseEnter={() => setHoveredProvince(province.name)}
                  onMouseLeave={() => setHoveredProvince(null)}
                />
              )
            })}
          </svg>
        </div>

        <div className="info-panel">
          {activeProvince ? (
            provinces.filter(p => p.name === activeProvince).map(p => (
              <div key={p.name} className="info-card animate-in">
                <div className="info-header">
                  <h2 className="info-name">{p.name}</h2>
                  <span className="region-badge" style={{ background: regionColors[p.region] }}>{p.region}</span>
                </div>
                <div className="info-stats">
                  <div className="info-stat">
                    <span className="info-stat-value">🏛️ {p.capital}</span>
                    <span className="info-stat-label">Capital</span>
                  </div>
                  <div className="info-stat">
                    <span className="info-stat-value">👥 {formatPoblacion(p.poblacion)}</span>
                    <span className="info-stat-label">Habitantes</span>
                  </div>
                  <div className="info-stat">
                    <span className="info-stat-value">📐 {formatNumber(p.superficie)} km²</span>
                    <span className="info-stat-label">Superficie</span>
                  </div>
                </div>
                <p className="info-desc">{descriptions[p.name]}</p>
              </div>
            ))
          ) : (
            <div className="info-placeholder">
              <h3>Selecciona una provincia</h3>
              <p>Haz clic en cualquier provincia del mapa para ver sus datos: nombre, capital, población y superficie.</p>
            </div>
          )}
        </div>
      </div>

      <div className="map-stats">
        <div className="stat-item">
          <span className="stat-number">24</span>
          <span className="stat-label">Provincias</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{formatPoblacion(totalPoblacion)}</span>
          <span className="stat-label">Habitantes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{formatPoblacion(totalSuperficie)}</span>
          <span className="stat-label">km²</span>
        </div>
      </div>
    </div>
  )
}