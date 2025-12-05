export default function PageTutoriel({title,img,desc}) {
  return (
    <article className='w-full h-7/8 p-6 flex justify-start items-center flex-col text-center'>
        <h1 className='font-semibold text-3xl p-5   '>{title}</h1>
        <img src={img} className='w-full h-2/3 object-cover' alt="" />
        <p className="p-4"> {desc}</p>
    </article>
  )
}
