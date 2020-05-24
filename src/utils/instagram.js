const token = '5431003189.884120b.e0e756e4fc8045208f93ffa7fbae46e2';

const userId = '5431003189';


const inst_url = "https://api.instagram.com/v1/users/";


const inst_url_second_part = "/media/recent?access_token=";


export const request_to_instagram = async () => {

    let response = await fetch(inst_url + userId + inst_url_second_part + token);

    return await response.json();

};
