import Page from '../../Page'
import { getRandomAPI } from '../../publicApis'

export default Page

export async function getStaticProps(ctx) {
   const params = ctx.params
   console.log(params)

   const data = await getRandomAPI()
   const props = { params, data }
   return { props, revalidate: 30 }
}

export async function getStaticPaths() {
   return {
      paths: [],
      fallback: true // true -> build page if missing, false -> serve 404
   }
}
