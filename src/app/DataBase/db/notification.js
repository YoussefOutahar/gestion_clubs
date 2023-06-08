import Mock from '../mock'
import shortId from 'shortid'
import { getNotifications , deleteNotification , clearNotifications } from '../Clients/NotificationsClient'

const NotificationDB = {
    list: [
        {
            id: shortId.generate(),
            heading: 'Message',
            icon: {
                name: 'chat',
                color: 'primary',
            },
            timestamp: 1570702802573,
            title: 'New message from Devid',
            subtitle: 'Hello, Any progress...',
            path: 'chat',
        },
        {
            id: shortId.generate(),
            heading: 'Alert',
            icon: {
                name: 'notifications',
                color: 'error',
            },
            timestamp: 1570702702573,
            title: 'Server overloaded',
            subtitle: 'Traffice reached 2M',
            path: 'page-layouts/user-profile',
        },
        {
            id: shortId.generate(),
            heading: 'Message',
            icon: {
                name: 'chat',
                color: 'primary',
            },
            timestamp: 1570502502573,
            title: 'New message from Goustove',
            subtitle: 'Hello, send me details',
            path: 'chat',
        },
    ],
}

Mock.onGet('/api/notification').reply(async(config) => {
    const response = await getNotifications()
    return [200, response.data]
})

Mock.onPost('/api/notification/add').reply((config) => {
    const response = NotificationDB.list
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
