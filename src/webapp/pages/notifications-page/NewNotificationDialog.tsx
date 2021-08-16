import { ConfirmationDialog, ShareUpdate, Sharing, SharingRule } from "@eyeseetea/d2-ui-components";
import { useCallback, useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { AppNotification } from "../../../domain/entities/Notification";
import { NamedRef } from "../../../domain/entities/Ref";
import i18n from "../../../locales";
import { generateUid } from "../../../utils/uid";
import { useAppContext } from "../../contexts/app-context";

export const NewNotificationDialog: React.FC<NewNotificationDialogProps> = ({
    initialNotification,
    onClose,
    onSave,
}) => {
    const { compositionRoot } = useAppContext();

    const [notification, updateNotification] = useState<AppNotification>(
        () => initialNotification ?? buildDefaultNotification()
    );

    const save = useCallback(async () => {
        await onSave(notification);
        onClose();
    }, [notification, onSave, onClose]);

    const search = useCallback(
        async (query: string) => {
            const results = await compositionRoot.usecases.instance.searchUsers(query);
            return { users: mapToSharingRule(results.users), userGroups: mapToSharingRule(results.userGroups) };
        },
        [compositionRoot]
    );

    const onContentChanged = useCallback((content: string) => {
        updateNotification(notification => ({ ...notification, content }));
    }, []);

    const onSharingChanged = useCallback(async (updatedAttributes: ShareUpdate) => {
        updateNotification(notification => {
            const { users, userGroups } = notification.recipients;
            const { userAccesses, userGroupAccesses } = updatedAttributes;
            return {
                ...notification,
                recipients: {
                    users: userAccesses ? mapToNamedRef(userAccesses) : users,
                    userGroups: userGroupAccesses ? mapToNamedRef(userGroupAccesses) : userGroups,
                },
            };
        });
    }, []);

    return (
        <ConfirmationDialog
            title={i18n.t("Create new notification")}
            open={true}
            onSave={save}
            onCancel={onClose}
            maxWidth={"md"}
            fullWidth={true}
        >
            <ReactMde
                value={notification.content}
                onChange={onContentChanged}
                minEditorHeight={200}
                disablePreview={true}
            />

            <Sharing
                subtitle={i18n.t("Recipients")}
                meta={{
                    meta: { allowPublicAccess: false, allowExternalAccess: false },
                    object: {
                        id: "",
                        displayName: "",
                        userAccesses: mapToSharingRule(notification.recipients.users),
                        userGroupAccesses: mapToSharingRule(notification.recipients.userGroups),
                    },
                }}
                showOptions={sharingOptions}
                onSearch={search}
                onChange={onSharingChanged}
            />
        </ConfirmationDialog>
    );
};

export interface NewNotificationDialogProps {
    initialNotification?: AppNotification;
    onClose: () => void;
    onSave: (notification: AppNotification) => Promise<void>;
}

function mapToSharingRule(array: NamedRef[]): SharingRule[] {
    return array.map(({ id, name }) => ({ id, displayName: name, access: "--------" }));
}

function mapToNamedRef(array: SharingRule[]): NamedRef[] {
    return array.map(({ id, displayName }) => ({ id, name: displayName }));
}

function buildDefaultNotification(): AppNotification {
    return {
        id: generateUid(),
        content: "",
        recipients: { users: [], userGroups: [] },
        readBy: [],
        createdAt: new Date(),
    };
}

const sharingOptions = {
    title: false,
    dataSharing: false,
    publicSharing: false,
    externalSharing: false,
    permissionPicker: false,
};
