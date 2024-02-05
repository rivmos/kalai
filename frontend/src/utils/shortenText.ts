export default function shortenText(text:string) {
    return `${text.split(' ')?.slice(0, 3)?.join(' ')}...`
}
