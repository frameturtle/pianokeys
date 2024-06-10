export const keys = document.querySelectorAll('.key')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.sound)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    setInterval(function() {
    });
    noteAudio.addEventListener('timeupdate', function() {
        var t = noteAudio.currentTime;
        if (t > 0.5) {
            noteAudio.pause();
            key.classList.remove('active')
            noteAudio.addEventListener('ended', () => {
                key.classList.remove('active')
            })
        }
})}
