import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../store/Notifications";
import { useEffect } from "react";

const Notifications = () => {
    const dispatch = useDispatch();

    const {
        visible,
        message,
        type,
        duration = 3000,
    } = useSelector((state) => state.notification);

    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            dispatch(hideNotification());
        }, duration);

        return () => clearTimeout(timer);
    }, [visible, duration, dispatch]);

    if (!visible) return null;

    return (
        <div className={`notification notification-${type}`}>
            <p>{message}</p>

            <button onClick={() => dispatch(hideNotification())}>
                ✖
            </button>
        </div>
    );
};

export default Notifications;
