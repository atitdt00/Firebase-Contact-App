import "tailwindcss";

const Navbar = () => {
  return (
    <div className='my-4 flex gap-10 justify-center items-center h-[60px] bg-white rounded-lg text-2xl font-medium'>
        <img src="/logos_firebase.png" alt="logo" />
        <a href="">Firebase Contact App</a>
    </div>
  )
}

export default Navbar;