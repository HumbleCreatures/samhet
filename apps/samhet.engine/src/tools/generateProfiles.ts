import { faker } from '@faker-js/faker';
import { AvailableLocations, Gender } from '@samhet/models';
import { EditProfileInput, Profile } from '@samhet/persistent-models';
import { AppDataSource } from '../app/AppDataSource';

function randomIntFromInterval(min:number, max:number):number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const distribution = [1,1,1,1,1,1,1,2,2,2];


const sexes = [ Gender.Male, Gender.Female];

const GenerateUser = () : EditProfileInput => {
    const lookingFor = faker.helpers.arrayElements(sexes).slice(0,distribution[randomIntFromInterval(0,9)]);

    return {
        displayName: faker.name.fullName(),
        gender: faker.helpers.arrayElements(sexes)[0],
        age: faker.datatype.number({min: 18, max: 65}),
        lookingFor,
        location: AvailableLocations[0],
        city: 'Lost prop',
    }
}

const SaveToDatabase = async () => {

  try {
    await AppDataSource.initialize();

    const saves = Array(100).fill(null).map( async () => {
      console.log('Saving profile');

        const profileInput = GenerateUser();
        const profile = new Profile(profileInput);
        await AppDataSource.manager.save(profile);
    });

  await Promise.all(saves);
  console.log('Done generating profiles');
} catch(err) {
  console.log(err);
}

};

console.log('done');
SaveToDatabase();
