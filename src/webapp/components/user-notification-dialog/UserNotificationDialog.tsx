import { ConfirmationDialog } from "@eyeseetea/d2-ui-components";
import Linkify from "react-linkify";
import { AppNotification } from "../../../domain/entities/Notification";
import i18n from "../../../locales";

export const UserNotificationDialog: React.FC<UserNotificationDialogProps> = ({ notifications, onClose }) => {
    return (
        <ConfirmationDialog
            title={i18n.t("Notifications")}
            open={true}
            onCancel={onClose}
            cancelText={i18n.t("Close")}
            maxWidth={"md"}
            fullWidth={true}
        >
            {notifications.map(notification => (
                <Linkify key={notification.id}>{notification.content}</Linkify>
            ))}
        </ConfirmationDialog>
    );
};

export interface UserNotificationDialogProps {
    notifications: AppNotification[];
    onClose: () => Promise<void>;
}
