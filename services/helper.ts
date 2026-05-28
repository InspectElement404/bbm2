import { parse } from "path"

export function Capitalism(word: string) {
    if (word) {
        return word
            .split(' ')
            .map((salita) => salita.at(0)?.toUpperCase() + salita.slice(1))
            .join(' ')
    }
    else {
        return null
    }

}


export function regMapper(parsed_region: string) {
    const listing: string[] = ['All', 'BARMM', 'CALABARZON', 'CAR', 'MIMAROPA', 'NCR', 'Region I', 'Region II', 'Region III', 'Region IX', 'Region V', 'Region VI', 'Region VII', 'Region VIII', 'Region X', 'Region XI', 'Region XII', 'Region XIII']
    const filtered = listing.filter((isla) => {
        const regex = new RegExp(`\\b${isla}\\b`)
        return regex.test(parsed_region)
    })
    if (filtered.length > 0) {

        return filtered
    } else {
        return null
    }
}

