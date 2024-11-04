import AppFavIconLogo from "@app/core/components/AppFavIcon";
export const CompaniesDropdown = () => {
    return (
        <div className="flex items-center gap-4">
            <AppFavIconLogo fill="#12b981" className="w-7 h-7" />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                    Faly.
                </h3>
                <span className="text-xs font-medium text-default-500">
                    Insightspowering, TR
                </span>
            </div>
        </div>
    );
};
