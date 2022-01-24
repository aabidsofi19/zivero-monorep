export  default ()=> ({
    user:{
        id:'',
        username:"",
        email:"",
        firstName:"",
        lastName:"",
        verified:"",
        lastLogin:'',

    },
    
    auth:{
        isLoggedIn:false,
        loginThrough:'',
        isEmailLoggedIn:false,
        token:null,
        tokenExpireAt:null,
        refresh_token:localStorage.getItem('Zivero_refresh_token')
        //localStorage.getItem('Zivero_auth'),
        
        
    },
    



})

