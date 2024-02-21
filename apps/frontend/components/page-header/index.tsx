type PageHeaderProps = {
  title: string
  description: string
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className='text-3xl font-bold text-primary'>{title}</h1>
      <h2>{description}</h2>
    </div>
  )
}
export default PageHeader
