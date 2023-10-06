const Notification = ({ message, notificationType }) => {
    if (message === null) {
      return null
    }
  
    // debugger 

    if (notificationType === 'success') {
        return (
        <div className="success">
            {message}
        </div>
        )
    }
    else if (notificationType === 'error') {
        return (
        <div className="error">
            {message}
        </div>
        )
    }
  }
  
  export default Notification
