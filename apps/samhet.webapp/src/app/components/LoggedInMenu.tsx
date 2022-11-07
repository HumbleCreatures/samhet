import { Button } from "@mui/joy"
import { useNavigate } from "react-router-dom";

export const LoggedInMenu = () => {
  const navigate = useNavigate();

  return <Button
  onClick={() => navigate('/app/profiles')}
  size="sm"
  variant="outlined">
    Profile search
    </Button>

}
