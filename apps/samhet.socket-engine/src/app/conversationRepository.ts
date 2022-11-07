import { Profile } from "@samhet/persistent-models"

export const getConversation = (conversationId:string):Promise<Conversation|undefined> => {
  // get from LRU cache
  // else get from data base.
  return;
}

export const StartConversationListener = () => {
  // start listen to changes to profile table.
  // clean LRU cache.
}
