import React from "react";
import { useAppContext } from "../../contexts/app-context";
import { ConfirmationDialog, ObjectsTable, TableColumn } from "@eyeseetea/d2-ui-components"; //, Sharing
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
    const { allNotifications } = useAppContext();
    const [open, setOpen] = React.useState(false);

    console.log(allNotifications)
    // Read by: {notification.readBy}
    /*const save = React.useCallback(async () => {
        await compositionRoot.usecases.notifications.update(userNotifications)
        setOpen(false);
    }, [compositionRoot, userNotifications]);*/
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
        ],
        []
    );
    /*
        <Sharing
                meta={{
                    meta: { allowPublicAccess: true, allowExternalAccess: false },
                    object: {
                        id: module.id,
                        displayName: module.name.referenceValue,
                        publicAccess: module.publicAccess,
                        userAccesses: mapSharingRules(module.userAccesses),
                        userGroupAccesses: mapSharingRules(module.userGroupAccesses),
                    },
                }}
                showOptions={{
                    title: false,
                    dataSharing: false,
                    publicSharing: true,
                    externalSharing: false,
                    permissionPicker: true,
                }}
                onSearch={search}
                onChange={setModuleSharing}
            />
    */
    const classes = useStyles({});
    return (
        <React.Fragment>
            <Header baseUrl={baseUrl} title={title} />
            <ConfirmationDialog
                    title={i18n.t("Create new notification")}
                    open={open}
                    onSave={() => setOpen(false)}
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
                    />

                <FormLabel component="legend">{i18n.t("Send notification to: (select users or user groups)")}</FormLabel>

                
                </FormControl>

                </ConfirmationDialog> 
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "nowrap"}}>
            <h1>All notifications:</h1>
            <Button onClick={() => setOpen(true)} variant="contained">Create notification</Button>

            </div>
            <ObjectsTable<Notification>
                    rows={allNotifications}
                    columns={columns}
                    childrenKeys={["children"]}
                />
        </React.Fragment>
    );
};

export interface NotificationsPageProps {
    header: any;
    baseUrl: string;
    title?: string;
}
