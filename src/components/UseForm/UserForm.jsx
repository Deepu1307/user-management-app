import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormControlLabel, Checkbox, Container, Box } from '@mui/material';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  status: Yup.boolean().required('Status is required'),
});

const UserForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: user, isLoading } = useQuery(
    ['user', id],
    () => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data),
    { enabled: isEdit }
  );

  const mutation = useMutation(
    userData =>
      isEdit
        ? axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
        : axios.post('https://jsonplaceholder.typicode.com/users', userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success(isEdit ? 'User updated successfully!' : 'User added successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      },
      onError: () => {
        toast.error('An error occurred. Please try again.');
      }
    }
  );

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      status: user?.status || false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: values => {
      mutation.mutate(values);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="status"
                name="status"
                checked={formik.values.status}
                onChange={formik.handleChange}
                value={formik.values.status}
              />
            }
            label="Active"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {isEdit ? 'Update' : 'Add'} User
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default UserForm;
