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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="fullName">Nome e cognome*</Label>
                <Input type="text" placeholder="Nome e cognome" id="fullName" {...register("name")} />
                {errors.name && <ErrorMessage error={errors.name.message}/>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input type="email" placeholder="Email" id="email" {...register("email")} />
                {errors.email && <ErrorMessage error={errors.email.message}/>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Telefono*</Label>
                <Input type="text" placeholder="Telefono" id="phone" {...register("phone")} />
                {errors.phone && <ErrorMessage error={errors.phone.message}/>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Come possiamo aiutarti?*</Label>
                <textarea placeholder="Messaggio" id="message" rows={4} {...register("message")} className="block border rounded p-2.5 w-full" />
                {errors.message && <ErrorMessage error={errors.message.message}/>}
            </div>

            <div>
                <label htmlFor="" className="inline-flex gap-x-2">
                    <input
                        type="checkbox"
                        {...register("privacy")}
                        className="border p-2 inline"
                    />
                    <p>Accetto il trattamento dei miei dati personali come descritto nella <a href="https://www.iubenda.com/privacy-policy/70719383/" target="_blank" className="underline">privacy policy</a>.</p>
                </label>
                
                {errors.privacy && <ErrorMessage error={errors.privacy.message} />}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center px-8 py-4 rounded-lg transition-all duration-200 ease-in-out focus:outline-none bg-blue-600 text-white hover:scale-[0.99] cursor-pointer"
            >
                {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
            </button>
        </form>
    );
}

interface LabelProps {
    htmlFor: string,
    children: React.ReactNode
}

const Label = ({htmlFor, children}:LabelProps) =>{
    return(
        <label htmlFor={htmlFor} className="block">{children}</label>
    )
}

interface ErrorMessageProps {
    error?: string
}

const ErrorMessage = ({error}:ErrorMessageProps) =>{
    return(
        <p className="text-red-500 text-sm">{error}</p>
    )
}

interface InputProps {
    type: string,
    placeholder: string,
    id: string,
}

const Input = ({type, placeholder, id, ...props}:InputProps) =>{
    return(
        <input
            type={type}
            placeholder={placeholder}
            id={id}
            {...props}
            className="block border rounded p-2.5 w-full"
        />
    )
}