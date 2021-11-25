import { FC } from "react";
import { DailyStatistics } from "./components/DailyStatistics";

interface Props {
    count: string | undefined
}

export const Summary: FC<Props> = ({ count }) => (
    <>
    <DailyStatistics count={count} />
    </>
)