import { getCurrentUser } from "./DataBase/Clients/UsersClient";
import { getMembreByProfile } from "./DataBase/Clients/MembersClient";

export const getNavigations = async () => {
    const user = await getCurrentUser();

    let member;
    if (user) {
        member = await getMembreByProfile(user.id);
    }

    // DVE 

    const adminNavigations = [
        {
            name: "Dashboard",
            path: "/dashboard/default",
            icon: "dashboard",
            children: [
                {
                    name: "Summary",
                    path: "/summary/global",
                    iconText: "S",
                },
                {
                    name: "Clubs",
                    path: "/summary/clubs",
                    iconText: "C",
                },
                {
                    name: "Memebers",
                    path: "/summary/members",
                    iconText: "M",
                },
                {
                    name: "Events",
                    path: "/summary/events",
                    iconText: "E",
                },
            ],
        },
        { label: "General", type: "label" },
        {
            name: "Clubs",
            path: "/clubs",
            icon: "home",
        },
        {
            name: "Memebers",
            path: "/adminClubsMembers",
            icon: "group",
        },
        {
            name: "Events",
            path: "/events",
            icon: "event",
        },
        {
            name: "Meetings",
            path: "/meetings",
            icon: "event",
        },
        {
            name: "Admin Finance",
            path: "/AdminFinance",
            icon: "account_balance_wallet",
        },
        { label: "PAGES", type: "label" },
        {
            name: "Session/Auth",
            icon: "security",
            children: [
                { name: "Sign up", iconText: "SU", path: "/session/signup" },
                { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
                { name: "Error", iconText: "404", path: "/session/404" },
            ],
        },
        { label: "Components", type: "label" },
        {
            name: "Components",
            icon: "favorite",
            badge: { value: "30+", color: "secondary" },
            children: [
                { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
                { name: "Buttons", path: "/material/buttons", iconText: "B" },
                { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
                { name: "Dialog", path: "/material/dialog", iconText: "D" },
                { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
                { name: "Form", path: "/material/form", iconText: "F" },
                { name: "Icons", path: "/material/icons", iconText: "I" },
                { name: "Menu", path: "/material/menu", iconText: "M" },
                { name: "Progress", path: "/material/progress", iconText: "P" },
                { name: "Radio", path: "/material/radio", iconText: "R" },
                { name: "Switch", path: "/material/switch", iconText: "S" },
                { name: "Slider", path: "/material/slider", iconText: "S" },
                { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
                { name: "Table", path: "/material/table", iconText: "T" },
            ],
        },
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];


    // Membre_secondaire/adherent du club 
    //TODO: remove this

    const userNavigations = [
        {
            name: "Account",
            path: "/Account",
            icon: "group",
        },
    ];

    // President/Vice-president du club

    const presidentNavigations = [
        {
            name: "Account",
            path: "/Account",
            icon: "group",
        },
        {
            name: "Events", // Planning Trimestriel !!!!
            path: "/summary/events",
            iconText: "E",
        },
        {
            name: "Memebers", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/summary/members",
            iconText: "M",
        },
        {
            name: "Events", // Planning des reunions !!!!!
            path: "/summary/events",
            iconText: "E",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
    ];

    // Secretaire du club

    const secretaireNavigations = [
        {
            name: "Account",
            path: "/Account",
            icon: "group",
        },
        {
            name: "Events", // Planning Trimestriel only !!!!
            path: "/summary/events",
            iconText: "E",
        },
        {
            name: "Memebers", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/summary/members",
            iconText: "M",
        },
        {
            name: "Statistics",
            path: "/summary/statistics",
            iconText: "account_balance_wallet",
        },
        {
            name: "Events", // Planning des reunions !!!!!
            path: "/summary/events",
            iconText: "E",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
    ];

    // Tresorier du club

    const tresorierNavigations = [
        {
            name: "Account",
            path: "/Account",
            icon: "group",
        },
        {
            name: "Events", // Planning Trimestriel only !!!!
            path: "/summary/events",
            iconText: "E",
        },
        {
            name: "Memebers", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/summary/members",
            iconText: "M",
        },
        {
            name: "Finances", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/finances",
            iconText: "F",
        },
        {
            name: "Statistics",
            path: "/summary/statistics",
            iconText: "account_balance_wallet",
        },
        {
            name: "Events", // Planning des reunions !!!!!
            path: "/summary/events",
            iconText: "E",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
    ];

    if (user) {
        if (user.user_metadata["role"] === "admin") {
            return adminNavigations;
        } else if (user.user_metadata["role"] === "user") {
            member = member[0];
            if (member.role.toLowerCase() === "president" || member.role.toLowerCase() === "vice-president") {
                console.log("president");
                return presidentNavigations;
            }
            if (member.role.toLowerCase() === "secretaire") {
                console.log("secretaire");
                return secretaireNavigations;
            }
            if (member.role.toLowerCase() === "tresorier") {
                console.log("tresorier");
                return tresorierNavigations;
            }
            if (member.role.toLowerCase() === "adherant") {
                console.log("adherant");
                return userNavigations;
            }
            return userNavigations;
        }
    }
};
