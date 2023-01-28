import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
//The interface "Props" is being used to define the expected shape of the object that is being passed as props to the "Home" component.
interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}
const Home = ({ 
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  //It's saying that the component expects to receive an object as a prop, and that object should conform to the shape defined in the Props interface.
  //The : Props is a type annotation that specifies the expected type of the props.
 }: Props) => {
  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
      <Head>
        <title>Home-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner netflixOriginals={netflixOriginals}/>
        <section className="md:space-y-24">
        <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </div>
  )
}

export default Home

//Promise.all to fetch all the data in parallel and wait for all requests to finish before returning the props.
export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
//netflixOriginals.results because the data returned from the fetchNetflixOriginals request is in the form of a JSON object,
//which has a results property that contains an array of the movie data.
//By assigning netflixOriginals.results to netflixOriginals, the function is effectively extracting the array of movie data
//from the larger JSON object and making it the value for the netflixOriginals key in the returned object.
