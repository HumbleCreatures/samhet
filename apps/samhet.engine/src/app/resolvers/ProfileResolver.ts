import {Resolver, Query, Mutation, InputType, Field, Arg} from 'type-graphql-v2-fork';
import { Profile } from '../entity/Profile';


@Resolver()
export class RecipeResolver  {
 

  @Query(returns => Profile, { nullable: true })
  async profileByProfileId(@Arg("profileId") profileId: string): Promise<Profile | undefined> {
    // Get from database
    return await this.items.find(recipe => recipe.title === title);
  }

  @Query(returns => Profile, { nullable: true })
  async profileByUserId(@Arg("userId") userId: string): Promise<Profile | undefined> {
    // Get from database
    return await this.items.find(recipe => recipe.title === title);
  }

  @Query(returns => [Profile], { description: "Get all the profiles" })
  async recipes(): Promise<Profile[]> {
    // Get all profiles
    return await this.items;
  }

  @Mutation(returns => Profile)
  async updateProfile(@Arg("recipe") recipeInput: RecipeInput): Promise<Profile> {

    const recipe = Object.assign(new Recipe(), {
      description: recipeInput.description,
      title: recipeInput.title,
      ratings: [],
      creationDate: new Date(),
    });
    await this.items.push(recipe);
    return recipe;
  }

}



@InputType()
export class RecipeInput implements Partial<Profile> {
  @Field({ nullable: false })
  fullName?: string;

  @Field({ nullable: false })
  displayName?: string;}
