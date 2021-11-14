import { FC } from "react";
import { Link } from "react-router-dom";

export const NoMatch: FC = () => <div>Not Found<Link to="/">Home</Link></div>;
