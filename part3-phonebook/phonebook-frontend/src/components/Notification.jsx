const Notification = ({ notification }) => {
    const [notificationType, message] = [notification.notificationType, notification.message]
    if (message === null) {
      return null
    }

    if (!(['success', 'error'].includes(notificationType))) {
        return null
    }

    return (
        <div className={notificationType}>
            {message}
        </div>
    )
}
  
export default Notification
