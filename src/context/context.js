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

    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState({show:false,msg:''})

    const searchGithubUser=async(user)=>{
       toggleError()
       setIsLoading(true)
       console.log("direccion",`${rootUrl}/users/${user}`)
       const response=await axios(`${rootUrl}/users/${user}`)
            .catch(err => console.log(err))
           
            if (response){
               
                setGithubUser(response.data)
                const {login,followers_url}=response.data
                //repos
                axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(reponse=>console.log(response))
                console.log("response.data",response.data)
                //setRepos(response.data)
                //followers
                axios(`${followers_url}?per_page=100`).then(
                  setFollowers(response.data)
                )
                //
            }else{toggleError(true,'there is not user with this user')}
            checkRequest()
            setIsLoading(false)
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
    
    return <GithubContext.Provider value={{githubUser,repos,followers,request,error,searchGithubUser,isLoading}}>{children}</GithubContext.Provider>
}

export {GithubProvider,GithubContext}