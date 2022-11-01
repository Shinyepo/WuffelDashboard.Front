import { FC, useState } from "react";
import ReactSelect, { StylesConfig } from "react-select";
import { GetGuildChannelsQuery } from "../../../../generated/graphql";
import { SelectOption } from "../../../../types";

interface Props {
  channelList: Array<SelectOption>;
}

const customStyles = {
  control: (s) => ({
    ...s,
    background: "#4A5568",
    borderColor: "#718096",
    maxWidth: "450px",
  }),
  input: (s) => ({ ...s, color: "white" }),
  multiValue: (s) => ({ ...s, background: "#2D3748", borderColor: "#1A202C" }),
  multiValueLabel: (s) => ({ ...s, color: "" }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ":hover": { background: "#A0AEC0", color: "#2D3748" },
  }),
  placeholder: (s) => ({ ...s, color: "#A0AEC0" }),
  menu: (s) => ({ ...s, background: "#4A5568", color: "white" }),
  option: (provided, state) => ({
    ...provided,
    background: state.isDisabled
      ? "#2D3748"
      : state.isFocused
      ? "#718096"
      : state.isSelected
      ? "#4A5568"
      : "#4A5568",
    ":active": { ...provided[":active"], background: "#A0AEC0" },
  }),
} as StylesConfig;

const optionList = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "blue2", label: "Blue" },
  { value: "blue22", label: "Blue" },
  { value: "blue3", label: "Blue" },
  { value: "blue4", label: "Blue" },
  { value: "blue5", label: "Blue" },
  { value: "white", label: "White" },
];
export const MultiSelect: FC<Props> = ({ channelList }) => {
  const [selectedOptions, setSelectedOptions] = useState();

  function handleSelect(data: any) {
    setSelectedOptions(data);
  }
  return (
    <ReactSelect
      styles={customStyles}
      placeholder="Select"
      isSearchable={true}
      onChange={handleSelect}
      options={channelList}
      isMulti
    />
  );
};
