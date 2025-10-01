import { useState } from "react";

type FaqItemProps = {
    question: string;
};

export default function FaqItem({ question }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button type="button" className="w-full flex justify-between items-center text-left cursor-pointer py-4" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                <span>{question}</span>
                <svg className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                <slot />
            </div>
        </div>
    );
}
