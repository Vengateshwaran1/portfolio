import { FaGithubSquare, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bottom-0 w-full flex md:flex-row flex-col gap-y-3 md:gap-y-0 justify-between items-center p-20 md:p-10 text-sm md:text-lg mt-12'>
        <div className='space-y-4'>
            <h3 className='text-2xl text-gray-200 font-semibold'>Vengateshwaran.K</h3>
            <div className='flex flex-row justify-center md:justify-start gap-6 text-gray-400 text-4xl'>
                <a href="https://github.com/Vengateshwaran1"><FaGithubSquare /></a>
                <a href="https://www.instagram.com/i_am.venki"><FaInstagram /></a>
            </div>
        </div>

        <p className='text-gray-400'>@2024 Vengateshwaran.K</p>
        
    </div>
  )
}

export default Footer