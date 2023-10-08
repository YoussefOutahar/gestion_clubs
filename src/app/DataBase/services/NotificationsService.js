import { eq } from 'lodash';
import supabase from '../Clients/SupabaseClient';

export const addNotification = async (notification) => {
    const { data, error } = await supabase.from('Notifications').insert([notification]);
    return { data, error };
}

export const getNotifications = async () => {
    const { data, error } = await supabase.from('Notifications').select('*');
    return { data, error };
}

export const getNotificationByIHeading= async (heading) => {
    const { data, error } = await supabase.from('Notifications').select('*');eq("heading", heading);
    return { data, error };
}

export const getNotificationById= async (id) => {
    const { data, error } = await supabase.from('Notifications').select('*').eq("id", id);
    return { data, error };
}

export const deleteNotification = async (id) => {
    const { data, error } = await supabase.from('Notifications').delete().match({ id });
    return { data, error };
}

export const clearNotifications = async () => {
    const { data, error } = await getNotifications();
    if (error) return { data, error };
    const { data: data2, error: error2 } = await supabase.from('Notifications').delete().match({ id: data.map((notification) => notification.id) });
    return { data: data2, error: error2 };
}

export const updateNotification = async (id, notification) => {
    const { data, error } = await supabase.from('Notifications').update(notification).match({ id });
    return { data, error };
}

