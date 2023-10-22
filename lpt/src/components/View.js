import Navbar from "./Navbar"; 

const View = () => { 
    // firebase.onAuthStateChanged(function(user) {

    //     if(user) {
            return (
                <div>
                    <h1>
                        <Navbar />
                        
                    </h1>
                </div>
            );
        // } else {
        //    window.location.href = "www.google.com"
        // }
};

export default View;
