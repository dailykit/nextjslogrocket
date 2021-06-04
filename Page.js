import { useRouter } from 'next/router'

export default function Page(props) {
   const { isFallback } = useRouter()

   if (isFallback) {
      return <></>
   }

   return (
      <div>
         <h1>{props.data.name}</h1>
         <p>{props.data.description}</p>
         <p>{props.params.domain}</p>
         <p>{props.params.slugs}</p>
      </div>
   )
}
