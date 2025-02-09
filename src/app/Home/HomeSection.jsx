import React from "react";
import Image from "next/image";
import chef from '../../assets/chef.png'
import logo from  '../../assets/logo.png'
function HomeSection({restaurantinfo}) {
  return (
    <div className=" w-full h-full p-4 lg:overflow-hidden overflow-y-auto pt-10 font-sans relative ">
      <div className="w-fit mx-auto ">
        <h1 className="capitalize text-[#440129] text-5xl px-10 tracking-widest text-center font-semibold font-sans">
          {restaurantinfo?.restaurantname}
        </h1>
        <hr className="border mt-1 border-[#440129]" />
      </div>
      <p className="text-center max-w-xl mt-10 mx-auto text-[#440129] tracking-widest capitalize">
      {restaurantinfo?.restaurantdescription}
      </p>
      <div className="text-center space-x-2 lg:space-x-10 mt-4 font-semibold text-[#440129] tracking-wide text-lg ">
        <span>Table : {restaurantinfo?.nooftables}</span>
        <span>chef : {restaurantinfo?.noofchef}</span>
        <span>waiter : {restaurantinfo?.noofwaiters}</span>
      </div>
      <div className="w-fit mx-auto ">
        <h1 className="capitalize text-lg px-6 mt-10 tracking-widest text-center font-semibold font-sans">
          office timing
        </h1>
        <hr className="border mt-1 border-[#440129]" />
      </div>
      <div className="text-center lg:space-x-10   mt-4 font-semibold text-[#440129] tracking-wide text-lg">
        <span>Open: {restaurantinfo?.restaurantopeninghours} </span>
        <br className="lg:hidden"/>
        <span> Close: {restaurantinfo?.restaurantclosinghours}</span>
      </div>
      <Image src={chef} alt="chef" className="absolute bottom-2 right-0 hidden lg:block" width={500} height={100}/>

      
    </div>
  );
}

export default HomeSection;
