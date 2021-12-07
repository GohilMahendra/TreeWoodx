
export const ValidateEmail=(email="Sring fdf")=>
{
    email=email.toLowerCase().trim()

    return email.match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/")


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