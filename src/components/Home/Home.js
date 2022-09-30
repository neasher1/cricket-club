import React, { useEffect, useState } from 'react';
import Activity from '../Activity/Activity';
import user from '../../images/user.jpg';
import {  MdSportsCricket } from 'react-icons/md';
import ExcerciesTime from '../ExcerciesTime/ExcerciesTime';
import { getFromLocalStorage, setInLocalStorage } from '../Utilities/localdb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
const Home = () => {
   
    // state for activities
    const [activities , setActivities] = useState([]);
    // state for total time
    const [totalTime , setTimes] = useState([]);
    // state for break
    const [breakTime , setBreakTime] = useState([]);
    //    load data
    useEffect(()=>{
        fetch('fakeData.json')
        .then(res=>res.json())
        .then(data=>setActivities(data))
    },[]);
    // load local data
    useEffect(()=>{
        const timeContainer = []
        const getLocalTime = getFromLocalStorage();
        timeContainer.push(getLocalTime);
        setBreakTime(timeContainer);
    },[])

    // time event handler
    const getTime = (times) =>{
        const newTimes = [...totalTime , times];
        setTimes(newTimes);
    }
    const handleBreakTime = (time) =>{
        setBreakTime(time);
        setInLocalStorage(time);
    }
    //toast msg 
    const toastMessage = () =>{
        toast('WOW YOUR EXCERCIES IS FINISHED')
    }
    return (
        <div>
            <div  className='header-title'>
                <h2 className="web-title"> <MdSportsCricket/> Regular-Cricket-Activities</h2>
            </div>
            <div  className="main-container">
                <div className="card-container">
                    {
                            activities.map((activity)=><Activity getTime={getTime} key={activity.name} activity ={activity}></Activity>)
                    }
                </div>
                <div className="profile-container">
                    <div className="profile-name">
                        <img src={user} alt="" />
                        <p>Name : Fahim Muntasir Orin</p>
                    </div>
                    <p className='location'>Jessore, Khulna, BD</p>
                    <div className="personal-info">
                        <h5>W-75KG</h5>
                        <h5>H-6.2 Inch</h5>
                        <h5>Age-25</h5>
                    </div>
                    <div className="add-break">
                        <h2>Add A Break </h2>
                        <div className="all-btn">
                            <button onClick={()=>handleBreakTime(15)} className="break-btn">15s</button>
                            <button onClick={()=>handleBreakTime(20)} className="break-btn">20s</button>
                            <button onClick={()=>handleBreakTime(25)} className="break-btn">25s</button>
                            <button onClick={()=>handleBreakTime(30)} className="break-btn">30s</button>
                            <button onClick={()=>handleBreakTime(35)} className="break-btn">35s</button>
                        </div>
                    </div>
                    <div className="excercies">
                        <ExcerciesTime breakTime={breakTime} totalTime ={totalTime}></ExcerciesTime>
                    </div>
                    <div className=''>
                        <button onClick={toastMessage} className='btn finish-btn'>Finish Excercise</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Home;