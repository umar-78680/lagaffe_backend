const isEmailValidate = ({ key }) => {
    const isEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            key
        );
    return isEmail;
};

const validation = (email, phone) => {
    return new Promise((res, rej) => {
        if(!isEmailValidate({key: email}))
        {
            rej("Invalid Email");
        }
        
        if(phone.length !== 10)
        {
            rej("Invalid Phone Number");
        }

        res();
    })
}


module.exports = {validation};