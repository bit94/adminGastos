import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Fade from "@mui/material/Fade";

const variantIconMap = {
    warning: <WarningAmberIcon color="warning" />,
    danger: <ErrorIcon color="error" />,
    info: <InfoIcon color="info" />,
    success: <CheckCircleIcon color="success" />,
};

export default function ConfirmDialog({
    open,
    title = "¿Estás seguro?",
    message = "Esta acción no se puede deshacer.",
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    variant = "warning",
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} slots={{ transition: Fade }} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {variantIconMap[variant]}
                    {title}
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    color={variant === "danger" ? "error" : "primary"}
                    variant="contained"
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}