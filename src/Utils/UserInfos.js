import supabase from "../DataBase/SupabaseClient";

// Retrieve user's club from the 'users' table

export const getUserClub = async () => {
    const { user, error } = await supabase.auth.user();
  
    if (error) {
      console.error('Error retrieving user information:', error.message);
      return;
    }
  
    if (user) {
      const { infos, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
  
      if (fetchError) {
        console.error('Error fetching user club:', fetchError.message);
        return;
      }
  
      console.log('User club:', infos.club);
    }
    return { infos }
}
  