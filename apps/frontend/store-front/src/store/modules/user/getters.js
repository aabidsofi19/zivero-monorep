export default {
    isAuthenticated(){
        if(localStorage.getItem('Zivero_auth')){
            return true
        }
        else{
            return false
        }
    }
}
