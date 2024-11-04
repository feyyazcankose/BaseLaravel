import { useFormContext } from "@base/context/FormContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NavbarFormSubmit() {
    const { handleSubmit, backUrl } = useFormContext();
    const navigate = useNavigate();

    const handleSave = () => {
        if (handleSubmit) {
            handleSubmit();
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const message = "Form gönderilmeden sayfadan çıkamazsınız.";
            event.returnValue = message; // Modern tarayıcılarda bu satır gerekli.
            return message; // Eski tarayıcılarda bu satır gerekli.
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className="z-0 group relative box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2  min-w-24 h-12 text-medium rounded-large [&>svg]:max-w-[theme(spacing.8)] !transition-none shadow-lg shadow-default/50 bg-default text-default-foreground data-[hover=true]:opacity-hover gap-4 truncate flex justify-center sm:justify-between items-center w-10/12 px-0 sm:px-6 sm:w-8/12">
            <div className="gap-2 hidden md:flex items-center lg:flex pr-5 my-auto leading-[133%]  dark:text-neutral-200 max-md:gap-1 max-md:pr-2">
                <Icon icon="uil:sync-exclamation" width={"15"} />
                <div className="my-auto max-md:text-xs truncate w-8 lg:w-full">
                    Kaydedilmemiş değişiklikler
                </div>
            </div>
            <div className="flex gap-1 justify-center md:justify-between lg:justify-between text-center whitespace-nowrap max-md:gap-0.5 max-md:text-xs">
                <Button
                    size="sm"
                    onClick={() => navigate(backUrl)}
                    className="justify-center px-2 py-1.5 rounded-lg dark:bg-white bg-opacity-10 dark:text-zinc-800 max-md:px-1.5 max-md:py-1"
                >
                    İptal
                </Button>
                <Button
                    onClick={handleSave}
                    size="sm"
                    className="justify-center px-3 py-1.5 bg-primary-500 text-white max-md:px-2.5 max-md:py-1"
                >
                    Kaydet
                </Button>
            </div>
        </div>
    );
}
