import React from "react";
import { useAppContext } from "../../contexts/app-context";
import {
    ConfirmationDialog,
    ObjectsTable,
    TableColumn,
    Sharing,
    SharingRule,
    ShareUpdate,
} from "@eyeseetea/d2-ui-components"; //, Sharing
import { Button, TextField, FormControl, FormLabel, Theme } from "@material-ui/core";

import i18n from "../../../locales";
import { Notification } from "../../../domain/entities/Notification";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1, 0),
        },
        paper: {
            padding: "24px",
            overflow: "unset",
        },
    })
);
export const NotificationsPage: React.FC<NotificationsPageProps> = ({ header: Header, baseUrl, title }) => {
    const { allNotifications, compositionRoot } = useAppContext();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState<string>("");
    const [notificationUsers, updateNotificationUsers] = React.useState<{
        users: SharingRule[];
        userGroups: SharingRule[];
    }>({ users: [], userGroups: [] });

    const save = React.useCallback(async () => {
        const totalRecipients = notificationUsers.users.concat(notificationUsers.userGroups);
        await compositionRoot.usecases.notifications.create(
            content,
            totalRecipients.map(user => user.id)
        );
        setOpen(false);
        window.location.reload();
    }, [compositionRoot, content, notificationUsers]);

    const search = React.useCallback(
        (query: string) => compositionRoot.usecases.instance.searchUsers(query),
        [compositionRoot]
    );

    const onSharingChanged = React.useCallback(async (updatedAttributes: ShareUpdate) => {
        updateNotificationUsers(({ users, userGroups }) => {
            const { userAccesses = users, userGroupAccesses = userGroups } = updatedAttributes;
            return { users: userAccesses, userGroups: userGroupAccesses };
        });
    }, []);

    const columns: TableColumn<Notification>[] = React.useMemo(
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

    const classes = useStyles({});
    return (
        <React.Fragment>
            <Header baseUrl={baseUrl} title={title} />
            <ConfirmationDialog
                title={i18n.t("Create new notification")}
                open={open}
                onSave={save}
                onCancel={() => setOpen(false)}
                maxWidth={"md"}
                fullWidth={true}
            >
                <FormControl fullWidth className={classes.formControl}>
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap",
                }}
            >
                <h1>All notifications:</h1>
                <Button onClick={() => setOpen(true)} variant="contained">
                    Create notification
                </Button>
            </div>
            <ObjectsTable<Notification> rows={allNotifications} columns={columns} childrenKeys={["children"]} />
        </React.Fragment>
    );
};

export interface NotificationsPageProps {
    header: any;
    baseUrl: string;
    title?: string;
}
