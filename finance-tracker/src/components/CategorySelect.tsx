import Select from "react-select";
import { categories } from "../data/categories";

function CategorySelect({ value, onChange }) {
  const selectedOption = categories.find((cat) => cat.value === value) || null;

  const formatOptionLabel = ({ label, icon: Icon }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {Icon && <Icon size={18}/>}
      <span>{label}</span>
    </div>
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "58px",
      borderRadius: "18px",
      border: state.isFocused ? "2px solid #3b82f6" : "2px solid #dbeafe",
      boxShadow: "none",
      fontSize: "18px",
      paddingLeft: "6px",
      cursor: "pointer",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 12px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#64748b",
      fontSize: "18px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#0f172a",
      fontSize: "18px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 12px 35px rgba(15, 23, 42, 0.12)",
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#eff6ff" : "#ffffff",
      color: "#0172a0",
      padding: "14px 16px",
      fontSize: "17px",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#2563eb",
      paddingRight: "14px",
    }),
  };
  return (
    
      <Select
        options={categories}
        value={selectedOption}
        onChange={(selected) => onChange(selected ? selected.value : "")}
        placeholder="Select a category..."
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        isSearchable={false}/>
  );
}
export default CategorySelect;
