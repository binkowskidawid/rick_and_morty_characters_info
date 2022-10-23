import {Character, Gender, Location, Species} from "../../types";
import imageLoader from "../../imageLoader";
import Image from "next/image";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import CharactersPage from "./index";

function CharacterPage({character}: { character: Character }) {

    const dataToInformationAboutCharacter = [
        {
            id: 1,
            name: "Status",
            content: character.status
        },
        {
            id: 2,
            name: "Species",
            content: character.species
        },
        {
            id: 3,
            name: "Gender",
            content: character.gender
        },
        {
            id: 4,
            name: "Origin",
            content: character.origin.name
        },
        {
            id: 5,
            name: "Location",
            content: character.location.name
        },
    ]

    const router = useRouter()
    console.log(router.query)

    return (
        <>
            <div className="container mx-auto">
                <button onClick={router.back} className="p-1 bg-green-500 m-2 rounded text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <div className="flex flex-col items-center justify-around">
                    <h2 className="text-4xl font-bold pb-1 mb-4 text-slate-700 drop-shadow-lg">{character.name}</h2>
                    <Image loader={imageLoader} unoptimized src={character.image} alt={character.name} width={200}
                           height={200}
                           className="rounded"/>
                </div>
                <div className="px-4 mt-10">
                    {dataToInformationAboutCharacter.map((el)=> (
                        <div key={el.id} className="flex py-1">
                        <h3 className="pr-2 text-2xl font-bold text-slate-700 drop-shadow-lg">{el.name}:</h3>
                            <p className="text-2xl text-slate-700">{el.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// CharacterPage.getLayout = function getLayout(page: any) {
//     return <Layout>{page}</Layout>
// }

const url = process.env.NEXT_API_URL; // URL address to API

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`${url}${context.query.id}`);
    const character = await res.json()
    return {
        props: {
            character
        }
    }
}

export default CharacterPage