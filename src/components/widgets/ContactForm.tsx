// src/components/ContactForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { getThankYouPath } from "../../path";

const schema = z.object({
    name: z.string().min(2, { message: "Il nome è obbligatorio" }),
    email: z.string().email({ message: "Email non valida" }),
    phone: z.string().min(6, { message: "Telefono non valido" }),
    message: z.string().min(1, { message: "Il messaggio è obbligatorio" }),
    privacy: z.boolean({ message: "È richiesta l'accettazione della privacy policy" }),

});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {

        setIsSubmitting(true);

        const jsonData = JSON.stringify(data)
        
        const response = await fetch("/api/send-mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData,
        });

        console.log(response)

        if (response.ok) {
            window.location.href = getThankYouPath();
        } else {
            console.log(response)
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
                <label htmlFor="" className="block !font-seasons font-medium text-lg">Nome e cognome*</label>
                <input
                    type="text"
                    placeholder="Nome"
                    {...register("name")}
                    className="block border border-bismark-500 rounded p-4 w-full focus:outline-bismark-500 placeholder:font-light text-lg font-light"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="" className="block !font-seasons font-medium text-lg">Email*</label>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="block border border-bismark-500 rounded p-4 w-full focus:outline-bismark-500 placeholder:font-light text-lg font-light"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="" className="block !font-seasons font-medium text-lg">Telefono*</label>
                <input
                    type="text"
                    placeholder="Telefono"
                    {...register("phone")}
                    className="block border border-bismark-500 rounded p-4 w-full focus:outline-bismark-500 placeholder:font-light text-lg font-light"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="" className="block !font-seasons font-medium text-lg">Come possiamo aiutarti?*</label>
                <textarea
                    placeholder="Messaggio"
                    rows={4}
                    {...register("message")}
                    className="block border border-bismark-500 rounded p-4 w-full focus:outline-bismark-500 placeholder:font-light text-lg font-light"
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            <div>
                <label htmlFor="" className="inline-flex gap-x-2">
                    <input
                        type="checkbox"
                        {...register("privacy")}
                        className="border p-2 inline"
                    />
                    <p>Accetto la <a href="https://www.iubenda.com/privacy-policy/70719383/" target="_blank">privacy policy</a>.</p>
                </label>
                
                {errors.privacy && <p className="text-red-500 text-sm">{errors.privacy.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center font-raleway justify-center px-8 py-4 rounded-lg font-light transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-jacksons-purple-900 text-white hover:scale-[0.99] focus:ring-bismark-500 cursor-pointer"
            >
                {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
            </button>
        </form>
    );
}
