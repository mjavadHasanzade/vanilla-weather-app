window.addEventListener('load', () => {
    let long;
    let lat;

    let tempratureDescribtion = document.querySelector('.temprature-describtion');
    let tempratureDegree = document.querySelector('.temprature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconHtml = document.querySelector('.icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // long =  '51.4100';
            // lat = '33.9850';

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                // set data in document
                tempratureDegree.textContent = temperature;
                tempratureDescribtion.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // set Icon
                setIcons(icon, document.querySelector('.icon'))
            })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});