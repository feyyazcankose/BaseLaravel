/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPaginate } from "react-select-async-paginate";
import { useTheme } from "@base/layout/contexts/ThemeContext";

type Props = {
    className?: string;
    inactive?: boolean;
    isDisabled?: boolean;
    isSearchable?: boolean;
    defaultValue?: any;
    value: any;
    isMulti?: boolean;
    placeholder?: string;
    onChange: (value: any) => void;
    loadOptions: (
        search: any,
        loadedOptions: any,
        { page }: any,
        id?: number
    ) => Promise<{
        options: any;
        hasMore: boolean;
        additional: {
            page: any;
            id?: number;
        };
    }>;
};

const primaryColor = "#19c965";

const AsyncSelect: React.FC<Props> = ({
    defaultValue,
    className = "",
    value,
    inactive = false,
    isDisabled = false,
    onChange,
    loadOptions,
    isSearchable = false,
    isMulti = false,
    placeholder = "Seçiniz...",
}) => {
    const { theme } = useTheme();

    return (
        <div className={className}>
            <AsyncPaginate
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                isSearchable={isSearchable}
                isMulti={isMulti}
                value={value}
                loadOptions={loadOptions}
                placeholder={placeholder}
                onChange={onChange}
                additional={{
                    page: 1,
                }}
                styles={
                    theme !== "dark"
                        ? {
                              control: (baseStyles: any, state: any) => ({
                                  ...baseStyles,
                                  borderRadius: "0.525rem",
                                  paddingTop: "0",
                                  minHeight: "10px",
                                  paddingBottom: "0",
                                  borderColor: state.isFocused
                                      ? primaryColor
                                      : "#D0D7DE",
                                  boxShadow: state.isFocused ? "" : "",
                                  "&:hover": {
                                      borderColor: state.isFocused
                                          ? primaryColor
                                          : "#D0D7DE",
                                      boxShadow: state.isFocused ? "" : "",
                                      cursor: isDisabled
                                          ? "not-allowed"
                                          : "pointer",
                                  },
                              }),
                              option: (baseStyles: any, state: any) => ({
                                  ...baseStyles,
                                  backgroundColor: state.isFocused
                                      ? primaryColor
                                      : state.isSelected
                                      ? primaryColor
                                      : "#fff",
                                  color: state.isFocused ? "#fff" : "#212529",
                                  "&:hover": {
                                      backgroundColor: state.isFocused
                                          ? primaryColor
                                          : "#fff",
                                      color: state.isFocused
                                          ? "#fff"
                                          : "#212529",
                                      cursor: "pointer",
                                  },
                              }),
                              menu: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: "#fff",
                                  color: "#212529",
                                  zIndex: 9999,
                              }),
                              menuList: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: "#fff",
                                  color: "#212529",
                              }),
                              singleValue: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: inactive ? "#ccc" : "#212529",
                              }),
                              placeholder: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#212529",
                              }),
                              input: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#212529",
                              }),
                              dropdownIndicator: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#212529",
                              }),
                              indicatorSeparator: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: "#212529",
                              }),
                              clearIndicator: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#212529",
                              }),
                              multiValue: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: inactive
                                      ? "#ccc"
                                      : primaryColor,
                                  color: "#fff",
                              }),
                              multiValueLabel: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#fff",
                              }),
                              multiValueRemove: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#fff",
                                  "&:hover": {
                                      backgroundColor: primaryColor,
                                      color: "#fff",
                                  },
                              }),
                          }
                        : {
                              control: (baseStyles: any, state: any) => ({
                                  ...baseStyles,
                                  borderRadius: "0.525rem",
                                  paddingTop: "0",
                                  minHeight: "10px",
                                  paddingBottom: "0",
                                  borderColor: state.isFocused
                                      ? primaryColor
                                      : "#444",
                                  boxShadow: state.isFocused ? "" : "",
                                  backgroundColor: "transparant",
                                  "&:hover": {
                                      borderColor: state.isFocused
                                          ? primaryColor
                                          : "#444",
                                      boxShadow: state.isFocused ? "" : "",
                                      cursor: state.isDisabled
                                          ? "not-allowed"
                                          : "pointer",
                                  },
                              }),
                              option: (baseStyles: any, state: any) => ({
                                  ...baseStyles,
                                  backgroundColor: state.isFocused
                                      ? primaryColor
                                      : state.isSelected
                                      ? primaryColor
                                      : "#444",
                                  color: state.isFocused ? "#fff" : "#ccc",
                                  "&:hover": {
                                      backgroundColor: state.isFocused
                                          ? primaryColor
                                          : "#444",
                                      color: state.isFocused ? "#fff" : "#ccc",
                                      cursor: "pointer",
                                  },
                              }),
                              menu: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: "#333",
                                  color: "#ccc",
                                  zIndex: 9999,
                              }),
                              menuList: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: "#333",
                                  color: "#ccc",
                              }),
                              singleValue: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: inactive ? "#666" : "#fff",
                              }),
                              placeholder: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#666",
                              }),
                              input: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#fff",
                              }),
                              dropdownIndicator: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#666",
                              }),
                              indicatorSeparator: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: "#666",
                              }),
                              clearIndicator: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#666",
                              }),
                              multiValue: (baseStyles: any) => ({
                                  ...baseStyles,
                                  backgroundColor: inactive
                                      ? "#666"
                                      : primaryColor,
                                  color: "#fff",
                              }),
                              multiValueLabel: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#fff",
                              }),
                              multiValueRemove: (baseStyles: any) => ({
                                  ...baseStyles,
                                  color: "#fff",
                                  "&:hover": {
                                      backgroundColor: primaryColor,
                                      color: "#fff",
                                  },
                              }),
                          }
                }
            />
        </div>
    );
};

export default AsyncSelect;
