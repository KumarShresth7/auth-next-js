"use client";
import axios from 'axios'
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage(){

    const router = useRouter()
    const [data,setData] = useState("")
    const logout = async()=>{
        try {
           await axios.get('/api/users/logout')
           toast.success('Logout successfull')
           router.push('/login')
           
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className='p-3 padding rounded bg-green-500'>{data===""?"":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-4 rounded">Logout</button>
            <button onClick={getUserDetails} className="bg-purple-700 hover:bg-green-800 text-white font-bold py-2 px-4 mt-4 rounded">GetUserDetails</button>
        </div>
    )
}