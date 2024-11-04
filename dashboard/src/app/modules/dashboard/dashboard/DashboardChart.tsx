import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { IDashboarGraphResponse } from "../core/models/dashboard.interfaces";

export const DashboardChart = ({ data }: { data: IDashboarGraphResponse }) => {
    return (
        <ResponsiveContainer width="100%" height={380} className={"z-50"}>
            <LineChart width={500} height={380} data={data.items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={"12px"} />
                <YAxis
                    height={1}
                    fontSize={"12px"}
                    tickFormatter={(number) => `${number}`}
                />
                <Tooltip
                    content={
                        <CustomTooltip
                            pv_range={data.pv_range}
                            uv_range={data.uv_range}
                        />
                    }
                />
                {/* <Legend /> */}
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#ff9155"
                    strokeDasharray="5 5"
                    name={data.pv}
                />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#6f55ff"
                    strokeDasharray="3 4 5 2"
                    name={data.uv}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export interface IRChartPayloadType {
    stroke: string;
    strokeDasharray: string;
    name: string;
    strokeWidth: number;
    fill: string;
    dataKey: string;
    color: string;
    value: number;
    payload: {
        name: string;
        uv: number;
        pv: number;
    };
    hide: boolean;
}

export const CustomTooltip = ({
    active,
    payload,
    label,
    pv_range,
    uv_range,
}: {
    active?: boolean;
    payload?: IRChartPayloadType[];
    label?: string;
    pv_range?: string;
    uv_range?: string;
}) => {
    if (active && payload && payload.length) {
        console.log(pv_range, uv_range);
        return (
            <div className="flex flex-col bg-white dark:bg-content1 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md p-4 z-50">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white dark:bg-content1 border-b dark:text-white">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
                                        >
                                            Toplam Yanıt ({label})
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
                                        >
                                            <div className="flex gap-1 items-center">
                                                <span className="flex w-1.5 h-1.5 rounded-full me-1.5 flex-shrink-0 text-purple-500 bg-purple-600"></span>
                                                {payload[1].name}
                                            </div>
                                            <span className="text-xs">
                                                {uv_range}
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
                                        >
                                            <div className="flex gap-1 items-center">
                                                <span className="flex w-1.5 h-1.5 rounded-full me-1.5 flex-shrink-0 text-orange-600 bg-orange-500"></span>
                                                {payload[0].name}
                                            </div>
                                            <span className="text-xs">
                                                {pv_range}
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-100 dark:bg-content1 border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                            APP
                                        </td>
                                        <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                                            {payload[1].payload.uv}
                                        </td>
                                        <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                                            {payload[0].payload.pv}
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-content1 ">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                            Toplam
                                        </td>
                                        <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                                            {payload[1].payload.uv}
                                        </td>
                                        <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                                            {payload[0].payload.pv}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};
