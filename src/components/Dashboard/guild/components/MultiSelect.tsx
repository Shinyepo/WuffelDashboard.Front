import { FC } from "react";
import ReactSelect from "react-select";
import { multiSelectStyles, SelectOption } from "../../../../types";

interface Props {
  channelList: Array<SelectOption>;
  setSelected: (data: SelectOption[]) => void;
  defaultValue?: Array<SelectOption>;
  type: "channel" | "user";
}

export const MultiSelect: FC<Props> = ({
  setSelected,
  channelList,
  type,
  defaultValue,
}) => {
  function handleSelect(data: any) {
    setSelected(data);
  }
  return (
    <ReactSelect
      name={type}
      styles={multiSelectStyles}
      placeholder="Select"
      isSearchable={true}
      onChange={handleSelect}
      options={channelList}
      defaultValue={defaultValue}
      isMulti
    />
  );
};
