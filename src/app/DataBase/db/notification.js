import Mock from '../mock'
import { getNotifications , deleteNotification , clearNotifications , addNotification} from '../services/NotificationsService'
import { getCurrentUser , getProfileById } from '../services/UsersService';

Mock.onGet('/api/notification').reply(async(config) => {
    let user = await getCurrentUser()
    let profile = await getProfileById(user.id)
    const response = await getNotifications()
    
    // let notifications = [];
    // if (profile.role == "admin") {
    //     response.data.forEach(async (notification) => {
    //         if (notification.id_club != null) {
    //             notifications.push(notification)
    //         }
    //     });
    //     return [200, notifications]
    // } else {
    //     const response = await getNotifications()
    //     response.data.forEach(async (notification) => {
    //         if (notification.id_club == null) {
    //             notifications.push(notification)
    //         }
    //     });
    //     return [200, notifications]
    // }
    return [200, response.data]
})

Mock.onPost('/api/notification/add').reply((config) => {
    const { notification } = JSON.parse(config.data)
    const response = addNotification(notification)
    return [200, response.data]
})

Mock.onPost('/api/notification/delete').reply(async (config) => {
    let { id } = JSON.parse(config.data)
    await deleteNotification(id)
    const response = await getNotifications()
    return [200, response.data]
})

Mock.onPost('/api/notification/delete-all').reply(async (config) => {
    await clearNotifications()
    const response = await getNotifications()
    console.log(response)
    return [200, response.data]
})
