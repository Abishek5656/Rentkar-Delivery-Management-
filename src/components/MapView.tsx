// 'use client';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// interface MapViewProps {
//   orders: {
//     _id: string;
//     productName: string;
//     deliveryAddress: string;
//     status: string;
//     location?: {
//       coordinates: [number, number]; // [lng, lat]
//     };
//   }[];
//   mapCenter: [number, number]; // [lat, lng]
// }

// // ✅ Fix Leaflet default icon issue
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/marker-icon-2x.png',
//   iconUrl: '/marker-icon.png',
//   shadowUrl: '/marker-shadow.png',
// });

// export default function MapView({ orders, mapCenter }: MapViewProps) {
//   return (
//     <MapContainer
//       center={mapCenter}
//       zoom={11}
//       style={{ height: '100%', width: '100%' }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {orders.map(
//         (order) =>
//           order.location && (
//             <Marker
//               key={order._id}
//               position={[order.location.coordinates[1], order.location.coordinates[0]]}
//             >
//               <Popup>
//                 <strong>{order.productName}</strong> <br />
//                 {order.deliveryAddress} <br />
//                 Status: {order.status}
//               </Popup>
//             </Marker>
//           )
//       )}
//     </MapContainer>
//   );
// }


// 'use client';

// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // ✅ Fix Leaflet default marker issue
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: '/marker-icon-2x.png',
//     iconUrl: '/marker-icon.png',
//     shadowUrl: '/marker-shadow.png',
// });

// interface Order {
//     _id: string;
//     productName: string;
//     deliveryAddress: string;
//     status: string;
//     location?: {
//         coordinates: [number, number]; // [lng, lat]
//     };
// }

// interface MapViewProps {
//     orders: Order[];
//     mapCenter: [number, number];
// }

// // ✅ Auto-fit bounds component
// function FitBounds({ orders }: { orders: Order[] }) {
//   const map = useMap();

//   useEffect(() => {
//     // Filter only valid coordinates
//     const validCoords = orders
//       .filter(
//         (order) =>
//           order.location &&
//           Array.isArray(order.location.coordinates) &&
//           order.location.coordinates.length === 2 &&
//           typeof order.location.coordinates[0] === 'number' &&
//           typeof order.location.coordinates[1] === 'number'
//       )
//       .map((order) => [
//         order.location!.coordinates[1], // lat
//         order.location!.coordinates[0], // lng
//       ]);

//     if (validCoords.length > 0) {
//       map.fitBounds(validCoords as any, { padding: [50, 50] });
//     }
//   }, [orders, map]);

//   return null;
// }


// export default function MapView({ orders, mapCenter }: MapViewProps) {
//     return (
//         <MapContainer
//             center={mapCenter || [19.0760, 72.8777]} 
//             zoom={11}
//             style={{ height: '100%', width: '100%' }}
//         >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//             {/* ✅ Auto adjust map to orders */}
//             <FitBounds orders={orders} />

//             {orders.map(
//                 (order) =>
//                     order.location && (
//                         <Marker
//                             key={order._id}
//                             position={[
//                                 order.location.coordinates[1], // lat
//                                 order.location.coordinates[0], // lng
//                             ]}
//                         >
//                             <Popup>
//                                 <strong>{order.productName}</strong> <br />
//                                 {order.deliveryAddress} <br />
//                                 Status: {order.status}
//                             </Popup>
//                         </Marker>
//                     )
//             )}
//         </MapContainer>
//     );
// }


'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Order {
  _id: string;
  deliveryAddress: string;
  productName: string;
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  orders: Order[];
  mapCenter: [number, number];
}

// Fix default Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

export default function MapView({ orders, mapCenter }: MapViewProps) {
  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {orders.map((order) =>
        order.latitude && order.longitude ? (
          <Marker key={order._id} position={[order.latitude, order.longitude]}>
            <Popup>
              {order.productName} <br /> {order.deliveryAddress}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
