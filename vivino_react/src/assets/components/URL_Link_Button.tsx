export default function URL_Link_Button({url,text_content}) {
    function handleClick() {
        window.location.href = url
    }
    return <button onClick={handleClick}>{text_content}</button>
}