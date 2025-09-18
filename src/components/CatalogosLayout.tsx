import { Outlet } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';

const CatalogosLayout: React.FC = () => (
    <Box sx={{ mt: 4 }}>
        <Outlet />
    </Box>
);

export default CatalogosLayout;