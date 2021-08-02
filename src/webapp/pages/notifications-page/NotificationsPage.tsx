import { HeaderBar } from "@dhis2/ui";
import { ObjectsTable, TableColumn } from "@eyeseetea/d2-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AppNotification } from "../../../domain/entities/Notification";
import i18n from "../../../locales";
import PageHeader from "../../components/page-header/PageHeader";
import { useAppContext } from "../../contexts/app-context";
import { NewNotificationDialog, NewNotificationDialogProps } from "./NewNotificationDialog";

export const NotificationsPage: React.FC = () => {
    const { compositionRoot } = useAppContext();

    const [createDialogProps, setCreateDialogProps] = useState<NewNotificationDialogProps>();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    const newNotification = useCallback(() => {
        setCreateDialogProps({
            onClose: () => setCreateDialogProps(undefined),
            onSave: async notification => await compositionRoot.usecases.notifications.save([notification]),
        });
    }, [compositionRoot]);

    useEffect(() => {
        compositionRoot.usecases.notifications.listAll().then(notifications => setNotifications(notifications));
    }, [compositionRoot]);

    return (
        <React.Fragment>
            <HeaderBar />

            {createDialogProps ? <NewNotificationDialog {...createDialogProps} /> : null}

            <Container>
                <PageHeader title={i18n.t("Notifications")} onBackClick={() => window.history.back()} />

                <ObjectsTable<AppNotification>
                    rows={notifications}
                    columns={columns}
                    childrenKeys={["children"]}
                    onActionButtonClick={newNotification}
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
        getValue: item => [...item.recipients.users, ...item.recipients.userGroups],
    },
    { name: "createdAt", text: i18n.t("Created At") },
];

const Container = styled.div`
    margin: 20px;
`;
