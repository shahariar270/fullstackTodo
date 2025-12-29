import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../store/Notifications";

const Notifications = () => {
    const dispatch = useDispatch();

    const { visible, message, type } = useSelector(
        (state) => state.notification
    );

    if (!visible) return null;

    const removeMessage = () => { 
        dispatch(hideNotification())
    }

    return (
        <div className={`notification notification-${type}`}>
            <p>{message}</p>

            <button onClick={removeMessage}>
                ✖
            </button>
        </div>
    );
};

export default Notifications;
