// 'use client';

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import {
//   fetchMyOrders,
//   changeOrderStatus,
//   changeAvailability,
// } from '@/redux/slices/partnerSlice';

// import { MapView } from "./MapView"

// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Switch,
// } from '@mui/material';

// // // Fix Leaflet default icon issue
// // 
// export default function PartnerDashboard() {
//   const dispatch = useDispatch<AppDispatch>();

//   const { myOrders, availability } = useSelector((state: RootState) => state.partner);

//   const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]);

//   useEffect(() => {
//     dispatch(fetchMyOrders());
//   }, [dispatch]);

//   const handleStatusUpdate = (orderId: string, status: string) => {
//     dispatch(changeOrderStatus({ orderId, status }));
//   };

//   const handleAvailabilityToggle = () => {
//     dispatch(changeAvailability(!availability));
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setMapCenter([position.coords.latitude, position.coords.longitude]);
//       });
//     }
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6 }}>
//       <Typography variant="h4" gutterBottom>
//         Partner Dashboard
//       </Typography>

//       {/* Availability Toggle */}
//       <Box display="flex" alignItems="center" mb={2}>
//         <Typography variant="body1" mr={1}>
//           Availability:
//         </Typography>
//         <Switch checked={availability} onChange={handleAvailabilityToggle} />
//         <Typography>{availability ? 'Available' : 'Not Available'}</Typography>
//       </Box>

//       {/* Orders Table */}
//       <Paper sx={{ mt: 3, mb: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Product</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {myOrders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order.productName}</TableCell>
//                 <TableCell>{order.deliveryAddress}</TableCell>
//                 <TableCell>{order.status}</TableCell>
//                 <TableCell>
//                   {order.status !== 'picked' && (
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => handleStatusUpdate(order._id, 'picked')}
//                     >
//                       Picked
//                     </Button>
//                   )}
//                   {order.status !== 'delivered' && (
//                     <Button
//                       size="small"
//                       variant="contained"
//                       sx={{ ml: 1 }}
//                       onClick={() => handleStatusUpdate(order._id, 'delivered')}
//                     >
//                       Delivered
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       <Typography variant="h6" gutterBottom>
//         Delivery Map
//       </Typography>
//       <Box sx={{ height: '400px', width: '100%' }}>
//         <MapView orders={myOrders} mapCenter={mapCenter} />
//       </Box>
//     </Container>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import {
//   fetchMyOrders,
//   changeOrderStatus,
//   changeAvailability,
// } from '@/redux/slices/partnerSlice';

// import MapView from './MapView';

// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Switch,
// } from '@mui/material';

// export default function PartnerDashboard() {
//   const dispatch = useDispatch<AppDispatch>();


//   useEffect(() => {
//   if (typeof window !== 'undefined' && navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setMapCenter([position.coords.latitude, position.coords.longitude]);
//     });
//   }
// }, []);


//   const { myOrders, availability } = useSelector(
//     (state: RootState) => state.partner
//   );

//   const [mapCenter, setMapCenter] = useState<[number, number]>([
//     19.0760, 72.8777, // 🏙️ Default: Mumbai
//   ]);

//   // Fetch orders on mount
//   useEffect(() => {
//     dispatch(fetchMyOrders());
//   }, [dispatch]);

//   // Handle status updates
//   const handleStatusUpdate = (orderId: string, status: string) => {
//     dispatch(changeOrderStatus({ orderId, status }));
//   };

//   // Toggle availability
//   const handleAvailabilityToggle = () => {
//     dispatch(changeAvailability(!availability));
//   };

//   // Detect user location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setMapCenter([position.coords.latitude, position.coords.longitude]);
//       });
//     }
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6 }}>
//       <Typography variant="h4" gutterBottom>
//         Partner Dashboard
//       </Typography>

//       {/* Availability Toggle */}
//       <Box display="flex" alignItems="center" mb={2}>
//         <Typography variant="body1" mr={1}>
//           Availability:
//         </Typography>
//         <Switch checked={availability} onChange={handleAvailabilityToggle} />
//         <Typography>{availability ? 'Available' : 'Not Available'}</Typography>
//       </Box>

//       {/* Orders Table */}
//       <Paper sx={{ mt: 3, mb: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Product</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {myOrders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order.productName}</TableCell>
//                 <TableCell>{order.deliveryAddress}</TableCell>
//                 <TableCell>{order.status}</TableCell>
//                 <TableCell>
//                   {order.status !== 'picked' && (
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => handleStatusUpdate(order._id, 'picked')}
//                     >
//                       Picked
//                     </Button>
//                   )}
//                   {order.status !== 'delivered' && (
//                     <Button
//                       size="small"
//                       variant="contained"
//                       sx={{ ml: 1 }}
//                       onClick={() => handleStatusUpdate(order._id, 'delivered')}
//                     >
//                       Delivered
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* Delivery Map */}
//       <Typography variant="h6" gutterBottom>
//         Delivery Map
//       </Typography>

//       {myOrders.length === 0 ? (
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//           No orders to display on the map.
//         </Typography>
//       ) : (
//         <Box sx={{ height: '400px', width: '100%' }}>
//           <MapView orders={myOrders} mapCenter={mapCenter} />
//         </Box>
//       )}
//     </Container>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  fetchMyOrders,
  changeOrderStatus,
  changeAvailability,
} from '@/redux/slices/partnerSlice';
import dynamic from 'next/dynamic';

import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from '@mui/material';

// Dynamically import MapView (client-side only)
const MapView = dynamic(() => import('./MapView'), { ssr: false });

export default function PartnerDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { myOrders, availability } = useSelector(
    (state: RootState) => state.partner
  );

  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]); // Mumbai default

  // Fetch orders on mount
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // Detect user location (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const handleStatusUpdate = (orderId: string, status: string) => {
    dispatch(changeOrderStatus({ orderId, status }));
  };

  const handleAvailabilityToggle = () => {
    dispatch(changeAvailability(!availability));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Partner Dashboard
      </Typography>

      {/* Availability Toggle */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" mr={1}>
          Availability:
        </Typography>
        <Switch checked={availability} onChange={handleAvailabilityToggle} />
        <Typography>{availability ? 'Available' : 'Not Available'}</Typography>
      </Box>

      {/* Orders Table */}
      <Paper sx={{ mt: 3, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status !== 'picked' && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleStatusUpdate(order._id, 'picked')}
                    >
                      Picked
                    </Button>
                  )}
                  {order.status !== 'delivered' && (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ ml: 1 }}
                      onClick={() => handleStatusUpdate(order._id, 'delivered')}
                    >
                      Delivered
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Delivery Map */}
      <Typography variant="h6" gutterBottom>
        Delivery Map
      </Typography>

      {myOrders.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No orders to display on the map.
        </Typography>
      ) : (
        <Box sx={{ height: '400px', width: '100%' }}>
          <MapView orders={myOrders} mapCenter={mapCenter} />
        </Box>
      )}
    </Container>
  );
}

