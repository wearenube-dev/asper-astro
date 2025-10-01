import { getAboutPath, getContactPath, getHomepagePath, getServicesPath } from "./path";

export const navigationData = {
    links:[
        {
            text: "Home",
            href: getHomepagePath(),
            variant: 'link'
        },
        {
            text: "Chi sono",
            href: getAboutPath(),
            variant: 'link'
        },
        {
            text: "Servizi",
            href: getServicesPath(),
            variant: 'link'
        },
        {
            text: "Contatti",
            href: getContactPath(),
            variant: 'button'
        }
    ]
}