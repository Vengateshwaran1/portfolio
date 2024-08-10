import { AiOutlineGithub } from 'react-icons/ai'
import Reveal from './Reveal';
import project1 from '../assets/project1.png'

const projects = [
    {
      img: project1,
      title: "Project #1",
      description: "UI for car pooling website",
      links: {
        site: "https://fasten-your-belt.vercel.app/",
        github: "https://github.com/Vengateshwaran1/Fasten-Your-Belt",
      },
    },
    {
        img: project1,
        title: "Project #2",
        description: "UI for car pooling website",
        links: {
          site: "https://fasten-your-belt.vercel.app/",
          github: "https://github.com/Vengateshwaran1/Fasten-Your-Belt",
        },
      },
      {
        img: project1,
        title: "Project #3",
        description: "UI for car pooling website",
        links: {
          site: "https://fasten-your-belt.vercel.app/",
          github: "https://github.com/Vengateshwaran1/Fasten-Your-Belt",
        },
      },
  ]

const Portfolio = () => {
  return (
    <div className='max-w-[1000px] mx-auto p-6 md:my-20' id="portfolio">
        <h2 className='text-3xl font-bold text-gray-200 mb-8'>Portfolio</h2>
        {projects.map((project, index) => (
            <Reveal key={index}>
            <div
            className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-12`}>
                <div className='w-full md:w-1/2 p-4'>
                    <img
                        src={project.img}
                        alt={project.title}
                        className='w-full h-full object-cover rounded-lg shadow-lg'
                    />
                </div>
                <div className='w-full md:w-1/2 p-4 flex flex-col justify-center'>
                    <h3 className='text-2xl font-semibold text-gray-200 mb-4'>{project.title}</h3>
                    <p className='text-gray-300 mb-4'>{project.description}</p>
                    <div className='flex space-x-4'>
                        <a href={project.links.site}
                            className='px-4 py-4 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700
                                        transition duration-300'>
                            View Site
                        </a>
                        <a href={project.links.github}
                            className='px-4 py-4 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700
                                        transition duration-300'>
                            <AiOutlineGithub/>
                        </a>
                    </div>
                </div>
            </div>
            </Reveal>
        ))}
    </div>
  )
}

export default Portfolio