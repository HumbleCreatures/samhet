import { Profile } from "@samhet/persistent-models";

export const GetValuesFromProfile = (profile: Profile) => {
    
    let heteroScore = 100;
    if (profile.lookingFor.some(sex => sex !== profile.gender)) {
        heteroScore = heteroScore + 100;
    }

    if (profile.lookingFor.some(sex => sex === profile.gender)) {
        heteroScore = heteroScore - 100;
    }

    let homoScore = 100;
    if (profile.lookingFor.some(sex => sex !== profile.gender)) {
        homoScore = homoScore - 100;
    }

    if (profile.lookingFor.some(sex => sex === profile.gender)) {
        homoScore = homoScore + 100;
    }

    return [
        heteroScore,
        homoScore,
        profile.age,
        profile.location.lat,
        profile.location.lng
    ]
}