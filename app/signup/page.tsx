import React from "react";

const Signup = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold  mb-4">Sign Up</h1>
          <form className="flex flex-col gap-4 text-black">
            <input
              type="text"
              placeholder="Name"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
