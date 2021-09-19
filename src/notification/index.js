import PushNotification from 'react-native-push-notification'

// PushNotification.createChannel(
//     {
//         channelId: "todoApp", // (required)
//         channelName: "My channel", // (required)
//         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//         importance: 4, // (optional) default: 4. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// );
export const showNotification = (title, message) => {
    console.log(title);
    PushNotification.localNotification({
        channelId: 'todoApp',
        title,
        message
    })
    PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids); // ['channel_id_1']
      });
}

export const handleScheduleNotification = (id,message, date) => {
    console.log(id|1,'message');
    PushNotification.localNotificationSchedule({
        id:id|1,
        channelId: 'todoApp',
        title:'ToDo',
        message,
        date
    })
}
export const handleCancel = () => {
    // PushNotification.cancelAllLocalNotifications()
    PushNotification.cancelLocalNotifications({id: '123'});
}