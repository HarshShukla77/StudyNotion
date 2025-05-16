const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST, // smtp.gmail.com
			port: 587,
			secure: false, // true for 465, false for 587
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: `"StudyNotion 🧠" <${process.env.MAIL_USER}>`,
			to: email,
			subject: title,
			text: stripHtmlTags(body), // 👈 Plain text fallback
			html: body,
		});

		console.log("✅ Mail sent to:", email);
		return info;
	} catch (error) {
		console.error("❌ Error sending mail:", error.message);
		return error;
	}
};

// 👇 Helper function to strip HTML for plain text fallback
const stripHtmlTags = (html) => {
	return html.replace(/<[^>]*>?/gm, ""); // very basic, can improve
};

module.exports = mailSender;
