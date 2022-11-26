import { GetValuesFromProfile } from './clusteringValues';
import { GenerateUser } from './userDatabase';

  const users = Array(1000).fill(null).map(() => {
    const user = GenerateUser();
    return user;
  });
  console.log(JSON.stringify(users, null, 2));
  
  const userDataSet = users.map(user => { 
    return GetValuesFromProfile(user);
  });

  var clustering = require('density-clustering');
  var kmeans = new clustering.KMEANS();
  // parameters: 3 - number of clusters
  var clusters = kmeans.run(userDataSet, 15);
  console.log(clusters);

  const firstClusterUsers = clusters[0].map((index:number) => users[index]);
  console.log(firstClusterUsers);