import { FC } from "react";
import { Route, Switch } from "react-router";
import { Settings } from "./Settings";
import { Summary } from "./Summary";

export const Main: FC = () => (
    <>
        <Switch>
            <Route exact path="/playground/:id" component={Summary} />
            <Route path="/playground/:id/summary" component={Summary} />
            <Route path="/playground/:id/settings" component={Settings} />
        </Switch>
    </>
)