import { useMutation, useQuery } from "@apollo/client";
import { Button, Typography } from "@mui/joy";
import { PodMember } from "@samhet/models";
import { PodCard } from "./podCard";
import { MY_PODS, MyPodsMemberData, GENERATE_POD } from "./podQueries";


export const MyPods = () => {
  const {data, loading, error} = useQuery<MyPodsMemberData>(MY_PODS);
  const [mutateFunction, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation<any>(GENERATE_POD,
    {
        refetchQueries: [
          {query: MY_PODS}
        ],
      }
      );


  const listOfPods = data?.myPodMemberships?.map((podMember:PodMember) => {
    return <PodCard pod={podMember.pod} key={podMember.pod.id} />
   });

  return <div>
    <Typography>My pods</Typography>
    {listOfPods?.length === 0 && <Button onClick={() => mutateFunction()}>Generate me a pod</Button>}
    {listOfPods}
  </div>;
}
