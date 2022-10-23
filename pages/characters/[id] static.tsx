import {Character, GetCharacterResults} from "../../types";
import characters from "./index";
import imageLoader from "../../imageLoader";
import Image from "next/image";
import {GetServerSideProps} from "next";

function CharacterPageStatic({character}:{character: Character}) {
    return (
        <>
            <div>
                <h1>{character.name}</h1>
                <Image loader={imageLoader} unoptimized src={character.image} alt={character.name} width={150} height={150}
                       className="rounded"/>
            </div>
        </>
    )
}

const url = `https://rickandmortyapi.com/api/character/`; // URL address to API

export async function getStaticPaths() {
    const res = await fetch(url);
    const {results}: GetCharacterResults = await res.json();

    return {
        paths: results.map((character) => {
            return {params: {id: String(character.id)}}
        }),
        fallback: false
    }
}

export async function getStaticProps({params}: { params: { id: string } }) {
    const res = await fetch(`${url}${params.id}`);
    const character = await res.json()
    return {
        props: {
            character
        }
    }
}

export default CharacterPageStatic