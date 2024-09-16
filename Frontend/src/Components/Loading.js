import React from 'react'


const Card = () => {
    return (
        <div class="min-h-screen w-[100%]">
            <div className='w-72'>
                <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="px-6 py-4">
                    <div className="h-6 bg-gray-300 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-2/3"></div>
                    {/* <div className="h-4 bg-gray-300 mt-2 mb-2"></div> */}
                </div>
                <div className="px-6 pt-4 pb-2">
                    <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/2"></div>
                </div>
                </div>
            </div>
        </div>
    )
}
function Loading() {
  return (
    <div className='md:grid grid-cols-3 gap-0 mx-8'>
        {/* ONE */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
  )
}

export default Loading