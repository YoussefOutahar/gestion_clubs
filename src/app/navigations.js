import { getCurrentUser } from "./DataBase/services/UsersService";
import { getMembreByProfile } from "./DataBase/services/MembersService";

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
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];
    // President/Vice-president du club

    const presidentNavigations = [
        {
            name: "MyCLub",
            path: "/UserClub",
            icon: "home",
        },
        {
            name: "Members", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/members",
            icon: "group",
        },
        {
            name: "Events", // Planning Trimestriel !!!!
            path: "/events",
            icon: "event",
        },

        {
            name: "Meetings",
            path: "/meetings",
            icon: "event",
        },
        {
            name: "Finances", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/finance",
            icon: "account_balance_wallet",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];

    // Secretaire du club

    const secretaireNavigations = [
        {
            name: "MyCLub",
            path: "/UserClub",
            icon: "home",
        },
        {
            name: "Members", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/members",
            icon: "group",
        },
        {
            name: "Events", // Planning Trimestriel !!!!
            path: "/events",
            icon: "event",
        },

        {
            name: "Meetings",
            path: "/meetings",
            icon: "event",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];

    // Tresorier du club

    const tresorierNavigations = [
        {
            name: "MyCLub",
            path: "/UserClub",
            icon: "home",
        },
        {
            name: "Members", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/members",
            icon: "group",
        },
        {
            name: "Events", // Planning Trimestriel !!!!
            path: "/events",
            icon: "event",
        },
        {
            name: "Finances", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/finance",
            icon: "account_balance_wallet",
        },
        {
            name: "Meetings",
            path: "/meetings",
            icon: "event",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];

    // Adherant du club
    const memberNavigations = [
        {
            name: "MyCLub",
            path: "/UserClub",
            icon: "home",
        },
        {
            name: "Members", // ONLY HIS CLUB'S MEMBERS !!!!!!
            path: "/members",
            iconText: "group",
        },
        {
            name: "Events", // Planning Trimestriel !!!!
            path: "/events",
            icon: "event",
        },

        {
            name: "Meetings",
            path: "/meetings",
            icon: "event",
        },
        {
            name: "Forums",
            path: "/forums",
            icon: "message",
        },
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];

    if (user) {
        // if (user.user_metadata["role"] === "admin") {
        //     return adminNavigations;
        // } else if (user.user_metadata["role"] === "user") {
        //     member = member[0];
        //     if (member.role.toLowerCase() === "president" || member.role.toLowerCase() === "vice-president") {
        //         console.log("president");
        //         return presidentNavigations;
        //     }
        //     if (member.role.toLowerCase() === "secretaire") {
        //         console.log("secretaire");
        //         return secretaireNavigations;
        //     }
        //     if (member.role.toLowerCase() === "tresorier") {
        //         console.log("tresorier");
        //         return tresorierNavigations;
        //     }
        //     if (member.role.toLowerCase() === "adherant") {
        //         console.log("adherant");
        //         return memberNavigations;
        //     }
        //     return memberNavigations;
        // }

        return [
            { label: "Admin", type: "label" },
            ...adminNavigations,
            { label: "President", type: "label" },
            ...presidentNavigations,
            { label: "Secretaire", type: "label" },
            ...secretaireNavigations,
            { label: "Tresorie", type: "label" },
            ...tresorierNavigations,
            { label: "Membre", type: "label" },
            ...memberNavigations,
        ];
    }
};
