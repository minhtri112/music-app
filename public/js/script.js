// ALplayer
const aplayer = document.getElementById('aplayer');
if (aplayer) {
    const song = JSON.parse(aplayer.getAttribute("data-song"));
    const singer = JSON.parse(aplayer.getAttribute("data-singer"));
    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar,
            lrc: song.lyrics,
        }],
        autoplay: true
    });

    const avatar = document.querySelector(".inner-play .inner-avatar");

    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });

    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });

    // Chức năng thống kê lượt nghe

    ap.on('ended', function () {
        const boxListen = document.querySelector(".inner-listen");

        const link = `/songs/listen/${song._id}`;

        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const span = boxListen.querySelector("span");

                span.innerHTML = `${data.listen} lượt nghe`;
            })
    });
}

// ALplayer


// Button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");

        const typeLike = isActive == true ? "dislike" : "like";
        const link = `/songs/like/${typeLike}/${idSong}`;

        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const like = buttonLike.querySelector("span");


                like.innerHTML = data.like;

                buttonLike.classList.toggle("active");
            })

    });
}
// End Button like


// Button heart
const buttonHeartList = document.querySelectorAll("[button-favorite]");
if (buttonHeartList.length > 0) {
    buttonHeartList.forEach(buttonHeart => {
        buttonHeart.addEventListener("click", () => {
            const idSong = buttonHeart.getAttribute("button-favorite");
            const isActive = buttonHeart.classList.contains("active");

            const typeFavorite = isActive == true ? "unfavorite" : "favorite";

            const link = `/songs/favorite/${typeFavorite}/${idSong}`;

            const option = {
                method: "PATCH"
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code == "200") {
                        buttonHeart.classList.toggle("active");
                    }
                })

        });
    });
}
// End Button heart

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector("input");
    const boxSuggest = boxSearch.querySelector(".inner-suggest");

    input.addEventListener("keyup", () => {
        const keyword = input.value;

        const link = `/sreach/suggest?keyword=${keyword}`;

        fetch(link)
            .then(res => res.json())
            .then(data => {
                const songs = data.songs;
                if (songs.length > 0) {
                    boxSuggest.classList.add("show");

                    const htmls = songs.map(song => {
                        return `
                    <a class="inner-item" href="/songs/detail/:${song.slug}"><div class="inner-image">
                    <img src= ${song.avatar} alt="Song"></div>
                    <div class="inner-info"> <div class="inner-title">${song.title} </div>
                    <div class="inner-singer"> <i class="fa-solid fa-microphone-lines">
                    </i>${song.infoSinger.fullName}</div></div></a>
                    `
                    });

                    const boxList = document.querySelector(".inner-list");
                    boxList.innerHTML = htmls.join("");

                }
                else{
                    boxSuggest.classList.remove("show");
                }
            });

    });
}


// End Search Suggest