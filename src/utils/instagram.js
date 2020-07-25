const token = '639a10016ef1b8a7bc1442ad978c1154';

const userId = '5431003189';

const inst_url = "https://api.instagram.com/v1/users/" + userId + "/media/recent?access_token="  + token;

export const request_to_instagram = async () => {

    let response = await fetch(inst_url);

    return await response.json();

};
