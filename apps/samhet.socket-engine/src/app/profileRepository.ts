import { Profile } from "@samhet/persistent-models"

export const getProfile = (profileId:string):Promise<Profile|undefined> => {
  // get from LRU cache
  // else get from data base.
  return;
}

export const StartProfileListener = () => {
  // start listen to changes to profile table.
  // clean LRU cache.
}
