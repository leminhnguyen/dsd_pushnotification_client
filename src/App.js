import {Button} from '@material-ui/core';
import {
  isPushNotificationSupported,
  initializePushNotifications,
  registerServiceWorker,
  createNotificationSubscription,
  sendSubscriptionToPushServer,
  sendPushNotification
} from './client/pushNotification';

function App() {

  const handleOnclickSubcribe = () => {
    console.log("clicked to send subcription")
    if (isPushNotificationSupported()) {
      initializePushNotifications().then(result => {
        if(result === "granted"){
          console.log("start registering sw")
          registerServiceWorker();
          createNotificationSubscription().then( subscription => {
            sendSubscriptionToPushServer({
              subscription: subscription,
              project_type: 'CHAY_RUNG'
            })
          });
        }
      })
    }
  }

  const handleOnclickSendNotification = () => {
    console.log("clicked to send notification")
    sendPushNotification({
      project_type: 'CHAY_RUNG',
      payload: {
        "title": "chay rung",
        "text": "da xay ra chay rung o khu vuc ABC",
        "image": "logo512.png",
        "url": "https://vtv.vn/chay-rung.html"
      }
    })
  }

  return (
    <div className="container">
      <Button variant="contained" color="primary" onClick={handleOnclickSubcribe}>
        Subcribe notification
      </Button>
      <Button style={{margin: 2}} variant="contained" color="secondary" onClick={handleOnclickSendNotification}>
        Send notifications
      </Button>
    </div>
  );
}

export default App;
