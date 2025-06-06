import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.init';
const googleProvider = new GoogleAuthProvider

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const  loginUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const SignInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }
    const logoutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    const manageProfile = (name,image)=>{
        return updateProfile(auth.currentUser , {
            displayName:name,photoURL:image
        })
    }
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser)
            // console.log("state captured ",currentUser);
            setLoading(false)
        })
        
        return() => {
            unsubscribe();
        }
    },[])

    const authInfo ={
        user,
        loading,
        createUser,
        loginUser,
        SignInWithGoogle,
        logoutUser,
        manageProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;