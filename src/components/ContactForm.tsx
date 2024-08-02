import { useState } from "react";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

type formType = {
    name: string;
    email: string;
    message: string;
};

function ContactForm() {
    const [formData, setFormData] = useState<formType>({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({});

    const [isSending, setIsSending] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let errors = {};
        if (!formData.name) {
            //@ts-ignore
            errors.name = "Name is required";
        }
        if (!formData.email) {
            //@ts-ignore
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            //@ts-ignore
            errors.email = "Email is invalid";
        }
        if (!formData.message) {
            //@ts-ignore
            errors.message = "Message is required";
        }

        return errors;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setIsSending(true);
            try {
                const response = await emailjs.send(
                    "service_or7bv0m",
                    "service_or7bv0m",
                    formData,
                    "IMxm3l7ZmIGahWJ0k"
                );
                console.log("SUCCESS!", response.status, response.text);
                toast.success("Message sent successfully!!");
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
                setIsSending(false);
            } catch (error) {
                console.log("Eorror!!", error);
                toast.error("failed to send message . Please try again later");
            }

        }
    };
    return (
        <div className="mx-auto max-w-3xl p-4" id='contact'>
            <Toaster />
            <h2 className="my-8 text-center text-4xl font-semibold tracking-tighter">
                Let's Connect
            </h2>
            <motion.form
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        placeholder="Name"
                        onChange={handleChange}
                        className="mb-8 w-full appearance-none rounded-lg border border-gray-900 bg-transparent  px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
                    />
                    {/* @ts-ignore */}
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            aria-live="polite"
                            //@ts-ignore
                            className="text-sm text-pink-700">{errors.name}</motion.p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                        className="mb-8 w-full appearance-none rounded-lg border border-gray-900 bg-transparent  px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
                    />
                    {/* @ts-ignore */}
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            aria-live="polite"
                            //@ts-ignore
                            className="text-sm text-pink-700">{errors.email}</motion.p>
                    )}
                </div>
                <div className="mb-4">
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        placeholder="Message"
                        rows={4}
                        onChange={handleChange}
                        className="mb-8 w-full appearance-none rounded-lg border border-gray-900 bg-transparent  px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
                    />
                    {/* @ts-ignore */}
                    {errors.message && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            aria-live="polite"
                            //@ts-ignore
                            className="text-sm text-pink-700">{errors.message}</motion.p>
                    )}
                </div>
                <button type="submit" className={`mb-8 w-full rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-yellow-500  ${isSending ? "cursor-not-allowed opacity-50" : ""}`} disabled={isSending}>
                    {isSending ? "Sendeing..." : "Send"}
                </button>
            </motion.form >
        </div >
    );
}

export default ContactForm;