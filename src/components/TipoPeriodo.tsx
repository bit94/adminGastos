import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Alert,
  Stack,
  Divider,
  Breadcrumbs,
  Link
} from '@mui/material';
import { API_ADMIN_BASE_URL } from '../Api';
import { TipoPeriodoDTO } from '../types/TipoPeriodoDTO';

const TipoPeriodo: React.FC = () => {
  const [descripcion, setDescripcion] = useState<string>('');
  const [dias, setDias] = useState<string>('');
  const [tipoPeriodos, setTipoPeriodos] = useState<TipoPeriodoDTO[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  useEffect(() => {
    fetch(`${API_ADMIN_BASE_URL}/tipo-periodo`, { headers })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        return res.json();
      })
      .then((data: TipoPeriodoDTO[]) => {
        console.log('Respuesta:', data);
        setTipoPeriodos(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      descripcion,
      dias: parseInt(dias)
    };

    const url = editId
      ? `${API_ADMIN_BASE_URL}/tipo-periodo/${editId}`
      : `${API_ADMIN_BASE_URL}/tipo-periodo`;

    const method = editId ? 'PUT' : 'POST';

    try {
      console.log('Token JWT:', token);
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const updated: TipoPeriodoDTO = await res.json();

      if (editId) {
        setTipoPeriodos(prev =>
          prev.map(tp => tp.id === editId ? updated : tp)
        );
      } else {
        setTipoPeriodos(prev => [...prev, updated]);
      }

      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este registro?')) return;

    try {
      const res = await fetch(`${API_ADMIN_BASE_URL}/tipo-periodo/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setTipoPeriodos(prev => prev.filter(tp => tp.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (tp: TipoPeriodoDTO) => {
    setDescripcion(tp.descripcion);
    setDias(tp.dias.toString());
    setEditId(tp.id);
  };

  const resetForm = () => {
    setDescripcion('');
    setDias('');
    setEditId(null);
    setError('');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {/* 📝 Formulario */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editId ? 'Editar' : 'Registrar'} Tipo de Periodo
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Días"
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              fullWidth
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                {editId ? 'Actualizar' : 'Registrar'}
              </Button>
              {editId && (
                <Button type="button" variant="outlined" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </Box>
          </Stack>
        </form>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>

      {/* 📋 Listado */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Listado
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Días</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tipoPeriodos.map(tp => (
              <TableRow key={tp.id}>
                <TableCell>{tp.descripcion}</TableCell>
                <TableCell>{tp.dias}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(tp)}>
                      Editar
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(tp.id)}>
                      Eliminar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TipoPeriodo;