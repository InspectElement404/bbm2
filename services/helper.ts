 export function Capitalism(word: string) {
    return word
            .split(' ')
            .map((salita) => salita.at(0)?.toUpperCase() + salita.slice(1))
            .join(' ')
}

