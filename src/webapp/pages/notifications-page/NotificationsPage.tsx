import { HeaderBar } from "@dhis2/ui";
import { ObjectsTable, TableAction, TableColumn, TableSelection, TableState } from "@eyeseetea/d2-ui-components";
import { Delete, Edit } from "@material-ui/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { AppNotification } from "../../../domain/entities/Notification";
import i18n from "../../../locales";
import PageHeader from "../../components/page-header/PageHeader";
import { useAppContext } from "../../contexts/app-context";
import { useReload } from "../../hooks/useReload";
import { NewNotificationDialog, NewNotificationDialogProps } from "./NewNotificationDialog";

export const NotificationsPage: React.FC = () => {
    const { compositionRoot } = useAppContext();
    const [reloadKey, reload] = useReload();

    const [createDialogProps, setCreateDialogProps] = useState<NewNotificationDialogProps>();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [selection, setSelection] = useState<TableSelection[]>([]);

    const actions: TableAction<AppNotification>[] = useMemo(
        () => [
            {
                name: "edit",
                text: i18n.t("Edit"),
                icon: <Edit />,
                onClick: ids => {
                    const notification = notifications.find(({ id }) => id === ids[0]);
                    if (!notification) return;

                    setCreateDialogProps({
                        initialNotification: { ...notification, readBy: [] },
                        onClose: () => setCreateDialogProps(undefined),
                        onSave: async notification => {
                            await compositionRoot.usecases.notifications.save([notification]);
                            reload();
                        },
                    });
                },
            },
            {
                name: "delete",
                text: i18n.t("Delete"),
                icon: <Delete />,
                multiple: true,
                onClick: async ids => {
                    await compositionRoot.usecases.notifications.delete(ids);
                    setSelection([]);
                    reload();
                },
            },
        ],
        [compositionRoot, reload, notifications]
    );

    const newNotification = useCallback(() => {
        setCreateDialogProps({
            onClose: () => setCreateDialogProps(undefined),
            onSave: async notification => {
                await compositionRoot.usecases.notifications.save([notification]);
                reload();
            },
        });
    }, [compositionRoot, reload]);

    const onChange = useCallback((state: TableState<AppNotification>) => {
        setSelection(state.selection);
    }, []);

    useEffect(() => {
        compositionRoot.usecases.notifications.listAll().then(notifications => setNotifications(notifications));
    }, [compositionRoot, reloadKey]);

    return (
        <React.Fragment>
            <HeaderBar />

            {createDialogProps ? <NewNotificationDialog {...createDialogProps} /> : null}

            <Container>
                <PageHeader title={i18n.t("Notifications")} onBackClick={() => window.history.back()} />

                <ObjectsTable<AppNotification>
                    rows={notifications}
                    columns={columns}
                    actions={actions}
                    onActionButtonClick={newNotification}
                    selection={selection}
                    onChange={onChange}
                />
            </Container>
        </React.Fragment>
    );
};

const columns: TableColumn<AppNotification>[] = [
    { name: "content", text: i18n.t("Content") },
    {
        name: "recipients",
        text: i18n.t("Recipients"),
        getValue: item =>
            [...item.recipients.users, ...item.recipients.userGroups].map(item => item.name ?? item.id).join(", "),
    },
    { name: "createdAt", text: i18n.t("Created At") },
    {
        name: "readBy",
        text: i18n.t("Read by"),
        getValue: item => item.readBy.map(item => item.name ?? item.id).join(", "),
    },
];

const Container = styled.div`
    margin: 20px;
`;
