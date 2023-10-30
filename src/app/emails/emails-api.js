import { Resend } from "resend";
const fs = require("fs");

const resend = new Resend("re_hKGV6oE8_LxkZNynszZmhadP83Yq9dJzc");

export const sendEventCreationMail = async () => {

    const htmlContent = fs.readFileSync("./event-validation-email.html", "utf8");
    
    console.log(htmlContent);
    
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "youssefoutahar1@gmail.com",
        subject: "Hello World",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
};
