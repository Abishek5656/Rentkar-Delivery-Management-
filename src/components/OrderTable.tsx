'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

interface OrdersTableProps {
  orders: any[];
  allPartners: { _id: string; name: string }[];
  selectedPartners: { [orderId: string]: string };
  setSelectedPartners: React.Dispatch<React.SetStateAction<{ [orderId: string]: string }>>;
  handleAssign: (orderId: string, partnerId: string) => void;
  handleDelete: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  allPartners,
  selectedPartners,
  setSelectedPartners,
  handleAssign,
  handleDelete,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Assigned To</TableCell>
          <TableCell>Assign Partner</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {orders
          .slice()
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((order) => {
            const isCompleted = order.status === 'picked' || order.status === 'delivered';
            return (
              <TableRow key={order._id}>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.assignedTo?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={selectedPartners[order._id] || ''}
                    onChange={(e) =>
                      setSelectedPartners({
                        ...selectedPartners,
                        [order._id]: e.target.value,
                      })
                    }
                    displayEmpty
                    disabled={isCompleted}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {allPartners.map((partner) => (
                      <MenuItem key={partner._id} value={partner._id}>
                        {partner.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    size="small"
                    onClick={() => handleAssign(order._id, selectedPartners[order._id])}
                    disabled={!selectedPartners[order._id] || isCompleted}
                  >
                    Assign
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(order._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
