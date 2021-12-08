
export const ValidateEmail=(email)=>
{
    email=email.toLowerCase().trim()

    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)


}

export const VarifySyntex=(UserName,email,password)=>
{

    let error=""
    let varified=true

    if(UserName=="")
    {
        varified=false
        error="UserName is Not Given Please Fill it"
    }
    else if (email=="" || !ValidateEmail(email))
    {
        console.log("email profbe")
        varified=false
        error="Email is Not Right Please Fill it Again"
    }

    else if(password.length<8)
    {
        varified=false
        error="Password Is not Strong Enough"

    }

    return {varified,error}
}