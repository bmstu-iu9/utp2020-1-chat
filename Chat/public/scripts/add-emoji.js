let all_emojies = ["😀", "😃", "😄", "😁", "😆",
"😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍",
"🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪",
"🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔",
"😟", "😕", "🙁", "☹", "😣", "😖", "😫", "😩", "🥺", "😢",
"😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱",
"😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶",
"😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴",
"🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒",
"🤕", "🤑", "🤠", "😈", "👿", "💩", "❤", "️💔", "🔝", "👍",
"🤝", "👊🏻", "✊🏻", "🤛🏻", "🤜🏻", "💋"];

const emoji_block = document.getElementById("emoji-block");

for (let i = 0; i < all_emojies.length; i++){
    emoji_block.innerHTML +=
        '<button data-emoji value="' + all_emojies[i] + '" class="emoji-butt">' + all_emojies[i] + '</button>';
}

const message = document.getElementById("m");

const emojies = document.querySelectorAll('[data-emoji]');

emojies.forEach(button => {
    button.addEventListener("click", () => {
        message.value += button.value;
    })
})