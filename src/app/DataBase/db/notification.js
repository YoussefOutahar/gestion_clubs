import Mock from '../mock'
import NotificationsService from '../services/NotificationsService'
import { getCurrentUser , getProfileById } from '../services/UsersService';
import UsersService from '../services/UsersService';

Mock.onGet('/api/notification').reply(async(config) => {

    let user = await UsersService.getCurrentUser();
    let profileResponse = await UsersService.getUserById(user.id);
    let profile = profileResponse[0];
    const response = await NotificationsService.getNotifications()
    
    let notifications = [];

    if (profile.role == "admin") {
        response.data.forEach(async (notification) => {
            if (notification.id_club != null) {
                notifications.push(notification)
            }
        });
        return [200, notifications]
    } else {
        response.data.forEach(async (notification) => {
            if (notification.id_club == profile.id_club) {
                notifications.push(notification)
            }
        });
        return [200, notifications]
    }
})

Mock.onPost('/api/notification/add').reply((config) => {
    const { notification } = JSON.parse(config.data)
    const response = NotificationsService.addNotification(notification)
    return [200, response.data]
})

Mock.onPost('/api/notification/delete').reply(async (config) => {
    let { id } = JSON.parse(config.data)
    await NotificationsService.deleteNotification(id)
    const response = await NotificationsService.getNotifications()
    return [200, response.data]
})

Mock.onPost('/api/notification/delete-all').reply(async (config) => {
    const response = await NotificationsService.clearNotifications()
    console.log(response)
    return [200, response.data]
})
