import { readJSON } from 'fs-extra'
import path from 'node:path'

import { Pill } from '../components/Pill.jsx'
import { ButtonRead } from '../components/ButtonRead.jsx'
import { Title } from './Title.jsx'

const jsonDirectory = path.join(process.cwd(), 'dist')

export async function generateStaticParams () {
  const index = path.join(jsonDirectory, 'index.json')
  const posts = await readJSON(index)

  return posts.map(post => ({ post: post.id }))
}

const fetchPost = async (slug) => {
  const { content, level, title } = await readJSON(`${jsonDirectory}/${slug}.json`)
  return { content, level, title }
}

export default async function Post ({ params }) {
  const { post } = params
  const { content, level, title } = await fetchPost(post)

  return (
    <>
      <Title>{title}</Title>
      <header className='relative pt-10'>
        <div className='flex flex-row gap-2 pb-4'>
          <Pill level={level} />
          <ButtonRead title={title} />
        </div>
        <h1 className='pb-8 text-3xl font-bold leading-snug text-blue-900 md:text-4xl' id='content'>{title}</h1>
      </header>
      <article className='prose max-w-none pb-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-blue-900 [&>h1]:pb-8 [&>p]:pb-6 [&>p]:text-lg md:[&>p]:text-xl [&>p>strong]:bg-yellow-50 [&_a]:text-blue-700 [&_a:hover]:underline [&>ul>li]:list-disc [&>ul]:text-lg md:[&>ul]:text-xl [&>ul]:text-blue-900 [&>ul]:pb-4 [&>ul>li]:ml-5 [&>ul]:space-y-3 [&>pre]:overflow-x-auto  [&>pre]:rounded-xl [&>pre]:text-white [&>pre]:mb-8 [&>pre]:p-8 [&>pre]:bg-slate-800' dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
