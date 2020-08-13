export const request_to_instagram = async () => {

    let photo = [];

    let response = await fetch('/php/instagram.php').then((el) => {
        let element = el.json();
        return (element)
    }).then(function (data) {
        let qwerty = data;
        photo = qwerty;
        console.log(qwerty);
    }).catch((e) => console.log(e));
    return photo;
};
