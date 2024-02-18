import "i18next";
import main from "../../locales/en/main.json";
import menu from "../../locales/en/menu.json";
import home from "../../locales/en/home.json";

declare module "i18next" {
    const resources = {

    } as const;
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: "main";
        // custom resources type
        resources: {
            main: typeof main
            menu: typeof menu
            home: typeof home
        }
        // other
    }
}