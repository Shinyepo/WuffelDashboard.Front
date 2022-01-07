import { Select } from "@chakra-ui/select";
import React, { FC } from "react";
import { GetGuildChannelsQuery } from "../../../../generated/graphql";

interface Props {
  data: GetGuildChannelsQuery,
  selectedId?: string | null,
  index: number
}

export const ChannelSelectList: FC<Props> = ({data, selectedId, index}) => {    
  return (
  <Select key={index} placeholder="-- Not Selected --" defaultValue={selectedId??""}>
    {data.getGuildChannels?.map((x, idx)=> {
      return (<><option key={idx} value={x.id} disabled={true}>{x.name}</option>{x.channels?.map((a,indx)=>(<option key={indx} value={a.id}>{a.name}</option>))}</>)
    })}
  </Select>
)};
