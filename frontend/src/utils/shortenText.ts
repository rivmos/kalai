export default function shortenText(text:string | undefined) {
    return `${text?.split(' ')?.slice(0, 50)?.join(' ')}...`
}
