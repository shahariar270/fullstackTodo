import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {
    const dispatch = useDispatch();

    const { visible, message, type } = useSelector(
        (state) => state.notification
    );

    if (!visible) return null;

    return (
        <div className={`notification notification-${type}`}>
            <p>{message}</p>

            <button onClick={() => dispatch({ type: "HIDE_NOTIFICATION" })}>
                ✖
            </button>
        </div>
    );
};

export default Notifications;
