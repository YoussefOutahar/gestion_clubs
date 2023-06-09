import Mock from '../mock'
import { getNotifications , deleteNotification , clearNotifications , addNotification} from '../Clients/NotificationsClient'

Mock.onGet('/api/notification').reply(async(config) => {
    const response = await getNotifications()
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
