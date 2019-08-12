import * as React from "react";
import {IResource} from "../../types";

export const ResourcesContext = React.createContext<IResource[]>([]);