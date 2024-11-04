import ContentLoader from "react-content-loader";

export const DashboardMultiLineLoader = () => (
    <ContentLoader
        viewBox="0 0 340 210"
        backgroundColor={"#E9EAEC"} // Light gray background
        foregroundColor={"#C7C9CE"} // Custom foreground (loading animation) color
    >
        <rect x="5" y="10" rx="3" ry="3" width="40%" height="11" />
        <rect x="5" y="30" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="50" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="70" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="90" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="110" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="130" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="150" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="170" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="190" rx="3" ry="3" width="98%" height="11" />
        <rect x="5" y="210" rx="3" ry="3" width="98%" height="11" />
    </ContentLoader>
);

export const DashboardLineLoader = ({
    height = "100",
}: {
    height?: string;
}) => {
    return (
        <ContentLoader
            viewBox="0 0 340 100"
            backgroundColor={"#E9EAEC"} // Light gray background
            foregroundColor={"#C7C9CE"} // Custom foreground (loading animation) color
        >
            <rect x="5" y="0" rx="3" ry="3" width="98%" height={height} />
        </ContentLoader>
    );
};
