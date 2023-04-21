const Notification = ({ msg }) => {
  let notificationStyle = {}

  if (msg === '') {
    return null
  } else if (msg.includes('wrong') || msg.includes('empty')) {
    notificationStyle.color = 'red'
    notificationStyle.border = '2px solid red'
  } else {
    notificationStyle.color = 'green'
    notificationStyle.border = '2px solid green'
  }

  return <h1 style={notificationStyle}> {msg} </h1>
}

export default Notification