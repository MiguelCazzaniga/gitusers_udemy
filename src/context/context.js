import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext=createContext()

const GithubProvider=({children})=>{
    const [githubUser,setGithubUser]=useState(mockUser)
    const [repos,setRepos]=useState(mockRepos)
    const [followers,setFollowers]=useState(mockFollowers)
    //request loading
    const [request,setRequest]=useState(0)

    const [loading,setIsLoading]=useState(false)
    const [error,setError]=useState({show:false,msg:''})

    const searchGithubUser=async(user)=>{
       //toggle error
       //set loading to true
       const response=await axios(`${rootUrl}/users/${user}`)
            .catch(err => console.log(err))
            console.log(response)
            if (response){searchGithubUser(response.data)}
            else{toggleError(true,'there is not user with this user')}
    }

    // check rate
    const checkRequest=()=>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data})=>{
            let {rate:{remaining}}=data
            
            setRequest(remaining)
            if (remaining===0){
                toggleError(true,"sorry, 60 request per hour limit exceeded")
    }})
        .catch((err)=>{console.log(err)})
    }
    //errors

    function toggleError(show=false,msg=''){setError({show,msg})}
    useEffect(checkRequest,[])
    
    return <GithubContext.Provider value={{githubUser,repos,followers,request,error,searchGithubUser}}>{children}</GithubContext.Provider>
}

export {GithubProvider,GithubContext}