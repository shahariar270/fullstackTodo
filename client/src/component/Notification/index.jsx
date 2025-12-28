import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeNotification } from "../../store/Notifications";

const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        (state) => state.notification.items
    );

    useEffect(() => {
        notifications.forEach((n) => {
            if (!n.timeoutId) {
                const timeout = setTimeout(() => {
                    dispatch(removeNotification(n.id));
                }, n.duration || 3000);

                n.timeoutId = timeout;
            }
        });
    }, [notifications, dispatch]);

    return (
        <div style={styles.wrapper}>
            {notifications.map((n) => (
                <div
                    key={n.id}
                    style={{
                        ...styles.toast,
                        ...styles[n.type],
                    }}
                >
                    {n.message}
                </div>
            ))}
        </div>
    );
};

const styles = {
    wrapper: {
        position: "fixed",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 9999,
    },
    toast: {
        padding: "10px 16px",
        borderRadius: 6,
        color: "#fff",
        minWidth: 220,
    },
    success: { background: "#16a34a" },
    error: { background: "#dc2626" },
    info: { background: "#2563eb" },
    warning: { background: "#ca8a04" },
};

export default Notifications;
