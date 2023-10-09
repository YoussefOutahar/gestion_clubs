import supabase from "../Clients/SupabaseClient";
import NotificationsService from "./NotificationsService";

export default class MeetingsService {

  static async getMeetings () {
    const { data, error } = await supabase.from("Meetings").select("*");
    if (error) {
        console.error("Error fetching meetings :", error);
    } else {
        console.log("Fetched Meetings:", data);
        return data;
    }
};

static async deleteMeeting(id) {
    const { data, error } = await supabase.from("Meetings").delete().eq("id", id);
    if (error) {
        console.error("Error deleting meetings:", error);
    } else {
        console.log("meetings deleted successfully");
    }
};

static async updateMeeting(id, meeting) {
    const { data, error } = await supabase.from("Meetings").update(meeting).eq("id", id);
    if (error) {
        console.error("Error updating Meeting:", error);
    } else {
        console.log("Meeting updated successfully");
    }
};
static async AddMeeting(meeting) {
    try {
        const { data, error } = await supabase.from("Meetings").insert(meeting);
        if (error) {
          console.error("Error adding Meeting:", error);
        } else {
          console.log("Meeting added successfully");
          // Add a notification
          await NotificationsService.addNotification({
            heading: "New meeting",
            title: meeting.description,
            subtitle: meeting.location,
            timestamp: meeting.Date,
            body: "none",
            icon: {
              name: "Message",
              color: "primary"
            },
            path: "finance"
          },);
        }
      } catch (error) {
        console.error(error);
      }
};

}