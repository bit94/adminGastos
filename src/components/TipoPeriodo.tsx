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
import ConfirmDialog from './ConfirmDialog';
import { secureFetch } from '@utils/secureFetch';

const TipoPeriodo: React.FC = () => {
  const [descripcion, setDescripcion] = useState<string>('');
  const [dias, setDias] = useState<number>(1);
  const [tipoPeriodos, setTipoPeriodos] = useState<TipoPeriodoDTO[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const requestDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  useEffect(() => {
    secureFetch(`${API_ADMIN_BASE_URL}/tipo-periodo`, { headers })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        return res.json();
      })
      .then((data: TipoPeriodoDTO[]) => {
        setTipoPeriodos(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!descripcion.trim() || dias < 1 || dias > 365) {
      setError("Verifica que la descripción no esté vacía y los días estén entre 1 y 365.");
      return;
    }

    const payload = editId
      ? { id: editId, descripcion, dias } // ✅ incluye el ID al actualizar
      : { descripcion, dias };

    const url = editId
      ? `${API_ADMIN_BASE_URL}/tipo-periodo/${editId}`
      : `${API_ADMIN_BASE_URL}/tipo-periodo`;

    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await secureFetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error del backend:', errorText);
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
      console.error('Error en submit:', err);
      setError(err.message);
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      console.log('Eliminando ID:', deleteId);
      const res = await secureFetch(`${API_ADMIN_BASE_URL}/tipo-periodo/${deleteId}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setTipoPeriodos(prev => prev.filter(tp => tp.id !== deleteId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (tp: TipoPeriodoDTO) => {
    setDescripcion(tp.descripcion);
    setDias(tp.dias);
    setEditId(tp.id);
  };

  const resetForm = () => {
    setDescripcion('');
    setDias(1);
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
              onChange={(e) => setDias(Number(e.target.value))}
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

      <Divider sx={{ mb: 2 }} />

      <Paper elevation={3} sx={{ p: 3, minHeight: 300, minWidth: 400 }}>
        {/* 📋 Listado */}
        <Typography variant="h6">
          Listado
        </Typography>
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
              <TableRow hover sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                  cursor: 'pointer'
                }
              }} key={tp.id}>
                <TableCell>{tp.descripcion}</TableCell>
                <TableCell>{tp.dias}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(tp)}>
                      Editar
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => requestDelete(tp.id)}>
                      Eliminar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <ConfirmDialog
        open={confirmOpen}
        title="¿Seguro que deseas eliminar este registro?"
        message="Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </Box>
  );
};

export default TipoPeriodo;