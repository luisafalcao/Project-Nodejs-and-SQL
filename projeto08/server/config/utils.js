export default function criarSlug(text) {
    return text.toLowerCase().replace(/ /g, "-")
}