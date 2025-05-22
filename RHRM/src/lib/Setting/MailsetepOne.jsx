import React, { useState } from "react";
import axios from "axios";
const MailsetepOne = () => {
    const [formData, setFormData] = useState({
        mail_mailer: "smtp",
        mail_host: "",
        mail_port: "",
        mail_username: "",
        mail_password: "",
        mail_encryption: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/update-mail-settings",
                formData
            );
            alert("Mail settings updated!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update.");
        } finally {
            setLoading(false); // লোডিং শেষ
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px]"
            >
                <h2 className="text-xl font-bold mb-4">SMTP Configuration</h2>
                <label className="block mb-2">Protocol</label>
                <input
                    name="mail_mailer"
                    value={formData.mail_mailer}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block mb-2">SMTP Host</label>
                <input
                    name="mail_host"
                    value={formData.mail_host}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block mb-2">SMTP Port</label>
                <input
                    name="mail_port"
                    value={formData.mail_port}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block mb-2">SMTP User</label>
                <input
                    name="mail_username"
                    value={formData.mail_username}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block mb-2">SMTP Password</label>
                <input
                    name="mail_password"
                    type="password"
                    value={formData.mail_password}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block mb-2">Mail Encryption (tls/ssl)</label>
                <input
                    name="mail_encryption"
                    value={formData.mail_encryption}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={loading}
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
};

export default MailsetepOne;
