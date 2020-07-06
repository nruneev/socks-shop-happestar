const token = '5431003189.884120b.e0e756e4fc8045208f93ffa7fbae46e2';

const userId = '5431003189';


const inst_url = "https://graph.instagram.com/" + userId + "/media";


const inst_url_second_part = "?fields=media_url&access_token=";


export const request_to_instagram = async () => {

    let response = await fetch(inst_url + inst_url_second_part + token);

    return await response.json();

};
