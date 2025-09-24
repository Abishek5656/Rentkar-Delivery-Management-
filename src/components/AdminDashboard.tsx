'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  fetchOrders,
  createNewOrder,
  assignOrderToPartner,
  deleteOrderById,
} from '@/redux/slices/orderSlice';

import { fetchPartner } from '@/redux/slices/partnerSlice'

import { registerUser } from "@/redux/slices/authSlice"

import OrdersTable from '@/components/OrderTable';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Dummy partners (later replace with API for users list)
const mockPartners = [
  { _id: '1', name: 'Partner One' },
  { _id: '2', name: 'Partner Two' },
];

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orders);
  const { allpartnerDetails } = useSelector((state: RootState) => state.partner);



  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);


  const [selectedPartner, setSelectedPartner] = useState('');


  const [partnerOpen, setPartnerOpen] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerPassword, setPartnerPassword] = useState('');
  const [partnerRole, setPartnerRole] = useState('2');

  const [selectedPartners, setSelectedPartners] = useState<{ [orderId: string]: string }>({});

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchPartner())
  }, [dispatch]);


  const handleCreateOrder = () => {
    dispatch(createNewOrder({ productName, deliveryAddress }));
    setProductName('');
    setDeliveryAddress('');
    setOpen(false);
  };

  // const handleAssign = (orderId: string) => {
  //   if (selectedPartner) {
  //     dispatch(assignOrderToPartner({ orderId, partnerId: selectedPartner }));
  //     setSelectedPartner('');
  //   }
  // };

  const handleAssign = (orderId: string, partnerId: string) => {
    if (partnerId) {
      dispatch(assignOrderToPartner({ orderId, partnerId }));
      setSelectedPartners({ ...selectedPartners, [orderId]: '' }); // reset only that row
    }
  };


  const handleCreatePartner = async () => {
    try {
      // Determine role
      const role = Number(partnerRole) === 2 ? 'partner' : 'admin';

      // Wait for registration to complete
      await dispatch(
        registerUser({
          name: partnerName,
          email: partnerEmail,
          password: partnerPassword,
          role,
        })
      ).unwrap(); // unwrap ensures we wait and catch errors

      // Refresh data only after registration is successful
      await dispatch(fetchOrders());
      await dispatch(fetchPartner());

      // Reset form
      setPartnerName('');
      setPartnerEmail('');
      setPartnerPassword('');
      setPartnerRole('2');
      setPartnerOpen(false);
    } catch (error) {
      console.error('Failed to create partner:', error);
      // Optionally, show a toast or alert here
    }
  };



  const handleDelete = (orderId: string) => {
    dispatch(deleteOrderById(orderId));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Create Order Button */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create New Order
      </Button>

      <Button variant="contained" color="primary" onClick={() => setPartnerOpen(true)}>
        Create Partners
      </Button>

      {/* Orders Table */}
      <Paper sx={{ mt: 3 }}>
        <OrdersTable
          orders={orders}
          allPartners={allpartnerDetails}
          selectedPartners={selectedPartners}
          setSelectedPartners={setSelectedPartners}
          handleAssign={handleAssign}
          handleDelete={handleDelete}
        />
      </Paper>


      {/* Create Order Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="dense"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Delivery Address"
            fullWidth
            margin="dense"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateOrder} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Partner Dialog */}
      <Dialog open={partnerOpen} onClose={() => setPartnerOpen(false)}>
        <DialogTitle>Create New Partner</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={partnerPassword}
            onChange={(e) => setPartnerPassword(e.target.value)}
          />
          <Select
            fullWidth
            margin="dense"
            value={partnerRole}
            onChange={(e) => setPartnerRole(e.target.value)}
          >
            <MenuItem value="1">Admin</MenuItem>
            <MenuItem value="2">Partner</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPartnerOpen(false)}>Cancel</Button>
          <Button onClick={handleCreatePartner} variant="contained" color="primary">
            Create Partner
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
