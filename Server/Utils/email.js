const nodemailer = require("nodemailer");

function sendEmail({ email, resetToken }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const mailConfigs = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: "PASSWORD RECOVERY",
            html: `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #00466a;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 1.1em;
            color: #333;
        }
        .otp {
            background-color: #00466a;
            color: #fff;
            font-size: 1.5em;
            text-align: center;
            padding: 10px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .footer {
            padding: 10px;
            text-align: center;
            color: #aaa;
            font-size: 0.9em;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>StreamEase</h1>
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>Thank you for choosing ExoPlanetarium. Use the following OTP to complete your password recovery procedure. OTP is valid for 5 minutes:</p>
            <div class="otp">${resetToken}</div>
            <p>Regards,<br />StreamEase</p>
        </div>
        <div class="footer">
            <p>ExoPlanetarium Corp.</p>
            <p>NED University of Engineering and Technology</p>
        </div>
    </div>
</body>
</html>

            `,
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
                console.error(error);
                return reject({
                    message: `An error occurred while sending email`,
                });
            }
            console.log("Email sent: " + info.response);
            return resolve({ message: "Email sent successfully" });
        });
    });
}

module.exports = sendEmail;
