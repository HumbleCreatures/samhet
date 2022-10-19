import Sheet from "@mui/joy/Sheet";
import { ColorSchemeToggle } from "./TopBar";

export const ProtectedLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {
    return (<Sheet>
      <div>
      <h1>samhet</h1>
      <div><ColorSchemeToggle /></div>
      </div>
   
    <div>protected route</div>
    {children}
    <div>footer</div>
    </Sheet>)
  };