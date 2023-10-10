import { eq } from 'lodash';
import supabase from '../Clients/SupabaseClient';

export default class NotificationsService {

    static async addNotification (notification)  {
        const { data, error } = await supabase.from('Notifications').insert([notification]);
        return { data, error };
    }
    
    static async getNotifications () {
        const { data, error } = await supabase.from('Notifications').select('*');
        return { data, error };
    }
    
    static async getNotificationByIHeading(heading) {
        const { data, error } = await supabase.from('Notifications').select('*');eq("heading", heading);
        return { data, error };
    }
    
    static async getNotificationById(id) {
        const { data, error } = await supabase.from('Notifications').select('*').eq("id", id);
        return { data, error };
    }
    
    static async deleteNotification (id) {
        const { data, error } = await supabase.from('Notifications').delete().match({ id });
        return { data, error };
    }
    
    static async clearNotifications ()  {
        const { data, error } = await NotificationsService.getNotifications();
        if (error) return { data, error };
        const { data: data2, error: error2 } = await supabase.from('Notifications').delete().match({ id: data.map((notification) => notification.id) });
        return { data: data2, error: error2 };
    }
    
    static async updateNotification (id, notification)  {
        const { data, error } = await supabase.from('Notifications').update(notification).match({ id });
        return { data, error };
    }

}

