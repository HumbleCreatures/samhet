import { Profile, Sex } from "./userDatabase"

export const GetValuesFromProfile = (profile: Profile) => {
    
    let heteroScore = 100;
    if (profile.searchingFor.some(sex => sex !== profile.sex)) {
        heteroScore = heteroScore + 100;
    }

    if (profile.searchingFor.some(sex => sex === profile.sex)) {
        heteroScore = heteroScore - 100;
    }

    let gayScore = 100;
    if (profile.searchingFor.some(sex => sex !== profile.sex)) {
        gayScore = gayScore - 100;
    }

    if (profile.searchingFor.some(sex => sex === profile.sex)) {
        gayScore = gayScore + 100;
    }

    return [
        heteroScore,
        gayScore,
        profile.age,
        profile.cityCoordinates[0],
        profile.cityCoordinates[1]
    ]
}