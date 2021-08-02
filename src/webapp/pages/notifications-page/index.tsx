import { HeaderBar } from "@dhis2/ui";
import {
    ConfirmationDialog,
    ObjectsTable,
    ShareUpdate,
    Sharing,
    SharingRule,
    TableColumn,
} from "@eyeseetea/d2-ui-components";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Notification } from "../../../domain/entities/Notification";
import { NamedRef } from "../../../domain/entities/Ref";
import i18n from "../../../locales";
import { useAppContext } from "../../contexts/app-context";

export const NotificationsPage: React.FC = () => {
    const { compositionRoot } = useAppContext();

    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [content, setContent] = useState<string>("");
    const [notificationUsers, updateNotificationUsers] = useState<{
        users: SharingRule[];
        userGroups: SharingRule[];
    }>({ users: [], userGroups: [] });

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const save = useCallback(async () => {
        const totalRecipients = notificationUsers.users.concat(notificationUsers.userGroups);
        await compositionRoot.usecases.notifications.create(
            content,
            totalRecipients.map(user => user.id)
        );
        setCreateDialogOpen(false);
        window.location.reload();
    }, [compositionRoot, content, notificationUsers]);

    const search = useCallback(
        async (query: string) => {
            const results = await compositionRoot.usecases.instance.searchUsers(query);
            return { users: mapDisplayName(results.users), userGroups: mapDisplayName(results.userGroups) };
        },
        [compositionRoot]
    );

    const onSharingChanged = useCallback(async (updatedAttributes: ShareUpdate) => {
        updateNotificationUsers(({ users, userGroups }) => {
            const { userAccesses = users, userGroupAccesses = userGroups } = updatedAttributes;
            return { users: userAccesses, userGroups: userGroupAccesses };
        });
    }, []);

    const columns: TableColumn<Notification>[] = useMemo(
        () => [
            {
                name: "id",
                text: "Id",
                sortable: false,
                getValue: item => item.id,
            },
            {
                name: "content",
                text: "Content",
                getValue: item => item.content,
            },
            {
                name: "recipients",
                text: "Recipients",
                getValue: item => item.recipients.join(),
            },
            {
                name: "createdAt",
                text: "Created At",
                getValue: item => item.createdAt,
            },
        ],
        []
    );

    useEffect(() => {
        compositionRoot.usecases.notifications.listAll().then(notifications => setNotifications(notifications));
    }, [compositionRoot]);

    return (
        <React.Fragment>
            <HeaderBar />

            <ConfirmationDialog
                title={i18n.t("Create new notification")}
                open={isCreateDialogOpen}
                onSave={save}
                onCancel={() => setCreateDialogOpen(false)}
                maxWidth={"md"}
                fullWidth={true}
            >
                <FormControl fullWidth>
                    <FormLabel component="legend">{i18n.t("Message")}</FormLabel>

                    <TextField
                        multiline
                        rowsMax="3"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <Sharing
                        meta={{
                            meta: { allowPublicAccess: true, allowExternalAccess: false },
                            object: {
                                id: "",
                                displayName: "",
                                userAccesses: notificationUsers.users,
                                userGroupAccesses: notificationUsers.userGroups,
                            },
                        }}
                        showOptions={{
                            title: false,
                            dataSharing: false,
                            publicSharing: true,
                            externalSharing: false,
                            permissionPicker: false,
                        }}
                        onSearch={search}
                        onChange={onSharingChanged}
                    />
                </FormControl>
            </ConfirmationDialog>

            <ObjectsTable<Notification>
                rows={notifications}
                columns={columns}
                childrenKeys={["children"]}
                onActionButtonClick={() => setCreateDialogOpen(true)}
            />
        </React.Fragment>
    );
};

function mapDisplayName(array: NamedRef[]) {
    return array.map(({ id, name }) => ({ id, displayName: name }));
}
