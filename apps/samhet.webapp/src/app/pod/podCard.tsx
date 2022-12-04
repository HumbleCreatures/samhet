import { Button, Card, Typography } from "@mui/joy"
import { Pod } from "@samhet/models";
import { useNavigate } from "react-router-dom";

export const PodCard = ({pod}:{pod:Pod}) => {
  const navigate = useNavigate();
  const goToPod = () => {
    navigate(`/app/pod/${pod.id}`);
  }
  return <Card variant="outlined" sx={{ width: 320 }}>
    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
      Pod: {pod.displayName}
    </Typography>
    <Button onClick={goToPod}>Go to pod</Button>
  </Card>
 }
