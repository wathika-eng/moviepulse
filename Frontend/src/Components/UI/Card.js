
function Card({ movie }) {
    return (
        <div className='border-black rounded-2xl shadow-lg w-60 m-10  pb-4'>
            {/* <h1>{movie.original_title}</h1> */}
            <div className=' shadow-black   overflow-hidden rounded-t-lg flex justify-center'>
                {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='cover' /> : <img src={'/static/images/no-image.png'} alt='no-image' />
                }
            </div>
            <div className='mt-4 px-4'>
                <h1 className='text-xl dark:text-gray-300 font-semibold'>{movie.original_title}</h1>
                <p className='line-clamp-3 dark:text-gray-400'>{movie.overview}</p>
            </div>
        </div>
    );
}

export default Card;