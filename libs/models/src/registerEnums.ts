import {registerEnumType} from 'type-graphql-v2-fork';
import { Gender } from './entities/profile';

export const registerTypesEnums = () => {
  registerEnumType(Gender, {
    name: "Gender"
  });
}
